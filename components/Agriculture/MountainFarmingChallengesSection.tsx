"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function MountainFarmingChallengesSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-[54px] md:py-[70px] bg-surface border-b border-stone-border relative overflow-hidden" id="challenges">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: 5 Challenge Blocks */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal variant="heading" delay={100}>
              <span className="font-label-uppercase text-label-uppercase text-status-planned uppercase font-bold tracking-widest text-xs block mb-1">
                THE AGRICULTURAL CHALLENGE
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary font-semibold">
                Farming in Mountain Regions Requires Resilience
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="text" delay={200}>
              <div className="space-y-3 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                <p>
                  Mountain farming communities face environmental and geographical challenges that can affect agricultural productivity and rural livelihoods. Changing weather patterns, seasonal rainfall, steep terrain, limited agricultural resources, and access difficulties can make farming more challenging.
                </p>

                {/* Mobile Expandable Note */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden space-y-2 pt-1 font-body-sm text-on-surface-variant">
                    <p>
                      Because topsoil on high slopes easily washes away during flash monsoons, mountain farmers lose months of preparation in hours. JCDF’s agronomy focus equips farmers with stone terrace reinforcement techniques and deep-rooted olive trees that physically anchor steep plots.
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

            {/* 5 Distinct Challenge Blocks */}
            <ScrollReveal variant="card" delay={250} className="space-y-2.5">
              <div className="relative overflow-hidden p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-surface-container-lowest via-white to-amber-50/20 border border-stone-border hover:border-amber-600/40 transition-all duration-300 flex items-center gap-3.5 shadow-xs hover:shadow-sm ui-claymorphic group">
                <span className="w-7 h-7 rounded-full bg-amber-500/10 text-amber-700 border border-amber-300/40 flex items-center justify-center font-bold text-xs shrink-0">
                  01
                </span>
                <div>
                  <h4 className="font-semibold text-primary text-sm font-semibold">Mountainous Terrain</h4>
                  <p className="text-xs text-on-surface-variant">Steep vertical slopes that accelerate topsoil runoff and complicate mechanized field operations.</p>
                </div>
              </div>

              <div className="relative overflow-hidden p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-surface-container-lowest via-white to-orange-50/20 border border-stone-border hover:border-orange-600/40 transition-all duration-300 flex items-center gap-3.5 shadow-xs hover:shadow-sm ui-claymorphic group">
                <span className="w-7 h-7 rounded-full bg-orange-500/10 text-orange-700 border border-orange-300/40 flex items-center justify-center font-bold text-xs shrink-0">
                  02
                </span>
                <div>
                  <h4 className="font-semibold text-primary text-sm font-semibold">Changing Weather Conditions</h4>
                  <p className="text-xs text-on-surface-variant">Unpredictable rainfall cycles, delayed winter snows, and sudden heat spells impacting traditional planting calendars.</p>
                </div>
              </div>

              <div className="relative overflow-hidden p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-surface-container-lowest via-white to-emerald-50/20 border border-stone-border hover:border-emerald-600/40 transition-all duration-300 flex items-center gap-3.5 shadow-xs hover:shadow-sm ui-claymorphic group">
                <span className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-300/40 flex items-center justify-center font-bold text-xs shrink-0">
                  03
                </span>
                <div>
                  <h4 className="font-semibold text-primary text-sm font-semibold">Limited Agricultural Resources</h4>
                  <p className="text-xs text-on-surface-variant">Remote geographic isolation limiting farmer access to certified saplings and quality organic inputs.</p>
                </div>
              </div>

              <div className="relative overflow-hidden p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-surface-container-lowest via-white to-blue-50/20 border border-stone-border hover:border-blue-600/40 transition-all duration-300 flex items-center gap-3.5 shadow-xs hover:shadow-sm ui-claymorphic group">
                <span className="w-7 h-7 rounded-full bg-blue-500/10 text-blue-700 border border-blue-300/40 flex items-center justify-center font-bold text-xs shrink-0">
                  04
                </span>
                <div>
                  <h4 className="font-semibold text-primary text-sm font-semibold">Water Management</h4>
                  <p className="text-xs text-on-surface-variant">Lack of gravity-fed water conduits and rainwater harvesting structures on high-altitude terraced plots.</p>
                </div>
              </div>

              <div className="relative overflow-hidden p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-surface-container-lowest via-white to-red-50/20 border border-stone-border hover:border-red-600/40 transition-all duration-300 flex items-center gap-3.5 shadow-xs hover:shadow-sm ui-claymorphic group">
                <span className="w-7 h-7 rounded-full bg-red-500/10 text-red-700 border border-red-300/40 flex items-center justify-center font-bold text-xs shrink-0">
                  05
                </span>
                <div>
                  <h4 className="font-semibold text-primary text-sm font-semibold">Rural Livelihood Challenges</h4>
                  <p className="text-xs text-on-surface-variant">Vulnerability to seasonal mono-crop failures with limited financial buffers for mountain families.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Hazara terrain visual */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="card" delay={250}>
              <div className="rounded-2xl overflow-hidden border border-stone-border shadow-md bg-surface-container-lowest p-2 group">
                <div className="relative h-[440px] rounded-xl overflow-hidden">
                  <img
                    alt="Hazara mountain terrain and slope conditions showing agricultural challenges"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    src="/hazara-mountain-farming-challenge.jpg"
                  />
                  <div className="absolute inset-0 bg-primary/20 pointer-events-none"></div>
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-navy-deep/90 text-surface p-3.5 rounded-xl backdrop-blur-sm shadow-md border border-white/10">
                    <span className="text-label-uppercase font-label-uppercase text-secondary-fixed uppercase tracking-wider block mb-1 text-xs font-bold">
                      Geographic Context
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      Steep slope contours in Hazara Division require specialized root stabilization and agroforestry strategies to protect smallholder soil from seasonal erosion.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MountainFarmingChallengesSection;

