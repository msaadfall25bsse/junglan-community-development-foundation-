import { NextRequest, NextResponse } from "next/server";
import { listSyncLogs } from "@/lib/services/sync-db.service";
import { SyncLogStatus, SyncRecordType, SyncDirection } from "@/types/sync";

export const dynamic = "force-dynamic";

/**
 * GET /api/sync/logs
 * Returns paginated sync audit logs with filtering by status, recordType, direction, and search query.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = (searchParams.get("status") as SyncLogStatus) || undefined;
    const recordType = (searchParams.get("recordType") as SyncRecordType) || undefined;
    const direction = (searchParams.get("direction") as SyncDirection) || undefined;
    const searchQuery = searchParams.get("searchQuery") || undefined;
    const limit = Math.min(Number(searchParams.get("limit") || 50), 100);
    const offset = Math.max(Number(searchParams.get("offset") || 0), 0);

    const { logs, totalCount } = await listSyncLogs({
      status,
      recordType,
      direction,
      searchQuery,
      limit,
      offset,
    });

    return NextResponse.json({
      success: true,
      data: {
        logs,
        totalCount,
        limit,
        offset,
        hasMore: offset + logs.length < totalCount,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch sync logs" },
      { status: 500 }
    );
  }
}
