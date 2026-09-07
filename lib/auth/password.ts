import bcrypt from "bcryptjs";

// ==============================================================================
// PASSWORD SECURITY UTILITIES
// ==============================================================================
// Section 5, 10, 11, 78 — bcryptjs with cost factor 12
// Pure JS — no Windows C++ node-gyp issues
// Timing-safe compare via bcryptjs.compare()
// ==============================================================================

const BCRYPT_SALT_ROUNDS = 12;

/**
 * Hash a plain-text password using bcrypt (cost factor 12).
 * Always await this before storing in DB.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

/**
 * Timing-safe password verification.
 * Never compare hashes with ===, always use this function.
 */
export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

/**
 * Validate password policy:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 *
 * Returns true if valid, false otherwise.
 */
export function validatePasswordPolicy(password: string): boolean {
  if (!password || password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  return true;
}

/**
 * Returns a human-readable password policy error message,
 * or null if the password is valid.
 */
export function getPasswordPolicyError(password: string): string | null {
  if (!password || password.length < 8)
    return "Password must be at least 8 characters long.";
  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter.";
  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter.";
  if (!/[0-9]/.test(password))
    return "Password must contain at least one number.";
  return null;
}
