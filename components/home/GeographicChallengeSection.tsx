import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function GeographicChallengeSection() {
  return (
    <section className="py-12 sm:py-16 bg-surface border-b border-stone-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 xl:gap-24 items-center">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <ScrollReveal variant="heading" delay={100}>
              <span className="text-label-uppercase font-label-uppercase text-secondary uppercase tracking-wider text-xs font-bold block mb-1">
                Geographic Challenge
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-navy-deep leading-tight">
                Ambulance Service Access Challenges in Janglan Valley
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="text" delay={200}>
              <p className="text-sm sm:text-body-md font-body-md text-on-surface-variant mt-3 sm:mt-4 leading-relaxed">
                Janglan Valley sits at an altitude above 1,500 meters. The journey to tertiary medical facilities in Abbottabad or Mansehra traverses unpaved mountain roads frequently compromised by seasonal monsoons, rockslides, and winter snow.
              </p>
              <div className="mt-5 sm:mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-primary font-bold text-xs shrink-0">
                    15+
                  </div>
                  <p className="text-xs sm:text-body-sm font-body-sm text-on-surface">
                    Kilometers of high-grade slope before reaching the paved Karakoram Highway artery.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-primary font-bold text-xs shrink-0">
                    3h
                  </div>
                  <p className="text-xs sm:text-body-sm font-body-sm text-on-surface">
                    Average transfer duration to reach Ayub Teaching Hospital for cardiac or major trauma triage.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Visual Route Schematic Container with Full Background Image & Frosted Glassmorphism - Stable image drops down from top */}
          <ScrollReveal variant="card" delay={250} className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-xl p-5 sm:p-7 group bg-slate-900 w-full min-h-[480px] sm:min-h-[520px] flex flex-col justify-center">
              {/* Full Card Background Image: Mobile vs Desktop */}
              {/* Mobile: New Realistic Suzuki Bolan JCDF Mountain Ambulance Image */}
              <img
                src="/jcdf-mountain-bolan-ambulance.jpg"
                alt="JCDF Emergency Suzuki Bolan 4WD Mountain Ambulance on rough Hazara mountain terrain"
                className="sm:hidden absolute inset-0 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none"
              />
              {/* Desktop / Tablet: Scenic mountain corridor image */}
              <img
                src="/jcdf-mountain-bolan-ambulance.jpg"
                alt="JCDF Emergency Mountain Ambulance navigating Hazara mountain pass"
                className="hidden sm:block absolute inset-0 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none"
              />

              {/* Dark translucent backdrop overlay for enhanced readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-black/80 pointer-events-none" />

              {/* Content Layer with Glassmorphic Frosted Containers */}
              <div className="relative z-10 w-full">
              <div className="flex flex-col xs:flex-row xs:items-center justify-between pb-3 sm:pb-4 border-b border-white/20 mb-4 sm:mb-6 gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-lg sm:text-xl shrink-0">alt_route</span>
                  <span className="font-bold text-white text-xs sm:text-sm md:text-headline-sm drop-shadow-sm leading-tight">
                    Emergency Evacuation Transit Corridor
                  </span>
                </div>
                <div className="self-start xs:self-auto shrink-0">
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white font-mono border border-white/20 shadow-sm whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Hazara KP Route</span>
                  </span>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {/* Node 1: Janglan Valley */}
                <div className="flex items-center gap-3 sm:gap-4 p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 shadow-md">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                    A
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <h4 className="font-semibold text-white text-xs sm:text-body-md truncate drop-shadow-sm">
                        Janglan Valley Base Station
                      </h4>
                      <span className="text-[10px] sm:text-xs font-semibold text-secondary-fixed">Elev: 1,520m</span>
                    </div>
                    <p className="text-[11px] sm:text-body-sm text-slate-200 mt-0.5 leading-snug font-medium">
                      Primary fleet dispatch point; high-roof 4WD ambulance on immediate standby.
                    </p>
                  </div>
                </div>

                {/* Route transit line */}
                <div className="pl-5 sm:pl-7 border-l-2 border-dashed border-white/40 ml-3.5 sm:ml-4 py-1 text-[11px] sm:text-xs text-slate-300 font-mono drop-shadow">
                  ↓ 16 km steep descent via unpaved hill pass (Avg: 1h 15 mins)
                </div>

                {/* Node 2: DHQ Mansehra */}
                <div className="flex items-center gap-3 sm:gap-4 p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 shadow-md">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-bold shrink-0 border border-white/25">
                    B
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <h4 className="font-semibold text-white text-xs sm:text-body-md truncate drop-shadow-sm">
                        DHQ Hospital Mansehra
                      </h4>
                      <span className="text-[10px] sm:text-xs text-slate-300 font-medium">Secondary Care</span>
                    </div>
                    <p className="text-[11px] sm:text-body-sm text-slate-200 mt-0.5 leading-snug font-medium">
                      Emergency stabilization, pediatric intervention, uncomplicated delivery.
                    </p>
                  </div>
                </div>

                {/* Route transit line */}
                <div className="pl-5 sm:pl-7 border-l-2 border-dashed border-white/40 ml-3.5 sm:ml-4 py-1 text-[11px] sm:text-xs text-slate-300 font-mono drop-shadow">
                  ↓ 30 km highway transit towards Abbottabad (Avg: 40 mins)
                </div>

                {/* Node 3: Ayub Teaching Hospital */}
                <div className="flex items-center gap-3 sm:gap-4 p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/25 shadow-md">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                    C
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <h4 className="font-semibold text-white text-xs sm:text-body-md truncate drop-shadow-sm">
                        Ayub Teaching Hospital Abbottabad
                      </h4>
                      <span className="text-[10px] sm:text-xs font-semibold text-secondary-fixed">
                        Tertiary Trauma Center
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-body-sm text-slate-200 mt-0.5 leading-snug font-medium">
                      Major surgical theater, intensive care unit (ICU), comprehensive neonatal care.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default GeographicChallengeSection;
