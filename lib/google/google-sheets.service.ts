import { getValidAccessToken } from "./google-auth.service";

// ==============================================================================
// OFFICIAL GOOGLE SHEETS API V4 SERVICE — SERVER-ONLY
// ==============================================================================
// Strictly conforming to Sections 11, 12, 37, 38, 44, 94 of Part 7 specification.
// Implements batch reads, safe appends, row updates, and header validation.

export interface SheetTabInfo {
  sheetId: number;
  title: string;
  rowCount?: number;
  columnCount?: number;
}

export interface HeaderValidationResult {
  valid: boolean;
  actualHeaders: string[];
  missingHeaders: string[];
  extraHeaders: string[];
  mismatchReason?: string;
}

// Canonical Schemas for Junglan Foundation Workbooks
export const CANONICAL_PATIENT_HEADERS = [
  "No",
  "Date",
  "Time",
  "Patient Name",
  "Pick up",
  "Drop",
  "Km at Pickup",
  "Km at Drop",
  "Distance Coverd in One Trip KM",
  "Petrol",
  "Received",
  "Remark",
  "Other Expanse",
];

export const CANONICAL_EXPENSE_HEADERS = [
  "Date",
  "Name",
  "Received",
  "Expense",
  "Reason",
  "JCDF Receipt",
  "Remark",
];

/**
 * Retrieves metadata for all tabs in a spreadsheet
 */
export async function getSpreadsheetMetadata(spreadsheetId: string): Promise<SheetTabInfo[]> {
  const tokenResult = await getValidAccessToken();

  if (tokenResult.authMode === "SIMULATION") {
    return [
      { sheetId: 0, title: "Ambulance Service Patient Reco", rowCount: 189, columnCount: 13 },
      { sheetId: 223912461, title: "Expanses", rowCount: 282, columnCount: 7 },
    ];
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets(properties(sheetId,title,gridProperties))`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${tokenResult.accessToken}` },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to fetch spreadsheet metadata: HTTP ${response.status} - ${errText}`);
  }

  const data = await response.json();
  return (data.sheets || []).map((s: any) => ({
    sheetId: s.properties.sheetId,
    title: s.properties.title,
    rowCount: s.properties.gridProperties?.rowCount,
    columnCount: s.properties.gridProperties?.columnCount,
  }));
}

/**
 * Validates that a Google Sheet tab matches expected header schema
 */
export async function validateTabHeaders(
  spreadsheetId: string,
  tabTitle: string,
  expectedHeaders: string[]
): Promise<HeaderValidationResult> {
  const tokenResult = await getValidAccessToken();

  if (tokenResult.authMode === "SIMULATION") {
    // Return valid for standard tabs
    return {
      valid: true,
      actualHeaders: expectedHeaders,
      missingHeaders: [],
      extraHeaders: [],
    };
  }

  // Read Row 1
  const range = `${encodeURIComponent(tabTitle)}!1:1`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${tokenResult.accessToken}` },
  });

  if (!response.ok) {
    const errText = await response.text();
    return {
      valid: false,
      actualHeaders: [],
      missingHeaders: expectedHeaders,
      extraHeaders: [],
      mismatchReason: `Could not read headers from tab "${tabTitle}": ${errText}`,
    };
  }

  const data = await response.json();
  const rawRow = data.values?.[0] || [];
  const actualHeaders = rawRow.map((h: any) => String(h).trim());

  // Normalize header comparison
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const normalizedActual = actualHeaders.map(normalize);

  const missingHeaders: string[] = [];
  for (const expected of expectedHeaders) {
    if (!normalizedActual.includes(normalize(expected))) {
      missingHeaders.push(expected);
    }
  }

  const normalizedExpected = expectedHeaders.map(normalize);
  const extraHeaders: string[] = [];
  for (const actual of actualHeaders) {
    if (actual && !normalizedExpected.includes(normalize(actual))) {
      extraHeaders.push(actual);
    }
  }

  const valid = missingHeaders.length === 0;
  return {
    valid,
    actualHeaders,
    missingHeaders,
    extraHeaders,
    mismatchReason: valid
      ? undefined
      : `Missing required columns: ${missingHeaders.join(", ")}`,
  };
}

/**
 * Idempotently ensures a tab exists in the spreadsheet
 */
export async function ensureTabExists(
  spreadsheetId: string,
  tabTitle: string,
  initialHeaders?: string[]
): Promise<SheetTabInfo> {
  const tabs = await getSpreadsheetMetadata(spreadsheetId);
  const existing = tabs.find((t) => t.title.toLowerCase() === tabTitle.toLowerCase());
  if (existing) {
    return existing;
  }

  const tokenResult = await getValidAccessToken();
  if (tokenResult.authMode === "SIMULATION") {
    return {
      sheetId: Math.floor(Math.random() * 100000),
      title: tabTitle,
      rowCount: 100,
      columnCount: initialHeaders ? initialHeaders.length : 15,
    };
  }

  // Create new tab via batchUpdate
  const batchUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`;
  const body = {
    requests: [
      {
        addSheet: {
          properties: {
            title: tabTitle,
          },
        },
      },
    ],
  };

  const response = await fetch(batchUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenResult.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to create sheet tab "${tabTitle}": ${errText}`);
  }

  const resData = await response.json();
  const newSheetProps = resData.replies?.[0]?.addSheet?.properties;

  // If initial headers provided, append them
  if (initialHeaders && initialHeaders.length > 0) {
    await appendSheetRows(spreadsheetId, `${tabTitle}!A1`, [initialHeaders]);
  }

  return {
    sheetId: newSheetProps?.sheetId || 0,
    title: tabTitle,
  };
}

/**
 * Reads row values from a spreadsheet range
 */
export async function readSheetRows(spreadsheetId: string, range: string): Promise<string[][]> {
  const tokenResult = await getValidAccessToken();

  if (tokenResult.authMode === "SIMULATION") {
    return [];
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${tokenResult.accessToken}` },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to read sheet values from "${range}": ${errText}`);
  }

  const data = await response.json();
  return (data.values || []) as string[][];
}

/**
 * Appends rows to a spreadsheet range
 */
export async function appendSheetRows(
  spreadsheetId: string,
  range: string,
  rows: (string | number)[][]
): Promise<{ updatedRows: number; updatedRange: string }> {
  const tokenResult = await getValidAccessToken();

  if (tokenResult.authMode === "SIMULATION") {
    return { updatedRows: rows.length, updatedRange: range };
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenResult.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: rows }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to append rows to "${range}": ${errText}`);
  }

  const data = await response.json();
  return {
    updatedRows: data.updates?.updatedRows || rows.length,
    updatedRange: data.updates?.updatedRange || range,
  };
}

/**
 * Updates a specific row or range in a spreadsheet
 */
export async function updateSheetRange(
  spreadsheetId: string,
  range: string,
  rows: (string | number)[][]
): Promise<{ updatedRows: number; updatedRange: string }> {
  const tokenResult = await getValidAccessToken();

  if (tokenResult.authMode === "SIMULATION") {
    return { updatedRows: rows.length, updatedRange: range };
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${tokenResult.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: rows }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to update range "${range}": ${errText}`);
  }

  const data = await response.json();
  return {
    updatedRows: data.updatedRows || rows.length,
    updatedRange: data.updatedRange || range,
  };
}
