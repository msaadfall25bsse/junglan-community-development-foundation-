"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function AreasOfWorkSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-16 md:py-20 bg-stone-white border-b border-stone-border relative" id="areas-of-work">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-1 font-bold">
              PORTFOLIO OF ACTION
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-semibold">
              What We Work On: Our Areas of Work
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <div className="max-w-md">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Our initiatives are structured across three pragmatic pillars designed to address immediate frontline safety and sustained regional prosperity.
              </p>
              {/* Expandable description */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden space-y-2 pt-2 text-on-surface-variant font-body-sm text-body-sm">
                  <p>
                    From high-altitude 4x4 ambulance dispatches and medical oxygen access to certified olive sapling distributions, our programmatic approach combines urgent emergency relief with lasting ecological and economic transformation.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors pt-2 cursor-pointer focus:outline-none"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Pillar 1: Healthcare & Ambulance */}
          <ScrollReveal variant="card" delay={150}>
            <div className="ui-claymorphic overflow-hidden flex flex-col justify-between hover:border-outline h-full">
              <div>
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-uppercase font-label-uppercase flex items-center gap-1.5 font-bold shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-active"></span>
                      ACTIVE SERVICE
                    </span>
                    <span className="material-symbols-outlined text-primary text-[22px]">medical_services</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-2">
                    Ambulance Service &amp; Emergency Support
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Dedicated mountain patient transportation facilitating emergency transit from high-altitude hamlets down to secondary and tertiary medical centers in Mansehra and Abbottabad.
                  </p>
                </div>
                {/* Contextual Metric Strip */}
                <div className="mx-6 py-3 px-4 rounded-xl bg-surface-container-low border border-stone-border mb-6">
                  <p className="font-body-sm text-[12px] text-outline font-semibold">Direct Frontline Impact</p>
                  <p className="font-body-sm text-body-sm font-semibold text-primary">Rapid Emergency Hotline Dispatch</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <FlipButton
                  href="tel:+923016541825"
                  variant="primary"
                  frontText="Explore Ambulance Services"
                  backText="Connecting..."
                  icon="ambulance"
                  className="w-full"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Pillar 2: Agriculture */}
          <ScrollReveal variant="card" delay={250}>
            <div className="ui-claymorphic overflow-hidden flex flex-col justify-between hover:border-outline h-full">
              <div>
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-uppercase font-label-uppercase flex items-center gap-1.5 font-bold shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-active"></span>
                      EXPANDING
                    </span>
                    <span className="material-symbols-outlined text-secondary text-[22px]">park</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-2">
                    Sustainable Mountain Agroforestry
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Planting certified, climate-resilient olive orchards that anchor steep slopes, combat soil erosion, and build generational agricultural wealth for smallholder families.
                  </p>
                </div>
                <div className="mx-6 py-3 px-4 rounded-xl bg-surface-container-low border border-stone-border mb-6">
                  <p className="font-body-sm text-[12px] text-outline font-semibold">Long-Term Prosperity</p>
                  <p className="font-body-sm text-body-sm font-semibold text-primary">5,000+ Saplings Planned</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <FlipButton
                  href="/#agriculture-section"
                  variant="white"
                  frontText="View Olive Initiative"
                  backText="Opening Agronomy..."
                  icon="park"
                  className="w-full"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Pillar 3: Community Development */}
          <ScrollReveal variant="card" delay={350}>
            <div className="ui-claymorphic overflow-hidden flex flex-col justify-between hover:border-outline h-full">
              <div>
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-label-uppercase font-label-uppercase flex items-center gap-1.5 font-bold shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-planned"></span>
                      CONSULTATIVE
                    </span>
                    <span className="material-symbols-outlined text-primary text-[22px]">architecture</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-2">
                    Civic Infrastructure &amp; Clean Water
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Collaborating with village councils (jirgas) to restore gravity-fed natural springs, reinforce walking paths, and ensure dignified community spaces.
                  </p>
                </div>
                <div className="mx-6 py-3 px-4 rounded-xl bg-surface-container-low border border-stone-border mb-6">
                  <p className="font-body-sm text-[12px] text-outline font-semibold">Civic Resilience</p>
                  <p className="font-body-sm text-body-sm font-semibold text-primary">Direct Community Prioritization</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <FlipButton
                  href="/#work-pillars"
                  variant="white"
                  frontText="Learn About Infrastructure"
                  backText="Opening Civic..."
                  icon="architecture"
                  className="w-full"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default AreasOfWorkSection;
