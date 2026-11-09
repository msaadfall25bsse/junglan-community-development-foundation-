'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from "@/components/home/ScrollReveal";

export default function AuditReportsAccessSection() {
  return (
    <section className="py-[54px] md:py-[70px] bg-surface-container-lowest border-b border-stone-border relative overflow-hidden" id="reports">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <ScrollReveal variant="heading" delay={100}>
              <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
                REPORTS &amp; DOCUMENTS
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary font-semibold">
                Access Our Organizational Reports
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal variant="text" delay={200}>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-md leading-relaxed">
              Download and inspect documentation summaries covering field service metrics, vehicle operations, and corporate filings.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Document Card 1 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface via-white to-red-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-red-600/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10.5px] font-bold rounded font-label-uppercase border border-red-200">
                    PDF
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-medium">Updated 2025</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold mt-2.5">
                  Operational Activity Report (2024–2025)
                </h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Comprehensive overview of mountain emergency dispatch volume, response times, and program metrics.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/70 flex items-center justify-between text-xs relative z-10">
                <span className="text-[11px] text-on-surface-variant">2.4 MB • Stamped</span>
                <button className="px-2.5 py-1 bg-surface-container-lowest border border-stone-border text-xs font-semibold text-primary rounded-md hover:bg-surface-container hover:text-secondary transition-colors flex items-center gap-1 shadow-2xs cursor-pointer">
                  <span>View</span>
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Document Card 2 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface via-white to-blue-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10.5px] font-bold rounded font-label-uppercase border border-red-200">
                    PDF
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-medium">Bi-Annual</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold mt-2.5">
                  Ambulance Transit &amp; Dispatch Summary
                </h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Itemized analysis of approximately 450 emergency runs, fuel efficiency ratios, and vehicle repair frequency.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/70 flex items-center justify-between text-xs relative z-10">
                <span className="text-[11px] text-on-surface-variant">1.8 MB • Certified</span>
                <button className="px-2.5 py-1 bg-surface-container-lowest border border-stone-border text-xs font-semibold text-primary rounded-md hover:bg-surface-container hover:text-secondary transition-colors flex items-center gap-1 shadow-2xs cursor-pointer">
                  <span>View</span>
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Document Card 3 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface via-white to-emerald-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-secondary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-secondary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10.5px] font-bold rounded font-label-uppercase border border-red-200">
                    PDF
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-medium">Annual Agro</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold mt-2.5">
                  Agricultural Development &amp; Nursery Overview
                </h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Field register of olive tree distribution, hill terrace soil stability reports, and farmer feedback registers.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/70 flex items-center justify-between text-xs relative z-10">
                <span className="text-[11px] text-on-surface-variant">3.1 MB • Field Audit</span>
                <button className="px-2.5 py-1 bg-surface-container-lowest border border-stone-border text-xs font-semibold text-primary rounded-md hover:bg-surface-container hover:text-secondary transition-colors flex items-center gap-1 shadow-2xs cursor-pointer">
                  <span>View</span>
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Document Card 4 */}
          <ScrollReveal variant="card" delay={450}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface via-white to-sky-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-sky-600/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-blue-100 text-primary text-[10.5px] font-bold rounded font-label-uppercase border border-blue-200">
                    GOV
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-medium">SECP CUIN</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold mt-2.5">
                  SECP Compliance &amp; CUIN Documentation
                </h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Official registration credentials under Securities and Exchange Commission of Pakistan (CUIN: 0348227).
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/70 flex items-center justify-between text-xs relative z-10">
                <span className="text-[11px] text-on-surface-variant">Official Registry</span>
                <button className="px-2.5 py-1 bg-surface-container-lowest border border-stone-border text-xs font-semibold text-primary rounded-md hover:bg-surface-container hover:text-secondary transition-colors flex items-center gap-1 shadow-2xs cursor-pointer">
                  <span>View</span>
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
