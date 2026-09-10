import { NextRequest } from "next/server";
import { validateQuery, auditQuerySchema } from "@/lib/validation";
import { getAuditLogs } from "@/lib/services";
import { apiPaginated, handleApiError } from "@/lib/api";
import { requirePermission } from "@/lib/auth/server-auth";

// ==============================================================================
// AUDIT LOGS API ROUTE (GET /api/audit-logs)
// ==============================================================================
// Section 16, 19, 23: Complete audit trail traceability. ADMIN only.

export async function GET(req: NextRequest) {
  try {
    await requirePermission("AUDIT_LOGS_VIEW");
    const query = validateQuery(req.nextUrl.searchParams, auditQuerySchema);
    const result = await getAuditLogs(query);
    return apiPaginated(result.logs, result.pagination);
  } catch (error) {
    return handleApiError(error);
  }
}
