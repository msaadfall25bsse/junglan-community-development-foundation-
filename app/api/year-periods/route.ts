import { NextRequest } from "next/server";
import { validateBody, createYearPeriodSchema, yearPeriodQuerySchema } from "@/lib/validation";
import { getYearPeriods, createYearPeriod } from "@/lib/services";
import { apiSuccess, handleApiError } from "@/lib/api";
import { requirePermission } from "@/lib/auth/server-auth";

export async function GET(req: NextRequest) {
  try {
    await requirePermission("YEAR_READ");
    const { searchParams } = new URL(req.url);
    const query = {
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 20,
      sortOrder: "desc" as const,
    };

    const result = await getYearPeriods(query);
    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requirePermission("YEAR_CREATE");
    const body = await validateBody(req, createYearPeriodSchema);
    const newPeriod = await createYearPeriod(body, user.id);
    return apiSuccess(newPeriod, "Operational Year Period registered successfully.", 201);
  } catch (error) {
    return handleApiError(error);
  }
}
