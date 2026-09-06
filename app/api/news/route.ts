import { NextRequest } from "next/server";
import { validateBody, validateQuery, createNewsSchema, newsQuerySchema } from "@/lib/validation";
import { getNewsArticles, createNewsArticle } from "@/lib/services";
import { apiCreated, apiPaginated, handleApiError } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const query = validateQuery(req.nextUrl.searchParams, newsQuerySchema);
    const result = await getNewsArticles(query);
    return apiPaginated(result.articles, result.pagination);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await validateBody(req, createNewsSchema);
    const article = await createNewsArticle(body);
    return apiCreated(article, "News article published successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
