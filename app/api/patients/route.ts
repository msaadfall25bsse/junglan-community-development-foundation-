import { NextRequest } from "next/server";
import {
  validateBody,
  validateQuery,
  createPatientSchema,
  patientQuerySchema,
} from "@/lib/validation";
import { createPatient, getPatients } from "@/lib/services";
import { apiCreated, apiPaginated, handleApiError } from "@/lib/api";
import { requirePermission } from "@/lib/auth/server-auth";

// ==============================================================================
// PATIENTS API ROUTE (GET /api/patients, POST /api/patients)
// ==============================================================================
// Strictly private health intake & registry per Section 17 & 68.

export async function GET(req: NextRequest) {
  try {
    await requirePermission("PATIENTS_READ");
    const query = validateQuery(req.nextUrl.searchParams, patientQuerySchema);
    const result = await getPatients(query);
    return apiPaginated(result.patients, result.pagination);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requirePermission("PATIENTS_WRITE");
    const body = await validateBody(req, createPatientSchema);
    const actorId = user.id;
    const patient = await createPatient(body, actorId);
    return apiCreated(patient, "Patient intake registered successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
