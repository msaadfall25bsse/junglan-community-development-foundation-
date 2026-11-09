"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { ResponsiveCardCarousel } from "@/components/common/ResponsiveCardCarousel";

const MATTERS_CARDS = [
  {
    id: "healthcare",
    title: "Healthcare Support",
    description: "Support initiatives that help communities access essential healthcare services.",
    icon: "medical_services",
    accent: "blue",
  },
  {
    id: "ambulance",
    title: "Ambulance & Patient Transportation",
    description: "Help strengthen transportation support for people who need to reach healthcare facilities.",
    icon: "ambulance",
    accent: "red",
  },
  {
    id: "community",
    title: "Community Development",
    description: "Contribute towards initiatives that address local community needs.",
    icon: "groups",
    accent: "emerald",
  },
  {
    id: "mountain",
    title: "Mountain & Remote Communities",
    description: "Support people living in remote areas who face additional barriers to essential services.",
    icon: "terrain",
    accent: "amber",
  },
];

export function WhySupportMattersSection() {
  return (
    <section className="py-12 lg:py-16 bg-surface border-b border-stone-border relative overflow-hidden" id="why-support-matters">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
              PURPOSE &amp; IMPACT AREAS
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary font-semibold">
              Your Support Creates Real Impact
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={150}>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Every contribution helps strengthen our ability to support communities and address local development needs.
            </p>
          </ScrollReveal>
        </div>

        <ResponsiveCardCarousel intervalMs={4000} gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MATTERS_CARDS.map((card, idx) => (
            <ScrollReveal key={card.id} variant="card" delay={100 + idx * 75}>
              <div className="ui-claymorphic bg-gradient-to-br from-surface-container-lowest via-white to-slate-50/50 p-5 rounded-2xl border border-stone-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between h-full group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface border border-stone-border/80 flex items-center justify-center text-primary group-hover:scale-110 group-hover:text-secondary transition-all duration-300 mb-4 shadow-2xs">
                    <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-primary mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-border/60 text-[11px] text-secondary font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span>Community Priority</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </ResponsiveCardCarousel>
      </div>
    </section>
  );
}
export default WhySupportMattersSection;

