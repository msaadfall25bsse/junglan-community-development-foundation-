"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function WhyAgricultureMattersSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-[54px] md:py-[70px] bg-surface-bright border-b border-stone-border relative overflow-hidden" id="why-matters">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary uppercase font-bold tracking-widest text-xs block mb-1">
              WHY AGRICULTURE MATTERS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary font-semibold">
              Investing in Agriculture Means Investing in Communities
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <div className="mt-2 font-body-md text-body-md text-on-surface-variant leading-relaxed space-y-2">
              <p>
                Agricultural stewardship produces cascading benefits that ripple throughout mountain society for decades.
              </p>

              {/* Mobile Expandable Note */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden space-y-2 pt-1 font-body-sm text-on-surface-variant">
                  <p>
                    Rather than short-term relief handouts, agroforestry establishes living capital. A single olive grove produces recurring harvest income for hundreds of years while preventing mountainside mudslides and creating dignified self-employment for youth.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors pt-1 cursor-pointer focus:outline-none"
              >
                <span>{isExpanded ? "Show Less" : "See More"}</span>
                <span
                  className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                >
                  expand_more
                </span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="relative overflow-hidden p-[14px] sm:p-4 rounded-xl bg-gradient-to-br from-surface-container-lowest via-white to-emerald-50/20 border border-stone-border hover:border-emerald-600/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-minimalist h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 shadow-xs border border-emerald-200">
                  <span className="material-symbols-outlined text-lg">cottage</span>
                </div>
                <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-1.5">Rural Livelihoods</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Supporting family security and economic independence through high-value olive oil and fruit yields that buffer against inflation.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/60 text-xs text-secondary font-semibold relative z-10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span>Household Stability</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="relative overflow-hidden p-[14px] sm:p-4 rounded-xl bg-gradient-to-br from-surface-container-lowest via-white to-teal-50/20 border border-stone-border hover:border-teal-600/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-minimalist h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-teal-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-3 shadow-xs border border-teal-200">
                  <span className="material-symbols-outlined text-lg">forest</span>
                </div>
                <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-1.5">Environmental Sustainability</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Stabilizing steep hillsides, countering monsoon erosion, and preserving clean watershed runoff for downstream settlements.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/60 text-xs text-teal-800 font-semibold relative z-10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                <span>Watershed Protection</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="relative overflow-hidden p-[14px] sm:p-4 rounded-xl bg-gradient-to-br from-surface-container-lowest via-white to-sky-50/20 border border-stone-border hover:border-sky-600/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-minimalist h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center mb-3 shadow-xs border border-sky-200">
                  <span className="material-symbols-outlined text-lg">shield</span>
                </div>
                <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-1.5">Community Resilience</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Building localized food sovereignty and revenue networks that insulate remote communities from broader economic disruptions.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/60 text-xs text-sky-800 font-semibold relative z-10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                <span>Local Sovereignty</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4 */}
          <ScrollReveal variant="card" delay={450}>
            <div className="relative overflow-hidden p-[14px] sm:p-4 rounded-xl bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/20 border border-stone-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between ui-minimalist h-full group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-primary flex items-center justify-center mb-3 shadow-xs border border-blue-200">
                  <span className="material-symbols-outlined text-lg">hourglass_top</span>
                </div>
                <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-1.5">Sustainable Future</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Planting generational trees that survive for centuries, ensuring today&apos;s stewardship nourishes children and grandchildren.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/60 text-xs text-primary font-semibold relative z-10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Centuries of Harvest</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default WhyAgricultureMattersSection;

