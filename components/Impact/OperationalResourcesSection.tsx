'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from "@/components/home/ScrollReveal";

export default function OperationalResourcesSection() {
  return (
    <section className="py-[54px] md:py-[70px] bg-surface-container-lowest border-b border-stone-border relative overflow-hidden" id="resources">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <ScrollReveal variant="heading" delay={100}>
              <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
                FINANCIAL OVERVIEW
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary font-semibold">
                Understanding Our Operational Resources
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="text" delay={200}>
              <p className="mt-2 text-xs sm:text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
                A clear framework depicting operational allocation channels. In accordance with strict data integrity, operational figures are presented within verified structural brackets.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal variant="card" delay={150}>
            <div className="mt-2 lg:mt-0 flex items-center gap-2">
              <span className="px-3 py-1 bg-surface-container text-on-surface-variant text-[11px] font-label-uppercase font-semibold rounded border border-stone-border shadow-2xs">
                Ledger Period: [FY 2024–2025 Ledger]
              </span>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="ui-claymorphic relative overflow-hidden bg-gradient-to-br from-surface-container-low via-white to-emerald-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-secondary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant text-[10px] font-bold">COMPONENT A</span>
                  <span className="material-symbols-outlined text-secondary text-xl">savings</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">Funding &amp; Contributions</h3>
                <p className="mt-1 text-xs text-on-surface-variant leading-relaxed">Individual donations, community collections, and targeted patron assistance.</p>
                
                <div className="my-3.5 p-2.5 bg-surface-container-lowest rounded-lg border border-dashed border-stone-border text-center">
                  <span className="font-stat-display text-sm font-bold text-primary block">[Verified Financial Data]</span>
                  <span className="text-[10.5px] text-on-surface-variant">Direct valley contributions &amp; donor bank entries</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-medium">
                    <span>Community Sourced</span>
                    <span className="text-on-surface-variant">[FY2025 Share]</span>
                  </div>
                  <div className="w-full h-2 bg-stone-border/80 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: "72%" }}></div>
                  </div>
                </div>
              </div>
              <div className="mt-3.5 pt-2.5 border-t border-stone-border/70 text-[11px] text-on-surface-variant flex items-center gap-1 relative z-10">
                <span className="material-symbols-outlined text-sm text-secondary">check</span> Bank-reconciled donor receipts
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="ui-claymorphic relative overflow-hidden bg-gradient-to-br from-surface-container-low via-white to-blue-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant text-[10px] font-bold">COMPONENT B</span>
                  <span className="material-symbols-outlined text-primary text-xl">analytics</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">Operating Expenses</h3>
                <p className="mt-1 text-xs text-on-surface-variant leading-relaxed">Categorized splits between clinical transit, agricultural saplings, and governance.</p>
                
                <div className="my-3.5 p-2.5 bg-surface-container-lowest rounded-lg border border-dashed border-stone-border text-center">
                  <span className="font-stat-display text-sm font-bold text-primary block">[Audited Operating Figure]</span>
                  <span className="text-[10.5px] text-on-surface-variant">Field dispatch direct outlays</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-medium">
                    <span>Ambulance &amp; Medical Transit</span>
                    <span className="text-on-surface-variant">Primary Outlay</span>
                  </div>
                  <div className="w-full h-2 bg-stone-border/80 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-container rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </div>
              <div className="mt-3.5 pt-2.5 border-t border-stone-border/70 text-[11px] text-on-surface-variant flex items-center gap-1 relative z-10">
                <span className="material-symbols-outlined text-sm text-secondary">check</span> Physical ledger vouchers on file
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="ui-claymorphic relative overflow-hidden bg-gradient-to-br from-surface-container-low via-white to-amber-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-amber-600/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant text-[10px] font-bold">COMPONENT C</span>
                  <span className="material-symbols-outlined text-amber-700 text-xl">build</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">Vehicle Upkeep &amp; Overhaul</h3>
                <p className="mt-1 text-xs text-on-surface-variant leading-relaxed">Suspension adjustments, mountain brake maintenance, and engine health in harsh terrain.</p>
                
                <div className="my-3.5 p-2.5 bg-surface-container-lowest rounded-lg border border-dashed border-stone-border text-center">
                  <span className="font-stat-display text-sm font-bold text-primary block">[Verified Maintenance Records]</span>
                  <span className="text-[10.5px] text-on-surface-variant">Mechanic invoices &amp; spare parts ledger</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-medium">
                    <span>Chassis &amp; Rough-Road Overhaul</span>
                    <span className="text-on-surface-variant">Quarterly Routine</span>
                  </div>
                  <div className="w-full h-2 bg-stone-border/80 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full" style={{ width: "58%" }}></div>
                  </div>
                </div>
              </div>
              <div className="mt-3.5 pt-2.5 border-t border-stone-border/70 text-[11px] text-on-surface-variant flex items-center gap-1 relative z-10">
                <span className="material-symbols-outlined text-sm text-secondary">check</span> Itemized workshop vouchers verified
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4 */}
          <ScrollReveal variant="card" delay={450}>
            <div className="ui-claymorphic relative overflow-hidden bg-gradient-to-br from-surface-container-low via-white to-red-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-red-600/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant text-[10px] font-bold">COMPONENT D</span>
                  <span className="material-symbols-outlined text-red-700 text-xl">local_gas_station</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">Petrol &amp; Fuel Records</h3>
                <p className="mt-1 text-xs text-on-surface-variant leading-relaxed">Trip-by-trip kilometer reconciliation for rescue runs down to Mansehra DHQ Hospital.</p>
                
                <div className="my-3.5 p-2.5 bg-surface-container-lowest rounded-lg border border-dashed border-stone-border text-center">
                  <span className="font-stat-display text-sm font-bold text-primary block">[Verified Fuel Logs]</span>
                  <span className="text-[10.5px] text-on-surface-variant">Log sheet cross-checked per dispatch</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-medium">
                    <span>Emergency Patient Run Fuel</span>
                    <span className="text-on-surface-variant">Per Dispatch Log</span>
                  </div>
                  <div className="w-full h-2 bg-stone-border/80 rounded-full overflow-hidden">
                    <div className="h-full bg-red-700 rounded-full" style={{ width: "82%" }}></div>
                  </div>
                </div>
              </div>
              <div className="mt-3.5 pt-2.5 border-t border-stone-border/70 text-[11px] text-on-surface-variant flex items-center gap-1 relative z-10">
                <span className="material-symbols-outlined text-sm text-secondary">check</span> Fuel slips filed with driver log sheets
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
