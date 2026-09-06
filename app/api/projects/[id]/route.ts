import { NextRequest } from "next/server";
import { validateBody, updateProjectSchema } from "@/lib/validation";
import { getProjectBySlug, updateProject, deleteProject } from "@/lib/services";
import { apiSuccess, handleApiError } from "@/lib/api";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const project = await getProjectBySlug(id);
    return apiSuccess(project);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await validateBody(req, updateProjectSchema);
    const updated = await updateProject(id, body);
    return apiSuccess(updated, "Project updated successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const result = await deleteProject(id);
    return apiSuccess(result, "Project deleted successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
