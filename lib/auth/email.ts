// ==============================================================================
// EMAIL NORMALIZATION UTILITY
// ==============================================================================
// Section 65, 66 — Consistent email handling across login, registration,
// and uniqueness enforcement. Prevents duplicate accounts due to case
// differences or whitespace.
// ==============================================================================

/**
 * Normalize an email address:
 * - Trims leading/trailing whitespace
 * - Converts to lowercase
 *
 * Always normalize before DB queries or comparisons.
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Basic email format validation.
 * For full validation use Zod schema in auth.schema.ts.
 */
export function isValidEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Normalize and validate email in one step.
 * Returns { email, valid } — use `valid` to guard before DB access.
 */
export function normalizeAndValidateEmail(raw: string): {
  email: string;
  valid: boolean;
} {
  const email = normalizeEmail(raw);
  const valid = isValidEmailFormat(email);
  return { email, valid };
}
