import { z } from "zod";
import {
  paginationQuerySchema,
  pakistaniPhoneSchema,
  cnicSchema,
} from "./common";

// ==============================================================================
// PATIENT DOMAIN SCHEMAS
// ==============================================================================
// Strictly private health & demographic intake rules per Section 17 & 18.

export const createPatientSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  cnicOrBForm: cnicSchema.optional().or(z.literal("")),
  gender: z.enum(["MALE", "FEMALE", "CHILD", "OTHER"]),
  age: z
    .coerce
    .number()
    .int("Age must be an integer")
    .min(0, "Age cannot be negative")
    .max(130, "Please provide a valid age"),
  contactNumber: pakistaniPhoneSchema,
  emergencyContactName: z.string().trim().max(100).optional().or(z.literal("")),
  emergencyContactPhone: pakistaniPhoneSchema.optional().or(z.literal("")),
  residenceArea: z
    .string()
    .trim()
    .min(2, "Residence area/mohalla is required")
    .max(150),
  village: z.string().trim().max(100).optional().or(z.literal("")),
  unionCouncil: z.string().trim().max(100).optional().or(z.literal("")),
  district: z.string().trim().max(100).default("Rawalpindi"),
  medicalConditionSummary: z
    .string()
    .trim()
    .min(3, "Medical condition summary is required")
    .max(1000, "Summary cannot exceed 1000 characters"),
  yearPeriodId: z.string().min(1, "Year period selection is required"),
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;

export const updatePatientSchema = createPatientSchema.partial().extend({
  isUnderReview: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  reviewNotes: z.string().trim().max(500).optional().or(z.literal("")),
});

export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;

export const patientQuerySchema = paginationQuerySchema.extend({
  gender: z.enum(["MALE", "FEMALE", "CHILD", "OTHER"]).optional(),
  district: z.string().trim().optional(),
  isUnderReview: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
});

export type PatientQueryInput = z.infer<typeof patientQuerySchema>;
