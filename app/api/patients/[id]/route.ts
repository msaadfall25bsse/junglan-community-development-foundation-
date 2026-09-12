import { NextRequest } from "next/server";
import { validateBody, updatePatientSchema } from "@/lib/validation";
import { getPatientById, updatePatient, archivePatient } from "@/lib/services";
import { apiSuccess, handleApiError } from "@/lib/api";
import { requirePermission } from "@/lib/auth/server-auth";

// ==============================================================================
// PATIENT DETAIL ROUTE (GET, PATCH, DELETE /api/patients/[id])
// ==============================================================================

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    await requirePermission("PATIENTS_READ");
    const { id } = await context.params;
    const patient = await getPatientById(id);
    return apiSuccess(patient);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const user = await requirePermission("PATIENTS_WRITE");
    const { id } = await context.params;
    const body = await validateBody(req, updatePatientSchema);
    const actorId = user.id;
    const updated = await updatePatient(id, body, actorId);
    return apiSuccess(updated, "Patient record updated successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const user = await requirePermission("PATIENTS_WRITE");
    const { id } = await context.params;
    const actorId = user.id;
    const archived = await archivePatient(id, actorId);
    return apiSuccess(archived, "Patient record archived successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
