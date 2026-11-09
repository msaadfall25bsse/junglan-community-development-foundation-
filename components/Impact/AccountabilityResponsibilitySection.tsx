'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from "@/components/home/ScrollReveal";

export default function AccountabilityResponsibilitySection() {
  return (
    <section className="py-[54px] md:py-[70px] bg-surface border-b border-stone-border relative overflow-hidden" id="accountability">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
              OUR COMMITMENT
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary font-semibold">
              Accountability Is Part of Our Responsibility
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <p className="mt-2 text-xs sm:text-body-md text-on-surface-variant leading-relaxed">
              We maintain an uncompromising ethical posture centered on mountain stewardship and civic honesty.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/20 p-5 sm:p-6 rounded-2xl border border-stone-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary flex items-center justify-center mb-4 shadow-xs border border-blue-200">
                  <span className="material-symbols-outlined text-2xl">gavel</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">
                  Honest Reporting
                </h3>
                <p className="mt-2 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Zero exaggeration of field statistics. We report verified patient journeys and verified olive plantings exactly as documented by physical registries, never utilizing inflated projections.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-border/70 text-xs text-primary font-semibold relative z-10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Fact-Checked Operations</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-emerald-50/20 p-5 sm:p-6 rounded-2xl border border-stone-border hover:border-secondary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-secondary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-secondary flex items-center justify-center mb-4 shadow-xs border border-emerald-200">
                  <span className="material-symbols-outlined text-2xl">handshake</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">
                  Responsible Resource Management
                </h3>
                <p className="mt-2 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Direct allocation stewardship. Contributed capital goes directly to operational frontlines: fuel tanks, all-terrain maintenance, driver stipends, and durable planting rootstocks.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-border/70 text-xs text-secondary font-semibold relative z-10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span>Frontline Direct Allocation</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-sky-50/20 p-5 sm:p-6 rounded-2xl border border-stone-border hover:border-sky-600/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-sky-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-4 shadow-xs border border-sky-200">
                  <span className="material-symbols-outlined text-2xl">upgrade</span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">
                  Continuous Improvement
                </h3>
                <p className="mt-2 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Strengthening documentation year-on-year. We are systematically digitizing physical records and preparing our financial structures for formal external statutory audits.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-border/70 text-xs text-sky-800 font-semibold relative z-10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                <span>Audit Pipeline Ready</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
