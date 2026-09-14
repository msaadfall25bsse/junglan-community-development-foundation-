import { NextRequest } from "next/server";
import {
  getYearPeriodById,
  updateYearPeriod,
  setActiveYearPeriod,
  closeYearPeriod,
} from "@/lib/services";
import { apiSuccess, handleApiError } from "@/lib/api";
import { requirePermission } from "@/lib/auth/server-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission("YEAR_READ");
    const { id } = await params;
    const period = await getYearPeriodById(id);
    return apiSuccess(period);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requirePermission("YEAR_CREATE");
    const { id } = await params;
    const body = await req.json();

    if (body.action === "SET_ACTIVE") {
      const active = await setActiveYearPeriod(id, user.id);
      return apiSuccess(active, `Operational Year Period '${active.label}' is now active.`);
    }

    if (body.action === "CLOSE") {
      const closed = await closeYearPeriod(id, user.id);
      return apiSuccess(closed, `Operational Year Period '${closed.label}' has been locked and closed.`);
    }

    const updated = await updateYearPeriod(id, body, user.id);
    return apiSuccess(updated, "Operational Year Period updated successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
