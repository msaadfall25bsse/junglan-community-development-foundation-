"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function AmbulanceImpactSection() {
  return (
    <section className="py-[54px] lg:py-[86px] bg-surface-container-lowest border-b border-stone-border" id="impact">
      <div className="max-w-[1280px] mx-auto px-2 sm:px-3.5 lg:px-5.5">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase tracking-wider text-secondary font-bold text-xs block mb-1">
              OUR COMMUNITY IMPACT
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-semibold">
              Making Medical Transportation More Accessible
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
              Transparent records documenting actual community relief delivered to families across Janglan Valley.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Verified Stat Cards with Claymorphic & Designing Backgrounds */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ScrollReveal variant="card" delay={150}>
            <div className="ui-claymorphic relative overflow-hidden p-8 bg-gradient-to-br from-white via-sky-50/20 to-surface-container-low border border-stone-border hover:border-sky-600/30 text-center flex flex-col justify-center h-full group hover:shadow-lg transition-all duration-300">
              {/* Subtle background aura & texture */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-sky-500/[0.07] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#0b4f8c_1px,transparent_1px)] [background-size:12px_12px]"></div>

              <div className="relative z-10">
                <span className="font-stat-display text-stat-display text-primary font-bold block group-hover:scale-105 transition-transform duration-300">~450</span>
                <span className="font-label-md text-label-md text-primary mt-2 font-bold block">People Transported</span>
                <p className="font-body-sm text-body-sm text-outline mt-1 leading-relaxed">
                  Estimated record over ~2.5 years of active emergency logs
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="card" delay={250}>
            <div className="ui-claymorphic relative overflow-hidden p-8 bg-gradient-to-br from-white via-emerald-50/20 to-surface-container-low border border-stone-border hover:border-emerald-600/30 text-center flex flex-col justify-center h-full group hover:shadow-lg transition-all duration-300">
              {/* Subtle background aura & texture */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/[0.07] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#1e5631_1px,transparent_1px)] [background-size:12px_12px]"></div>

              <div className="relative z-10">
                <span className="font-stat-display text-stat-display text-primary font-bold block group-hover:scale-105 transition-transform duration-300">4+</span>
                <span className="font-label-md text-label-md text-primary mt-2 font-bold block">Core Settlements</span>
                <p className="font-body-sm text-body-sm text-outline mt-1 leading-relaxed">
                  Directly covering Janglan Valley and adjacent mountain hamlets
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="card" delay={350}>
            <div className="ui-claymorphic relative overflow-hidden p-8 bg-gradient-to-br from-white via-emerald-50/30 to-surface-container-low border border-stone-border hover:border-emerald-600/40 text-center flex flex-col justify-center h-full group hover:shadow-lg transition-all duration-300">
              {/* Subtle background aura & texture */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-secondary/[0.09] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#2c694e_1px,transparent_1px)] [background-size:12px_12px]"></div>

              <div className="relative z-10">
                <span className="font-stat-display text-stat-display text-secondary font-bold block group-hover:scale-105 transition-transform duration-300">Since 2018</span>
                <span className="font-label-md text-label-md text-primary mt-2 font-bold block">Continuous Operation</span>
                <p className="font-body-sm text-body-sm text-outline mt-1 leading-relaxed">
                  Years of dedicated, uninterrupted community volunteer service
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="card" delay={450}>
            <div className="ui-claymorphic relative overflow-hidden p-8 bg-gradient-to-br from-white via-red-50/20 to-surface-container-low border border-stone-border hover:border-red-600/30 text-center flex flex-col justify-center h-full group hover:shadow-lg transition-all duration-300">
              {/* Subtle background aura & texture */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-red-500/[0.07] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#ba1a1a_1px,transparent_1px)] [background-size:12px_12px]"></div>

              <div className="relative z-10">
                <span className="font-stat-display text-stat-display text-primary font-bold block group-hover:scale-105 transition-transform duration-300">24/7</span>
                <span className="font-label-md text-label-md text-primary mt-2 font-bold block">Patient Readiness</span>
                <p className="font-body-sm text-body-sm text-outline mt-1 leading-relaxed">
                  On-call patient transportation assistance day and night
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="text" delay={500}>
          <div className="mt-8 p-4 rounded-xl bg-surface-container border border-stone-border text-center">
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center justify-center gap-2 font-medium">
              <span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
              Transparency Note: Figures represent estimated operational transportation logs recorded across Janglan Valley.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default AmbulanceImpactSection;

