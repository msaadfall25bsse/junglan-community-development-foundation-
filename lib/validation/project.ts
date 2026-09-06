import { z } from "zod";
import {
  paginationQuerySchema,
  positiveDecimalSchema,
  nonNegativeDecimalSchema,
  slugParamSchema,
} from "./common";

// ==============================================================================
// COMMUNITY PROJECT SCHEMAS
// ==============================================================================
// Multi-sector project tracking per Section 12 & 13.

export const createProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(150),
  slug: slugParamSchema.shape.slug,
  sector: z.enum(["HEALTHCARE", "AGRICULTURE", "COMMUNITY_DEVELOPMENT"]),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(3000),
  objectives: z
    .array(z.string().trim().min(3))
    .min(1, "At least one project objective is required"),
  targetFundingPKR: positiveDecimalSchema,
  currentFundingPKR: nonNegativeDecimalSchema.default(0),
  startDate: z.string().min(1, "Start date is required"),
  expectedEndDate: z.string().optional().or(z.literal("")),
  location: z.string().trim().min(2, "Location is required").max(150),
  beneficiariesEstimate: z
    .coerce
    .number()
    .int()
    .nonnegative()
    .default(0),
  status: z
    .enum(["PLANNED", "ACTIVE", "COMPLETED", "SUSPENDED"])
    .default("PLANNED"),
  coverImageUrl: z.string().optional().or(z.literal("")),
  yearPeriodId: z.string().min(1, "Year period selection is required"),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export const updateProjectSchema = createProjectSchema.partial();
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

export const projectQuerySchema = paginationQuerySchema.extend({
  sector: z.enum(["HEALTHCARE", "AGRICULTURE", "COMMUNITY_DEVELOPMENT"]).optional(),
  status: z.enum(["PLANNED", "ACTIVE", "COMPLETED", "SUSPENDED"]).optional(),
});

export type ProjectQueryInput = z.infer<typeof projectQuerySchema>;

// ==============================================================================
// PROJECT UPDATE / MILESTONE SCHEMAS
// ==============================================================================

export const createProjectUpdateSchema = z.object({
  projectId: z.string().min(1, "Project selection is required"),
  title: z
    .string()
    .trim()
    .min(3, "Update title must be at least 3 characters")
    .max(150),
  content: z
    .string()
    .trim()
    .min(10, "Content must be at least 10 characters")
    .max(5000),
  milestoneReached: z.string().trim().max(150).optional().or(z.literal("")),
  images: z.array(z.string()).optional().default([]),
  updateDate: z.string().min(1, "Update date is required"),
});

export type CreateProjectUpdateInput = z.infer<typeof createProjectUpdateSchema>;
