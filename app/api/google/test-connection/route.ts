import { NextResponse } from "next/server";
import { testGoogleConnection } from "@/lib/google/google-connection.service";

export const dynamic = "force-dynamic";

/**
 * POST /api/google/test-connection
 * Executes a non-destructive health check of Google Drive and Sheets APIs.
 */
export async function POST() {
  try {
    const startTime = Date.now();
    const report = await testGoogleConnection();
    const durationMs = Date.now() - startTime;

    return NextResponse.json({
      success: report.connected,
      data: {
        ...report,
        latencyMs: durationMs,
      },
      message: report.message,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to execute Google connection test",
      },
      { status: 500 }
    );
  }
}
