import { NextRequest } from "next/server";
import { validateBody, updateTripSchema } from "@/lib/validation";
import { getTripById, updateTrip, archiveTrip } from "@/lib/services";
import { apiSuccess, handleApiError } from "@/lib/api";
import { requirePermission } from "@/lib/auth/server-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission("TRIPS_READ");
    const { id } = await params;
    const trip = await getTripById(id);
    return apiSuccess(trip);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requirePermission("TRIPS_WRITE");
    const { id } = await params;
    const body = await validateBody(req, updateTripSchema);
    const updated = await updateTrip(id, body, user.id);
    return apiSuccess(updated, "Trip record updated successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requirePermission("TRIPS_WRITE");
    const { id } = await params;
    const archived = await archiveTrip(id, user.id);
    return apiSuccess(archived, "Trip cancelled and archived safely.");
  } catch (error) {
    return handleApiError(error);
  }
}
