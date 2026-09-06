import { z } from "zod";

// ==============================================================================
// AUTHENTICATION & ACCESS SCHEMAS
// ==============================================================================
// RBAC: strictly ADMIN and DATA_ENTRY roles per Sections 9, 10, 11.

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const userRegistrationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  role: z.enum(["ADMIN", "DATA_ENTRY"]).default("DATA_ENTRY"),
  isActive: z.boolean().default(true),
});

export type UserRegistrationInput = z.infer<typeof userRegistrationSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
