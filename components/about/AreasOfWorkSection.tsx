"use client";

import React from "react";

export function AreasOfWorkSection() {
  return (
    <section className="py-16 md:py-20 bg-stone-white border-b border-stone-border relative" id="areas-of-work">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-1">
              PORTFOLIO OF ACTION
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
              What We Work On: Our Areas of Work
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
            Our initiatives are structured across three pragmatic pillars designed to address immediate frontline safety and sustained regional prosperity.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Pillar 1: Healthcare & Ambulance */}
          <div className="bg-surface-container-lowest border border-stone-border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-outline transition-colors">
            <div>
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-uppercase font-label-uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-active"></span>
                    ACTIVE SERVICE
                  </span>
                  <span className="material-symbols-outlined text-primary text-[22px]">medical_services</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                  Ambulance Service &amp; Emergency Support
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Dedicated mountain patient transportation facilitating emergency transit from high-altitude hamlets down to secondary and tertiary medical centers in Mansehra and Abbottabad.
                </p>
              </div>
              {/* Contextual Metric Strip */}
              <div className="mx-6 py-3 px-4 rounded-lg bg-surface-container-low border border-stone-border mb-6">
                <p className="font-body-sm text-[12px] text-outline">Direct Frontline Impact</p>
                <p className="font-body-sm text-body-sm font-semibold text-primary">Rapid Emergency Hotline Dispatch</p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <a
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-surface font-label-md text-label-md hover:bg-navy-deep transition-colors"
                href="tel:+923000000000"
              >
                <span>Explore Ambulance Services</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* Pillar 2: Agriculture */}
          <div className="bg-surface-container-lowest border border-stone-border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-outline transition-colors">
            <div>
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-uppercase font-label-uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-active"></span>
                    COMMUNITY PILLAR
                  </span>
                  <span className="material-symbols-outlined text-secondary text-[22px]">agriculture</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                  Regenerative Agriculture
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Strengthening valley agriculture through commercial olive agroforestry, soil stabilization, and training programs tailored to local farmers to build resilient, multi-generational livelihoods.
                </p>
              </div>
              <div className="mx-6 py-3 px-4 rounded-lg bg-surface-container-low border border-stone-border mb-6">
                <p className="font-body-sm text-[12px] text-outline">Focus Initiative</p>
                <p className="font-body-sm text-body-sm font-semibold text-secondary">High-Yield Mountain Olive Cultivation</p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <a
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-primary text-primary font-label-md text-label-md hover:bg-surface-container-low transition-colors"
                href="#approach"
              >
                <span>Explore Agriculture</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* Pillar 3: Future Development Initiatives */}
          <div className="bg-surface-container-lowest border border-stone-border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-outline transition-colors">
            <div>
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-label-uppercase font-label-uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-planned"></span>
                    PLANNED INITIATIVE
                  </span>
                  <span className="material-symbols-outlined text-outline text-[22px]">construction</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                  Future Development Initiatives
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Community-guided infrastructure projects including clean mountain water pipeline extensions, local gathering hubs, and secondary educational access pathways currently in feasibility study.
                </p>
              </div>
              <div className="mx-6 py-3 px-4 rounded-lg bg-surface-container-low border border-stone-border mb-6">
                <p className="font-body-sm text-[12px] text-outline">Pipeline Status</p>
                <p className="font-body-sm text-body-sm font-semibold text-status-planned">Community Consultative Phase</p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <a
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-stone-border text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-low transition-colors"
                href="#approach"
              >
                <span>View Development Initiatives</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AreasOfWorkSection;
