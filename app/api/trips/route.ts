import { NextRequest } from "next/server";
import {
  validateBody,
  validateQuery,
  createTripSchema,
  tripQuerySchema,
} from "@/lib/validation";
import { createTrip, getTrips } from "@/lib/services";
import { apiCreated, apiPaginated, handleApiError } from "@/lib/api";

// ==============================================================================
// TRIPS API ROUTE (GET /api/trips, POST /api/trips)
// ==============================================================================
// Ambulance mission dispatch and logs per Section 18 & 19.

export async function GET(req: NextRequest) {
  try {
    const query = validateQuery(req.nextUrl.searchParams, tripQuerySchema);
    const result = await getTrips(query);
    return apiPaginated(result.trips, result.pagination);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await validateBody(req, createTripSchema);
    const actorId = req.headers.get("x-user-id") || null;
    const trip = await createTrip(body, actorId);
    return apiCreated(trip, "Ambulance mission dispatched successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
