// ==============================================================================
// FINANCE, DONATIONS & FISCAL YEAR TYPES
// ==============================================================================

export type DonationCategory = "HEALTHCARE" | "AGRICULTURE" | "GENERAL" | "EDUCATION" | "EMERGENCY_RELIEF";

export type PaymentMethod = "BANK_TRANSFER" | "CASH" | "ONLINE_PORTAL" | "CHEQUE" | "OTHER";

export type DonationStatus = "PENDING_VERIFICATION" | "CONFIRMED" | "CANCELLED";

export interface DonationRecord {
  id: string; // e.g. "DON-2026-000001"
  donorName: string;
  donorEmail?: string;
  donorPhone: string;
  amount: number;
  currency: "PKR" | "USD";
  category: DonationCategory;
  paymentMethod: PaymentMethod;
  referenceNumber?: string; // Bank transaction ID / receipt number
  status: DonationStatus;
  isAnonymous: boolean;
  notes?: string;
  yearPeriodId: string; // e.g. "2026"
  createdAt: string;
  verifiedAt?: string;
}

export type ExpenseCategory =
  | "AMBULANCE_FUEL"
  | "AMBULANCE_MAINTENANCE"
  | "MEDICAL_SUPPLIES"
  | "AGRICULTURE_SEEDS_EQUIPMENT"
  | "STAFF_STIPENDS"
  | "ADMIN_OFFICE"
  | "COMMUNITY_OUTREACH"
  | "MISCELLANEOUS";

export interface ExpenseRecord {
  id: string; // e.g. "EXP-2026-000001"
  voucherNumber: string;
  title: string;
  category: ExpenseCategory;
  amountPKR: number;
  paidTo: string;
  description: string;
  receiptAttachmentUrl?: string;
  status: "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "REJECTED";
  approvedByUserId?: string;
  loggedByUserId: string;
  yearPeriodId: string;
  createdAt: string;
}

export interface YearPeriod {
  id: string; // e.g. "2026"
  label: string; // e.g. "Fiscal Year 2026"
  startDate: string;
  endDate: string;
  isCurrentActive: boolean;
  isArchived: boolean;
  createdAt: string;
}
