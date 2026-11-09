'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from "@/components/home/ScrollReveal";

export default function OrganizationalReportingSection() {
  return (
    <section className="py-[54px] md:py-[70px] bg-surface border-b border-stone-border relative overflow-hidden" id="reporting">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
              HOW WE MAINTAIN ACCOUNTABILITY
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary font-semibold">
              A Responsible Approach to Organizational Reporting
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <p className="mt-2 text-xs sm:text-body-md text-on-surface-variant leading-relaxed">
              From high-altitude road slips to validated audit reports: our 4-step workflow ensures every action is verified.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 01 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 bg-blue-100 text-primary border border-blue-200 font-bold text-[10.5px] rounded font-label-uppercase">
                    STEP 01
                  </span>
                  <span className="material-symbols-outlined text-secondary text-xl">edit_document</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">Record Collection</h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Field drivers and coordinators collect physical fuel vouchers, emergency trip logs, and workshop receipts directly after each run.
                </p>
              </div>
              <div className="mt-3.5 pt-2 border-t border-stone-border/70 text-[11px] text-primary font-semibold relative z-10 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">receipt_long</span> Immediate Field Intake
              </div>
            </div>
          </ScrollReveal>

          {/* Step 02 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-emerald-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-secondary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-secondary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-secondary border border-emerald-200 font-bold text-[10.5px] rounded font-label-uppercase">
                    STEP 02
                  </span>
                  <span className="material-symbols-outlined text-secondary text-xl">table_view</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">Documentation</h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Data is logged into standard accounting sheets with itemized ledger codes distinguishing ambulance operations from agriculture.
                </p>
              </div>
              <div className="mt-3.5 pt-2 border-t border-stone-border/70 text-[11px] text-secondary font-semibold relative z-10 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">format_list_bulleted</span> Categorized Coding
              </div>
            </div>
          </ScrollReveal>

          {/* Step 03 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-amber-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-amber-600/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-700 border border-amber-200 font-bold text-[10.5px] rounded font-label-uppercase">
                    STEP 03
                  </span>
                  <span className="material-symbols-outlined text-secondary text-xl">rule</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">Review &amp; Verification</h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Internal review cross-checks ledger numbers against official bank statements, vendor counter-slips, and driver mileage manifests.
                </p>
              </div>
              <div className="mt-3.5 pt-2 border-t border-stone-border/70 text-[11px] text-amber-700 font-semibold relative z-10 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span> Reconciled Balancing
              </div>
            </div>
          </ScrollReveal>

          {/* Step 04 */}
          <ScrollReveal variant="card" delay={450}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-sky-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-sky-600/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 bg-sky-100 text-sky-800 border border-sky-200 font-bold text-[10.5px] rounded font-label-uppercase">
                    STEP 04
                  </span>
                  <span className="material-symbols-outlined text-secondary text-xl">public</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">Transparent Reporting</h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Synthesized operational summaries are made available to community elders, institutional donors, and regulatory authorities.
                </p>
              </div>
              <div className="mt-3.5 pt-2 border-t border-stone-border/70 text-[11px] text-sky-800 font-semibold relative z-10 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">visibility</span> Stakeholder Accessible
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
