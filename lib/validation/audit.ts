import { z } from "zod";
import { paginationQuerySchema } from "./common";

// ==============================================================================
// AUDIT LOG QUERY SCHEMA
// ==============================================================================
// Section 16 & 23: Complete audit trail traceability without leaking sensitive values.

export const auditQuerySchema = paginationQuerySchema.extend({
  action: z
    .enum([
      "CREATE",
      "UPDATE",
      "DELETE",
      "PUBLISH",
      "ARCHIVE",
      "LOGIN",
      "LOGOUT",
      "EXPORT",
      "GENERATE_REPORT",
      "SYNC",
    ])
    .optional(),
  module: z.string().trim().optional(),
  userId: z.string().trim().optional(),
  recordId: z.string().trim().optional(),
});

export type AuditQueryInput = z.infer<typeof auditQuerySchema>;
