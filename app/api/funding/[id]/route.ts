import { NextRequest } from "next/server";
import { validateBody, updateFundingSchema } from "@/lib/validation";
import { getFundingById, updateFunding, archiveFunding } from "@/lib/services";
import { apiSuccess, handleApiError } from "@/lib/api";
import { requirePermission, requireAdmin } from "@/lib/auth/server-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission("FUNDING_READ");
    const { id } = await params;
    const funding = await getFundingById(id);
    return apiSuccess(funding);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requirePermission("FUNDING_WRITE");
    const { id } = await params;
    const body = await validateBody(req, updateFundingSchema);
    const updated = await updateFunding(id, body, user.id);
    return apiSuccess(updated, "Funding record updated successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAdmin();
    const { id } = await params;
    const archived = await archiveFunding(id, user.id);
    return apiSuccess(archived, "Funding record voided and archived safely.");
  } catch (error) {
    return handleApiError(error);
  }
}
