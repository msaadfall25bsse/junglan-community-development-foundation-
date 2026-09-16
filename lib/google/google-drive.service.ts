import { getValidAccessToken } from "./google-auth.service";
import { getGoogleIntegration, updateGoogleIntegration } from "@/lib/services/sync-db.service";

// ==============================================================================
// GOOGLE DRIVE SERVICE — SERVER-ONLY
// ==============================================================================
// Strictly conforming to Sections 9, 10, 46, 49, 50, 73 of Part 7 specification.
// Implements Year-Based Google Drive Folder Structure:
// Root: "Junglan Community Development Foundation"
// Under Root: "2026", "2027", etc.
// Inside Year: "Ambulance Records/", "Reports/", "Receipts/", "Documents/"

export const ROOT_FOLDER_NAME = "Junglan Community Development Foundation";
export const YEAR_SUBFOLDERS = ["Ambulance Records", "Reports", "Receipts", "Documents"] as const;

export type YearSubfolderType = (typeof YEAR_SUBFOLDERS)[number];

export interface YearFolderHierarchy {
  rootFolderId: string;
  year: string;
  yearFolderId: string;
  subfolders: Record<YearSubfolderType, string>;
}

// In-memory cache of resolved folder IDs to avoid unnecessary repeated Drive API calls
const folderIdCache = new Map<string, string>();

/**
 * Searches for an existing folder by name and parent in Google Drive
 */
export async function findFolderByName(
  name: string,
  parentFolderId?: string
): Promise<{ id: string; name: string } | null> {
  const cacheKey = `${parentFolderId || "root"}::${name}`;
  if (folderIdCache.has(cacheKey)) {
    return { id: folderIdCache.get(cacheKey)!, name };
  }

  const tokenResult = await getValidAccessToken();
  if (tokenResult.authMode === "SIMULATION") {
    const mockId = `sim_folder_${name.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
    folderIdCache.set(cacheKey, mockId);
    return { id: mockId, name };
  }

  let query = `mimeType = 'application/vnd.google-apps.folder' and name = '${name.replace(/'/g, "\\'")}' and trashed = false`;
  if (parentFolderId) {
    query += ` and '${parentFolderId}' in parents`;
  }

  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)&spaces=drive`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${tokenResult.accessToken}` },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Drive search failed: HTTP ${response.status} - ${errText}`);
  }

  const data = await response.json();
  if (data.files && data.files.length > 0) {
    const foundId = data.files[0].id;
    folderIdCache.set(cacheKey, foundId);
    return { id: foundId, name };
  }

  return null;
}

/**
 * Creates a new folder in Google Drive
 */
export async function createFolder(
  name: string,
  parentFolderId?: string
): Promise<{ id: string; name: string }> {
  const tokenResult = await getValidAccessToken();
  const cacheKey = `${parentFolderId || "root"}::${name}`;

  if (tokenResult.authMode === "SIMULATION") {
    const mockId = `sim_folder_${name.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
    folderIdCache.set(cacheKey, mockId);
    return { id: mockId, name };
  }

  const body: any = {
    name,
    mimeType: "application/vnd.google-apps.folder",
  };
  if (parentFolderId) {
    body.parents = [parentFolderId];
  }

  const response = await fetch("https://www.googleapis.com/drive/v3/files?fields=id,name", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenResult.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Drive folder creation failed: HTTP ${response.status} - ${errText}`);
  }

  const data = await response.json();
  folderIdCache.set(cacheKey, data.id);
  return { id: data.id, name: data.name };
}

/**
 * Idempotently ensures the Foundation Root Folder exists
 */
export async function ensureRootFolder(): Promise<string> {
  const integration = await getGoogleIntegration();
  if (integration.driveRootFolderId && !integration.driveRootFolderId.startsWith("sim_")) {
    return integration.driveRootFolderId;
  }

  // Check if folder exists by name
  let root = await findFolderByName(ROOT_FOLDER_NAME);
  if (!root) {
    root = await createFolder(ROOT_FOLDER_NAME);
  }

  // Update DB with the root folder ID
  await updateGoogleIntegration({
    driveRootFolderId: root.id,
    driveRootFolderName: ROOT_FOLDER_NAME,
  });

  return root.id;
}

/**
 * Idempotently ensures the complete year folder hierarchy exists
 * Example for 2026:
 * Root/
 *   └── 2026/
 *        ├── Ambulance Records/
 *        ├── Reports/
 *        ├── Receipts/
 *        └── Documents/
 */
export async function ensureYearFolderStructure(yearInput: string | number): Promise<YearFolderHierarchy> {
  const year = String(yearInput).trim() || "2026";
  const rootFolderId = await ensureRootFolder();

  // 1. Ensure Year Folder exists under Root
  let yearFolder = await findFolderByName(year, rootFolderId);
  if (!yearFolder) {
    yearFolder = await createFolder(year, rootFolderId);
  }

  // 2. Ensure standard subfolders exist under the year folder
  const subfolders: Record<YearSubfolderType, string> = {
    "Ambulance Records": "",
    Reports: "",
    Receipts: "",
    Documents: "",
  };

  for (const subfolderName of YEAR_SUBFOLDERS) {
    let sub = await findFolderByName(subfolderName, yearFolder.id);
    if (!sub) {
      sub = await createFolder(subfolderName, yearFolder.id);
    }
    subfolders[subfolderName] = sub.id;
  }

  return {
    rootFolderId,
    year,
    yearFolderId: yearFolder.id,
    subfolders,
  };
}

/**
 * Securely uploads a document/receipt to a specific Google Drive folder
 */
export async function uploadFileToDrive(params: {
  fileName: string;
  mimeType: string;
  fileBuffer: Buffer;
  parentFolderId: string;
  description?: string;
}): Promise<{ fileId: string; fileName: string; webViewLink?: string }> {
  const tokenResult = await getValidAccessToken();

  if (tokenResult.authMode === "SIMULATION") {
    return {
      fileId: `sim_file_${Date.now()}`,
      fileName: params.fileName,
      webViewLink: `https://drive.google.com/file/d/sim_${Date.now()}/view`,
    };
  }

  const metadata = {
    name: params.fileName,
    parents: [params.parentFolderId],
    description: params.description || `Uploaded by JCDF Operational Sync`,
  };

  const boundary = "-------314159265358979323846";
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody = Buffer.concat([
    Buffer.from(
      delimiter +
        "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
        JSON.stringify(metadata) +
        delimiter +
        `Content-Type: ${params.mimeType}\r\n\r\n`
    ),
    params.fileBuffer,
    Buffer.from(closeDelimiter),
  ]);

  const response = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenResult.accessToken}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Drive file upload failed: HTTP ${response.status} - ${errText}`);
  }

  const data = await response.json();
  return {
    fileId: data.id,
    fileName: data.name,
    webViewLink: data.webViewLink,
  };
}
