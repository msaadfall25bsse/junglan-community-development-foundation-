"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function AboutAgricultureSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-[54px] md:py-[70px] bg-surface border-b border-stone-border relative overflow-hidden" id="about">
      {/* Ambient background glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary uppercase font-bold tracking-widest text-xs block mb-1">
              ABOUT OUR WORK
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary font-semibold">
              Strengthening Agriculture in Mountain Communities
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <div className="mt-4 space-y-3 font-body-md text-body-md text-on-surface-variant leading-relaxed">
              <p>
                Agriculture plays an important role in the livelihoods of rural communities across mountainous regions. However, farmers often face challenges related to changing weather conditions, limited agricultural resources, difficult terrain, and access to sustainable farming opportunities. JCDF aims to support agricultural development and strengthen rural communities through practical, locally relevant agricultural initiatives.
              </p>

              {/* Expandable note */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden space-y-2 pt-1 font-body-sm text-on-surface-variant">
                  <p>
                    By introducing organic soil regeneration, testing micro-catchment water channels, and distributing verified olive cultivars suited for frosty winters, we ensure that agricultural progress directly translates into household income.
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Left */}
          <div className="lg:col-span-5 flex flex-col">
            <ScrollReveal variant="card" delay={150} className="h-full">
              <div className="relative rounded-2xl overflow-hidden border border-stone-border flex-1 min-h-[340px] shadow-sm group bg-surface-container-lowest p-2">
                <div className="relative w-full h-full min-h-[320px] rounded-xl overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    alt="A sunlit mountain olive grove in the Hazara highlands featuring olive branches loaded with green olives"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNYIJXEjvzXo0PtafYNrAxXZ7PYBxom5bTpXnTNNTH6dQ-pMzbezWDg1j3Y3vQydFCAgMgM4r-GmA5SnMZxIA05P20Q5mxa5lDJ3KwPEDtWls7MlHwEoDC5eKf8m26OOShdgxr9k_VlPOUpt0ZxVOocsC6VxJF7N0vfj_Rw666x_6SUgpmb-P9Roe8044twvvf9CsZKh07OEBdygC_L7ZPyR2xBNZIFo0jaww0jes"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-navy-deep/90 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-sm shadow-xs border border-white/10">
                    Cultivation Demonstration
                  </div>
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-surface-container-lowest/95 backdrop-blur-md p-2.5 rounded-lg border border-stone-border/80 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                      <div>
                        <p className="font-label-uppercase text-label-uppercase text-secondary uppercase font-bold text-[11px] leading-tight">Field-Tested Olive Cultivation</p>
                        <p className="text-[11px] text-on-surface font-medium leading-tight">Hazara Mountain Terraces • JCDF</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-base">eco</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 3 Supporting Blocks Right */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-3.5">
            <ScrollReveal variant="card" delay={200}>
              <div className="relative overflow-hidden p-[14px] sm:p-4 rounded-xl bg-gradient-to-br from-surface-container-lowest via-white to-emerald-50/20 border border-stone-border hover:border-emerald-600/40 transition-all duration-300 shadow-sm hover:shadow-md ui-claymorphic group">
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                <div className="flex items-start gap-3.5 relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 shadow-xs border border-emerald-200">
                    <span className="material-symbols-outlined text-emerald-800 text-xl">nest_eco_leaf</span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-0.5">Sustainable Agriculture</h3>
                    <p className="text-xs sm:text-body-md font-body-md text-on-surface-variant leading-relaxed">
                      Encouraging farming approaches that support long-term environmental and agricultural sustainability, prioritizing soil health and recurring perennial crops.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="card" delay={300}>
              <div className="relative overflow-hidden p-[14px] sm:p-4 rounded-xl bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/20 border border-stone-border hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md ui-claymorphic group">
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                <div className="flex items-start gap-3.5 relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-primary shrink-0 shadow-xs border border-blue-200">
                    <span className="material-symbols-outlined text-primary text-xl">groups</span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-0.5">Farmer Support</h3>
                    <p className="text-xs sm:text-body-md font-body-md text-on-surface-variant leading-relaxed">
                      Recognizing the needs and challenges of local farming communities, connecting smallholders with tested agroforestry methods and reliable nursery resources.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="card" delay={400}>
              <div className="relative overflow-hidden p-[14px] sm:p-4 rounded-xl bg-gradient-to-br from-surface-container-lowest via-white to-teal-50/20 border border-stone-border hover:border-secondary/40 transition-all duration-300 shadow-sm hover:shadow-md ui-claymorphic group">
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-teal-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                <div className="flex items-start gap-3.5 relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center text-teal-800 shrink-0 shadow-xs border border-teal-200">
                    <span className="material-symbols-outlined text-teal-800 text-xl">filter_drama</span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-0.5">Climate Adaptation</h3>
                    <p className="text-xs sm:text-body-md font-body-md text-on-surface-variant leading-relaxed">
                      Highlighting the importance of agricultural practices suited to changing mountain weather conditions and erratic seasonal precipitation across steep valleys.
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

export default AboutAgricultureSection;

