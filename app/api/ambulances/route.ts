import { NextRequest } from "next/server";
import { validateBody, createAmbulanceSchema } from "@/lib/validation";
import { getAmbulances, createAmbulance } from "@/lib/services";
import { apiCreated, apiSuccess, handleApiError } from "@/lib/api";
import { requirePermission } from "@/lib/auth/server-auth";

export async function GET(req: NextRequest) {
  try {
    await requirePermission("AMBULANCE_READ");
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;

    const vehicles = await getAmbulances({ status, search });
    return apiSuccess(vehicles);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requirePermission("AMBULANCE_WRITE");
    const body = await validateBody(req, createAmbulanceSchema);
    const vehicle = await createAmbulance(body, user.id);
    return apiCreated(vehicle, "Ambulance registered into fleet successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
