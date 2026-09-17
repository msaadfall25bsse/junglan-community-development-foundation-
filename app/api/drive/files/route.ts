import { NextRequest, NextResponse } from "next/server";
import { listDriveAttachments, AttachmentModule, YearSubfolderType } from "@/lib/google";

export const dynamic = "force-dynamic";

/**
 * GET /api/drive/files
 * Lists documents and receipts stored in Google Drive under a specific year and subfolder.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year") || "2026";
    const module = (searchParams.get("module")?.toUpperCase() as AttachmentModule) || undefined;
    const subfolder = (searchParams.get("subfolder") as YearSubfolderType) || undefined;

    const files = await listDriveAttachments({
      year,
      module,
      subfolder,
    });

    return NextResponse.json({
      success: true,
      data: files,
      count: files.length,
      year,
      subfolder: subfolder || module || "Receipts",
    });
  } catch (error: any) {
    console.error("[DriveFilesAPI] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to list Google Drive files" },
      { status: 500 }
    );
  }
}
