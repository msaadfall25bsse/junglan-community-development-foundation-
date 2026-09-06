import { NextRequest } from "next/server";
import { validateBody, updateNewsSchema } from "@/lib/validation";
import { getNewsArticleBySlug, updateNewsArticle, deleteNewsArticle } from "@/lib/services";
import { apiSuccess, handleApiError } from "@/lib/api";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const article = await getNewsArticleBySlug(id);
    return apiSuccess(article);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await validateBody(req, updateNewsSchema);
    const updated = await updateNewsArticle(id, body);
    return apiSuccess(updated, "News article updated successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const result = await deleteNewsArticle(id);
    return apiSuccess(result, "News article deleted successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
