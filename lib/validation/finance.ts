import { z } from "zod";
import {
  paginationQuerySchema,
  positiveDecimalSchema,
  pakistaniPhoneSchema,
} from "./common";

// ==============================================================================
// EXPENSE VOUCHER SCHEMAS
// ==============================================================================
// All financial amounts strictly use positive decimal validation per Section 20 & 48.

export const createExpenseSchema = z.object({
  voucherNumber: z
    .string()
    .trim()
    .min(1, "Voucher number is required")
    .max(50),
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(150),
  category: z.enum([
    "AMBULANCE_FUEL",
    "AMBULANCE_MAINTENANCE",
    "AMBULANCE_REPAIR",
    "MEDICAL_SUPPLIES",
    "AGRICULTURE_SEEDS_EQUIPMENT",
    "STAFF_STIPENDS",
    "ADMIN_OFFICE",
    "COMMUNITY_OUTREACH",
    "OPERATIONAL_LOGISTICS",
    "MISCELLANEOUS",
  ]),
  amountPKR: positiveDecimalSchema,
  paidTo: z.string().trim().min(2, "Payee name is required").max(150),
  paymentMethod: z
    .enum(["CASH", "BANK_TRANSFER", "CHEQUE", "ONLINE", "OTHER"])
    .default("CASH"),
  expenseDate: z.string().min(1, "Expense date is required"),
  description: z
    .string()
    .trim()
    .min(5, "Description must be at least 5 characters")
    .max(1000),
  receiptDocumentUrl: z.string().url().optional().or(z.literal("")),
  approvedBy: z.string().trim().max(100).optional().or(z.literal("")),
  yearPeriodId: z.string().min(1, "Year period selection is required"),
});

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export const updateExpenseSchema = createExpenseSchema.partial();
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;

export const expenseQuerySchema = paginationQuerySchema.extend({
  category: z
    .enum([
      "AMBULANCE_FUEL",
      "AMBULANCE_MAINTENANCE",
      "AMBULANCE_REPAIR",
      "MEDICAL_SUPPLIES",
      "AGRICULTURE_SEEDS_EQUIPMENT",
      "STAFF_STIPENDS",
      "ADMIN_OFFICE",
      "COMMUNITY_OUTREACH",
      "OPERATIONAL_LOGISTICS",
      "MISCELLANEOUS",
    ])
    .optional(),
  paymentMethod: z.enum(["CASH", "BANK_TRANSFER", "CHEQUE", "ONLINE", "OTHER"]).optional(),
  minAmount: z.coerce.number().positive().optional(),
  maxAmount: z.coerce.number().positive().optional(),
});

export type ExpenseQueryInput = z.infer<typeof expenseQuerySchema>;

// ==============================================================================
// FUNDING & DONATION SCHEMAS
// ==============================================================================

export const createFundingSchema = z.object({
  donorName: z
    .string()
    .trim()
    .min(2, "Donor name must be at least 2 characters")
    .max(150),
  donorContact: pakistaniPhoneSchema.optional().or(z.literal("")),
  donorEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  fundingSource: z.enum([
    "INDIVIDUAL_DONATION",
    "COMMUNITY_POOL",
    "CORPORATE_CSR",
    "GOVERNMENT_GRANT",
    "INTERNATIONAL_AID",
    "FOUNDATION_RESERVE",
    "OTHER",
  ]),
  amountPKR: positiveDecimalSchema,
  projectId: z.string().trim().optional().or(z.literal("")),
  purpose: z.string().trim().max(300).optional().or(z.literal("")),
  paymentMethod: z
    .enum(["BANK_TRANSFER", "CASH", "ONLINE_PORTAL", "CHEQUE", "OTHER"])
    .default("BANK_TRANSFER"),
  transactionReference: z.string().trim().max(100).optional().or(z.literal("")),
  receiptNumber: z.string().trim().max(100).optional().or(z.literal("")),
  receivedDate: z.string().min(1, "Received date is required"),
  isAnonymous: z.boolean().default(false),
  yearPeriodId: z.string().min(1, "Year period is required"),
});

export type CreateFundingInput = z.infer<typeof createFundingSchema>;
export const updateFundingSchema = createFundingSchema.partial();
export type UpdateFundingInput = z.infer<typeof updateFundingSchema>;

export const fundingQuerySchema = paginationQuerySchema.extend({
  fundingSource: z
    .enum([
      "INDIVIDUAL_DONATION",
      "COMMUNITY_POOL",
      "CORPORATE_CSR",
      "GOVERNMENT_GRANT",
      "INTERNATIONAL_AID",
      "FOUNDATION_RESERVE",
      "OTHER",
    ])
    .optional(),
  projectId: z.string().trim().optional(),
  minAmount: z.coerce.number().positive().optional(),
  maxAmount: z.coerce.number().positive().optional(),
});

export type FundingQueryInput = z.infer<typeof fundingQuerySchema>;
