"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function CommunityContextSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-16 md:py-20 bg-stone-white border-b border-stone-border relative">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        {/* Expanded 60px gap between text and image/cards (gap-10 lg:gap-20 xl:gap-24) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 xl:gap-24 items-center">
          <div className="lg:col-span-6">
            <ScrollReveal variant="heading" delay={100}>
              <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2 font-bold">
                MOUNTAIN GEOGRAPHY &amp; REALITY
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-semibold mb-6">
                Understanding Local Needs: Our Community Context
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="text" delay={200}>
              <div className="space-y-4 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                <p>
                  Situated in the picturesque yet demanding topography of District Mansehra, Hazara Division, communities in and around Janglan operate at elevated altitudes where extreme seasonal weather and unpaved terrain can isolate households from primary infrastructure.
                </p>

                {/* Expandable hidden complex text */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden space-y-3 pt-1 text-on-surface-variant font-body-md">
                    <p>
                      When acute medical emergencies arise—especially complicated maternal births or sudden injuries—ordinary transport can take hours to arrange. Similarly, the valley’s fertile mountain terraces have relied on subsistence farming that struggles with climate shifts.
                    </p>
                    <p>
                      By anchoring our activities within this precise geographic and social context, JCDF avoids theoretical solutions. We build interventions that work on winding dirt tracks, withstand winter frosts, and elevate the native agrarian economy.
                    </p>
                  </div>
                </div>

                {/* See More Toggle Button */}
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

          {/* Right 4 Metric/Context Cards - Dropping in from top */}
          <ScrollReveal variant="card" delay={250} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="ui-bento-card">
              <span className="material-symbols-outlined text-primary text-[28px] mb-2">terrain</span>
              <h4 className="font-headline-sm text-[16px] text-primary font-semibold mb-1">Mountain Altitude</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Elevation above 1,500m creates steep transit barriers during monsoon &amp; winter frost.</p>
            </div>
            <div className="ui-bento-card">
              <span className="material-symbols-outlined text-secondary text-[28px] mb-2">distance</span>
              <h4 className="font-headline-sm text-[16px] text-primary font-semibold mb-1">Ambulance Service Distance</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Emergency medical hubs in Mansehra or Abbottabad require dedicated, prompt vehicle support.</p>
            </div>
            <div className="ui-bento-card">
              <span className="material-symbols-outlined text-secondary text-[28px] mb-2">potted_plant</span>
              <h4 className="font-headline-sm text-[16px] text-primary font-semibold mb-1">Agrarian Livelihoods</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Olive trees and orchards provide long-term income and mountain soil conservation.</p>
            </div>
            <div className="ui-bento-card">
              <span className="material-symbols-outlined text-primary text-[28px] mb-2">handshake</span>
              <h4 className="font-headline-sm text-[16px] text-primary font-semibold mb-1">Communal Trust</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Deep-rooted kinship and village jirga consultation ensure decisions reflect authentic local will.</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default CommunityContextSection;
