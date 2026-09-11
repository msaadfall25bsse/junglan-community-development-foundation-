import { getSession } from "@/lib/auth/cookies";
import { hasPermission, canAccessRoute } from "@/lib/auth/rbac";
import { prisma } from "@/lib/prisma";
import { readStore } from "@/lib/db";
import { tryPrismaOrFallback } from "@/lib/services/db-helper";
import type { UserProfile, UserRole, Permission } from "@/types/auth";

// ==============================================================================
// SERVER-SIDE AUTHORIZATION HELPERS
// ==============================================================================
// Sections 6, 7, 8, 18–24, 26, 51–55, 68–70, 72
//
// Usage in Server Components / API Routes:
//   const user = await getCurrentUser();       // null if not logged in
//   const user = await requireAuth();          // throws 401 if not logged in
//   const user = await requireRole(["ADMIN"]); // throws 403 if wrong role
//   const user = await requireAdmin();         // throws 403 if not ADMIN
//   const user = await requireDataEntry();     // throws 403 if not DATA_ENTRY
// ==============================================================================

import { UnauthorizedError, ForbiddenError } from "@/lib/api/errors";

// ------------------------------------------------------------------------------
// Auth Errors (Mapped with Global API Error Hierarchy)
// ------------------------------------------------------------------------------
export class AuthenticationError extends UnauthorizedError {
  status = 401;
  constructor(message = "Authentication required. Please log in.") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends ForbiddenError {
  status = 403;
  constructor(message = "You do not have permission to access this resource.") {
    super(message);
    this.name = "AuthorizationError";
  }
}

// ------------------------------------------------------------------------------
// 1. GET CURRENT USER — null-safe, no throws
// ------------------------------------------------------------------------------

/**
 * Get the currently authenticated user from session + DB validation.
 * Returns null if:
 *   - No session cookie
 *   - Token is expired/invalid
 *   - User not found in DB
 *   - User account is disabled (isActive = false)
 *
 * Safe to call from Server Components and API routes.
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
  try {
    const session = await getSession();
    if (!session) return null;

    // Always validate against DB or persistent store fallback
    const user = await tryPrismaOrFallback(
      () =>
        prisma.user.findUnique({
          where: { id: session.sub },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            lastLoginAt: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
      () => {
        const store = readStore();
        const found = store.users?.find((u) => u.id === session.sub);
        if (!found) return null;
        return {
          id: found.id,
          name: found.name,
          email: found.email,
          role: found.role,
          isActive: found.isActive,
          lastLoginAt: found.lastLoginAt ? new Date(found.lastLoginAt) : null,
          createdAt: new Date(found.createdAt),
          updatedAt: new Date(found.updatedAt),
        };
      }
    );

    if (!user) return null;
    if (!user.isActive) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt?.toISOString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  } catch {
    return null;
  }
}

// ------------------------------------------------------------------------------
// 2. REQUIRE AUTH — throws 401 if not authenticated
// ------------------------------------------------------------------------------

/**
 * Require an authenticated, active user session.
 * Throws AuthenticationError (401) if not logged in or account disabled.
 */
export async function requireAuth(): Promise<UserProfile> {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  return user;
}

// ------------------------------------------------------------------------------
// 3. REQUIRE ROLE — throws 403 if user doesn't have allowed role
// ------------------------------------------------------------------------------

/**
 * Require the current user to have one of the specified roles.
 * Throws AuthenticationError (401) if not logged in.
 * Throws AuthorizationError (403) if logged in but wrong role.
 *
 * @param allowedRoles - Array of roles that are permitted
 */
export async function requireRole(
  allowedRoles: UserRole[]
): Promise<UserProfile> {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    throw new AuthorizationError(
      `Access denied. Required role: ${allowedRoles.join(" or ")}.`
    );
  }
  return user;
}

// ------------------------------------------------------------------------------
// 4. REQUIRE PERMISSION — throws 403 if user doesn't have permission
// ------------------------------------------------------------------------------

/**
 * Require the current user to have a specific permission.
 * Uses the RBAC matrix in lib/auth/rbac.ts.
 */
export async function requirePermission(
  permission: Permission
): Promise<UserProfile> {
  const user = await requireAuth();
  if (!hasPermission(user.role, permission)) {
    throw new AuthorizationError(
      `Access denied. Missing permission: ${permission}.`
    );
  }
  return user;
}

// ------------------------------------------------------------------------------
// 5. ROLE SHORTCUTS
// ------------------------------------------------------------------------------

/** Require ADMIN role. Throws 403 for DATA_ENTRY users. */
export async function requireAdmin(): Promise<UserProfile> {
  return requireRole(["ADMIN"]);
}

/** Require DATA_ENTRY or ADMIN role (both can access data-entry routes). */
export async function requireDataEntry(): Promise<UserProfile> {
  return requireRole(["ADMIN", "DATA_ENTRY"]);
}

// ------------------------------------------------------------------------------
// 6. ROUTE ACCESS CHECK (for middleware / server-side logic)
// ------------------------------------------------------------------------------

/**
 * Check if the current user can access a given route pathname.
 * Returns false if not authenticated or role doesn't permit access.
 */
export async function canCurrentUserAccessRoute(
  pathname: string
): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  return canAccessRoute(user.role, pathname);
}

// ------------------------------------------------------------------------------
// 7. API ERROR RESPONSE HELPERS
// ------------------------------------------------------------------------------

/**
 * Convert an auth error to a standard JSON response for API routes.
 */
export function authErrorResponse(
  error: AuthenticationError | AuthorizationError | unknown
): Response {
  if (error instanceof AuthenticationError) {
    return Response.json(
      { success: false, error: error.message },
      { status: 401 }
    );
  }
  if (error instanceof AuthorizationError) {
    return Response.json(
      { success: false, error: error.message },
      { status: 403 }
    );
  }
  return Response.json(
    { success: false, error: "Internal server error" },
    { status: 500 }
  );
}
