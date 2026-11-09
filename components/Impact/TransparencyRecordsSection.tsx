'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from "@/components/home/ScrollReveal";

export default function TransparencyRecordsSection() {
  return (
    <section className="py-[54px] md:py-[70px] bg-surface border-b border-stone-border relative overflow-hidden" id="transparency">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="max-w-3xl mb-10">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
              TRANSPARENCY &amp; FINANCIAL ACCOUNTABILITY
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary font-semibold">
              Responsible Management. Transparent Records.
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <p className="mt-2 text-xs sm:text-body-md text-on-surface-variant leading-relaxed">
              Trust is built through systematic evidence. JCDF adheres to strict physical voucher organization and cross-referenced banking entries.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-primary flex items-center justify-center mb-3 shadow-xs border border-blue-200">
                  <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">Financial Records</h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Documentation of all received philanthropic contributions, individual donor support, and official institutional bank deposits.
                </p>
              </div>
              <ul className="mt-3.5 space-y-1.5 text-[11px] sm:text-xs text-on-surface border-t border-stone-border/70 pt-3 relative z-10">
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>Direct bank deposit slips</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>Categorized donor acknowledgments</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>Monthly cash receipt journals</li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-amber-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-amber-600/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-3 shadow-xs border border-amber-200">
                  <span className="material-symbols-outlined text-xl">receipt_long</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">Operational Expenses</h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Granular cost tracking covering vehicle overhaul, heavy-duty brake replacement, tire wear, and corridor petrol/diesel purchases.
                </p>
              </div>
              <ul className="mt-3.5 space-y-1.5 text-[11px] sm:text-xs text-on-surface border-t border-stone-border/70 pt-3 relative z-10">
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>Workshop mechanical invoices</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>Per-kilometer petrol vouchers</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>Spare part verification tags</li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-emerald-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-secondary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-secondary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-secondary flex items-center justify-center mb-3 shadow-xs border border-emerald-200">
                  <span className="material-symbols-outlined text-xl">folder_special</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">Supporting Documentation</h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Archiving physical slips, stamped vendor receipts, and emergency dispatch log sheets into accessible ledger binders.
                </p>
              </div>
              <ul className="mt-3.5 space-y-1.5 text-[11px] sm:text-xs text-on-surface border-t border-stone-border/70 pt-3 relative z-10">
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>Driver trip sheet logs</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>Patient dispatch handoff slips</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>Physical binder audit trail</li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Card 4 */}
          <ScrollReveal variant="card" delay={450}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-sky-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-sky-600/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center mb-3 shadow-xs border border-sky-200">
                  <span className="material-symbols-outlined text-xl">shield_person</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">Governance &amp; Oversight</h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Committed to SECP compliance (CUIN 0348227), transparent board stewardship, and open accessibility for valley elders.
                </p>
              </div>
              <ul className="mt-3.5 space-y-1.5 text-[11px] sm:text-xs text-on-surface border-t border-stone-border/70 pt-3 relative z-10">
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>SECP non-profit filing status</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>Valley Desk community review</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>Anti-corruption pledge</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
