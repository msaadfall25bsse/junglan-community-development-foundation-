import crypto from "crypto";
import path from "path";
import {
  ensureYearFolderStructure,
  uploadFileToDrive,
  YearSubfolderType,
} from "./google-drive.service";
import {
  upsertRecordMapping,
  getRecordMapping,
  createSyncLog,
} from "@/lib/services/sync-db.service";
import { tryPrismaOrFallback } from "@/lib/services/db-helper";
import prisma from "@/lib/prisma";
import { readStore, updateStore } from "@/lib/db/persistent-store";
import { getValidAccessToken } from "./google-auth.service";

// ==============================================================================
// DOCUMENT & RECEIPT ATTACHMENT SERVICE — GOOGLE DRIVE
// ==============================================================================
// Strictly conforming to Sections 9, 10, 46, 49-54, 76-80, 89 of Part 7 specification.
// Enforces:
// 1. Standardized Naming: JUNGLAN_<MODULE>_<IDENTIFIER>_<YEAR>.<ext>
// 2. Year-based Hierarchy: 2026 / (Receipts | Ambulance Records | Reports | Documents)
// 3. SHA-256 Hash Deduplication: Zero duplicate files in Google Drive
// 4. PostgreSQL Record Linkage & Sync Audit Logging

export type AttachmentModule = "EXPENSE" | "TRIP" | "REPORT" | "DOCUMENT";

export interface UploadAttachmentInput {
  module: AttachmentModule;
  identifier: string; // e.g. "EXP-2026-000015" or "TRP-2026-000042"
  recordId: string; // internal DB ID
  year?: string | number; // default "2026"
  originalFileName: string;
  mimeType: string;
  fileBuffer: Buffer;
  description?: string;
}

export interface UploadAttachmentResult {
  fileId: string;
  fileName: string;
  webViewLink: string;
  fileSize: number;
  mimeType: string;
  fileHash: string;
  isDuplicateReused: boolean;
  folderId: string;
  uploadedAt: string;
}

export interface DriveFileInfo {
  id: string;
  name: string;
  mimeType: string;
  size?: number;
  webViewLink?: string;
  createdTime?: string;
}

/**
 * Generates canonical standardized file name conforming to Section 50:
 * Format: JUNGLAN_<MODULE>_<IDENTIFIER>_<YEAR>.<ext>
 */
export function generateStandardFileName(params: {
  module: AttachmentModule;
  identifier: string;
  year?: string | number;
  originalFileName: string;
}): string {
  const year = String(params.year || "2026").trim();
  const rawExt = path.extname(params.originalFileName || "").toLowerCase();
  const ext = rawExt ? rawExt.replace(/^\./, "") : "pdf";
  const cleanId = params.identifier
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .toUpperCase();

  return `JUNGLAN_${params.module.toUpperCase()}_${cleanId}_${year}.${ext}`;
}

/**
 * Computes deterministic SHA-256 hash of file buffer
 */
