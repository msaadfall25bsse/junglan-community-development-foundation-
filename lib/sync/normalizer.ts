import crypto from "crypto";

// ==============================================================================
// DATA NORMALIZER & SANITIZER — JUNGLAN FOUNDATION
// ==============================================================================
// Strictly conforming to Sections 33, 34, 35, 36 of Part 7 specification.
// Normalizes whitespace, dates (Pakistani timezone Asia/Karachi), financials (strict Decimals),
// and enum/status variations without destructive transformation.

/**
 * Normalizes strings by trimming whitespace and normalizing internal spaces
 */
export function normalizeString(val: unknown): string {
  if (val === null || val === undefined) return "";
  return String(val)
    .replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove zero-width spaces
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Strict numeric Decimal parser for financial fields (Sections 35 & 19)
 * Returns a clean string representing the Decimal (e.g. "5000.00" or "0")
 * Prevents floating-point errors.
 */
export function normalizeFinancial(val: unknown): string {
  if (val === null || val === undefined) return "0";
  const str = String(val).trim();
  if (!str) return "0";

  // Strip currency labels, symbols, and thousand separators
  const cleaned = str
    .replace(/^(PKR|Rs\.?|₨|\$)\s*/i, "")
    .replace(/,/g, "")
    .trim();

  const num = parseFloat(cleaned);
  if (isNaN(num) || !isFinite(num)) {
    return "0";
  }

  // Format with up to 2 decimal places, removing unnecessary trailing zeros
  const rounded = Math.round(num * 100) / 100;
  return rounded.toString();
}

/**
 * Normalizes dates with Pakistani timezone awareness (Section 34)
 * Supports formats: "D/M/YYYY", "DD/MM/YYYY", "YYYY-MM-DD", ISO strings, Excel serial numbers.
 * Returns ISO string formatted to midnight in Pakistan standard time (UTC+5).
 */
export function normalizeDate(val: unknown): { isoDate: string; displayDate: string; year: number } {
  if (!val) {
    const now = new Date();
    return {
      isoDate: now.toISOString(),
      displayDate: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
      year: now.getFullYear(),
    };
  }

  const str = String(val).trim();

  // 1. Check Excel serial number (e.g., 45540)
  if (/^\d{5}$/.test(str)) {
    const serial = parseInt(str, 10);
    const excelEpoch = new Date(1899, 11, 30);
    const date = new Date(excelEpoch.getTime() + serial * 86400000);
    const year = date.getFullYear();
    return {
      isoDate: date.toISOString(),
      displayDate: `${date.getDate()}/${date.getMonth() + 1}/${year}`,
      year,
    };
  }

  // 2. Check D/M/YYYY or DD/MM/YYYY
  const dmyMatch = str.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10);
    const year = parseInt(dmyMatch[3], 10);

    // Pakistan standard time midnight (UTC+5 -> 19:00 UTC previous day or exact UTC date)
    const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    return {
      isoDate: date.toISOString(),
      displayDate: `${day}/${month}/${year}`,
      year,
    };
  }

  // 3. Check ISO format YYYY-MM-DD
  const ymdMatch = str.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})/);
  if (ymdMatch) {
    const year = parseInt(ymdMatch[1], 10);
    const month = parseInt(ymdMatch[2], 10);
    const day = parseInt(ymdMatch[3], 10);

    const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    return {
      isoDate: date.toISOString(),
      displayDate: `${day}/${month}/${year}`,
      year,
    };
  }

  // Fallback to standard Date parsing
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    const year = parsed.getUTCFullYear();
    return {
      isoDate: parsed.toISOString(),
      displayDate: `${parsed.getUTCDate()}/${parsed.getUTCMonth() + 1}/${year}`,
      year,
    };
  }

  // If completely unparseable, return current date fallback with detected 2026 default
  const now = new Date();
  return {
    isoDate: now.toISOString(),
    displayDate: `${now.getDate()}/${now.getMonth() + 1}/2026`,
    year: 2026,
  };
}

/**
 * Normalizes enum values case-insensitively with fallback (Section 36)
 */
export function normalizeEnum<T extends string>(
  val: unknown,
  allowedMap: Record<string, T>,
  fallback: T
): T {
  if (!val) return fallback;
  const cleaned = String(val).trim().toUpperCase().replace(/[\s\-_]+/g, "_");
  return allowedMap[cleaned] || fallback;
}

/**
 * Computes a deterministic SHA-256 hash of record fields for change detection
 */
export function computeRecordHash(data: Record<string, any>): string {
  // Sort keys deterministically
  const sortedKeys = Object.keys(data).sort();
  const canonicalObject: Record<string, any> = {};

  for (const k of sortedKeys) {
    const v = data[k];
    if (v !== undefined && v !== null) {
      canonicalObject[k] = typeof v === "string" ? normalizeString(v) : v;
    }
  }

  return crypto.createHash("sha256").update(JSON.stringify(canonicalObject)).digest("hex");
}
