"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { IMPACT_METRICS } from "@/data/content";
import { Activity, ShieldCheck } from "lucide-react";

export function ImpactStats() {
  const [metrics, setMetrics] = useState(IMPACT_METRICS);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setMetrics((prev) =>
            prev.map((m) => {
              if (m.id === "patients" && data.data.patientsHelpedCount) {
                return { ...m, value: `${Number(data.data.patientsHelpedCount).toLocaleString()}+` };
              }
              if (m.id === "trees" && data.data.treesPlantedCount) {
                return { ...m, value: `${Number(data.data.treesPlantedCount).toLocaleString()}+` };
              }
              if (m.id === "ambulances" && data.data.activeAmbulancesCount) {
                return { ...m, value: `${data.data.activeAmbulancesCount}` };
              }
              if (m.id === "villages" && data.data.villagesServedCount) {
                return { ...m, value: `${data.data.villagesServedCount}` };
              }
              return m;
            })
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="impact" className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <Container>
        {/* Section Context Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 uppercase tracking-wider mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Operational Benchmarks</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Measurable Progress Across Junglan Valley
            </h2>
          </div>
          <div className="text-xs text-slate-500 max-w-sm">
            <span className="font-semibold text-slate-700">Audit Commitment:</span>{" "}
            All operational figures are verified against field dispatch and distribution ledgers.
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/30 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight group-hover:text-sky-700 transition-colors">
                  {metric.value}
                </span>
                <Badge variant="sky" size="sm">
                  {metric.badge}
                </Badge>
              </div>

              <div className="font-bold text-slate-900 text-base mb-1">
                {metric.label}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Note & CTA */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Field data updated on monthly accounting cycle • 100% verified against bank receipts</span>
          </div>
          <a
            href="/impact"
            className="inline-flex items-center gap-1 font-bold text-sky-700 hover:text-sky-900 transition-colors"
          >
            <span>Explore Complete Verified Impact</span>
            <span>→</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
