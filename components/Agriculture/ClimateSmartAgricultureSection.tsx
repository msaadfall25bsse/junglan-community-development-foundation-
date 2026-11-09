"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function ClimateSmartAgricultureSection() {
  return (
    <section className="py-[54px] md:py-[70px] bg-surface-bright border-b border-stone-border relative overflow-hidden" id="climate-smart">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary uppercase font-bold tracking-widest text-xs block mb-1">
              CLIMATE &amp; RESILIENCE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary font-semibold">
              Building Agricultural Resilience Through Climate Adaptation
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <p className="text-body-md font-body-md text-on-surface-variant mt-3 leading-relaxed">
              Agriculture in mountainous areas depends heavily on local environmental conditions. Sustainable farming approaches and climate-conscious agricultural practices can help communities respond to seasonal changes and environmental challenges.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Feature 1 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-emerald-50/20 p-5 sm:p-6 rounded-2xl border border-stone-border hover:border-emerald-600/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 shadow-xs border border-emerald-200">
                  <span className="material-symbols-outlined text-2xl">cloud_sync</span>
                </div>
                <h3 className="text-lg sm:text-headline-md font-headline-md text-primary font-semibold mb-2">Climate-Resilient Farming</h3>
                <p className="text-xs sm:text-body-md font-body-md text-on-surface-variant leading-relaxed mb-3.5">
                  Local weather awareness, seasonal cropping pattern calibration, and selection of drought-resistant varieties suited for Hazara high-altitude microclimates.
                </p>
              </div>
              <ul className="space-y-2 pt-3.5 border-t border-stone-border/60 text-xs text-on-surface font-medium relative z-10">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-800 text-sm font-bold">done</span>
                  <span>Frost-resistant olive cultivars</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-800 text-sm font-bold">done</span>
                  <span>Phenological season timing</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Feature 2 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-teal-50/20 p-5 sm:p-6 rounded-2xl border border-stone-border hover:border-teal-600/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-teal-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4 shadow-xs border border-teal-200">
                  <span className="material-symbols-outlined text-2xl">landscape</span>
                </div>
                <h3 className="text-lg sm:text-headline-md font-headline-md text-primary font-semibold mb-2">Soil and Land Management</h3>
                <p className="text-xs sm:text-body-md font-body-md text-on-surface-variant leading-relaxed mb-3.5">
                  Terraced embankment stabilization, deep-root perennial plantings to counter monsoon erosion, and organic topsoil enrichment through natural composting.
                </p>
              </div>
              <ul className="space-y-2 pt-3.5 border-t border-stone-border/60 text-xs text-on-surface font-medium relative z-10">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-teal-800 text-sm font-bold">done</span>
                  <span>Contour bunding &amp; terracing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-teal-800 text-sm font-bold">done</span>
                  <span>Organic biomass mulching</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Feature 3 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-sky-50/20 p-5 sm:p-6 rounded-2xl border border-stone-border hover:border-sky-600/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between ui-claymorphic h-full group">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-sky-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-4 shadow-xs border border-sky-200">
                  <span className="material-symbols-outlined text-2xl">water_drop</span>
                </div>
                <h3 className="text-lg sm:text-headline-md font-headline-md text-primary font-semibold mb-2">Sustainable Water Practices</h3>
                <p className="text-xs sm:text-body-md font-body-md text-on-surface-variant leading-relaxed mb-3.5">
                  Gravity-fed water conduit awareness, micro-trench retention, rainwater catchment channels, and low-waste mountain irrigation frameworks.
                </p>
              </div>
              <ul className="space-y-2 pt-3.5 border-t border-stone-border/60 text-xs text-on-surface font-medium relative z-10">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sky-800 text-sm font-bold">done</span>
                  <span>Gravity basin conservation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sky-800 text-sm font-bold">done</span>
                  <span>Seasonal runoff retention</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default ClimateSmartAgricultureSection;

