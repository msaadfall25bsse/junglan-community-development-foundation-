import { NextRequest } from "next/server";
import { validateQuery, auditQuerySchema } from "@/lib/validation";
import { getAuditLogs } from "@/lib/services";
import { apiPaginated, handleApiError } from "@/lib/api";

// ==============================================================================
// AUDIT LOGS API ROUTE (GET /api/audit-logs)
// ==============================================================================
// Section 16 & 23: Complete audit trail traceability without leaking sensitive values.

export async function GET(req: NextRequest) {
  try {
    const query = validateQuery(req.nextUrl.searchParams, auditQuerySchema);
    const result = await getAuditLogs(query);
    return apiPaginated(result.logs, result.pagination);
  } catch (error) {
    return handleApiError(error);
  }
}
