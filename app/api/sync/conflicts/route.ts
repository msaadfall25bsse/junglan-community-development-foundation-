import { NextRequest, NextResponse } from "next/server";
import { getSyncConflicts } from "@/lib/services/sync-db.service";
import { ConflictStatus, SyncRecordType } from "@/types/sync";

export const dynamic = "force-dynamic";

/**
 * GET /api/sync/conflicts
 * Returns sync conflicts with optional filtering by status and recordType.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status") || "OPEN";
    const recordTypeParam = searchParams.get("recordType") as SyncRecordType | null;

    let filterStatus: ConflictStatus | undefined;
    if (statusParam === "OPEN") {
      filterStatus = "OPEN";
    }

    const conflicts = await getSyncConflicts({
      status: filterStatus,
      recordType: recordTypeParam || undefined,
    });

    // Parse JSON payloads for easier consumption by the client
    const parsedConflicts = conflicts.map((c: any) => ({
      ...c,
      databaseValue: typeof c.databaseValueJson === "string"
        ? JSON.parse(c.databaseValueJson)
        : c.databaseValueJson,
      sheetValue: typeof c.sheetValueJson === "string"
        ? JSON.parse(c.sheetValueJson)
        : c.sheetValueJson,
    }));

    return NextResponse.json({
      success: true,
      data: parsedConflicts,
      count: parsedConflicts.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch sync conflicts" },
      { status: 500 }
    );
  }
}
