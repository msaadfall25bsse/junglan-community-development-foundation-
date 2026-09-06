import { NextRequest } from "next/server";
import { validateBody, updatePatientSchema } from "@/lib/validation";
import { getPatientById, updatePatient } from "@/lib/services";
import { apiSuccess, handleApiError } from "@/lib/api";

// ==============================================================================
// PATIENT DETAIL ROUTE (GET /api/patients/[id], PATCH /api/patients/[id])
// ==============================================================================

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const patient = await getPatientById(id);
    return apiSuccess(patient);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await validateBody(req, updatePatientSchema);
    const actorId = req.headers.get("x-user-id") || null;
    const updated = await updatePatient(id, body, actorId);
    return apiSuccess(updated, "Patient record updated successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
