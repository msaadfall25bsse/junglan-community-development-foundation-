import { readStore, updateStore } from "@/lib/db";
import { NotFoundError } from "@/lib/api/errors";

// ==============================================================================
// TRANSPARENCY REPORT DOMAIN SERVICE
// ==============================================================================

export interface CreateReportInput {
  title: string;
  year?: number;
  period: string;
  category: "FINANCIAL" | "OPERATIONAL" | "ANNUAL" | "IMPACT";
  fileSize?: string;
  downloadUrl?: string;
  summary: string;
}

export async function getReports(category?: string) {
  const store = readStore();
  let items = [...store.reports];

  if (category && category !== "ALL") {
    items = items.filter((r) => r.category === category);
  }

  items.sort((a, b) => b.year - a.year);

  return {
    reports: items,
    total: items.length,
  };
}

export async function createReport(data: CreateReportInput) {
  const newReport = {
    id: `rep-${Date.now()}`,
    title: data.title,
    year: data.year || new Date().getFullYear(),
    period: data.period,
    category: data.category,
    fileSize: data.fileSize || "1.8 MB",
    downloadUrl: data.downloadUrl || "#",
    summary: data.summary,
    publishedDate: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date()),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  updateStore((s) => {
    s.reports.unshift(newReport);
    s.auditLogs.push({
      id: `aud-${Date.now()}`,
      action: "CREATE",
      module: "REPORTS",
      recordId: newReport.id,
      timestamp: new Date().toISOString(),
      metadataJson: JSON.stringify({ title: newReport.title, period: newReport.period }),
    });
  });

  return newReport;
}

export async function deleteReport(id: string) {
  const store = readStore();
  const exists = store.reports.find((r) => r.id === id);
  if (!exists) {
    throw new NotFoundError("Report", id);
  }

  updateStore((s) => {
    s.reports = s.reports.filter((r) => r.id !== id);
    s.auditLogs.push({
      id: `aud-${Date.now()}`,
      action: "DELETE",
      module: "REPORTS",
      recordId: id,
      timestamp: new Date().toISOString(),
    });
  });

  return { success: true, message: `Report ${id} deleted successfully.` };
}
