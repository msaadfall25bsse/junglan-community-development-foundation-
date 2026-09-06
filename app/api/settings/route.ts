import { NextRequest } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/services";
import { apiSuccess, handleApiError } from "@/lib/api";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return apiSuccess(settings);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await updateSiteSettings(body);
    return apiSuccess(updated, "Foundation settings updated successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
