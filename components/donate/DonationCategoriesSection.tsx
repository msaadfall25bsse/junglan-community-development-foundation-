"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { ResponsiveCardCarousel } from "@/components/common/ResponsiveCardCarousel";

export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag: string;
}

export const DONATION_CATEGORIES: CategoryItem[] = [
  {
    id: "general",
    title: "General Community Support",
    description: "Support the foundation's broader community development activities and flexible emergency readiness across Junglan Valley.",
    icon: "volunteer_activism",
    tag: "Recommended / Default",
  },
  {
    id: "healthcare",
    title: "Healthcare Support",
    description: "Help support healthcare-related community initiatives, vital emergency first-aid supplies, and patient comfort kits.",
    icon: "medical_services",
    tag: "Essential Health",
  },
  {
    id: "ambulance",
    title: "Ambulance & Patient Transportation",
    description: "Support patient transportation and ambulance-related operational needs including mountain fuel and brake maintenance.",
    icon: "ambulance",
    tag: "Life-Saving Transit",
  },
  {
    id: "mountain",
    title: "Mountain Community Relief",
    description: "Support community assistance initiatives in remote mountain areas, severe weather emergencies, and high-altitude hamlets.",
    icon: "terrain",
    tag: "Remote Outreach",
  },
];

interface Props {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export function DonationCategoriesSection({ selectedCategory, onSelectCategory }: Props) {
  return (
    <section className="py-12 lg:py-16 bg-surface-container-lowest border-b border-stone-border relative overflow-hidden" id="donation-categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
              TARGETED OR GENERAL STAKEHOLDING
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary font-semibold">
              Choose Where Your Support Goes
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={150}>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Select an area of focus or choose general community support to allow our valley desk to respond dynamically to urgent community needs.
            </p>
          </ScrollReveal>
        </div>

        <ResponsiveCardCarousel intervalMs={4000} gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DONATION_CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <ScrollReveal key={cat.id} variant="card" delay={100 + idx * 75}>
                <div
                  onClick={() => onSelectCategory(cat.id)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between h-full ui-spatial-card group ${
                    isSelected
                      ? "bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/40 border-secondary ring-2 ring-secondary/25 shadow-sm"
                      : "bg-surface border-stone-border hover:border-primary/40 shadow-2xs hover:shadow-xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white border border-stone-border text-on-surface-variant font-label-uppercase">
                        {cat.tag}
                      </span>
                      <span className={`material-symbols-outlined text-xl ${isSelected ? "text-secondary" : "text-primary"}`}>
                        {cat.icon}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-primary mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-border/60 flex items-center justify-between text-xs">
                    <span className="font-medium text-on-surface-variant">
                      {isSelected ? "Selected Focus" : "Select Category"}
                    </span>
                    <span
                      className={`font-semibold flex items-center gap-1 ${
                        isSelected ? "text-secondary" : "text-primary group-hover:text-secondary"
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">
                        {isSelected ? "check_circle" : "radio_button_unchecked"}
                      </span>
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </ResponsiveCardCarousel>
      </div>
    </section>
  );
}
export default DonationCategoriesSection;

