import { z } from "zod";
import {
  paginationQuerySchema,
  slugParamSchema,
  pakistaniPhoneSchema,
} from "./common";

// ==============================================================================
// PUBLIC CMS & NEWS SCHEMAS
// ==============================================================================
// Public-facing news, stories, and press releases per Section 15.

export const createNewsSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(150),
  slug: slugParamSchema.shape.slug,
  excerpt: z
    .string()
    .trim()
    .min(10, "Excerpt must be at least 10 characters")
    .max(500),
  content: z
    .string()
    .trim()
    .min(20, "Content must be at least 20 characters")
    .max(20000),
  category: z.enum([
    "PRESS_RELEASE",
    "COMMUNITY_STORY",
    "FIELD_REPORT",
    "ANNOUNCEMENT",
    "IMPACT_UPDATE",
  ]),
  coverImageUrl: z.string().optional().or(z.literal("")),
  authorName: z.string().trim().min(2).max(100).default("JCDF Media Team"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  publishedAt: z.string().optional().or(z.literal("")),
});

export type CreateNewsInput = z.infer<typeof createNewsSchema>;
export const updateNewsSchema = createNewsSchema.partial();
export type UpdateNewsInput = z.infer<typeof updateNewsSchema>;

export const newsQuerySchema = paginationQuerySchema.extend({
  category: z
    .enum([
      "PRESS_RELEASE",
      "COMMUNITY_STORY",
      "FIELD_REPORT",
      "ANNOUNCEMENT",
      "IMPACT_UPDATE",
    ])
    .optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
});

export type NewsQueryInput = z.infer<typeof newsQuerySchema>;

// ==============================================================================
// OPERATIONAL LOCATION SCHEMAS
// ==============================================================================

export const createLocationSchema = z.object({
  name: z.string().trim().min(2, "Location name is required").max(100),
  type: z.enum([
    "HEAD_OFFICE",
    "AMBULANCE_DISPATCH_STATION",
    "COMMUNITY_CENTER",
    "MEDICAL_CAMP",
    "PARTNER_HOSPITAL",
  ]),
  district: z.string().trim().min(2, "District is required").max(100),
  address: z.string().trim().min(5, "Full address is required").max(250),
  latitude: z.coerce.number().min(-90).max(90).optional(),
  longitude: z.coerce.number().min(-180).max(180).optional(),
  contactNumber: pakistaniPhoneSchema.optional().or(z.literal("")),
  isPubliclyVisible: z.boolean().default(true),
});

export type CreateLocationInput = z.infer<typeof createLocationSchema>;
export const updateLocationSchema = createLocationSchema.partial();
export type UpdateLocationInput = z.infer<typeof updateLocationSchema>;
