"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function AgriculturalImpactMetricsSection() {
  return (
    <section className="py-[54px] md:py-[70px] bg-surface-bright border-b border-stone-border relative overflow-hidden" id="impact-metrics">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary uppercase font-bold tracking-widest text-xs block mb-1">
              OUR COMMUNITY IMPACT
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary font-semibold">
              Measuring Progress in Agricultural Development
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <p className="text-body-md font-body-md text-on-surface-variant mt-2 leading-relaxed">
              Transparent metrics representing verified field engagement and planned institutional commitments in Junglan Valley.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stat Card 1 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-emerald-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-emerald-600/40 transition-all duration-300 shadow-xs hover:shadow-md text-center flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl font-stat-display text-secondary tracking-tight font-extrabold">50+</div>
                <h4 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mt-1">Smallholder Farmers</h4>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
                  Enrolled in sustainable agroforestry awareness &amp; orchard training cohorts.
                </p>
              </div>
              <div className="mt-3.5 inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-label-uppercase bg-emerald-100 text-emerald-800 font-bold uppercase tracking-wider self-center border border-emerald-200 relative z-10 shadow-2xs">
                Active Valley Cohort
              </div>
            </div>
          </ScrollReveal>

          {/* Stat Card 2 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-teal-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-teal-600/40 transition-all duration-300 shadow-xs hover:shadow-md text-center flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-teal-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl font-stat-display text-teal-800 tracking-tight font-extrabold">5,000+</div>
                <h4 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mt-1">Saplings Targeted</h4>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
                  Planned for phased distribution under certified olive nursery framework.
                </p>
              </div>
              <div className="mt-3.5 inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-label-uppercase bg-teal-100 text-teal-800 font-bold uppercase tracking-wider self-center border border-teal-200 relative z-10 shadow-2xs">
                Phased Target
              </div>
            </div>
          </ScrollReveal>

          {/* Stat Card 3 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-sky-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-sky-600/40 transition-all duration-300 shadow-xs hover:shadow-md text-center flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl font-stat-display text-sky-800 tracking-tight font-extrabold">4+</div>
                <h4 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mt-1">Core Valley Hamlets</h4>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
                  Directly supported across Junglan agricultural corridors and hillside settlements.
                </p>
              </div>
              <div className="mt-3.5 inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-label-uppercase bg-sky-100 text-sky-800 font-bold uppercase tracking-wider self-center border border-sky-200 relative z-10 shadow-2xs">
                Hazara Reach
              </div>
            </div>
          </ScrollReveal>

          {/* Stat Card 4 */}
          <ScrollReveal variant="card" delay={450}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md text-center flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl font-stat-display text-primary tracking-tight font-extrabold">100%</div>
                <h4 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mt-1">Audit Verified</h4>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
                  Donor funds tracked with zero diversion under SECP Section 42 standards.
                </p>
              </div>
              <div className="mt-3.5 inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-label-uppercase bg-blue-100 text-primary font-bold uppercase tracking-wider self-center border border-blue-200 relative z-10 shadow-2xs">
                SECP Certified
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default AgriculturalImpactMetricsSection;

