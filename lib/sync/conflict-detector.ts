import { computeRecordHash, normalizeString, normalizeFinancial } from "./normalizer";

// ==============================================================================
// CONCURRENT CONFLICT & CHANGE DETECTION ENGINE — JUNGLAN FOUNDATION
// ==============================================================================
// Strictly conforming to Sections 22, 23, 66, 67, 87 of Part 7 specification.
// Detects NO_CHANGE, DATABASE_UPDATED, SHEET_UPDATED, and BOTH_UPDATED (CONFLICT).

export type ChangeState =
  | "NO_CHANGE"
  | "DATABASE_UPDATED"
  | "SHEET_UPDATED"
  | "BOTH_UPDATED"
  | "NEW_IN_SHEET"
  | "DELETED_IN_SHEET";

export interface FieldDifference {
  field: string;
  databaseValue: any;
  sheetValue: any;
}

export interface ConflictDetectionResult {
  state: ChangeState;
  hasConflict: boolean;
  dbHash: string;
  sheetHash: string;
  fieldDifferences: FieldDifference[];
  reason?: string;
}

/**
 * Detects whether a database record and sheet row have changed, and whether a conflict exists
 */
export function detectConflict(params: {
  databaseRecord: Record<string, any>;
  sheetRow: Record<string, any>;
  lastSyncedHash?: string | null;
  lastSyncedAt?: string | Date | null;
  dbUpdatedAt?: string | Date | null;
}): ConflictDetectionResult {
  const dbHash = computeRecordHash(params.databaseRecord);
  const sheetHash = computeRecordHash(params.sheetRow);

  // 1. Check if both sides are identical
  if (dbHash === sheetHash) {
    return {
      state: "NO_CHANGE",
      hasConflict: false,
      dbHash,
      sheetHash,
      fieldDifferences: [],
    };
  }

  // 2. Identify field-by-field differences
  const fieldDifferences: FieldDifference[] = [];
  const allKeys = Array.from(new Set([...Object.keys(params.databaseRecord), ...Object.keys(params.sheetRow)]));

  for (const key of allKeys) {
    const dbVal = params.databaseRecord[key];
    const sheetVal = params.sheetRow[key];

    // Normalize for comparison
    const normDb = typeof dbVal === "string" ? normalizeString(dbVal) : dbVal;
    const normSheet = typeof sheetVal === "string" ? normalizeString(sheetVal) : sheetVal;

    // Check financial equivalence (e.g. 5000 vs 5000.00)
    const isFinancial = key.toLowerCase().includes("amount") || key.toLowerCase().includes("cost") || key.toLowerCase().includes("petrol") || key.toLowerCase().includes("received");
    if (isFinancial) {
      if (normalizeFinancial(normDb) !== normalizeFinancial(normSheet)) {
        fieldDifferences.push({ field: key, databaseValue: dbVal, sheetValue: sheetVal });
      }
    } else if (normDb !== normSheet) {
      fieldDifferences.push({ field: key, databaseValue: dbVal, sheetValue: sheetVal });
    }
  }

  if (fieldDifferences.length === 0) {
    return {
      state: "NO_CHANGE",
      hasConflict: false,
      dbHash,
      sheetHash,
      fieldDifferences: [],
    };
  }

  // 3. Determine if change occurred on DB, Sheet, or Both
  const lastHash = params.lastSyncedHash;

  if (lastHash) {
    const dbChanged = dbHash !== lastHash;
    const sheetChanged = sheetHash !== lastHash;

    if (dbChanged && sheetChanged) {
      return {
        state: "BOTH_UPDATED",
        hasConflict: true,
        dbHash,
        sheetHash,
        fieldDifferences,
        reason: `Both PostgreSQL record and Google Sheet row were modified independently. Fields differing: ${fieldDifferences.map((f) => f.field).join(", ")}`,
      };
    }

    if (dbChanged && !sheetChanged) {
      return {
        state: "DATABASE_UPDATED",
        hasConflict: false,
        dbHash,
        sheetHash,
        fieldDifferences,
        reason: "Database updated since last sync; Sheet unchanged.",
      };
    }

    if (!dbChanged && sheetChanged) {
      return {
        state: "SHEET_UPDATED",
        hasConflict: false,
        dbHash,
        sheetHash,
        fieldDifferences,
        reason: "Google Sheet updated since last sync; Database unchanged.",
      };
    }
  }

  // Default when no previous hash: if differing, treat as dual change / conflict to be safe (Section 67)
  return {
    state: "BOTH_UPDATED",
    hasConflict: true,
    dbHash,
    sheetHash,
    fieldDifferences,
    reason: `Discrepancy detected without baseline hash. Fields differing: ${fieldDifferences.map((f) => f.field).join(", ")}`,
  };
}
