import { NextRequest } from "next/server";
import { exportSiteBackup, importSiteBackup } from "@/lib/services";
import { apiSuccess, handleApiError, apiError } from "@/lib/api";

export async function GET() {
  try {
    const data = await exportSiteBackup();
    return apiSuccess(data, "Database snapshot exported successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return apiError("INVALID_BACKUP_PAYLOAD", "Backup data must be a valid JSON object.", 400);
    }
    const result = await importSiteBackup(body);
    if (!result.success) {
      return apiError("BACKUP_RESTORE_FAILED", "Failed to restore database from provided backup.", 400);
    }
    return apiSuccess(result, "Database restored successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
