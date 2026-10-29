"use client";

import React from "react";

export function CommunityContextSection() {
  return (
    <section className="py-16 md:py-20 bg-stone-white border-b border-stone-border relative">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">
              MOUNTAIN GEOGRAPHY &amp; REALITY
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-6">
              Understanding Local Needs: Our Community Context
            </h2>
            <div className="space-y-4 font-body-md text-body-md text-on-surface-variant leading-relaxed">
              <p>
                Situated in the picturesque yet demanding topography of District Mansehra, Hazara Division, communities in and around Janglan operate at elevated altitudes where extreme seasonal weather and unpaved terrain can isolate households from primary infrastructure.
              </p>
              <p>
                When acute medical emergencies arise—especially complicated maternal births or sudden injuries—ordinary transport can take hours to arrange. Similarly, the valley’s fertile mountain terraces have relied on subsistence farming that struggles with climate shifts.
              </p>
              <p>
                By anchoring our activities within this precise geographic and social context, JCDF avoids theoretical solutions. We build interventions that work on winding dirt tracks, withstand winter frosts, and elevate the native agrarian economy.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-6 bg-surface-container-lowest border border-stone-border rounded-xl">
              <span className="material-symbols-outlined text-primary text-[28px] mb-2">terrain</span>
              <h4 className="font-headline-sm text-[16px] text-primary font-semibold mb-1">Mountain Altitude</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Elevation above 1,500m creates steep transit barriers during monsoon &amp; winter frost.</p>
            </div>
            <div className="p-6 bg-surface-container-lowest border border-stone-border rounded-xl">
              <span className="material-symbols-outlined text-secondary text-[28px] mb-2">distance</span>
              <h4 className="font-headline-sm text-[16px] text-primary font-semibold mb-1">Ambulance Service Distance</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Emergency medical hubs in Mansehra or Abbottabad require dedicated, prompt vehicle support.</p>
            </div>
            <div className="p-6 bg-surface-container-lowest border border-stone-border rounded-xl">
              <span className="material-symbols-outlined text-secondary text-[28px] mb-2">potted_plant</span>
              <h4 className="font-headline-sm text-[16px] text-primary font-semibold mb-1">Agrarian Livelihoods</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Olive trees and orchards provide long-term income and mountain soil conservation.</p>
            </div>
            <div className="p-6 bg-surface-container-lowest border border-stone-border rounded-xl">
              <span className="material-symbols-outlined text-primary text-[28px] mb-2">handshake</span>
              <h4 className="font-headline-sm text-[16px] text-primary font-semibold mb-1">Communal Trust</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Deep-rooted kinship and village jirga consultation ensure decisions reflect authentic local will.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommunityContextSection;
