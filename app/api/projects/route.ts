import { NextRequest } from "next/server";
import { validateBody, validateQuery, createProjectSchema, projectQuerySchema } from "@/lib/validation";
import { getProjects, createProject } from "@/lib/services";
import { apiCreated, apiPaginated, handleApiError } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const query = validateQuery(req.nextUrl.searchParams, projectQuerySchema);
    const result = await getProjects(query);
    return apiPaginated(result.projects, result.pagination);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await validateBody(req, createProjectSchema);
    const project = await createProject(body);
    return apiCreated(project, "Project created successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
