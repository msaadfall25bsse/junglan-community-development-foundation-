import { UserRole, Permission } from "@/types/auth";

// ==============================================================================
// STRICT ROLE-BASED ACCESS CONTROL (RBAC) MATRIX
// ==============================================================================
// Note: Per Section 7 of project spec, only exactly two operational roles exist:
// ADMIN and DATA_ENTRY. Do not invent extra roles.

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  ADMIN: [
    "USERS_MANAGE",
    "ROLES_MANAGE",
    "SYSTEM_SETTINGS",
    "AUDIT_LOGS_VIEW",
    "CMS_MANAGE",
    "PROJECTS_MANAGE",
    "NEWS_MANAGE",
    "LOCATIONS_MANAGE",
    "PATIENTS_READ",
    "PATIENTS_WRITE",
    "TRIPS_READ",
    "TRIPS_WRITE",
    "AMBULANCE_READ",
    "AMBULANCE_WRITE",
    "MAINTENANCE_READ",
    "MAINTENANCE_WRITE",
    "FUEL_READ",
    "FUEL_WRITE",
    "EXPENSES_READ",
    "EXPENSES_WRITE",
    "FUNDING_READ",
    "FUNDING_WRITE",
    "DONATIONS_READ",
    "DONATIONS_WRITE",
    "YEAR_CREATE",
    "YEAR_READ",
    "REPORTS_VIEW",
    "REPORTS_GENERATE",
  ],
  DATA_ENTRY: [
    "PATIENTS_READ",
    "PATIENTS_WRITE",
    "TRIPS_READ",
    "TRIPS_WRITE",
    "AMBULANCE_READ",
    "MAINTENANCE_READ",
    "MAINTENANCE_WRITE",
    "FUEL_READ",
    "FUEL_WRITE",
    "EXPENSES_READ",
    "EXPENSES_WRITE",
    "FUNDING_READ",
    "DONATIONS_READ",
    "DONATIONS_WRITE",
    "YEAR_READ",
    "REPORTS_VIEW",
  ],
};

/**
 * Server-side check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions ? permissions.includes(permission) : false;
}

/**
 * Enforce route boundary access between ADMIN and DATA_ENTRY
 */
export function canAccessRoute(role: UserRole, pathname: string): boolean {
  if (role === "ADMIN") {
    // Admin has access to both administration and data entry workspaces
    return true;
  }

  if (role === "DATA_ENTRY") {
    // Data Entry users are strictly prohibited from admin settings and user management
    if (pathname.startsWith("/admin")) {
      return false;
    }
    if (pathname.startsWith("/data-entry")) {
      return true;
    }
  }

  return false;
}
