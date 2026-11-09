"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { ResponsiveCardCarousel } from "@/components/common/ResponsiveCardCarousel";

const IMPACT_CARDS = [
  {
    title: "Healthcare Support Initiatives",
    desc: "Community contributions help provide emergency basic medicines, vital sign monitoring kits, and medical assistance for vulnerable families.",
    image: "/janglan-high-altitude-settlements-new.jpg",
    icon: "healing",
  },
  {
    title: "Mountain Patient Transport",
    desc: "Contributions assist with fuel, specialized snow chains, and vehicle upkeep to ensure remote mountain patients reach secondary healthcare centers.",
    image: "/mountain-transit-ambulance.jpg",
    icon: "airport_shuttle",
  },
  {
    title: "Community Nursery & Cultivation",
    desc: "Supporting climate-resilient olive nursery saplings, soil terrace reinforcement, and agricultural tools that empower local valley livelihoods.",
    image: "/agriculture-hero-mountain.jpg",
    icon: "yard",
  },
  {
    title: "Remote Valley Outreach",
    desc: "Aiding families cut off by severe mountain landslides, difficult rough terrain tracks, and harsh winter conditions in Hazara Division.",
    image: "/remote-valley-terrain.jpg",
    icon: "terrain",
  },
];

export function DonationImpactOverviewSection() {
  return (
    <section className="py-12 lg:py-16 bg-surface-container-lowest border-b border-stone-border relative overflow-hidden" id="impact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
              FIELD REALITY
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary font-semibold">
              Your Contribution Can Make a Difference
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={150}>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Explore examples of how community donations and volunteer efforts strengthen livelihoods, save lives, and protect ecosystems across Hazara Division.
            </p>
          </ScrollReveal>
        </div>

        <ResponsiveCardCarousel intervalMs={4000} gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {IMPACT_CARDS.map((card, idx) => (
            <ScrollReveal key={card.title} variant="card" delay={100 + idx * 75}>
              <div className="rounded-2xl border border-stone-border bg-surface overflow-hidden group hover:border-primary/40 transition-all duration-300 shadow-2xs hover:shadow-sm flex flex-col h-full">
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 text-white flex items-center gap-1.5 text-xs font-semibold font-label-uppercase">
                    <span className="material-symbols-outlined text-sm text-emerald-300">{card.icon}</span>
                    <span>Verified Project</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-semibold text-primary text-sm sm:text-base leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed font-body-sm">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </ResponsiveCardCarousel>
      </div>
    </section>
  );
}
export default DonationImpactOverviewSection;

