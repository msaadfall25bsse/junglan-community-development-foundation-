"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function NurseryDevelopmentSection() {
  return (
    <section className="py-[54px] md:py-[70px] bg-surface border-b border-stone-border relative overflow-hidden" id="nursery">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Visual Showcase Left */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <ScrollReveal variant="card" delay={150}>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="rounded-xl overflow-hidden border border-stone-border h-60 shadow-sm group bg-surface-container-lowest p-1.5">
                  <div className="w-full h-full rounded-lg overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      alt="Close-up macro photography of healthy young olive saplings in black nursery poly-bags"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9BVt5SR2GAl70WvIVzRoeDJgoSFyxgOovFku9GWjTgZPCUBJBxI2_iVlFIOggo3-4kKBHI93TUSj4m7PI5ss8OAeCGyI2V8q0sqO29RT8RckQsnBGSYR9djPRXBKgxwn5EsY3MTQisnfWwfw6A4MpIth3UpkCLR-PjKzir3Ox_2gifhP9jps44XMbghkmgE-oSGWtMV9X4GFg1wTfhDHyb9U19bthz4WM6kLzzD0"
                    />
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-stone-border h-60 shadow-sm mt-5 group bg-surface-container-lowest p-1.5">
                  <div className="w-full h-full rounded-lg overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      alt="Bottles of freshly pressed extra virgin olive oil displayed on a rustic wooden table"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIh03V_Uh9fb-XpZ27pa2qXvNAkVX1Wm9hcEgcsKRNXDSOqFXyG95BBFZtP7K_WUc7Xsdu_IMdieBMeu_jv0G0nsPnCCjxDMNrT3sPV075CXfiUGeMCRiKDHlGVNB5I8SeqbUX-TqVxu8w4OcyId0uzEYQNBpyl4J9OPlzHegT9fbm6QweXffhivWUAa4zsYd-LBvt_hwDETawcLiaYxUYJOGXKd2zaeAZfmdmRmU"
                    />
                  </div>
                </div>
              </div>
              {/* Verified tag */}
              <div className="mt-3.5 p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-surface-container-lowest via-white to-emerald-50/30 border border-stone-border flex items-center justify-between text-xs text-on-surface shadow-xs ui-claymorphic">
                <span className="font-medium text-primary">Nursery Standard: Verified Cultivars (Arbequina &amp; Picual adapted)</span>
                <span className="font-bold text-secondary shrink-0 ml-2">Phase 1 Nursery Pilot</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Content Right */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <ScrollReveal variant="heading" delay={100}>
              <span className="font-label-uppercase text-label-uppercase text-secondary uppercase font-bold tracking-widest text-xs block mb-1">
                GREEN GROWTH INITIATIVES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary font-semibold">
                Encouraging Agricultural Growth Through Nursery Development
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="text" delay={200}>
              <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                Nursery development and access to suitable saplings can play an important role in supporting rural agriculture, vegetation, and sustainable land use across mountain slopes.
              </p>

              <div className="space-y-3 mt-4">
                <div className="relative overflow-hidden p-3 rounded-xl bg-gradient-to-r from-surface-container-lowest via-white to-emerald-50/20 border border-stone-border hover:border-emerald-600/40 transition-all duration-300 shadow-xs flex items-start gap-3.5 ui-claymorphic group">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5 shadow-xs border border-emerald-200">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm font-semibold">Certified Climate-Adapted Saplings</h4>
                    <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant">Selecting olive (Zaitoon) and fruit cultivars that thrive specifically within the 3,000–5,000 ft altitude bracket of Hazara.</p>
                  </div>
                </div>

                <div className="relative overflow-hidden p-3 rounded-xl bg-gradient-to-r from-surface-container-lowest via-white to-teal-50/20 border border-stone-border hover:border-teal-600/40 transition-all duration-300 shadow-xs flex items-start gap-3.5 ui-claymorphic group">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-800 shrink-0 mt-0.5 shadow-xs border border-teal-200">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm font-semibold">Smallholder Sapling Distribution</h4>
                    <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant">Providing verified young trees directly to terraced landholders with hands-on planting and pruning guidance.</p>
                  </div>
                </div>

                <div className="relative overflow-hidden p-3 rounded-xl bg-gradient-to-r from-surface-container-lowest via-white to-sky-50/20 border border-stone-border hover:border-sky-600/40 transition-all duration-300 shadow-xs flex items-start gap-3.5 ui-claymorphic group">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-800 shrink-0 mt-0.5 shadow-xs border border-sky-200">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm font-semibold">Permanent Canopy Restoration</h4>
                    <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant">Converting barren degraded hillsides into productive, long-term perennial agroforestry corridors.</p>
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

export default NurseryDevelopmentSection;

