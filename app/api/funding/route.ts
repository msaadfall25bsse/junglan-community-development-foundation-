import { NextRequest } from "next/server";
import {
  validateBody,
  validateQuery,
  createFundingSchema,
  fundingQuerySchema,
} from "@/lib/validation";
import { createFunding, getFundings } from "@/lib/services";
import { apiCreated, apiPaginated, handleApiError } from "@/lib/api";
import { requirePermission } from "@/lib/auth/server-auth";

// ==============================================================================
// FUNDING API ROUTE (GET /api/funding, POST /api/funding)
// ==============================================================================
// Section 21, 48, 69: Private financial operational data.

export async function GET(req: NextRequest) {
  try {
    await requirePermission("FUNDING_READ");
    const query = validateQuery(req.nextUrl.searchParams, fundingQuerySchema);
    const result = await getFundings(query);
    return apiPaginated(result.fundings, result.pagination);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requirePermission("FUNDING_WRITE");
    const body = await validateBody(req, createFundingSchema);
    const actorId = user.id;
    const funding = await createFunding(body, actorId);
    return apiCreated(funding, "Funding receipt logged successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
