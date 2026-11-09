"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function AmbulanceGeographicalChallengeSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-[54px] lg:py-[86px] bg-surface-container-low border-b border-stone-border">
      <div className="max-w-[1280px] mx-auto px-2 sm:px-3.5 lg:px-5.5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Challenges */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <ScrollReveal variant="heading" delay={100}>
              <span className="font-label-uppercase text-label-uppercase tracking-wider text-secondary font-bold text-xs block mb-1">
                THE GEOGRAPHICAL CHALLENGE
              </span>
              <h2 className="font-headline-lg text-headline-lg lg:text-headline-lg text-headline-lg-mobile text-primary font-semibold">
                Reaching Hospitals Is Not Easy for Remote Mountain Communities
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="text" delay={200}>
              <div className="font-body-md text-body-md text-on-surface-variant leading-relaxed space-y-2">
                <p>
                  Janglan Valley is surrounded by mountainous terrain, where reaching medical facilities can involve long journeys, steep roads, and difficult travel conditions. For residents of remote villages, access to transportation can become a major barrier when they need to visit a hospital.
                </p>

                {/* Mobile Expandable Note */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden space-y-2 pt-1 font-body-sm text-on-surface-variant">
                    <p>
                      In acute medical situations such as obstructed maternal labor or severe blunt trauma, delayed transfer can lead to irreversible complications. Our high-traction ambulance is equipped to withstand severe ruts, deep mud, and rocky roadbeds where ordinary vehicles fail.
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

            {/* 5 Distinct Challenge Blocks with Designing Background & Glassmorphic Highlights */}
            <ScrollReveal variant="card" delay={250} className="space-y-3 pt-2">
              <div className="relative overflow-hidden p-4 rounded-xl bg-gradient-to-r from-white via-slate-50/80 to-surface-container-lowest border border-stone-border hover:border-emerald-600/30 flex items-start gap-3.5 shadow-xs group transition-all duration-300">
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/[0.06] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
                <div className="relative z-10 w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0 text-primary border border-stone-border group-hover:border-emerald-600/30 transition-colors">
                  <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                </div>
                <div className="relative z-10">
                  <h4 className="font-headline-sm text-headline-sm text-primary text-base font-semibold">Remote Mountain Settlements</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Villages are distributed across isolated ridges with zero municipal taxi or transit access.</p>
                </div>
              </div>

              <div className="relative overflow-hidden p-4 rounded-xl bg-gradient-to-r from-white via-slate-50/80 to-surface-container-lowest border border-stone-border hover:border-sky-600/30 flex items-start gap-3.5 shadow-xs group transition-all duration-300">
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-sky-500/[0.06] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
                <div className="relative z-10 w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0 text-primary border border-stone-border group-hover:border-sky-600/30 transition-colors">
                  <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
                </div>
                <div className="relative z-10">
                  <h4 className="font-headline-sm text-headline-sm text-primary text-base font-semibold">Steep and Unpaved Roads</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Loose gravel, severe gradients, and narrow single-track mountain paths restrict ordinary sedans.</p>
                </div>
              </div>

              <div className="relative overflow-hidden p-4 rounded-xl bg-gradient-to-r from-white via-slate-50/80 to-surface-container-lowest border border-stone-border hover:border-amber-600/30 flex items-start gap-3.5 shadow-xs group transition-all duration-300">
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-500/[0.06] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
                <div className="relative z-10 w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0 text-primary border border-stone-border group-hover:border-amber-600/30 transition-colors">
                  <span className="material-symbols-outlined text-primary text-[20px]">timelapse</span>
                </div>
                <div className="relative z-10">
                  <h4 className="font-headline-sm text-headline-sm text-primary text-base font-semibold">Long Hospital Travel Distances</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Over 35 to 65 kilometers of mountainous transit required to reach district healthcare hubs.</p>
                </div>
              </div>

              <div className="relative overflow-hidden p-4 rounded-xl bg-gradient-to-r from-white via-slate-50/80 to-surface-container-lowest border border-stone-border hover:border-red-600/30 flex items-start gap-3.5 shadow-xs group transition-all duration-300">
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-red-500/[0.06] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
                <div className="relative z-10 w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0 text-primary border border-stone-border group-hover:border-red-600/30 transition-colors">
                  <span className="material-symbols-outlined text-primary text-[20px]">thunderstorm</span>
                </div>
                <div className="relative z-10">
                  <h4 className="font-headline-sm text-headline-sm text-primary text-base font-semibold">Seasonal Monsoon and Landslide Conditions</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Heavy precipitation frequently triggers rockfall, requiring cautious and experienced mountain driving.</p>
                </div>
              </div>

              <div className="relative overflow-hidden p-4 rounded-xl bg-gradient-to-r from-white via-slate-50/80 to-surface-container-lowest border border-stone-border hover:border-cyan-600/30 flex items-start gap-3.5 shadow-xs group transition-all duration-300">
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-cyan-500/[0.06] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
                <div className="relative z-10 w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0 text-primary border border-stone-border group-hover:border-cyan-600/30 transition-colors">
                  <span className="material-symbols-outlined text-primary text-[20px]">ac_unit</span>
                </div>
                <div className="relative z-10">
                  <h4 className="font-headline-sm text-headline-sm text-primary text-base font-semibold">Winter Snow and Difficult Road Access</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Sub-zero temperatures and iced mountain passes demand robust mechanical preparation.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Mountain Road Visual */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="card" delay={250}>
              <div className="relative rounded-2xl overflow-hidden border border-stone-border bg-surface-container shadow-md group">
                <img
                  alt="Severe steep mountain terrain road in Hazara mountain range"
                  className="w-full h-[540px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out h-full"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6ZIijSvdz7PgskI6tzPnYoogzgnRlFzIe-ha-dyx390hEn1dT6xeiOoENb39wwgmy7TTepxn0xdEuQC76ZJibAbbz2ZWYe8OQd6MVpOKE5ViDWhtXqTEY4EmEizJTlWPssvC4wU4vmVzgetEsGzeEipZvPBH3bWiiFZ3JoceuE0pTJx3A3OgQKQbiq4FyKusa2OCUX4CL0v4ZVS51hiTTRbY4qAgQyicRcW4DxJh9EoNTKaKSC_Jq"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/30 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 right-6 text-surface-container-lowest z-10 text-white">
                  <span className="px-2.5 py-1 rounded bg-secondary text-white font-label-uppercase text-label-uppercase text-xs font-bold shadow-xs">
                    Terrain Realities
                  </span>
                  <h4 className="font-headline-md text-headline-md font-semibold mt-2 text-white">Overcoming Physical Isolation</h4>
                  <p className="font-body-sm text-body-sm text-slate-200 mt-1 leading-relaxed">
                    Without this dedicated ambulance van, families must rely on open tractors or hazardous pedestrian carriers during acute distress.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AmbulanceGeographicalChallengeSection;

