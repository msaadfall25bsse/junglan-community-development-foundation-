"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function AgriculturalRoadmapSection() {
  return (
    <section className="py-[54px] md:py-[70px] bg-surface border-b border-stone-border relative overflow-hidden" id="roadmap">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary uppercase font-bold tracking-widest text-xs block mb-1">
              OUR APPROACH
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary font-semibold">
              A Practical Path Toward Sustainable Mountain Agriculture
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <p className="text-body-md font-body-md text-on-surface-variant mt-2 leading-relaxed">
              A systematic, four-stage implementation blueprint grounded in frontline valley realities.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Stages Timeline with Spatial Elevation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-10 left-10 right-10 h-0.5 bg-stone-border/80 z-0"></div>

          {/* Stage 01 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-slate-100/30 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-navy-deep/40 transition-all duration-300 relative z-10 flex flex-col justify-between shadow-xs hover:shadow-md h-full ui-spatial-card group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-navy-deep/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-navy-deep text-white flex items-center justify-center font-bold text-xs mb-3.5 border-2 border-surface shadow-xs">
                  01
                </div>
                <span className="text-label-uppercase font-label-uppercase text-secondary uppercase font-bold text-[10px] tracking-wider block mb-1">Inception</span>
                <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-1.5">Understanding Local Needs</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Recognizing soil conditions, farmer challenges, altitude variables, and priorities of mountain smallholders through valley surveys.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/70 text-xs text-on-surface-variant font-medium relative z-10">
                Status: <span className="text-navy-deep font-semibold">Baseline Completed</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Stage 02 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-emerald-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-emerald-600/40 transition-all duration-300 relative z-10 flex flex-col justify-between shadow-xs hover:shadow-md h-full ui-spatial-card group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xs mb-3.5 border-2 border-surface shadow-xs" style={{ background: "#2c694e" }}>
                  02
                </div>
                <span className="text-label-uppercase font-label-uppercase text-secondary uppercase font-bold text-[10px] tracking-wider block mb-1">Methodology</span>
                <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-1.5">Encouraging Sustainable Practices</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Promoting field approaches that preserve mountain topsoil, optimize natural drainage, and eliminate hazardous inputs.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/70 text-xs text-on-surface-variant font-medium relative z-10">
                Status: <span className="text-secondary font-semibold">Active Workshops</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Stage 03 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-amber-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-amber-600/40 transition-all duration-300 relative z-10 flex flex-col justify-between shadow-xs hover:shadow-md h-full ui-spatial-card group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs mb-3.5 border-2 border-surface shadow-xs">
                  03
                </div>
                <span className="text-label-uppercase font-label-uppercase text-amber-700 uppercase font-bold text-[10px] tracking-wider block mb-1">Execution</span>
                <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-1.5">Supporting Agricultural Development</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Nursery piloting, certified climate-adapted sapling provision, and continuous smallholder mentorship on farm plots.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/70 text-xs text-on-surface-variant font-medium relative z-10">
                Status: <span className="text-amber-700 font-semibold">Pilot Rollout</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Stage 04 */}
          <ScrollReveal variant="card" delay={450}>
            <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/20 p-[14px] sm:p-4 rounded-xl border border-stone-border hover:border-primary/40 transition-all duration-300 relative z-10 flex flex-col justify-between shadow-xs hover:shadow-md h-full ui-spatial-card group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs mb-3.5 border-2 border-surface shadow-xs" style={{ background: "#0b4f8c" }}>
                  04
                </div>
                <span className="text-label-uppercase font-label-uppercase text-primary uppercase font-bold text-[10px] tracking-wider block mb-1">Generational Impact</span>
                <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-1.5">Strengthening Long-Term Resilience</h3>
                <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Multi-generational recurring orchard yields, valley-wide olive harvest linkages, and permanent environmental protection.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-border/70 text-xs text-on-surface-variant font-medium relative z-10">
                Status: <span className="text-primary font-semibold">Long-Term Horizon</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default AgriculturalRoadmapSection;

