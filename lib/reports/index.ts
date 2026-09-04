// ==============================================================================
// REPORT GENERATION SERVICE (PDF & DOCX ARCHITECTURE)
// ==============================================================================

export interface ReportGenerationRequest {
  title: string;
  yearPeriod: string;
  month?: number;
  reportType: "MONTHLY" | "ANNUAL" | "FINANCIAL" | "HEALTHCARE";
  isPublic: boolean;
}

export interface ReportGenerationResponse {
  reportId: string;
  pdfFileName: string;
  docxFileName: string;
  generatedAt: string;
  status: "READY" | "QUEUED";
}

/**
 * Service hook to trigger report document generation
 */
export async function generateReportDocument(
  req: ReportGenerationRequest
): Promise<ReportGenerationResponse> {
  const safeTitle = req.title.toLowerCase().replace(/[^a-z0-9]/g, "_");
  return {
    reportId: `rep_${Date.now()}`,
    pdfFileName: `Junglan_${safeTitle}_${req.yearPeriod}.pdf`,
    docxFileName: `Junglan_${safeTitle}_${req.yearPeriod}.docx`,
    generatedAt: new Date().toISOString(),
    status: "READY",
  };
}
