import { z } from "zod";

// ==============================================================================
// AUTHENTICATION & CREDENTIALS SCHEMAS
// ==============================================================================
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ==============================================================================
// DONATION FORM VALIDATION SCHEMA
// ==============================================================================
export const donationInputSchema = z.object({
  donorName: z.string().min(2, "Donor name must be at least 2 characters").max(100),
  donorEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  donorPhone: z.string().min(10, "Please provide a valid contact number").max(20),
  amount: z.number().positive("Donation amount must be greater than zero"),
  currency: z.enum(["PKR", "USD"]).default("PKR"),
  category: z.enum([
    "HEALTHCARE",
    "AGRICULTURE",
    "GENERAL",
    "EDUCATION",
    "EMERGENCY_RELIEF",
  ]),
  paymentMethod: z.enum([
    "BANK_TRANSFER",
    "CASH",
    "ONLINE_PORTAL",
    "CHEQUE",
    "OTHER",
  ]),
  referenceNumber: z.string().max(100).optional(),
  isAnonymous: z.boolean().default(false),
  notes: z.string().max(500).optional(),
});

export type DonationInput = z.infer<typeof donationInputSchema>;

// ==============================================================================
// PATIENT INTAKE SCHEMA
// ==============================================================================
export const patientIntakeSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  cnicOrBForm: z
    .string()
    .regex(/^\d{5}-\d{7}-\d{1}$/, "CNIC format must be XXXXX-XXXXXXX-X")
    .optional()
    .or(z.literal("")),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  age: z.number().int().min(0).max(130),
  contactNumber: z.string().min(10, "Phone number is required"),
  emergencyContactName: z.string().max(100).optional(),
  emergencyContactPhone: z.string().max(20).optional(),
  residenceArea: z.string().min(2, "Residence area/village is required").max(150),
  medicalConditionSummary: z.string().min(3, "Condition summary is required").max(500),
});

export type PatientIntakeInput = z.infer<typeof patientIntakeSchema>;

// ==============================================================================
// AMBULANCE TRIP LOG SCHEMA
// ==============================================================================
export const tripLogSchema = z.object({
  ambulanceId: z.string().min(1, "Ambulance selection is required"),
  driverName: z.string().min(2, "Driver name is required"),
  paramedicName: z.string().max(100).optional(),
  patientId: z.string().optional(),
  patientName: z.string().min(2, "Patient name is required"),
  patientPhone: z.string().optional(),
  pickupLocation: z.string().min(2, "Pickup location is required"),
  dropoffHospital: z.string().min(2, "Destination hospital is required"),
  distanceKm: z.number().nonnegative("Distance cannot be negative"),
  startOdometerKm: z.number().positive("Starting odometer reading is required"),
  endOdometerKm: z.number().positive().optional(),
  dispatchTime: z.string().min(1, "Dispatch timestamp is required"),
  urgencyLevel: z.enum(["ROUTINE", "URGENT", "CRITICAL"]),
  notes: z.string().max(500).optional(),
  yearPeriodId: z.string().min(4, "Year period is required"),
});

export type TripLogInput = z.infer<typeof tripLogSchema>;

// ==============================================================================
// EXPENSE VOUCHER SCHEMA
// ==============================================================================
export const expenseSchema = z.object({
  voucherNumber: z.string().min(1, "Voucher number is required"),
  title: z.string().min(3, "Title must be at least 3 characters").max(150),
  category: z.enum([
    "AMBULANCE_FUEL",
    "AMBULANCE_MAINTENANCE",
    "MEDICAL_SUPPLIES",
    "AGRICULTURE_SEEDS_EQUIPMENT",
    "STAFF_STIPENDS",
    "ADMIN_OFFICE",
    "COMMUNITY_OUTREACH",
    "MISCELLANEOUS",
  ]),
  amountPKR: z.number().positive("Expense amount must be positive"),
  paidTo: z.string().min(2, "Payee name is required"),
  description: z.string().min(5, "Description is required").max(500),
  yearPeriodId: z.string().min(4, "Year period is required"),
});

export type ExpenseInput = z.infer<typeof expenseSchema>;
