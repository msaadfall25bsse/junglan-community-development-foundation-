import { NextRequest, NextResponse } from "next/server";
import { uploadAttachmentToDrive, AttachmentModule } from "@/lib/google";

export const dynamic = "force-dynamic";

// Maximum upload size: 15MB
const MAX_FILE_SIZE = 15 * 1024 * 1024;

// Allowed MIME types for documents & receipts
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
]);

/**
 * POST /api/drive/upload
 * Securely uploads a receipt or operational document to Google Drive under the year-based folder structure.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const module = ((formData.get("module") as string) || "EXPENSE").toUpperCase() as AttachmentModule;
    const recordId = (formData.get("recordId") as string) || `rec-${Date.now()}`;
    const identifier = (formData.get("identifier") as string) || `DOC-${Date.now()}`;
    const yearPeriodId = (formData.get("yearPeriodId") as string) || "2026";
    const description = (formData.get("description") as string) || undefined;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided for upload." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds the 15MB maximum limit. (File is ${(file.size / (1024 * 1024)).toFixed(1)}MB).`,
        },
        { status: 400 }
      );
    }

    const mimeType = file.type || "application/pdf";
    if (!ALLOWED_MIME_TYPES.has(mimeType.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported file type "${mimeType}". Please upload a PDF, PNG, JPG, or WEBP document.`,
        },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Execute upload with standardized naming and deduplication
    const result = await uploadAttachmentToDrive({
      module,
      identifier,
      recordId,
      year: yearPeriodId,
      originalFileName: file.name,
      mimeType,
      fileBuffer,
      description,
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: result.isDuplicateReused
        ? "Identical receipt already exists in Google Drive — reused existing file reference."
        : "Receipt document uploaded and securely attached to Google Drive.",
    });
  } catch (error: any) {
    console.error("[DriveUploadAPI] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload document to Google Drive" },
      { status: 500 }
    );
  }
}
