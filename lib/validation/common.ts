import { z } from "zod";

// ==============================================================================
// COMMON VALIDATION SCHEMAS & UTILITIES
// ==============================================================================

/**
 * Standard Pagination & Filter Query Schema
 */
export const paginationQuerySchema = z.object({
  page: z
    .coerce
    .number()
    .int("Page must be an integer")
    .min(1, "Page must be at least 1")
    .default(1),
  limit: z
    .coerce
    .number()
    .int("Limit must be an integer")
    .min(1, "Limit must be at least 1")
    .max(100, "Maximum limit per page is 100")
    .default(20),
  search: z.string().trim().optional(),
  sortBy: z.string().trim().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  dateFrom: z.string().datetime({ offset: true }).optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
  dateTo: z.string().datetime({ offset: true }).optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
  yearPeriodId: z.string().trim().optional(),
});

export type PaginationQueryInput = z.infer<typeof paginationQuerySchema>;

/**
 * ID & Slug parameter schemas
 */
export const idParamSchema = z.object({
  id: z.string().min(1, "Resource identifier is required"),
});

export const slugParamSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens"),
});

/**
 * Positive Decimal Validator (Financial Amounts)
 * Accepts either number or string, ensures positive value and max 2 decimal places
 */
export const positiveDecimalSchema = z
  .union([z.number(), z.string()])
  .refine(
    (val) => {
      const num = typeof val === "number" ? val : parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    { message: "Amount must be a positive number greater than zero" }
  )
  .transform((val) => (typeof val === "number" ? val : parseFloat(val)));

/**
 * Non-Negative Decimal Validator (e.g. costs that may legitimately be 0)
 */
export const nonNegativeDecimalSchema = z
  .union([z.number(), z.string()])
  .refine(
    (val) => {
      const num = typeof val === "number" ? val : parseFloat(val);
      return !isNaN(num) && num >= 0;
    },
    { message: "Amount cannot be negative" }
  )
  .transform((val) => (typeof val === "number" ? val : parseFloat(val)));

/**
 * Pakistani Phone Number Validator
 * Validates formats like +923001234567, 03001234567, 0300-1234567, +92 300 1234567
 */
export const pakistaniPhoneSchema = z
  .string()
  .trim()
  .regex(
    /^(?:\+92|0092|0)?(?:3\d{2}|[1-9]\d{1})[-. ]?\d{7}$/,
    "Please provide a valid Pakistani contact number (e.g., 03001234567 or +923001234567)"
  );

/**
 * Pakistani CNIC / B-Form Validator (XXXXX-XXXXXXX-X)
 */
export const cnicSchema = z
  .string()
  .trim()
  .regex(/^\d{5}-\d{7}-\d{1}$/, "CNIC format must be XXXXX-XXXXXXX-X");
