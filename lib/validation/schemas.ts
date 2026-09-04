import { z } from "zod";

// ------------------------------------------------------------------------------
// 1. Patient Validation Schema
// ------------------------------------------------------------------------------
export const PatientSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  age: z.number().int().positive().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  contactNumber: z.string().optional(),
  villageOrLocation: z.string().min(2, "Village or location is required"),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
});

// ------------------------------------------------------------------------------
// 2. Trip Validation Schema
// ------------------------------------------------------------------------------
export const TripSchema = z.object({
  ambulanceId: z.string().min(1, "Ambulance selection is required"),
  patientId: z.string().optional(),
  pickupLocation: z.string().min(2, "Pickup location is required"),
  destinationHospital: z.string().min(2, "Destination hospital is required"),
  tripType: z.enum(["EMERGENCY", "MATERNAL", "CRITICAL_TRANSFER", "ROUTINE_AID"]),
  distanceKm: z.number().nonnegative("Distance cannot be negative"),
  status: z.enum(["DISPATCHED", "IN_TRANSIT", "COMPLETED", "CANCELLED"]),
  dispatchTime: z.string(),
  arrivalTime: z.string().optional(),
  notes: z.string().optional(),
  yearPeriod: z.string().min(4, "Year period is required (e.g. 2026)"),
});

// ------------------------------------------------------------------------------
// 3. Expense Validation Schema
// ------------------------------------------------------------------------------
export const ExpenseSchema = z.object({
  date: z.string().min(1, "Date is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  category: z.enum([
    "FUEL",
    "MAINTENANCE",
    "REPAIR",
    "OPERATIONS",
    "MEDICAL_SUPPLIES",
    "AGRICULTURE_SUPPLIES",
    "STAFF_COMPENSATION",
    "OTHER",
  ]),
  description: z.string().min(3, "Description is required"),
  receiptNumber: z.string().optional(),
  yearPeriod: z.string().min(4, "Year period is required"),
  month: z.number().int().min(1).max(12),
});

// ------------------------------------------------------------------------------
// 4. Funding Validation Schema
// ------------------------------------------------------------------------------
export const FundingSchema = z.object({
  date: z.string().min(1, "Date is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  source: z.enum([
    "INDIVIDUAL_DONATION",
    "INSTITUTIONAL_GRANT",
    "COMMUNITY_FUNDRAISER",
    "CORPORATE_SPONSORSHIP",
    "FOUNDATION_ENDOWMENT",
  ]),
  donorNameOrOrg: z.string().min(2, "Donor name or organization is required"),
  targetProjectId: z.string().optional(),
  purposeNote: z.string().min(2, "Purpose is required"),
  referenceNumber: z.string().optional(),
  isPubliclyDisclosed: z.boolean().default(false),
  yearPeriod: z.string().min(4, "Year is required"),
  month: z.number().int().min(1).max(12),
});

// ------------------------------------------------------------------------------
// 5. Year Period Creation Schema
// ------------------------------------------------------------------------------
export const YearPeriodSchema = z.object({
  yearName: z.string().regex(/^\d{4}$/, "Must be a 4-digit year format (e.g. 2027)"),
  startDate: z.string().min(1, "Start date required"),
  endDate: z.string().min(1, "End date required"),
});
