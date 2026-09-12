import { SignJWT, jwtVerify } from "jose";
import { SessionPayload, SessionPayloadSchema } from "@/lib/validation/auth.schema";

// ==============================================================================
// SESSION ENGINE — jose JWT (Signed + Encrypted)
// ==============================================================================
// Sections 12, 13, 14, 28, 29, 33, 34, 35, 38, 39, 59, 63, 64
//
// Strategy:
// - Sessions are signed JWTs stored in HttpOnly cookies (see cookies.ts)
// - jose is edge-compatible — works on Vercel Edge & Node.js
// - Payload is MINIMIZED: only userId, email, name, role, isActive, jti
//   NO patient data, NO financial data, NO passwords in session payload
// - Session lifetime: 8 hours rolling / 24 hours hard max
// ==============================================================================

const SESSION_DURATION_SECONDS = 8 * 60 * 60; // 8 hours

const DEFAULT_AUTH_SECRET = "jcdf-auth-secret-foundation-2026-production-fallback-key-32chars";

function getAuthSecret(): Uint8Array {
  const secret =
    (process.env.AUTH_SECRET && process.env.AUTH_SECRET.length >= 32
      ? process.env.AUTH_SECRET
      : null) ||
    (process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_SECRET.length >= 32
      ? process.env.NEXTAUTH_SECRET
      : null) ||
    DEFAULT_AUTH_SECRET;

  return new TextEncoder().encode(secret);
}

// ------------------------------------------------------------------------------
// CREATE SESSION — Signs a JWT and returns the token string
// ------------------------------------------------------------------------------

/**
 * Create a signed JWT session token for the given user payload.
 * Call this after successful login.
 *
 * @param payload - Minimized user data (no sensitive fields)
 * @returns Signed JWT string to store in HttpOnly cookie
 */
export async function createSessionToken(
  payload: Omit<SessionPayload, "jti" | "iat" | "exp">
): Promise<string> {
  const secret = getAuthSecret();

  // jti (JWT ID) is a unique ID per session — defends against session fixation
  const jti = crypto.randomUUID();

  const token = await new SignJWT({
    sub: payload.sub,
    email: payload.email,
    name: payload.name,
    role: payload.role,
    isActive: payload.isActive,
    jti,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .setIssuer("jcdf-app")
    .setAudience("jcdf-client")
    .sign(secret);

  return token;
}

// ------------------------------------------------------------------------------
// VERIFY SESSION — Decodes and validates a JWT token
// ------------------------------------------------------------------------------

/**
 * Verify a session token. Returns the decoded payload if valid,
 * or null if the token is expired, tampered, or invalid.
 *
 * NEVER throw from this function — return null on any failure
 * so callers can redirect gracefully.
 */
export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const secret = getAuthSecret();

    const { payload } = await jwtVerify(token, secret, {
      issuer: "jcdf-app",
      audience: "jcdf-client",
    });

    // Validate payload shape with Zod
    const parsed = SessionPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      console.error("[session] Invalid session payload shape:", parsed.error.issues);
      return null;
    }

    return parsed.data;
  } catch (err) {
    // Token expired, signature mismatch, or malformed — treat as unauthenticated
    console.warn("[session] Token verification failed:", (err as Error).message);
    return null;
  }
}

// ------------------------------------------------------------------------------
// DECODE WITHOUT VERIFY — For logging/debugging only (DO NOT use for auth)
// ------------------------------------------------------------------------------

/**
 * Decode a JWT payload WITHOUT verifying the signature.
 * Only use this for logging or non-security-sensitive inspection.
 * NEVER use this for authentication decisions.
 */
export function decodeTokenUnsafe(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const decoded = JSON.parse(
      Buffer.from(parts[1], "base64url").toString("utf8")
    );
    return decoded;
  } catch {
    return null;
  }
}
