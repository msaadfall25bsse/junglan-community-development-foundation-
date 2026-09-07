// ==============================================================================
// MASS ASSIGNMENT & PRIVILEGE ESCALATION PROTECTION
// ==============================================================================
// Section 104, 105 — Prevents incoming API payloads from injecting
// privileged fields like `role`, `isActive`, `isAdmin` unless the caller
// is an authorized ADMIN.
// ==============================================================================

// Fields that can NEVER be set by non-admin users via API payloads
const PRIVILEGED_FIELDS = [
  "role",
  "isActive",
  "isAdmin",
  "permissions",
  "passwordHash",
  "createdAt",
  "updatedAt",
  "id",
] as const;

type PrivilegedField = (typeof PRIVILEGED_FIELDS)[number];

/**
 * Strip privileged fields from a user-submitted payload.
 * Always apply this to incoming request bodies before DB writes,
 * unless the caller is a verified ADMIN.
 *
 * @param payload - Raw incoming request body
 * @returns Sanitized payload without privileged fields
 */
export function stripPrivilegedFields<T extends Record<string, unknown>>(
  payload: T
): Omit<T, PrivilegedField> {
  const sanitized = { ...payload };
  for (const field of PRIVILEGED_FIELDS) {
    delete (sanitized as Record<string, unknown>)[field];
  }
  return sanitized as Omit<T, PrivilegedField>;
}

/**
 * Allowed fields for admin user creation.
 * Only include what is explicitly expected — reject everything else.
 */
export function sanitizeUserCreatePayload(raw: Record<string, unknown>): {
  email?: unknown;
  name?: unknown;
  password?: unknown;
  role?: unknown;
  isActive?: unknown;
} {
  return {
    email: raw.email,
    name: raw.name,
    password: raw.password,
    role: raw.role,
    isActive: raw.isActive,
  };
}

/**
 * Allowed fields for admin user update (no password or email change here).
 * Password changes go through a dedicated change-password endpoint.
 */
export function sanitizeUserUpdatePayload(raw: Record<string, unknown>): {
  name?: unknown;
  role?: unknown;
  isActive?: unknown;
} {
  return {
    name: raw.name,
    role: raw.role,
    isActive: raw.isActive,
  };
}
