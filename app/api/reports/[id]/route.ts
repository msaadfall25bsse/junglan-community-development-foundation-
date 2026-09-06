import { NextRequest } from "next/server";
import { deleteReport } from "@/lib/services";
import { apiSuccess, handleApiError } from "@/lib/api";

interface RouteContext {
  params: Promise<{ id: string }>;
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