export function computeFileHash(buffer: Buffer): string {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

/**
 * Maps attachment module to corresponding Google Drive Year subfolder
 */
export function getSubfolderForModule(module: AttachmentModule): YearSubfolderType {
  switch (module) {
    case "EXPENSE":
      return "Receipts";
    case "TRIP":
      return "Ambulance Records";
    case "REPORT":
      return "Reports";
    case "DOCUMENT":
    default:
      return "Documents";
  }
}

/**
 * Securely uploads a document/receipt attachment to Google Drive with deduplication
 */
export async function uploadAttachmentToDrive(
  input: UploadAttachmentInput
): Promise<UploadAttachmentResult> {
  const year = String(input.year || "2026").trim();
  const fileHash = computeFileHash(input.fileBuffer);
  const fileSize = input.fileBuffer.length;
  const standardFileName = generateStandardFileName({
    module: input.module,
    identifier: input.identifier,
    year,
    originalFileName: input.originalFileName,
  });

  // 1. Resolve Year Folder Hierarchy
  const hierarchy = await ensureYearFolderStructure(year);
  const subfolderName = getSubfolderForModule(input.module);
  const targetFolderId = hierarchy.subfolders[subfolderName];

  // 2. Check Deduplication (Section 51, 89)
  // Check if an identical file hash is already registered in mapping
  const existingMapping = await tryPrismaOrFallback(
    async () => {
      const mapping = await prisma.externalRecordMapping.findFirst({
        where: {
          recordType: "DOCUMENT",
          lastSyncedHash: fileHash,
        },
      });
      return mapping;
    },
    async () => {
      const store = readStore();
      const mapping = (store.externalRecordMappings || []).find(
        (m: any) => m.recordType === "DOCUMENT" && m.lastSyncedHash === fileHash
      );
      return mapping || null;
    }
  );

  if (existingMapping && existingMapping.spreadsheetId) {
    const reusedFileId = existingMapping.spreadsheetId;
    const reusedLink = `https://drive.google.com/file/d/${reusedFileId}/view`;

    // Link to operational record even if reused
    await linkAttachmentToRecord(input.module, input.recordId, reusedLink);

    return {
      fileId: reusedFileId,
      fileName: standardFileName,
      webViewLink: reusedLink,
      fileSize,
      mimeType: input.mimeType,
      fileHash,
      isDuplicateReused: true,
      folderId: targetFolderId,
      uploadedAt: new Date().toISOString(),
    };
  }

  // 3. Upload File to Google Drive
  const driveResult = await uploadFileToDrive({
    fileName: standardFileName,
    mimeType: input.mimeType,
    fileBuffer: input.fileBuffer,
    parentFolderId: targetFolderId,
    description: input.description || `Attached to ${input.module} ${input.identifier} (${year})`,
  });

  const webViewLink =
    driveResult.webViewLink || `https://drive.google.com/file/d/${driveResult.fileId}/view`;

  // 4. Save External Record Mapping
  await upsertRecordMapping({
    recordType: "DOCUMENT",
    internalRecordId: input.recordId,
    stableIdentifier: input.identifier,
    yearPeriodId: year,
    spreadsheetId: driveResult.fileId,
    sheetTabName: subfolderName,
    sheetTabGid: "DRIVE",
    lastSyncedHash: fileHash,
  });

  // 5. Link Attachment Reference to Operational Database Record
  await linkAttachmentToRecord(input.module, input.recordId, webViewLink);

  // 6. Record Audit Log
  await createSyncLog({
    recordType: "DOCUMENT",
    recordId: input.recordId,
    stableIdentifier: input.identifier,
    externalReference: driveResult.fileId,
    direction: "OUTBOUND",
    status: "SYNCED",
    payloadSnapshot: {
      fileName: standardFileName,
      fileSize,
      mimeType: input.mimeType,
      fileHash,
      subfolder: subfolderName,
      folderId: targetFolderId,
      webViewLink,
    },
  });

  return {
    fileId: driveResult.fileId,
    fileName: standardFileName,
    webViewLink,
    fileSize,
    mimeType: input.mimeType,
    fileHash,
    isDuplicateReused: false,
    folderId: targetFolderId,
    uploadedAt: new Date().toISOString(),
  };
}

/**
 * Updates operational record (Expense receiptDocumentRef, Trip notes, etc.)
 */
async function linkAttachmentToRecord(
  module: AttachmentModule,
  recordId: string,
  link: string
): Promise<void> {
  await tryPrismaOrFallback(
    async () => {
      if (module === "EXPENSE") {
        await prisma.expense.update({
          where: { id: recordId },
          data: {
            receiptDocumentRef: link,
            updatedAt: new Date(),
          },
        });
      }
    },
    async () => {
      updateStore((s) => {
        if (module === "EXPENSE" && s.expenses) {
          const exp = s.expenses.find((e: any) => e.id === recordId);
          if (exp) {
            exp.receiptDocumentRef = link;
            exp.updatedAt = new Date().toISOString();
          }
        }
      });
    }
  );
}

/**
 * Lists files in a given year and subfolder
 */
export async function listDriveAttachments(params: {
  year?: string | number;
  module?: AttachmentModule;
  subfolder?: YearSubfolderType;
}): Promise<DriveFileInfo[]> {
  const year = String(params.year || "2026").trim();
  const hierarchy = await ensureYearFolderStructure(year);
  const subfolderName: YearSubfolderType =
    params.subfolder || (params.module ? getSubfolderForModule(params.module) : "Receipts");
  const folderId = hierarchy.subfolders[subfolderName];

  const tokenResult = await getValidAccessToken();
  if (tokenResult.authMode === "SIMULATION") {
    // In simulation mode, return mapped items from local store
    const store = readStore();
    const mappings = (store.externalRecordMappings || []).filter(
      (m: any) => m.recordType === "DOCUMENT" && m.sheetTabName === subfolderName
    );

    return mappings.map((m: any) => ({
      id: m.spreadsheetId || m.id,
      name: `JUNGLAN_${m.recordType}_${m.stableIdentifier}_${year}.pdf`,
      mimeType: "application/pdf",
      size: 102400,
      webViewLink: `https://drive.google.com/file/d/${m.spreadsheetId || m.id}/view`,
      createdTime: m.createdAt,
    }));
  }

  const query = `'${folderId}' in parents and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    query
  )}&fields=files(id,name,mimeType,size,webViewLink,createdTime)&orderBy=createdTime desc`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${tokenResult.accessToken}` },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to list Drive files: HTTP ${response.status} - ${errText}`);
  }

  const data = await response.json();
  return (data.files || []).map((f: any) => ({
    id: f.id,
    name: f.name,
    mimeType: f.mimeType,
    size: f.size ? Number(f.size) : undefined,
    webViewLink: f.webViewLink,
    createdTime: f.createdTime,
  }));
}
