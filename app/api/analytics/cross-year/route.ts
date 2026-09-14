import { NextRequest } from "next/server";
import { getCrossYearComparativeAnalytics } from "@/lib/services";
import { apiSuccess, handleApiError } from "@/lib/api";
import { requirePermission } from "@/lib/auth/server-auth";

export async function GET(_req: NextRequest) {
  try {
    await requirePermission("REPORTS_VIEW");
    const analytics = await getCrossYearComparativeAnalytics();
    return apiSuccess(analytics);
  } catch (error) {
    return handleApiError(error);
  }
}
