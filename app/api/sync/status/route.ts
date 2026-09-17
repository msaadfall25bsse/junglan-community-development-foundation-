import { NextResponse } from "next/server";
import {
  getGoogleIntegration,
  getActiveSyncJob,
  getSyncConflicts,
} from "@/lib/services/sync-db.service";

export const dynamic = "force-dynamic";

/**
 * GET /api/sync/status
 * Returns current Google integration state, active concurrency lock, health metrics, and open conflicts.
 */
export async function GET() {
  try {
    const [integration, activeJob, openConflicts] = await Promise.all([
      getGoogleIntegration(),
      getActiveSyncJob(),
      getSyncConflicts({ status: "OPEN" }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        integration: {
          id: integration.id,
          status: integration.status,
          authType: integration.authType,
          accountEmail: integration.accountEmail,
          driveRootFolderId: integration.driveRootFolderId,
          spreadsheetId: integration.spreadsheetId,
          syncHealth: integration.syncHealth,
          lastSyncAt: integration.lastSyncAt,
          lastSuccessfulSyncAt: integration.lastSuccessfulSyncAt,
          totalSyncedRecords: (integration as any).totalSyncedRecords || 0,
          conflictCount: integration.conflictCount,
        },
        lock: {
          isLocked: activeJob !== null,
          activeJob: activeJob
            ? {
                id: activeJob.id,
                jobIdentifier: activeJob.jobIdentifier,
                direction: activeJob.direction,
                status: activeJob.status,
                startedAt: activeJob.startedAt,
                recordsProcessed: activeJob.recordsProcessed,
              }
            : null,
        },
        openConflictsCount: openConflicts.length,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch sync status" },
      { status: 500 }
    );
  }
}
