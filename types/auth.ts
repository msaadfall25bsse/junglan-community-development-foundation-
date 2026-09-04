// ==============================================================================
// 1. AUTHENTICATION & RBAC DOMAIN TYPES
// ==============================================================================

export type UserRole = "ADMIN" | "DATA_ENTRY";

export type Permission =
  // User & System Management (Admin Only)
  | "USERS_MANAGE"
  | "ROLES_MANAGE"
  | "SYSTEM_SETTINGS"
  | "AUDIT_LOGS_VIEW"
  
  // CMS & Public Website (Admin Only)
  | "CMS_MANAGE"
  | "PROJECTS_MANAGE"
  | "NEWS_MANAGE"
  | "LOCATIONS_MANAGE"
  
  // Operational Features (Admin + Data Entry)
  | "PATIENTS_READ"
  | "PATIENTS_WRITE"
  | "TRIPS_READ"
  | "TRIPS_WRITE"
  | "AMBULANCE_READ"
  | "AMBULANCE_WRITE"
  | "MAINTENANCE_READ"
  | "MAINTENANCE_WRITE"
  | "FUEL_READ"
  | "FUEL_WRITE"
  | "EXPENSES_READ"
  | "EXPENSES_WRITE"
  | "FUNDING_READ"
  | "FUNDING_WRITE"
  
  // Year & Records
  | "YEAR_CREATE"
  | "YEAR_READ"
  
  // Google & Reports
  | "GOOGLE_INTEGRATIONS_MANAGE"
  | "REPORTS_VIEW"
  | "REPORTS_GENERATE"
  
  // AI System (Strictly Protected)
  | "AI_ANALYTICS"
  | "AI_REPORT_GENERATION";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
}
