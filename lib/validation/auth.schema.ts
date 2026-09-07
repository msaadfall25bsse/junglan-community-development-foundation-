import { z } from "zod";

// ==============================================================================
// AUTHENTICATION VALIDATION SCHEMAS (auth.schema.ts)
// ==============================================================================
// Sections 5, 48, 49, 50 — Server-side Zod v4 validation for all auth operations.
// Email is always normalized (lowercase + trim) before DB access.
// Password policy: min 8 chars, uppercase, lowercase, number.
// Note: Zod v4 uses { error: "..." } instead of { required_error: "..." }
// ==============================================================================

// ------------------------------------------------------------------------------
// 1. LOGIN SCHEMA
// ------------------------------------------------------------------------------
export const LoginInputSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),
  password: z
    .string({ error: "Password is required" })
    .min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof LoginInputSchema>;

// ------------------------------------------------------------------------------
// 2. PASSWORD POLICY SCHEMA (reusable)
// ------------------------------------------------------------------------------
export const PasswordPolicySchema = z
  .string({ error: "Password is required" })
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

// ------------------------------------------------------------------------------
// 3. USER CREATE SCHEMA (Admin creates a new user)
// ------------------------------------------------------------------------------
export const UserCreateInputSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),
  password: PasswordPolicySchema,
  name: z
    .string({ error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  role: z.enum(["ADMIN", "DATA_ENTRY"]).default("DATA_ENTRY"),
  isActive: z.boolean().default(true),
});

export type UserCreateInput = z.infer<typeof UserCreateInputSchema>;

// ------------------------------------------------------------------------------
// 4. USER UPDATE SCHEMA (Admin updates a user — all fields optional)
// ------------------------------------------------------------------------------
export const UserUpdateInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .optional(),
  role: z.enum(["ADMIN", "DATA_ENTRY"]).optional(),
  isActive: z.boolean().optional(),
});

export type UserUpdateInput = z.infer<typeof UserUpdateInputSchema>;

// ------------------------------------------------------------------------------
// 5. CHANGE PASSWORD SCHEMA
// ------------------------------------------------------------------------------
export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: PasswordPolicySchema,
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;

// ------------------------------------------------------------------------------
// 6. SESSION PAYLOAD SCHEMA (for decoding jose JWT payloads)
// ------------------------------------------------------------------------------
export const SessionPayloadSchema = z.object({
  sub: z.string(),        // userId
  email: z.string(),
  name: z.string(),
  role: z.enum(["ADMIN", "DATA_ENTRY"]),
  isActive: z.boolean(),
  jti: z.string(),        // JWT ID — unique per session (fixation defense)
  iat: z.number().optional(),
  exp: z.number().optional(),
});

export type SessionPayload = z.infer<typeof SessionPayloadSchema>;
