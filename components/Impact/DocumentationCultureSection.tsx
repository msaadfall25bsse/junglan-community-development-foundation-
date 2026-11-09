'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from "@/components/home/ScrollReveal";

export default function DocumentationCultureSection() {
  return (
    <section className="py-[54px] md:py-[70px] bg-surface-container-lowest border-b border-stone-border relative overflow-hidden" id="culture">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="max-w-3xl mb-10">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
              DOCUMENTATION &amp; PROGRESS
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary font-semibold">
              Building a Stronger Culture of Documentation
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <p className="mt-2 text-xs sm:text-body-md text-on-surface-variant leading-relaxed">
              From grassroots volunteer response to structured administrative protocols: how our record-keeping systems evolved over time.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-7 left-12 right-12 h-0.5 bg-stone-border/80 z-0"></div>

          {/* Stage 1 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="relative z-10 bg-gradient-to-br from-surface-container-low via-white to-blue-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md h-full flex flex-col justify-between ui-spatial-card group">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-surface-container-lowest border-2 border-primary flex items-center justify-center font-bold text-xs sm:text-sm text-primary shadow-xs mb-3.5 group-hover:scale-110 transition-transform duration-300">
                  2018
                </div>
                <span className="text-[10.5px] font-bold text-secondary tracking-wider block font-label-uppercase uppercase mb-1">
                  FOUNDING MILESTONE
                </span>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">
                  Ambulance Service Established
                </h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Emergency rescue service launched in Junglan Valley to solve acute patient transit delays on difficult mountain roads.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/70 text-[11px] text-primary font-semibold relative z-10">
                Phase: First Mountain Unit
              </div>
            </div>
          </ScrollReveal>

          {/* Stage 2 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="relative z-10 bg-gradient-to-br from-surface-container-low via-white to-slate-100/30 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-stone-border/90 transition-all duration-300 shadow-xs hover:shadow-md h-full flex flex-col justify-between ui-spatial-card group">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-surface-container-lowest border-2 border-outline-variant flex items-center justify-center font-semibold text-xs sm:text-sm text-on-surface-variant shadow-xs mb-3.5 group-hover:scale-110 transition-transform duration-300">
                  18-23
                </div>
                <span className="text-[10.5px] font-bold text-on-surface-variant tracking-wider block font-label-uppercase uppercase mb-1">
                  COMMUNITY PHASE
                </span>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">
                  Early Operational Period
                </h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Community-driven volunteer dispatch operations. Basic informal records kept by local drivers and village coordinators.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/70 text-[11px] text-on-surface-variant font-semibold relative z-10">
                Phase: Community Volunteer Logs
              </div>
            </div>
          </ScrollReveal>

          {/* Stage 3 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="relative z-10 bg-gradient-to-br from-surface-container-low via-white to-emerald-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-secondary/40 transition-all duration-300 shadow-xs hover:shadow-md h-full flex flex-col justify-between ui-spatial-card group">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs mb-3.5 group-hover:scale-110 transition-transform duration-300 border-2 border-surface">
                  2024
                </div>
                <span className="text-[10.5px] font-bold text-secondary tracking-wider block font-label-uppercase uppercase mb-1">
                  STANDARDIZATION
                </span>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">
                  Improved Documentation
                </h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Transitioned to structured trip sheets, standardized expense vouchers, organized fuel receipts, and formalized records.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/70 text-[11px] text-secondary font-semibold relative z-10">
                Phase: Standardized Vouchers
              </div>
            </div>
          </ScrollReveal>

          {/* Stage 4 */}
          <ScrollReveal variant="card" delay={450}>
            <div className="relative z-10 bg-gradient-to-br from-surface-container-low via-white to-blue-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md h-full flex flex-col justify-between ui-spatial-card group">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs mb-3.5 group-hover:scale-110 transition-transform duration-300 border-2 border-surface">
                  25-26
                </div>
                <span className="text-[10.5px] font-bold text-primary tracking-wider block font-label-uppercase uppercase mb-1">
                  INSTITUTIONAL SCALE
                </span>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">
                  Ongoing Transparency Pipeline
                </h3>
                <p className="mt-1.5 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Centralized tracking of maintenance logs, open public disclosure, SECP compliance filings, and external audit readiness.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/70 text-[11px] text-primary font-semibold relative z-10">
                Phase: Audit Pipeline Active
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
