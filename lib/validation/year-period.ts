import { z } from "zod";
import { paginationQuerySchema } from "./common";

// ==============================================================================
// YEAR PERIOD & HISTORICAL ARCHIVE SCHEMAS
// ==============================================================================
// Section 14: Single-active year rule and historical audit protection.

export const createYearPeriodSchema = z.object({
  year: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "Year must be a 4-digit year (e.g., 2026)"),
  label: z
    .string()
    .trim()
    .min(2, "Label is required (e.g., 'Operational Year 2026')")
    .max(100),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  isActive: z.boolean().default(false),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

export type CreateYearPeriodInput = z.infer<typeof createYearPeriodSchema>;

export const updateYearPeriodSchema = z.object({
  label: z.string().trim().min(2).max(100).optional(),
  status: z.enum(["ACTIVE", "CLOSED", "ARCHIVED"]).optional(),
  isActive: z.boolean().optional(),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

export type UpdateYearPeriodInput = z.infer<typeof updateYearPeriodSchema>;

export const yearPeriodQuerySchema = paginationQuerySchema.extend({
  status: z.enum(["ACTIVE", "CLOSED", "ARCHIVED"]).optional(),
  isActive: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
});
