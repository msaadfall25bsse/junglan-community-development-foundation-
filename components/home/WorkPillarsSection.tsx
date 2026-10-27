import React from "react";

export function WorkPillarsSection() {
  return (
    <section className="py-12 sm:py-16 bg-surface-container-lowest border-b border-stone-border" id="work-pillars">
      <div className="max-w-7xl mx-auto px-[10px]">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-label-uppercase font-label-uppercase text-secondary uppercase tracking-wider text-xs">
            Strategic Domains
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary tracking-tight mt-1">
            Our Three Pillars of Mountain Transformation
          </h2>
          <p className="text-sm sm:text-body-md font-body-md text-on-surface-variant mt-2 sm:mt-3">
            Our initiatives balance high-priority life-saving interventions today with generational agrarian self-reliance and civic infrastructure for tomorrow.
          </p>
        </div>

        {/* 3 Pillars Grid (100% exact from index.html) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {/* Pillar 1: Emergency Healthcare & Ambulance */}
          <article className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-lg flex flex-col justify-between min-h-[460px] p-6 transition-all duration-300">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw4BkN-FvKCwKlRRua2XMaGjBOw_zYQAHyN7RuJDALBbE3l97_h3vp7dtUnlDA375DQ0pyn-rbofYsFX5s80SCxOhRgRsoyUmPsoQpc5d9Ut-RI1H7l3-4nKafOUhNOUWX399iQyJ0lUjSJPQhI8iOl4SZSS82Ckhr_Gx7FlWdA9KMwAKBMQMvprcp7N-yh5VLrnZLBlK2RQ0siAFNzf7fCV289n1oeoG6Qn050VS5ojSIjSJfoRzlad-GvrHhyZ4j1w"
              alt="24/7 Emergency Hospital and Ambulance Transit"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-[#081A2D]/80 to-black/40 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-[#e5252a] text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm">
                    Healthcare
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-[#ffb3b1] border border-red-400/30 text-xs font-semibold backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e5252a] animate-pulse"></span> Active Field Service
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#e5252a]/20 backdrop-blur-sm border border-red-400/30 flex items-center justify-center text-white mb-4">
                  <span className="material-symbols-outlined text-2xl text-[#ffdad8]">ambulance</span>
                </div>
                <h3 className="text-xl md:text-headline-md font-headline-md text-white tracking-tight mb-2">
                  Emergency Ambulance &amp; Healthcare
                </h3>
                <p className="text-xs sm:text-body-sm text-slate-200 mb-5 leading-relaxed">
                  24/7 life-saving emergency transit from Junglan and isolated mountain hamlets to tertiary trauma centers (Ayub Teaching Hospital Abbottabad &amp; DHQ Mansehra).
                </p>
                <ul className="space-y-2.5 text-xs sm:text-body-sm text-white/90 mb-6">
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
              <div className="pt-4 border-t border-white/15">
                <a
                  href="#healthcare-section"
                  className="inline-flex items-center gap-2 text-white font-semibold text-xs sm:text-body-sm hover:text-[#ffdad8] transition-colors group/link"
                >
                  <span>Explore Healthcare Operations</span>
                  <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </article>

          {/* Pillar 2: Sustainable Olive Agriculture */}
          <article className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-lg flex flex-col justify-between min-h-[460px] p-6 transition-all duration-300">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlSVq7IqIeD28W19H3fb5Lp9r4bltABS4FLWgIPSLEhzCZltYXVx2TNz3AEi6tMX8NNeF3oUQ2NhauhOc14PXCSbOPMtQWs0NE1lRN_O0BIPW2f8aj9b3ENyWbEC5doNMYSM5cCa5kgdb6FrYhnQOU26f0_5AFGc-cjazsJJRLo7PP5CwKMToYxg29epUIVxQIdHmreyPYzVBPw7sQMwKda_ARUhzRWiKuwAZ6DElTuFeVu13tQvYrUn9FctOvq_f1nQ"
              alt="Olive branches and olive oil in orchard"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-[#081A2D]/80 to-black/40 pointer-events-none"></div>
            
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
                <ul className="space-y-2.5 text-xs sm:text-body-sm text-white/90 mb-6">
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
              <div className="pt-4 border-t border-white/15">
                <a
                  href="#agriculture-section"
                  className="inline-flex items-center gap-2 text-white font-semibold text-xs sm:text-body-sm hover:text-[#b1f0ce] transition-colors group/link"
                >
                  <span>View Agriculture Program</span>
                  <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </article>

          {/* Pillar 3: Planned Infrastructure & Clean Water */}
          <article className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-lg flex flex-col justify-between min-h-[460px] p-6 transition-all duration-300 md:col-span-2 lg:col-span-1">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvc_YuKJ65G7pKy-qn_igF8p82_-8MHe-ezP03QkVQ9oDzHSWa_rrDwgZqjRDtmR_uI3aDRT_u7NFfXkhJhnKsO-nLRkxw2AHiW2OVs40x_S8sYIfYFFDTZ-8glwVNFqEi3su8QJuUC9b-JHWm3Q091v6i2CQOyp5Wvz7jLnN8ChYzqAWW4Q1oPRqDAE_LkgIqJLpExqS8DdLFV1QFecUEfNhmQtbzoUj02d7hQQ7rSZRCwZnMtVKfQY1ZCsmHpifcSg"
              alt="Clean water and mountain irrigation cycle"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-[#081A2D]/80 to-black/40 pointer-events-none"></div>
            
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
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/15 text-[11px] sm:text-xs text-slate-200 font-mono mb-5">
                  [Detailed engineering roadmap and community survey to be published upon validation]
                </div>
                <ul className="space-y-2.5 text-xs sm:text-body-sm text-white/90 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#f59e0b]">schedule</span> Hydrological water table survey in progress
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#f59e0b]">schedule</span> Community hall &amp; skills workshop blueprint
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/15">
                <a
                  href="#support-section"
                  className="inline-flex items-center gap-2 text-white font-semibold text-xs sm:text-body-sm hover:text-[#afc8ed] transition-colors group/link"
                >
                  <span>View Project Roadmap</span>
                  <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default WorkPillarsSection;
