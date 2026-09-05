"use client";

import React from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { PUBLIC_REPORTS } from "@/data/content";
import { Download, ShieldCheck, CheckCircle2, Lock } from "lucide-react";

export default function ReportsPage() {
  const categoryBadge = {
    FINANCIAL_AUDIT: "sky" as const,
    OPERATIONAL_REVIEW: "success" as const,
    GOVERNANCE: "neutral" as const,
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {PUBLIC_REPORTS.map((report) => (
              <Card key={report.id} hoverEffect className="flex flex-col justify-between bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Badge variant={categoryBadge[report.category]} size="sm">
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
                    onClick={() => alert(`Document Preview: ${report.title} (${report.fileSize})\nThis document is archived in the foundation library.`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-600" />
                    <span>View / PDF</span>
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>

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
