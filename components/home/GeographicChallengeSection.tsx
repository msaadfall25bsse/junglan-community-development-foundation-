import React from "react";

export function GeographicChallengeSection() {
  return (
    <section className="py-12 sm:py-16 bg-surface border-b border-stone-border">
      <div className="max-w-7xl mx-auto px-[10px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-label-uppercase font-label-uppercase text-secondary uppercase tracking-wider text-xs">
              Geographic Challenge
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-navy-deep mt-1 leading-tight">
              Healthcare Access Challenges in Junglan Valley
            </h2>
            <p className="text-sm sm:text-body-md font-body-md text-on-surface-variant mt-3 sm:mt-4 leading-relaxed">
              Junglan Valley sits at an altitude above 1,500 meters. The journey to tertiary medical facilities in Abbottabad or Mansehra traverses unpaved mountain roads frequently compromised by seasonal monsoons, rockslides, and winter snow.
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
          </div>

          {/* Visual Route Schematic Container (100% exact from index.html) */}
          <div className="lg:col-span-7 bg-surface-container-lowest border border-stone-border rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-stone-border mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-lg sm:text-xl">alt_route</span>
                <span className="font-bold text-primary text-sm sm:text-headline-sm">
                  Emergency Evacuation Transit Corridor
                </span>
              </div>
              <span className="text-[10px] sm:text-xs bg-surface-container-high px-2 py-0.5 sm:py-1 rounded text-on-surface-variant font-mono">
                Hazara KP Route
              </span>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {/* Node 1: Junglan Valley */}
              <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-surface-container-low border border-stone-border">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <h4 className="font-bold text-primary text-xs sm:text-body-md truncate">
                      Junglan Valley Base Station
                    </h4>
                    <span className="text-[10px] sm:text-xs font-semibold text-secondary">Elev: 1,520m</span>
                  </div>
                  <p className="text-[11px] sm:text-body-sm text-on-surface-variant mt-0.5">
                    Primary fleet dispatch point; high-roof 4WD ambulance on immediate standby.
                  </p>
                </div>
              </div>

              {/* Route transit line */}
              <div className="pl-5 sm:pl-7 border-l-2 border-dashed border-stone-border ml-3.5 sm:ml-4 py-1 text-[11px] sm:text-xs text-on-surface-variant font-mono">
                ↓ 16 km steep descent via unpaved hill pass (Avg: 1h 15 mins)
              </div>

              {/* Node 2: DHQ Mansehra */}
              <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-surface-container-lowest border border-stone-border">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center text-xs font-bold shrink-0">
                  B
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <h4 className="font-bold text-primary text-xs sm:text-body-md truncate">
                      DHQ Hospital Mansehra
                    </h4>
                    <span className="text-[10px] sm:text-xs text-on-surface-variant">Secondary Care</span>
                  </div>
                  <p className="text-[11px] sm:text-body-sm text-on-surface-variant mt-0.5">
                    Emergency stabilization, pediatric intervention, uncomplicated delivery.
                  </p>
                </div>
              </div>

              {/* Route transit line */}
              <div className="pl-5 sm:pl-7 border-l-2 border-dashed border-stone-border ml-3.5 sm:ml-4 py-1 text-[11px] sm:text-xs text-on-surface-variant font-mono">
                ↓ 30 km highway transit towards Abbottabad (Avg: 40 mins)
              </div>

              {/* Node 3: Ayub Teaching Hospital */}
              <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-primary-container text-surface">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center text-xs font-bold shrink-0">
                  C
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <h4 className="font-bold text-surface text-xs sm:text-body-md truncate">
                      Ayub Teaching Hospital Abbottabad
                    </h4>
                    <span className="text-[10px] sm:text-xs font-semibold text-secondary-fixed">
                      Tertiary Trauma Center
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-body-sm text-on-primary-container mt-0.5">
                    Major surgical theater, intensive care unit (ICU), comprehensive neonatal care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GeographicChallengeSection;
