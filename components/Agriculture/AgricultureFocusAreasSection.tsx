"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function AgricultureFocusAreasSection() {
  return (
    <section className="py-[54px] md:py-[70px] bg-surface-bright border-b border-stone-border relative overflow-hidden" id="focus-areas">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="max-w-2xl mb-10">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary uppercase font-bold tracking-widest text-xs block mb-1">
              WHAT WE FOCUS ON
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary font-semibold">
              Practical Approaches to Stronger Agriculture
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <p className="text-body-md font-body-md text-on-surface-variant mt-2 leading-relaxed">
              Four foundational pillars designed specifically for high-altitude mountain topography and smallholder farming contexts.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="ui-bento-card relative overflow-hidden h-full p-[14px] sm:p-4 rounded-xl bg-gradient-to-br from-surface-container-lowest via-white to-emerald-50/20 border border-stone-border hover:border-emerald-600/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3.5 shadow-xs border border-emerald-200">
                  <span className="material-symbols-outlined text-xl">potted_plant</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10.5px] font-label-uppercase bg-emerald-100 text-emerald-800 font-bold uppercase tracking-wider inline-block mb-2">
                  Pillar 01
                </span>
                <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-1.5">Sustainable Farming</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Promoting responsible agricultural practices that support productive farmland and long-term sustainability through low-impact soil cultivation.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-stone-border/60 flex items-center text-xs font-semibold text-secondary relative z-10">
                <span>Soil Vitality &amp; Composting</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="ui-bento-card relative overflow-hidden h-full p-[14px] sm:p-4 rounded-xl bg-gradient-to-br from-surface-container-lowest via-white to-sky-50/20 border border-stone-border hover:border-sky-600/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center mb-3.5 shadow-xs border border-sky-200">
                  <span className="material-symbols-outlined text-xl">thermostat</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10.5px] font-label-uppercase bg-sky-100 text-sky-800 font-bold uppercase tracking-wider inline-block mb-2">
                  Pillar 02
                </span>
                <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-1.5">Climate Adaptation</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Highlighting agricultural approaches that help rural farmers respond to changing weather, seasonal rainfall shifts, and mountain frost patterns.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-stone-border/60 flex items-center text-xs font-semibold text-sky-800 relative z-10">
                <span>Microclimate Adaptation</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="ui-bento-card relative overflow-hidden h-full p-[14px] sm:p-4 rounded-xl bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/20 border border-stone-border hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-primary flex items-center justify-center mb-3.5 shadow-xs border border-blue-200">
                  <span className="material-symbols-outlined text-xl">psychology</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10.5px] font-label-uppercase bg-blue-100 text-primary font-bold uppercase tracking-wider inline-block mb-2">
                  Pillar 03
                </span>
                <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-1.5">Farmer Development</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Supporting opportunities for farmers to strengthen their agricultural knowledge, field practices, and sustainable livelihood security.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-stone-border/60 flex items-center text-xs font-semibold text-primary relative z-10">
                <span>Knowledge Exchange</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4 */}
          <ScrollReveal variant="card" delay={450}>
            <div className="ui-bento-card relative overflow-hidden h-full p-[14px] sm:p-4 rounded-xl bg-gradient-to-br from-surface-container-lowest via-white to-teal-50/20 border border-stone-border hover:border-teal-600/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-teal-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-3.5 shadow-xs border border-teal-200">
                  <span className="material-symbols-outlined text-xl">spa</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10.5px] font-label-uppercase bg-teal-100 text-teal-800 font-bold uppercase tracking-wider inline-block mb-2">
                  Pillar 04
                </span>
                <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-1.5">Agricultural Resources</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Emphasizing the importance of suitable seeds, high-grade saplings, community nursery resources, and practical agronomy guidance.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-stone-border/60 flex items-center text-xs font-semibold text-teal-800 relative z-10">
                <span>Certified Nurseries</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default AgricultureFocusAreasSection;

