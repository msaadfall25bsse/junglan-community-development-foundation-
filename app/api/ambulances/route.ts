import { NextRequest } from "next/server";
import { validateBody, createAmbulanceSchema } from "@/lib/validation";
import { getAmbulances, createAmbulance } from "@/lib/services";
import { apiCreated, apiSuccess, handleApiError } from "@/lib/api";

export async function GET() {
  try {
    const vehicles = await getAmbulances();
    return apiSuccess(vehicles);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await validateBody(req, createAmbulanceSchema);
    const vehicle = await createAmbulance(body);
    return apiCreated(vehicle, "Ambulance registered successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
