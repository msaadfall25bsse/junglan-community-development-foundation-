// ==============================================================================
// 4. FINANCIAL, EXPENSE, FUNDING & AUDIT DOMAIN TYPES
// ==============================================================================

export type ExpenseCategory =
  | "FUEL"
  | "MAINTENANCE"
  | "REPAIR"
  | "OPERATIONS"
  | "MEDICAL_SUPPLIES"
  | "AGRICULTURE_SUPPLIES"
  | "STAFF_COMPENSATION"
  | "OTHER";

export type FundingSource =
  | "INDIVIDUAL_DONATION"
  | "INSTITUTIONAL_GRANT"
  | "COMMUNITY_FUNDRAISER"
  | "CORPORATE_SPONSORSHIP"
  | "FOUNDATION_ENDOWMENT";

export interface ExpenseRecord {
  id: string;
  date: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  receiptNumber?: string;
  receiptDocUrl?: string;
  yearPeriod: string; // e.g. "2026"
  month: number; // 1-12
  recordedByUserId: string;
  createdAt: string;
  updatedAt: string;
}

export interface FundingRecord {
  id: string;
  date: string;
  amount: number;
  source: FundingSource;
  donorNameOrOrg: string;
  targetProjectId?: string;
  purposeNote: string;
  referenceNumber?: string;
  documentUrl?: string;
  isPubliclyDisclosed: boolean;
  yearPeriod: string;
  month: number;
  recordedByUserId: string;
  createdAt: string;
  updatedAt: string;
}

export interface YearPeriod {
  id: string;
  yearName: string; // e.g. "2026"
  status: "ACTIVE" | "HISTORICAL" | "PLANNED";
  startDate: string;
  endDate: string;
  googleDriveFolderId?: string;
  googleSpreadsheetId?: string;
  totalTrips?: number;
  totalExpenses?: number;
  totalFunding?: number;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: "CREATE" | "UPDATE" | "DELETE" | "PUBLISH" | "GENERATE_REPORT" | "YEAR_CHANGE";
  module: "PATIENTS" | "TRIPS" | "AMBULANCE" | "EXPENSES" | "FUNDING" | "CMS" | "YEARS" | "AI";
  recordId?: string;
  details: string;
  ipAddress?: string;
  timestamp: string;
}
