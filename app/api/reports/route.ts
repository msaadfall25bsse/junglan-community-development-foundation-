import { NextRequest } from "next/server";
import { getReports, createReport } from "@/lib/services";
import { apiCreated, apiSuccess, handleApiError } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get("category") || undefined;
    const result = await getReports(category);
    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const report = await createReport(body);
    return apiCreated(report, "Transparency report added successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
