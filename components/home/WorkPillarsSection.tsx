"use client";

import React, { useState } from "react";

export function WorkPillarsSection() {
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="py-12 sm:py-16 bg-surface-container-lowest border-b border-stone-border" id="work-pillars">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-label-uppercase font-label-uppercase text-secondary uppercase tracking-wider text-xs font-bold">
            Strategic Domains
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary tracking-tight mt-1 font-bold">
            Our Three Pillars of Mountain Transformation
          </h2>
          <p className="text-sm sm:text-body-md font-body-md text-on-surface-variant mt-2 sm:mt-3">
            Our initiatives balance high-priority life-saving interventions today with generational agrarian self-reliance and civic infrastructure for tomorrow.
          </p>
        </div>

        {/* 3 Pillars Grid with Interactive 3D Card Flip (Desktop Hover + Mobile Tap) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* ========================================================
              Pillar 1: Emergency Healthcare & Ambulance Fleet
             ======================================================== */}
          <div
            className="perspective-1000 min-h-[480px] sm:min-h-[500px] cursor-pointer group"
            onClick={() => toggleFlip(1)}
          >
            <div
              className={`relative w-full h-full transform-style-3d transition-transform duration-700 ease-out ${
                flippedCards[1] ? "rotate-y-180" : "group-hover:rotate-y-180"
              }`}
            >
              {/* FRONT SIDE */}
              <article className="backface-hidden absolute inset-0 rounded-2xl overflow-hidden border border-white/15 shadow-lg flex flex-col justify-between p-6 select-none bg-navy-deep">
                {/* Front Background Image (Full coverage) */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw4BkN-FvKCwKlRRua2XMaGjBOw_zYQAHyN7RuJDALBbE3l97_h3vp7dtUnlDA375DQ0pyn-rbofYsFX5s80SCxOhRgRsoyUmPsoQpc5d9Ut-RI1H7l3-4nKafOUhNOUWX399iQyJ0lUjSJPQhI8iOl4SZSS82Ckhr_Gx7FlWdA9KMwAKBMQMvprcp7N-yh5VLrnZLBlK2RQ0siAFNzf7fCV289n1oeoG6Qn050VS5ojSIjSJfoRzlad-GvrHhyZ4j1w"
                  alt="24/7 Emergency Hospital and Ambulance Transit"
                  className="absolute inset-0 w-full h-full object-cover object-center scale-105 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-[#081A2D]/85 to-black/50 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-[#e5252a] text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm">
                        Ambulance Service
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-[#ffb3b1] border border-red-400/30 text-xs font-semibold backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e5252a] animate-pulse"></span> Active Field Service
                      </span>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-[#e5252a]/20 backdrop-blur-sm border border-red-400/30 flex items-center justify-center text-white mb-4">
                      <span className="material-symbols-outlined text-2xl text-[#ffdad8]">ambulance</span>
                    </div>

                    <h3 className="text-xl md:text-headline-md font-headline-md text-white tracking-tight mb-2">
                      Emergency Ambulance Service
                    </h3>

                    <p className="text-xs sm:text-body-sm text-slate-200 mb-5 leading-relaxed">
                      24/7 life-saving emergency transit from Janglan and isolated mountain hamlets to tertiary trauma centers (Ayub Teaching Hospital Abbottabad &amp; DHQ Mansehra).
                    </p>

                    <ul className="space-y-2.5 text-xs sm:text-body-sm text-white/90 mb-4">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#e5252a]">check_circle</span> Continuous medical oxygen regulators
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#e5252a]">check_circle</span> Foldable mountain stretcher &amp; trauma kit
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#e5252a]">check_circle</span> 100% free for impoverished patients
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/15 flex items-center justify-between text-white/90 text-xs sm:text-body-sm">
                    <span className="font-semibold text-[#ffdad8] flex items-center gap-1">
                      <span>Hover or Tap to Flip</span>
                      <span className="material-symbols-outlined text-base">sync</span>
                    </span>
                    <span className="text-white/60 text-xs">Side 1 / 2</span>
                  </div>
                </div>
              </article>

              {/* BACK SIDE */}
              <article className="backface-hidden rotate-y-180 absolute inset-0 rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex flex-col justify-between p-6 select-none bg-[#0a1628]">
                {/* Back Background Image: User-provided Official JCDF Mountain Ambulance Van (ADA 262) at Sunrise */}
                <img
                  src="/jcdf-ambulance-bolan.jpg"
                  alt="Official JCDF Mountain Ambulance Van in high-altitude Janglan Valley"
                  className="absolute inset-0 w-full h-full object-cover object-center scale-105 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-[#081A2D]/85 to-black/60 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-red-600/30 text-red-200 border border-red-500/40 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                        Field Unit AMB-01
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-xs font-semibold backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 24/7 On Standby
                      </span>
                    </div>

                    <h3 className="text-xl md:text-headline-md font-headline-md text-white tracking-tight mb-2">
                      Operational Capabilities &amp; Transit Log
                    </h3>

                    <p className="text-xs sm:text-body-sm text-slate-200 mb-4 leading-relaxed font-medium">
                      Equipped with high-altitude 4x4 mountain drive capabilities to safely traverse snowy unpaved paths during monsoon landslides and winter emergencies.
                    </p>

                    <div className="grid grid-cols-2 gap-2.5 my-3">
                      <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                        <div className="text-lg font-bold text-red-400 font-stat-display">460+</div>
                        <div className="text-[10px] text-slate-300 uppercase font-semibold">Safe Transits</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                        <div className="text-lg font-bold text-emerald-400 font-stat-display">100%</div>
                        <div className="text-[10px] text-slate-300 uppercase font-semibold">Free Fuel</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                    <a
                      href="#healthcare-section"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#e5252a] text-white font-semibold text-xs hover:bg-red-700 transition-colors shadow-sm"
                    >
                      <span>Explore Healthcare Operations</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>

          {/* ========================================================
              Pillar 2: Sustainable Olive Agriculture
             ======================================================== */}
          <div
            className="perspective-1000 min-h-[480px] sm:min-h-[500px] cursor-pointer group"
            onClick={() => toggleFlip(2)}
          >
            <div
              className={`relative w-full h-full transform-style-3d transition-transform duration-700 ease-out ${
                flippedCards[2] ? "rotate-y-180" : "group-hover:rotate-y-180"
              }`}
            >
              {/* FRONT SIDE */}
              <article className="backface-hidden absolute inset-0 rounded-2xl overflow-hidden border border-white/15 shadow-lg flex flex-col justify-between p-6 select-none bg-navy-deep">
                {/* Front Background Image */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlSVq7IqIeD28W19H3fb5Lp9r4bltABS4FLWgIPSLEhzCZltYXVx2TNz3AEi6tMX8NNeF3oUQ2NhauhOc14PXCSbOPMtQWs0NE1lRN_O0BIPW2f8aj9b3ENyWbEC5doNMYSM5cCa5kgdb6FrYhnQOU26f0_5AFGc-cjazsJJRLo7PP5CwKMToYxg29epUIVxQIdHmreyPYzVBPw7sQMwKda_ARUhzRWiKuwAZ6DElTuFeVu13tQvYrUn9FctOvq_f1nQ"
                  alt="Olive branches and olive oil in orchard"
                  className="absolute inset-0 w-full h-full object-cover object-center scale-105 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-[#081A2D]/85 to-black/50 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-[#1e5631] text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm border border-emerald-400/30 shadow-sm">
                        Agriculture
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-[#b1f0ce] border border-emerald-400/30 text-xs font-semibold backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Active Cultivation
                      </span>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-[#1e5631]/30 backdrop-blur-sm border border-emerald-400/30 flex items-center justify-center text-white mb-4">
                      <span className="material-symbols-outlined text-2xl text-[#b1f0ce]">eco</span>
                    </div>

                    <h3 className="text-xl md:text-headline-md font-headline-md text-white tracking-tight mb-2">
                      Sustainable Olive (Zaitoon) Agriculture
                    </h3>

                    <p className="text-xs sm:text-body-sm text-slate-200 mb-5 leading-relaxed">
                      Cultivating long-term economic independence. Distributing certified high-yield saplings suited for Hazara mountain microclimates, establishing drip irrigation and arresting soil erosion.
                    </p>

                    <ul className="space-y-2.5 text-xs sm:text-body-sm text-white/90 mb-4">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#b1f0ce]">check_circle</span> 5,000+ saplings target for smallholders
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#b1f0ce]">check_circle</span> Slope stabilization against mudslides
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#b1f0ce]">check_circle</span> Generational recurring harvest revenue
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/15 flex items-center justify-between text-white/90 text-xs sm:text-body-sm">
                    <span className="font-semibold text-[#b1f0ce] flex items-center gap-1">
                      <span>Hover or Tap to Flip</span>
                      <span className="material-symbols-outlined text-base">sync</span>
                    </span>
                    <span className="text-white/60 text-xs">Side 1 / 2</span>
                  </div>
                </div>
              </article>

              {/* BACK SIDE */}
              <article className="backface-hidden rotate-y-180 absolute inset-0 rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex flex-col justify-between p-6 select-none bg-[#0a1b14]">
                {/* Back Background Image (Cultivation / Field Farmer Photo) */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo6qTjJQ2mlEmfbLnavFaqpwfD3UMmMNNybnxGlvsg_iF-qz74cQ3ZHdjhzlubkGLd1fNplsS9777GGtWoZGQjBqmv3z2l7q1T2C5L9LN3CF3XrOlFIspCip7U26vRGFsjeJsXI1I7nMQR9D6fmTp9XljovIXeXmrMnJDbzafZ2sXJw6A_piJX6YztLZgFpfqwBylDPqM84bnJPyvsfHJuY5cS_iJwdFT73GH7bh_tI0ig6QUqOqxnWhObOfpMbSPxDQ"
                  alt="Harvesting olive saplings and mountain soil cultivation"
                  className="absolute inset-0 w-full h-full object-cover object-center scale-110 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-[#081A2D]/85 to-black/60 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-600/30 text-emerald-200 border border-emerald-500/40 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                        Agrarian Roadmap
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-[#b1f0ce] border border-emerald-400/30 text-xs font-semibold backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Subsidized Nursery
                      </span>
                    </div>

                    <h3 className="text-xl md:text-headline-md font-headline-md text-white tracking-tight mb-2">
                      Agrarian Resilience &amp; Climate Adaptation
                    </h3>

                    <p className="text-xs sm:text-body-sm text-slate-200 mb-4 leading-relaxed font-medium">
                      High-altitude terracing combined with Mediterranean olive cultivars resistant to harsh mountain winters provides farmers with steady recurring cash flow.
                    </p>

                    <div className="grid grid-cols-2 gap-2.5 my-3">
                      <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                        <div className="text-lg font-bold text-emerald-400 font-stat-display">50+</div>
                        <div className="text-[10px] text-slate-300 uppercase font-semibold">Farmers Enrolled</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                        <div className="text-lg font-bold text-emerald-400 font-stat-display">5,000</div>
                        <div className="text-[10px] text-slate-300 uppercase font-semibold">Saplings Target</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                    <a
                      href="#agriculture-section"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1e5631] text-white font-semibold text-xs hover:bg-emerald-800 transition-colors shadow-sm"
                    >
                      <span>View Agriculture Program</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>

          {/* ========================================================
              Pillar 3: Planned Infrastructure & Clean Water
             ======================================================== */}
          <div
            className="perspective-1000 min-h-[480px] sm:min-h-[500px] cursor-pointer group md:col-span-2 lg:col-span-1"
            onClick={() => toggleFlip(3)}
          >
            <div
              className={`relative w-full h-full transform-style-3d transition-transform duration-700 ease-out ${
                flippedCards[3] ? "rotate-y-180" : "group-hover:rotate-y-180"
              }`}
            >
              {/* FRONT SIDE */}
              <article className="backface-hidden absolute inset-0 rounded-2xl overflow-hidden border border-white/15 shadow-lg flex flex-col justify-between p-6 select-none bg-navy-deep">
                {/* Front Background Image */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvc_YuKJ65G7pKy-qn_igF8p82_-8MHe-ezP03QkVQ9oDzHSWa_rrDwgZqjRDtmR_uI3aDRT_u7NFfXkhJhnKsO-nLRkxw2AHiW2OVs40x_S8sYIfYFFDTZ-8glwVNFqEi3su8QJuUC9b-JHWm3Q091v6i2CQOyp5Wvz7jLnN8ChYzqAWW4Q1oPRqDAE_LkgIqJLpExqS8DdLFV1QFecUEfNhmQtbzoUj02d7hQQ7rSZRCwZnMtVKfQY1ZCsmHpifcSg"
                  alt="Clean water and mountain irrigation cycle"
                  className="absolute inset-0 w-full h-full object-cover object-center scale-105 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-[#081A2D]/85 to-black/50 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-[#0b4f8c] text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm border border-blue-400/30 shadow-sm">
                        Community
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-[#FEF3C7] border border-amber-400/30 text-xs font-semibold backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse"></span> PLANNED INITIATIVE
                      </span>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-[#0b4f8c]/30 backdrop-blur-sm border border-blue-400/30 flex items-center justify-center text-white mb-4">
                      <span className="material-symbols-outlined text-2xl text-[#afc8ed]">water_drop</span>
                    </div>

                    <h3 className="text-xl md:text-headline-md font-headline-md text-white tracking-tight mb-2">
                      Community Infrastructure &amp; Clean Water
                    </h3>

                    <p className="text-xs sm:text-body-sm text-slate-200 mb-4 leading-relaxed">
                      Future civic initiatives focusing on clean drinking water filtration plants and mountain youth vocational training workshops.
                    </p>

                    <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/15 text-[11px] sm:text-xs text-slate-200 font-mono mb-4">
                      [Detailed engineering roadmap and community survey to be published upon validation]
                    </div>

                    <ul className="space-y-2.5 text-xs sm:text-body-sm text-white/90 mb-4">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#f59e0b]">schedule</span> Hydrological water table survey in progress
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#f59e0b]">schedule</span> Community hall &amp; skills workshop blueprint
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/15 flex items-center justify-between text-white/90 text-xs sm:text-body-sm">
                    <span className="font-semibold text-[#afc8ed] flex items-center gap-1">
                      <span>Hover or Tap to Flip</span>
                      <span className="material-symbols-outlined text-base">sync</span>
                    </span>
                    <span className="text-white/60 text-xs">Side 1 / 2</span>
                  </div>
                </div>
              </article>

              {/* BACK SIDE */}
              <article className="backface-hidden rotate-y-180 absolute inset-0 rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex flex-col justify-between p-6 select-none bg-[#091524]">
                {/* Back Background Image: User-provided Mountain Spring & Clean Drinking Water Tank */}
                <img
                  src="/clean-water-spring.jpg"
                  alt="Mountain water spring and community drinking water tank in alpine village"
                  className="absolute inset-0 w-full h-full object-cover object-center scale-105 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-[#081A2D]/85 to-black/60 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-blue-600/30 text-blue-200 border border-blue-500/40 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                        Hydrological Survey
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-[#FEF3C7] border border-amber-400/30 text-xs font-semibold backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span> Phase 1
                      </span>
                    </div>

                    <h3 className="text-xl md:text-headline-md font-headline-md text-white tracking-tight mb-2">
                      Clean Mountain Water &amp; Civic Facilities
                    </h3>

                    <p className="text-xs sm:text-body-sm text-slate-200 mb-4 leading-relaxed font-medium">
                      Rigorous geotechnical testing to channel natural alpine springs into solar-powered gravity filtration systems for drinking security.
                    </p>

                    <div className="grid grid-cols-2 gap-2.5 my-3">
                      <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                        <div className="text-lg font-bold text-sky-400 font-stat-display">4</div>
                        <div className="text-[10px] text-slate-300 uppercase font-semibold">Hamlets Surveyed</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                        <div className="text-lg font-bold text-amber-400 font-stat-display">2027</div>
                        <div className="text-[10px] text-slate-300 uppercase font-semibold">Deployment</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                    <a
                      href="#support-section"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0b4f8c] text-white font-semibold text-xs hover:bg-blue-800 transition-colors shadow-sm"
                    >
                      <span>View Project Roadmap</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkPillarsSection;
