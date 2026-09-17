import { NextRequest, NextResponse } from "next/server";
import { getActiveSyncJob } from "@/lib/services/sync-db.service";
import { SyncEngine } from "@/lib/sync/sync-engine.service";
import { SyncDirection } from "@/types/sync";

export const dynamic = "force-dynamic";

/**
 * POST /api/sync/trigger
 * Initiates an on-demand synchronization job (Direction A, B, or Two-Way).
 * Protected by concurrency locks — returns HTTP 409 if a job is already executing.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Check Concurrency Lock
    const activeJob = await getActiveSyncJob();
    if (activeJob) {
      return NextResponse.json(
        {
          success: false,
          error: "A synchronization job is currently in progress. Please wait for it to complete.",
          lock: {
            jobId: activeJob.id,
            jobIdentifier: activeJob.jobIdentifier,
            direction: activeJob.direction,
            startedAt: activeJob.startedAt,
          },
        },
        { status: 409 }
      );
    }

    // 2. Parse Request Body
    const body = await request.json().catch(() => ({}));
    const rawDirection = (body.direction || "BIDIRECTIONAL").toUpperCase();
    const scope = body.scope || "ALL";
    const yearPeriodId = body.yearPeriodId || "2026";
    const userId = body.userId || "admin-system";

    const dirMap: Record<string, SyncDirection> = {
      DB_TO_SHEET: "OUTBOUND",
      OUTBOUND: "OUTBOUND",
      SHEET_TO_DB: "INBOUND",
      INBOUND: "INBOUND",
      TWO_WAY: "BIDIRECTIONAL",
      BIDIRECTIONAL: "BIDIRECTIONAL",
    };

    const direction = dirMap[rawDirection];
    if (!direction) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid direction: ${rawDirection}. Must be OUTBOUND (or DB_TO_SHEET), INBOUND (or SHEET_TO_DB), or BIDIRECTIONAL (or TWO_WAY).`,
        },
        { status: 400 }
      );
    }

    // 3. Execute Synchronization
    const summary = await SyncEngine.run({
      direction,
      scope,
      yearPeriodId,
      userId,
    });

    return NextResponse.json({
      success: summary.success,
      data: summary,
      message: summary.message,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to execute synchronization" },
      { status: 500 }
    );
  }
}
