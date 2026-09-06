"use client";

import React, { useState, useEffect } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { PUBLIC_REPORTS } from "@/data/content";
import { Download, ShieldCheck, CheckCircle2, Lock, FileText } from "lucide-react";

interface ReportDisplayItem {
  id: string;
  title: string;
  category: string;
  period: string;
  fileSize: string;
  downloadUrl?: string;
  summary: string;
}

export default function ReportsPage() {
  const [reportsList, setReportsList] = useState<ReportDisplayItem[]>(PUBLIC_REPORTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => {
        const rawItems = Array.isArray(data.data) ? data.data : data.data?.reports;
        if (data.success && Array.isArray(rawItems)) {
          const formatted = rawItems.map((r: any) => ({
            id: r.id,
            title: r.title,
            category: r.category || "OPERATIONAL",
            period: r.period || `${r.year || 2026} Operational Period`,
            fileSize: r.fileSize || "1.5 MB PDF",
            downloadUrl: r.downloadUrl || "#",
            summary: r.summary || r.description || "Audited foundation transparency report.",
          }));
          setReportsList(formatted);
        }
      })
      .catch((err) => console.error("Error loading reports:", err))
      .finally(() => setLoading(false));
  }, []);

  const getBadgeVariant = (cat: string): "sky" | "success" | "neutral" | "danger" => {
    if (cat.includes("FINANCIAL")) return "sky";
    if (cat.includes("OPERATIONAL")) return "success";
    if (cat.includes("IMPACT")) return "sky";
    return "neutral";
  };

  return (
    <PublicLayout>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-sky-50/70 via-white to-white py-16 sm:py-20 border-b border-slate-100">
        <Container>
          <SectionHeader
            badge="Public Transparency"
            badgeVariant="sky"
            title="Operational & Financial Reports"
            subtitle="In accordance with our constitution and public accountability pledge, we publish audited summaries of our field activities, donor fund disbursements, and fleet operations."
          />

          <div className="max-w-2xl mx-auto p-4 rounded-xl bg-sky-50 border border-sky-100 flex items-center gap-3 text-xs text-slate-700">
            <ShieldCheck className="w-5 h-5 text-sky-700 shrink-0" />
            <span>
              <strong className="text-slate-900">100% Policy Verification:</strong>{" "}
              All public documents are verified against bank accounts and field receipts. Internal confidential medical records remain protected.
            </span>
          </div>
        </Container>
      </section>

      {/* Reports Grid */}
      <section className="py-16 sm:py-20 bg-slate-50/50">
        <Container>
          {loading ? (
            <div className="py-16 text-center text-slate-500">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-sky-600 border-t-transparent mb-3" />
              <p className="text-sm font-medium">Loading verified transparency records...</p>
            </div>
          ) : reportsList.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8 max-w-lg mx-auto mb-12">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">No Public Reports Yet</h3>
              <p className="text-xs text-slate-500">
                The foundation audit desk is compiling current records. New reports will appear here once approved by executive board.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {reportsList.map((report) => (
                <Card key={report.id} hoverEffect className="flex flex-col justify-between bg-white">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <Badge variant={getBadgeVariant(report.category)} size="sm">
                        {report.category.replace("_", " ")}
                      </Badge>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {report.fileSize}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-sky-700 mb-1">
                      {report.period}
                    </div>

                    <CardTitle className="text-lg font-bold text-slate-900 leading-snug mb-3">
                      {report.title}
                    </CardTitle>

                    <CardDescription className="text-sm text-slate-600 leading-relaxed">
                      {report.summary}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter>
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Public Document</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (report.downloadUrl && report.downloadUrl !== "#") {
                          window.open(report.downloadUrl, "_blank");
                        } else {
                          alert(`Document: ${report.title} (${report.fileSize})\nArchived in Junglan Foundation Public Governance Library.`);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-800 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-sky-600" />
                      <span>View / PDF</span>
                    </button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Privacy & Security Boundary Note */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>
                Note: Individual patient identities, driver personnel records, and internal system credentials are confidential per medical privacy ethics.
              </span>
            </div>
            <div className="font-semibold text-slate-700">
              Audit Office: Junglan Community Development Foundation
            </div>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
