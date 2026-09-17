import { NextRequest, NextResponse } from "next/server";
import { applyConflictResolution } from "@/lib/sync/conflict-resolver.service";

export const dynamic = "force-dynamic";

/**
 * POST /api/sync/conflicts/[id]/resolve
 * Resolves a sync conflict using KEEP_DB, KEEP_SHEET, MERGE, or DISMISS.
 */
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const rawParams = await Promise.resolve(context.params);
    const conflictId = rawParams.id;

    if (!conflictId) {
      return NextResponse.json(
        { success: false, error: "Conflict ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const resolution = body.resolution;

    if (!resolution || !["KEEP_DB", "KEEP_SHEET", "MERGE", "DISMISS"].includes(resolution)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid resolution: "${resolution}". Must be KEEP_DB, KEEP_SHEET, MERGE, or DISMISS.`,
        },
        { status: 400 }
      );
    }

    const result = await applyConflictResolution({
      conflictId,
      resolution,
      mergedValues: body.mergedValues,
      resolutionNotes: body.resolutionNotes,
      userId: body.userId || "admin-system",
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: result.message,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to resolve conflict" },
      { status: 500 }
    );
  }
}
