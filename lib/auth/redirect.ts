// ==============================================================================
// OPEN REDIRECT DEFENSE UTILITY
// ==============================================================================
// Section 88, 89 — Prevents attackers from using callbackUrl param to redirect
// users to external malicious sites after login.
// ==============================================================================

const ALLOWED_INTERNAL_PATHS = ["/admin", "/data-entry", "/"];

/**
 * Validate and return a safe redirect URL.
 * Only allows relative paths starting with "/" that do NOT contain
 * protocol schemes (http:, https:, //) or external hosts.
 *
 * @param url - The raw redirect URL (e.g. from query param)
 * @param defaultUrl - Fallback URL if `url` is invalid
 * @returns A safe, internal redirect path
 */
export function getSafeRedirectUrl(
  url?: string | null,
  defaultUrl: string = "/"
): string {
  if (!url) return defaultUrl;

  // Must be a relative path starting with /
  if (!url.startsWith("/")) return defaultUrl;

  // Block protocol-relative URLs like //evil.com
  if (url.startsWith("//")) return defaultUrl;

  // Block URLs with protocol schemes
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) return defaultUrl;

  // Block URLs with @ (user info attacks: //@evil.com)
  if (url.includes("@")) return defaultUrl;

  // Block null bytes and encoded variants
  if (url.includes("\0") || url.includes("%00")) return defaultUrl;

  return url;
}

/**
 * Get role-based default redirect URL after login.
 * ADMIN → /admin
 * DATA_ENTRY → /data-entry
 */
export function getRoleDefaultRedirect(role: "ADMIN" | "DATA_ENTRY"): string {
  if (role === "ADMIN") return "/admin";
  if (role === "DATA_ENTRY") return "/data-entry";
  return "/";
}

export { ALLOWED_INTERNAL_PATHS };
