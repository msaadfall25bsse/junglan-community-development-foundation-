import { NextRequest } from "next/server";
import { validateBody, updateTripSchema } from "@/lib/validation";
import { completeTrip } from "@/lib/services";
import { apiSuccess, handleApiError } from "@/lib/api";

// ==============================================================================
// COMPLETE TRIP ROUTE (POST /api/trips/[id]/complete)
// ==============================================================================
// Section 19: Atomic mission completion, odometer advance, and vehicle release.

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await validateBody(req, updateTripSchema);
    const actorId = req.headers.get("x-user-id") || null;
    const trip = await completeTrip(id, body, actorId);
    return apiSuccess(trip, "Ambulance mission completed and vehicle returned to active service.");
  } catch (error) {
    return handleApiError(error);
  }
}
