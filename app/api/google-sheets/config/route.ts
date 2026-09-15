import { NextRequest, NextResponse } from "next/server";
import {
  getStoredWebhookUrl,
  saveStoredWebhookUrl,
  testGoogleSheetsWebhook,
} from "@/lib/google-sheets";

export async function GET() {
  const url = getStoredWebhookUrl();
  const isConfigured = Boolean(url && url.startsWith("https://"));

  return NextResponse.json({
    success: true,
    configured: isConfigured,
    webhookUrl: isConfigured ? url : null,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const webhookUrl = (body.webhookUrl || "").trim();

    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, error: "Webhook URL is required" },
        { status: 400 }
      );
    }

    // Test the connection live
    const testResult = await testGoogleSheetsWebhook(webhookUrl);

    if (testResult.success) {
      saveStoredWebhookUrl(webhookUrl);
      return NextResponse.json({
        success: true,
        message: testResult.message || "Connected to Google Sheet successfully!",
        stats: testResult.stats,
      });
    }

    return NextResponse.json(
      { success: false, error: testResult.message },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to configure Google Sheets Webhook" },
      { status: 500 }
    );
  }
}
