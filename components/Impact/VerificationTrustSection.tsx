'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from "@/components/home/ScrollReveal";

export default function VerificationTrustSection() {
  return (
    <section className="py-[54px] md:py-[70px] bg-surface border-b border-stone-border relative overflow-hidden" id="verification">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="max-w-3xl mb-10">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
              AUDIT &amp; VERIFICATION
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary font-semibold">
              Strengthening Trust Through Documentation and Verification
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <p className="mt-2 text-xs sm:text-body-md text-on-surface-variant leading-relaxed">
              We maintain an uncompromising distinction between internal operational tracking and formal external third-party audits. Here is how our documentation pipeline operates.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-primary border border-blue-200 font-stat-display font-bold text-xs flex items-center justify-center mb-2.5 shadow-2xs">
                  01
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">Financial Documentation</h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Every Rupee spent is paired with cash payment vouchers, counter-signed mechanic receipts, or supplier invoices.
                </p>
              </div>
              <div className="mt-3.5 pt-2 border-t border-stone-border/70 text-[11px] text-primary font-semibold relative z-10 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">receipt</span> Voucher Backed
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-emerald-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-secondary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-secondary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-secondary border border-emerald-200 font-stat-display font-bold text-xs flex items-center justify-center mb-2.5 shadow-2xs">
                  02
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">Bank Receipt Records</h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Transactions channel through registered institutional banking profiles with monthly statement reconciliations.
                </p>
              </div>
              <div className="mt-3.5 pt-2 border-t border-stone-border/70 text-[11px] text-secondary font-semibold relative z-10 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">account_balance</span> Bank Reconciled
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-amber-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-amber-600/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 border border-amber-200 font-stat-display font-bold text-xs flex items-center justify-center mb-2.5 shadow-2xs">
                  03
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">Operational Logs</h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Driver transit logs document date, patient pickup settlement, destination clinic, and fuel consumed during each emergency run.
                </p>
              </div>
              <div className="mt-3.5 pt-2 border-t border-stone-border/70 text-[11px] text-amber-700 font-semibold relative z-10 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">pin_drop</span> GPS &amp; Trip Verified
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4 */}
          <ScrollReveal variant="card" delay={450}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-sky-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-sky-600/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 border border-sky-200 font-stat-display font-bold text-xs flex items-center justify-center mb-2.5 shadow-2xs">
                  04
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">Reporting &amp; Review</h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Regular internal reviews by foundation trustees provide an organized foundation for future independent external audits.
                </p>
              </div>
              <div className="mt-3.5 pt-2 border-t border-stone-border/70 text-[11px] text-sky-800 font-semibold relative z-10 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">fact_check</span> Board Supervised
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Audit Transparency Disclosure Banner */}
        <ScrollReveal variant="card" delay={500}>
          <div className="mt-8 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-blue-50/70 via-white to-emerald-50/30 border border-primary-container/30 shadow-xs ui-neumorphic-inset">
            <div className="flex items-start gap-3.5">
              <span className="material-symbols-outlined text-primary-container text-2xl mt-0.5 shrink-0">verified</span>
              <div>
                <h4 className="font-headline-sm text-sm sm:text-base text-primary font-semibold">Audit Transparency Disclosure</h4>
                <p className="mt-1 text-xs sm:text-body-sm text-on-surface-variant leading-relaxed">
                  JCDF strictly adheres to truthful reporting. The foundation currently maintains rigorous <strong>internal operational record-keeping, verified bank receipts, and structured expense documentation</strong>. We do not claim completed independent statutory external audits until formal third-party audits are finalized and officially certified under SECP guidelines. All active ledgers and physical voucher files remain open for inspection by partners and community stakeholders at our Valley Desk.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
