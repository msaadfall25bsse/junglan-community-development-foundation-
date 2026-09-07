import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth/session";
import { SESSION_COOKIE_NAME } from "@/lib/auth/cookies";
import { canAccessRoute } from "@/lib/auth/rbac";
import { getSafeRedirectUrl } from "@/lib/auth/redirect";

// ==============================================================================
// NEXT.JS EDGE MIDDLEWARE — Route Protection
// ==============================================================================
// Sections 117–121 — Guards private routes and redirects unauthorized users.
//
// Route Matrix:
//   /admin/*     — ADMIN only
//   /data-entry/* — ADMIN + DATA_ENTRY
//   /login       — Redirect to role home if already logged in
//   Public routes (/about, /projects, /donate, etc.) — Always accessible
// ==============================================================================

// Routes that require authentication
const PROTECTED_ROUTE_PATTERNS = [
  /^\/admin(\/.*)?$/,
  /^\/data-entry(\/.*)?$/,
];

// Routes that should redirect logged-in users away
const AUTH_ROUTES = ["/login"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ---- 1. Get session from cookie ----
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;
  const isAuthenticated = session !== null && session.isActive === true;

  // ---- 2. If accessing /login while already logged in → redirect to role home ----
  if (AUTH_ROUTES.includes(pathname)) {
    if (isAuthenticated) {
      const roleHome = session.role === "ADMIN" ? "/admin" : "/data-entry";
      return NextResponse.redirect(new URL(roleHome, req.url));
    }
    return NextResponse.next();
  }

  // ---- 3. Check if route requires protection ----
  const isProtectedRoute = PROTECTED_ROUTE_PATTERNS.some((pattern) =>
    pattern.test(pathname)
  );

  if (!isProtectedRoute) {
    // Public route — allow through
    return NextResponse.next();
  }

  // ---- 4. Not authenticated → redirect to /login ----
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", req.url);
    const callbackUrl = getSafeRedirectUrl(pathname);
    if (callbackUrl && callbackUrl !== "/") {
      loginUrl.searchParams.set("callbackUrl", callbackUrl);
    }
    return NextResponse.redirect(loginUrl);
  }

  // ---- 5. Authenticated but wrong role → redirect to /unauthorized ----
  if (!canAccessRoute(session.role as "ADMIN" | "DATA_ENTRY", pathname)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // ---- 6. All checks passed — allow request ----
  return NextResponse.next();
}

// Middleware runs only on these path patterns
export const config = {
  matcher: [
    "/admin/:path*",
    "/data-entry/:path*",
    "/login",
  ],
};
