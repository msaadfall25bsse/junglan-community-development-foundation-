"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function WhyAmbulanceServiceMattersSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-[54px] lg:py-[86px] bg-surface-container-low border-b border-stone-border">
      <div className="max-w-[1280px] mx-auto px-2 sm:px-3.5 lg:px-5.5">
        <div className="max-w-3xl mb-12">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase tracking-wider text-secondary font-bold text-xs block mb-1">
              WHY THIS SERVICE MATTERS
            </span>
            <h2 className="font-headline-lg text-headline-lg lg:text-headline-lg text-headline-lg-mobile text-primary font-semibold">
              A Reliable Journey Can Make a Difference
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <div className="mt-3 font-body-lg text-body-lg text-on-surface-variant leading-relaxed space-y-2">
              <p>
                In isolated mountain settlements, distance is not just measured in kilometers—it is measured in hours of critical care delayed.
              </p>

              {/* Expandable Context */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden space-y-2 pt-1 font-body-md text-on-surface-variant">
                  <p>
                    By providing a reliable, specialized ambulance vehicle that can handle rugged terrain in any season, JCDF bridges the gap between remote villages and essential healthcare facilities. This service protects family dignity, prevents avoidable tragedies, and ensures that emergency transport is available regardless of a family&apos;s financial situation.
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="ui-minimalist relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-white via-sky-50/20 to-surface-container-lowest border border-stone-border hover:border-sky-600/30 flex items-start gap-4 shadow-xs hover:shadow-lg transition-all duration-300 h-full group">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-sky-500/[0.07] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#0b4f8c_1px,transparent_1px)] [background-size:12px_12px]"></div>

              <div className="relative z-10 w-12 h-12 rounded-xl bg-primary-container text-white flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-110 transition-transform duration-300" style={{ background: "#0b4f8c" }}>
                <span className="material-symbols-outlined text-[24px]">local_hospital</span>
              </div>
              <div className="relative z-10">
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Better Access to Hospitals</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                  Helping people reach medical facilities despite geographical barriers, steep elevation drops, and absence of commercial public transport.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="ui-minimalist relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-white via-emerald-50/25 to-surface-container-lowest border border-stone-border hover:border-emerald-600/30 flex items-start gap-4 shadow-xs hover:shadow-lg transition-all duration-300 h-full group">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/[0.07] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#1e5631_1px,transparent_1px)] [background-size:12px_12px]"></div>

              <div className="relative z-10 w-12 h-12 rounded-xl bg-secondary text-white flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-110 transition-transform duration-300" style={{ background: "#2c694e" }}>
                <span className="material-symbols-outlined text-[24px]">family_restroom</span>
              </div>
              <div className="relative z-10">
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Support for Remote Families</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                  Reducing transportation difficulties for people living far from main roads, allowing pregnant mothers and elderly residents peace of mind.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="ui-minimalist relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-white via-indigo-50/20 to-surface-container-lowest border border-stone-border hover:border-indigo-600/30 flex items-start gap-4 shadow-xs hover:shadow-lg transition-all duration-300 h-full group">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-500/[0.07] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#4338ca_1px,transparent_1px)] [background-size:12px_12px]"></div>

              <div className="relative z-10 w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[24px]">volunteer_activism</span>
              </div>
              <div className="relative z-10">
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Community Assistance</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                  Supporting individuals and families who have limited transportation options through local civic stewardship without financial exploitation.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4 */}
          <ScrollReveal variant="card" delay={450}>
            <div className="ui-minimalist relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-white via-slate-100/50 to-surface-container-lowest border border-stone-border hover:border-slate-600/30 flex items-start gap-4 shadow-xs hover:shadow-lg transition-all duration-300 h-full group">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-navy-deep/[0.07] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#081a2d_1px,transparent_1px)] [background-size:12px_12px]"></div>

              <div className="relative z-10 w-12 h-12 rounded-xl bg-navy-deep text-white flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[24px]">published_with_changes</span>
              </div>
              <div className="relative z-10">
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Continued Service Commitment</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                  Maintaining transportation support for the communities served by JCDF through continuous vehicle maintenance, driver readiness, and transparent governance.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default WhyAmbulanceServiceMattersSection;

