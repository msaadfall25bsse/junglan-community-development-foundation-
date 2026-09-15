import { NextResponse } from "next/server";
import { getGoogleSheetAnalytics } from "@/lib/google-sheets";

export async function GET() {
  try {
    const analytics = await getGoogleSheetAnalytics();
    return NextResponse.json({ success: true, data: analytics });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load Google Sheet analytics" },
      { status: 500 }
    );
  }
}
