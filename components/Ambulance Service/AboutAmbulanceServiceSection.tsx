"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function AboutAmbulanceServiceSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-[54px] lg:py-[86px] bg-surface-container-low border-b border-stone-border" id="about-service">
      <div className="max-w-[1280px] mx-auto px-2 sm:px-3.5 lg:px-5.5">
        <div className="max-w-3xl mb-12">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase tracking-wider text-secondary font-bold text-xs block mb-1">
              ABOUT OUR SERVICE
            </span>
            <h2 className="font-headline-lg text-headline-lg lg:text-headline-lg text-headline-lg-mobile text-primary font-semibold">
              Supporting Access to Essential Medical Transportation
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <div className="mt-4 space-y-3 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              <p>
                Access to medical facilities can be challenging for families living in remote mountain communities. Long distances, difficult roads, and limited transportation options can make hospital visits difficult. Through its ambulance service, JCDF helps patients travel from their communities to healthcare facilities, providing important transportation support when it is needed.
              </p>

              {/* Expandable details */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden space-y-2 pt-1 font-body-md text-on-surface-variant">
                  <p>
                    Every transport call is coordinated directly by our local field volunteers who reside inside the valley. They navigate through seasonal roadblocks, coordinate directly with hospital triage teams in Abbottabad and Mansehra, and provide continuous reassurance to anxious families.
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
          {/* Image Card */}
          <div className="lg:col-span-6">
            <ScrollReveal variant="card" delay={150}>
              <div className="rounded-xl overflow-hidden border border-stone-border bg-surface-container-lowest flex flex-col justify-between shadow-sm h-full group">
                <div className="relative h-72 sm:h-96 overflow-hidden">
                  <img
                    alt="Side view of JCDF ambulance van parked on rocky mountain pass in Janglan"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0rpcurCGfpBp9OsFoIjNppH2tQht7oZ1QZFV1ZoLZvscE6rMiZNt4GSWN_NWZZoJlmrXVftcSHqLiKzN0Up4BIbTPbAttdJU0CtBbVO_ztezpgIrT4b3AC-kqc_5NekpPycOTmgVbxob3VTDtIbAR2Obfa2cY68EeML5my7B36-uJ4IAEn6fjwuSUlY2Fa2vv83CJgVJ4bkkhNuME_oh3IQTZX0XZZZAbaZssLBvVe2cx9VFDqt8u"
                  />
                  <div className="absolute bottom-3 left-3 bg-primary/85 backdrop-blur text-white px-3 py-1 rounded text-body-sm font-semibold">
                    Authentic JCDF Fleet • High-Roof Suzuki 4WD
                  </div>
                </div>
                <div className="p-6 bg-surface-container-lowest border-t border-stone-border">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[28px]">info</span>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-primary font-semibold">Uncompromising Frontline Focus</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                        Operating without bureaucracy. Every patient transport call is routed directly to local drivers with exhaustive local knowledge of landslide bypasses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Highlight Cards with Claymorphic & Designing Backgrounds */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            <ScrollReveal variant="card" delay={200}>
              <div className="ui-claymorphic relative overflow-hidden p-6 bg-gradient-to-br from-white via-emerald-50/20 to-surface-container-lowest border border-stone-border hover:border-emerald-600/30 transition-all shadow-xs group">
                {/* Subtle designing background elements */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/[0.07] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#1e5631_1px,transparent_1px)] [background-size:12px_12px]"></div>

                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0 text-primary border border-stone-border group-hover:border-emerald-600/20 group-hover:shadow-sm transition-all">
                    <span className="material-symbols-outlined text-[24px]">groups</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Community-Based Support</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1.5 leading-relaxed">
                      Helping residents of Janglan Valley and surrounding villages overcome severe transportation isolation through grass-roots mobilization.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="card" delay={300}>
              <div className="ui-claymorphic relative overflow-hidden p-6 bg-gradient-to-br from-white via-sky-50/25 to-surface-container-lowest border border-stone-border hover:border-sky-600/30 transition-all shadow-xs group">
                {/* Subtle designing background elements */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-sky-500/[0.07] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#0b4f8c_1px,transparent_1px)] [background-size:12px_12px]"></div>

                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0 text-secondary border border-stone-border group-hover:border-sky-600/20 group-hover:shadow-sm transition-all">
                    <span className="material-symbols-outlined text-[24px]">airport_shuttle</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Patient Transportation</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1.5 leading-relaxed">
                      Supporting journeys to hospitals and medical facilities in Mansehra and Abbottabad, ensuring pregnant mothers, elderly patients, and trauma cases reach care safely.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="card" delay={400}>
              <div className="ui-claymorphic relative overflow-hidden p-6 bg-gradient-to-br from-white via-amber-50/25 to-surface-container-lowest border border-stone-border hover:border-amber-600/30 transition-all shadow-xs group">
                {/* Subtle designing background elements */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/[0.07] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:12px_12px]"></div>

                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0 text-tertiary-container border border-stone-border group-hover:border-amber-600/20 group-hover:shadow-sm transition-all">
                    <span className="material-symbols-outlined text-[24px]">terrain</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Mountain Route Access</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1.5 leading-relaxed">
                      Operating in areas where road conditions, sheer gradient, and terrain create transportation difficulties that conventional vehicles cannot navigate.
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

export default AboutAmbulanceServiceSection;

