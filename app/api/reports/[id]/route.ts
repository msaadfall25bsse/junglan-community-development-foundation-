import { NextRequest } from "next/server";
import { getReportById, updateReport, deleteReport } from "@/lib/services";
import { apiSuccess, handleApiError } from "@/lib/api";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const report = await getReportById(id);
    return apiSuccess(report);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const updated = await updateReport(id, body);
    return apiSuccess(updated, "Report updated successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: NextRequest, context: RouteContext) {
  return PATCH(req, context);
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const result = await deleteReport(id);
    return apiSuccess(result, "Report deleted successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
