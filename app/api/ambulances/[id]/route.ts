import { NextRequest } from "next/server";
import { validateBody, updateAmbulanceSchema } from "@/lib/validation";
import {
  getAmbulanceById,
  updateAmbulance,
  archiveAmbulance,
} from "@/lib/services";
import { apiSuccess, handleApiError } from "@/lib/api";
import { requirePermission } from "@/lib/auth/server-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission("AMBULANCE_READ");
    const { id } = await params;
    const vehicle = await getAmbulanceById(id);
    return apiSuccess(vehicle);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requirePermission("AMBULANCE_WRITE");
    const { id } = await params;
    const body = await validateBody(req, updateAmbulanceSchema);
    const updated = await updateAmbulance(id, body, user.id);
    return apiSuccess(updated, "Ambulance updated successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requirePermission("AMBULANCE_WRITE");
    const { id } = await params;
    const archived = await archiveAmbulance(id, user.id);
    return apiSuccess(
      archived,
      "Ambulance decommissioned and archived safely."
    );
  } catch (error) {
    return handleApiError(error);
  }
}
