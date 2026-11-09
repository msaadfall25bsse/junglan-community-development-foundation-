"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function AmbulanceRouteSection() {
  return (
    <section className="py-[54px] lg:py-[86px] bg-surface-container-lowest border-b border-stone-border" id="route">
      <div className="max-w-[1280px] mx-auto px-2 sm:px-3.5 lg:px-5.5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase tracking-wider text-secondary font-bold text-xs block mb-1">
              OUR TRANSPORTATION NETWORK
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-semibold">
              Connecting Remote Communities to Medical Facilities
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
              Clear transit corridor supporting patient journeys from mountain hamlets toward regional medical centers.
            </p>
          </ScrollReveal>
        </div>

        {/* 3-Stop Visual Pipeline with Spatial 3D Card Depth & Designing Background */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[3px] bg-stone-border -translate-y-12 z-0"></div>

          {/* Stop 1 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="ui-spatial-card relative z-10 overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-white via-emerald-50/25 to-surface-container-lowest border-2 border-primary shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
              {/* Subtle background glow & texture */}
              <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-emerald-500/[0.08] rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#1e5631_1px,transparent_1px)] [background-size:12px_12px]"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-headline-sm shadow-xs group-hover:scale-110 transition-transform duration-300">01</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-status-active/10 text-status-active font-label-uppercase text-label-uppercase text-xs font-bold">
                    Primary Hub
                  </span>
                </div>
                <span className="font-label-uppercase text-label-uppercase text-outline text-[11px] font-semibold block">STARTING POINT</span>
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mt-1">Janglan Valley</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  Community Ambulance Base Station in Tehsil Baffa Pakhal. Serving remote rural homesteads and mountain settlements directly.
                </p>
              </div>
              <div className="relative z-10 mt-6 pt-4 border-t border-stone-border flex items-center justify-between font-body-sm text-body-sm text-outline">
                <span className="flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[16px]">altitude</span> Elevation: 1,450m
                </span>
                <span className="text-primary font-bold">Origin</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Stop 2 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="ui-spatial-card relative z-10 overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-white via-sky-50/30 to-surface-container-lowest border border-stone-border hover:border-primary shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
              {/* Subtle background glow & texture */}
              <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-[#0b4f8c]/[0.08] rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#0b4f8c_1px,transparent_1px)] [background-size:12px_12px]"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-full bg-surface-container text-primary border border-stone-border flex items-center justify-center font-bold text-headline-sm shadow-xs group-hover:scale-110 transition-transform duration-300">02</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-uppercase text-label-uppercase text-xs font-semibold">
                    District Care
                  </span>
                </div>
                <span className="font-label-uppercase text-label-uppercase text-outline text-[11px] font-semibold block">INTERMEDIATE DESTINATION</span>
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mt-1">DHQ Hospital Mansehra</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  District Headquarters Hospital providing primary surgical triage, obstetrics, trauma stabilization, and critical emergency medicine.
                </p>
              </div>
              <div className="relative z-10 mt-6 pt-4 border-t border-stone-border flex items-center justify-between font-body-sm text-body-sm text-outline">
                <span className="flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[16px]">distance</span> ~35 km Transit
                </span>
                <span className="text-secondary font-bold">Active Lane</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Stop 3 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="ui-spatial-card relative z-10 overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-white via-indigo-50/25 to-surface-container-lowest border border-stone-border hover:border-primary shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
              {/* Subtle background glow & texture */}
              <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-indigo-500/[0.08] rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#4338ca_1px,transparent_1px)] [background-size:12px_12px]"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-full bg-surface-container text-primary border border-stone-border flex items-center justify-center font-bold text-headline-sm shadow-xs group-hover:scale-110 transition-transform duration-300">03</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary font-label-uppercase text-label-uppercase text-xs font-bold">
                    Tertiary Complex
                  </span>
                </div>
                <span className="font-label-uppercase text-label-uppercase text-outline text-[11px] font-semibold block">FURTHER REFERRAL DESTINATION</span>
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mt-1">Ayub Teaching Hospital</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  Major regional tertiary care university complex in Abbottabad for advanced intensive care, neurology, and complex neonatal operations.
                </p>
              </div>
              <div className="relative z-10 mt-6 pt-4 border-t border-stone-border flex items-center justify-between font-body-sm text-body-sm text-outline">
                <span className="flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[16px]">distance</span> ~65 km Transit
                </span>
                <span className="text-secondary font-bold">Referral Base</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default AmbulanceRouteSection;

