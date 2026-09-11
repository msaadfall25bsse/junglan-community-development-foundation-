import { cookies } from "next/headers";
import { createSessionToken, verifySessionToken } from "@/lib/auth/session";
import { SessionPayload } from "@/lib/validation/auth.schema";

// ==============================================================================
// COOKIE HANDLER — HttpOnly Secure Session Cookies
// ==============================================================================
// Sections 12, 33, 34, 35, 39, 63, 64
//
// Cookie Properties:
//   Name     : __session_jcdf
//   httpOnly : true   — JS cannot access (XSS protection)
//   secure   : true in production (HTTPS only)
//   sameSite : lax    — CSRF protection for cross-site navigation
//   path     : /      — available site-wide
//   maxAge   : 28800  — 8 hours (matches JWT expiry)
// ==============================================================================

export const SESSION_COOKIE_NAME = "__session_jcdf";
const SESSION_MAX_AGE = 8 * 60 * 60; // 8 hours in seconds

// ------------------------------------------------------------------------------
// SET SESSION COOKIE — Call after successful login
// ------------------------------------------------------------------------------

/**
 * Create a JWT session token and store it in an HttpOnly cookie.
 * Always call this after verifying credentials — never before.
 *
 * @param payload - Minimized user data (no passwords, no patient data)
 */
export async function setSessionCookie(
  payload: Omit<SessionPayload, "jti" | "iat" | "exp">
): Promise<string> {
  const token = await createSessionToken(payload);
  try {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
  } catch {
    // Graceful fallback when invoked outside a Next.js request store scope
  }
  return token;
}

// ------------------------------------------------------------------------------
// GET SESSION — Read and verify the session cookie
// ------------------------------------------------------------------------------

/**
 * Read the session cookie and verify the JWT.
 * Returns the decoded session payload if valid, or null if:
 *   - Cookie is missing
 *   - Token is expired
 *   - Token signature is invalid
 *   - Payload shape is malformed
 *
 * Safe to call from Server Components, API Routes, and Middleware.
 */
export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) return null;

    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

// ------------------------------------------------------------------------------
// CLEAR SESSION COOKIE — Call on logout
// ------------------------------------------------------------------------------

/**
 * Destroy the session by deleting the HttpOnly cookie.
 * This is the server-side logout action.
 * Always call this from the logout API route, never from client JS.
 */
export async function clearSessionCookie(): Promise<void> {
  try {
    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // Immediately expire
      expires: new Date(0), // Set to epoch — belt and suspenders
    });
  } catch {
    // Graceful fallback when invoked outside a Next.js request store scope
  }
}

// ------------------------------------------------------------------------------
// CHECK IF AUTHENTICATED — Lightweight boolean check
// ------------------------------------------------------------------------------

/**
 * Quick check: is the current request authenticated?
 * Does NOT validate DB status (user.isActive). Use requireAuth() for that.
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null && session.isActive === true;
}
