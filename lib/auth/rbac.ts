import { UserRole, Permission } from "@/types/auth";

// Role-to-Permissions Mapping
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
    "YEAR_CREATE",
    "YEAR_READ",
    "GOOGLE_INTEGRATIONS_MANAGE",
    "REPORTS_VIEW",
    "REPORTS_GENERATE",
    "AI_ANALYTICS",
    "AI_REPORT_GENERATION",
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
 * Check if a path can be accessed by the given role
 */
export function canAccessRoute(role: UserRole, pathname: string): boolean {
  if (role === "ADMIN") return true;

  // Data Entry restrictions: Cannot access CMS, user management, system settings, or unrestricted admin
  if (role === "DATA_ENTRY") {
    if (pathname.startsWith("/admin")) return false;
    if (pathname.startsWith("/data-entry")) return true;
  }

  return false;
}
