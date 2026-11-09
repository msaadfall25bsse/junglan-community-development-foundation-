"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function SupportingLocalFarmersSection() {
  return (
    <section className="py-[54px] md:py-[70px] bg-surface-bright border-b border-stone-border relative overflow-hidden" id="farmers">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="max-w-3xl mb-10">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary uppercase font-bold tracking-widest text-xs block mb-1">
              COMMUNITY &amp; FARMERS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary font-semibold">
              Stronger Farmers. Stronger Rural Communities.
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <p className="text-body-md font-body-md text-on-surface-variant mt-3 leading-relaxed">
              Local farmers are essential to the agricultural and economic life of mountain communities. Supporting farmers through relevant agricultural initiatives, improved practices, and sustainable opportunities can contribute to stronger rural livelihoods.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Pillar 1 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-surface-container-lowest via-white to-emerald-50/20 border border-stone-border hover:border-emerald-600/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between ui-minimalist h-full group">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 shadow-xs border border-emerald-200">
                  <span className="material-symbols-outlined text-xl">menu_book</span>
                </div>
                <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-2">Supporting Local Knowledge</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Valuing generations of traditional mountain farming wisdom while introducing sustainable agronomic enhancements that protect natural valley balances.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-border/60 text-xs text-secondary font-semibold relative z-10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span>Honoring Mountain Heritage</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Pillar 2 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-surface-container-lowest via-white to-teal-50/20 border border-stone-border hover:border-teal-600/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between ui-minimalist h-full group">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-teal-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4 shadow-xs border border-teal-200">
                  <span className="material-symbols-outlined text-xl">psychiatry</span>
                </div>
                <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-2">Encouraging Sustainable Practices</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Championing long-term resource stewardship, chemical-free pest deterrence, and climate-adapted tree farming for enduring ecological health.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-border/60 text-xs text-teal-800 font-semibold relative z-10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                <span>Long-Term Resource Care</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Pillar 3 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/20 border border-stone-border hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between ui-minimalist h-full group">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-primary flex items-center justify-center mb-4 shadow-xs border border-blue-200">
                  <span className="material-symbols-outlined text-xl">trending_up</span>
                </div>
                <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-2">Strengthening Rural Livelihoods</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Assisting smallholders in transitioning from vulnerable subsistence cycles toward high-value, recurring generational cash crops like olives.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-border/60 text-xs text-primary font-semibold relative z-10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Generational Prosperity</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default SupportingLocalFarmersSection;

