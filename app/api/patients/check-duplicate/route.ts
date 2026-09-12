import { NextRequest } from "next/server";
import { checkDuplicatePatient } from "@/lib/services";
import { apiSuccess, handleApiError } from "@/lib/api";
import { requirePermission } from "@/lib/auth/server-auth";

// ==============================================================================
// POST /api/patients/check-duplicate
// ==============================================================================
// Pre-submission duplicate check for CNIC, phone number, and patient name.
// ==============================================================================

export async function POST(req: NextRequest) {
  try {
    await requirePermission("PATIENTS_READ");
    const body = await req.json().catch(() => ({}));
    const result = await checkDuplicatePatient({
      cnicOrBForm: typeof body.cnicOrBForm === "string" ? body.cnicOrBForm : undefined,
      contactNumber: typeof body.contactNumber === "string" ? body.contactNumber : undefined,
      fullName: typeof body.fullName === "string" ? body.fullName : undefined,
    });

    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}
