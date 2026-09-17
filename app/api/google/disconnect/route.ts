import { NextResponse } from "next/server";
import { disconnectGoogleIntegration } from "@/lib/google/google-connection.service";

export const dynamic = "force-dynamic";

/**
 * POST /api/google/disconnect
 * Safely disconnects the Google integration without deleting database records.
 */
export async function POST() {
  try {
    const result = await disconnectGoogleIntegration();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to disconnect Google integration",
      },
      { status: 500 }
    );
  }
}
