// ==============================================================================
// AUTHENTICATION & AUTHORIZATION DOMAIN TYPES
// ==============================================================================
// Strict operational roles for Junglan Community Development Foundation.
// Do NOT add additional roles (Manager, Accountant, Driver, etc.) per project spec.

export type UserRole = "ADMIN" | "DATA_ENTRY";

export type Permission =
  // System & Management
  | "USERS_MANAGE"
  | "ROLES_MANAGE"
  | "SYSTEM_SETTINGS"
  | "AUDIT_LOGS_VIEW"
  // Content & CMS
  | "CMS_MANAGE"
  | "PROJECTS_MANAGE"
  | "NEWS_MANAGE"
  | "LOCATIONS_MANAGE"
  // Patient & Operational Records
  | "PATIENTS_READ"
  | "PATIENTS_WRITE"
  | "TRIPS_READ"
  | "TRIPS_WRITE"
  | "AMBULANCE_READ"
  | "AMBULANCE_WRITE"
  // Fleet Maintenance & Fuel
  | "MAINTENANCE_READ"
  | "MAINTENANCE_WRITE"
  | "FUEL_READ"
  | "FUEL_WRITE"
  // Financial Operations
  | "EXPENSES_READ"
  | "EXPENSES_WRITE"
  | "FUNDING_READ"
  | "FUNDING_WRITE"
  | "DONATIONS_READ"
  | "DONATIONS_WRITE"
  // Year Periods & Reports
  | "YEAR_CREATE"
  | "YEAR_READ"
  | "REPORTS_VIEW"
  | "REPORTS_GENERATE";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    permissions: Permission[];
  };
  expires: string;
}
