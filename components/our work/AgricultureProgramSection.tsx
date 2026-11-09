"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function AgricultureProgramSection() {
  return (
    <section className="py-20 bg-surface border-b border-stone-border" id="agriculture">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <ScrollReveal variant="heading" delay={100}>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight font-semibold mb-4">
              Growing Opportunities in Rural Communities
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="text" delay={200}>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Agriculture plays an important role in rural communities, supporting livelihoods, local food systems, and connections to the land. Through agriculture as a development focus, JCDF highlights local opportunities, understands community priorities, and explores practical approaches to rural self-reliance.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="text" delay={300}>
            <div className="mt-6">
              <FlipButton
                href="#agri-opportunities"
                variant="primary"
                frontText="Discover Agriculture Opportunities"
                backText="Exploring Opportunities..."
                icon="south"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Supporting Rural Potential: Two-column Narrative & Landscape */}
        <ScrollReveal variant="card" delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 xl:gap-24 items-center mb-16 bg-surface-container-lowest p-8 md:p-12 rounded-2xl shadow-sm">
            <div className="lg:col-span-6 space-y-4">
              <span className="font-label-uppercase text-label-uppercase text-secondary font-bold tracking-wider">
                COMMUNITY-ROOTED STEWARDSHIP
              </span>
              <h3 className="font-headline-md text-headline-md text-primary font-semibold">
                Supporting Rural Potential
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Junglan’s microclimate and terraced mountain topography hold distinct agricultural possibilities. Centuries of indigenous terrace farming have shaped the slopes, yet communities face mounting challenges from climate volatility, unpredictable rainfall, and road access barriers for harvest transport.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                JCDF works with valley growers to document micro-watersheds, test drought-resistant fruit and olive cultivars, and preserve organic soil microbiology without introducing prohibitive industrial overhead.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden shadow-md group">
                <img
                  className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700 ease-out h-full"
                  alt="Terraced mountain farmland in northern Pakistan with stone irrigation channels"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBn7KGiTuw9KCkAnAGdsyO3ih1rboOobz6EXM0SPaTxtj4n03hnFEpRDWuBLKmGklJAVBAU8Vy9ylLULlz3kbuYNkWzuPMJUpKAqF0n3J5fSQ0YryWFG4JkxxqCosHCHOSpvmyb-b1BEN8dr9tYcT6H9LHYeZ6Lk9Fvg6oEXxX1bn8if-ZwGOAkie1i4yySgzoYfNrJ2HNe845U6UocsiUoNT5hdD8J7EcCx36Zah2_3c0nwen31G3biVtgOYHG0Fxs45Vv6NCKYuvJPA"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Areas of Agricultural Opportunity (4 balanced cards) */}
        <div className="mb-16" id="agri-opportunities">
          <div className="mb-8">
            <ScrollReveal variant="heading" delay={100}>
              <h3 className="font-headline-md text-headline-md text-primary font-semibold">
                Areas of Agricultural Opportunity
              </h3>
              <p className="text-body-md text-on-surface-variant mt-1">
                Four grounded development pathways identified through initial valley consultations:
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Sustainable Farming */}
            <ScrollReveal variant="card" delay={150}>
              <div className="ui-minimalist p-6 rounded-2xl flex flex-col justify-between h-full group">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container/40 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined">compost</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-primary font-semibold group-hover:text-secondary transition-colors">
                    Sustainable Farming
                  </h4>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">
                    Explore practical farming approaches that consider soil health, efficient resource use, and the long-term needs of rural land.
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-border/60 mt-4 text-xs font-semibold text-secondary flex items-center gap-1">
                  <span>Soil Longevity</span>
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2: Crop and Seasonal Planning */}
            <ScrollReveal variant="card" delay={250}>
              <div className="ui-minimalist p-6 rounded-2xl flex flex-col justify-between h-full group">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container/40 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined">calendar_month</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-primary font-semibold group-hover:text-secondary transition-colors">
                    Crop &amp; Seasonal Planning
                  </h4>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">
                    Share general information about seasonal planning, crop selection, and the importance of understanding local growing conditions.
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-border/60 mt-4 text-xs font-semibold text-secondary flex items-center gap-1">
                  <span>Climate Adaptation</span>
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3: Water and Natural Resources */}
            <ScrollReveal variant="card" delay={350}>
              <div className="ui-minimalist p-6 rounded-2xl flex flex-col justify-between h-full group">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container/40 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined">water_drop</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-primary font-semibold group-hover:text-secondary transition-colors">
                    Water &amp; Natural Resources
                  </h4>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">
                    Highlight the role of responsible water use and natural resource management in supporting agricultural activities.
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-border/60 mt-4 text-xs font-semibold text-secondary flex items-center gap-1">
                  <span>Watershed Guard</span>
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 4: Rural Livelihood Opportunities */}
            <ScrollReveal variant="card" delay={450}>
              <div className="ui-minimalist p-6 rounded-2xl flex flex-col justify-between h-full group">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container/40 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined">trending_up</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-primary font-semibold group-hover:text-secondary transition-colors">
                    Rural Livelihood Opportunities
                  </h4>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">
                    Explore ideas that help rural communities understand agricultural opportunities and strengthen local livelihoods over time.
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-border/60 mt-4 text-xs font-semibold text-secondary flex items-center gap-1">
                  <span>Economic Resilience</span>
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Rooted in Local Needs: Wide Visual & Consultation Focus */}
        <ScrollReveal variant="card" delay={250}>
          <div
            className="relative rounded-2xl overflow-hidden border border-stone-border bg-navy-deep text-surface p-8 md:p-12 bg-cover bg-center shadow-lg"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDBU05QCWoes3j87NC-wN7lXraQL1CGFxpI05KiNFbY7kMR67mNFsMHxlzFmtcXFzGaTjhkMVSlbxoUTNcDgdQo-92vS5GyHfxzy5J9xtax5ZRxmH-gbyAMvi7SEIkuEIyilDPHmWL3ivZYfni2thEKWLYu-B_SSpv8VZgHgXEnPGmZ0FmrKxMZnfWSumqeIK_H4s99xojJi0ZYAgiXIeSA93AKNHvCso5eWLfoL49cjJPeGST4Fj1LU7IR89UO7104-g")',
            }}
          >
            <div className="absolute inset-0 bg-navy-deep/85 backdrop-blur-[1px]" />
            <div className="max-w-2xl relative z-10 space-y-4">
              <span className="text-label-uppercase font-label-uppercase text-secondary-fixed font-bold tracking-wider">
                COMMUNITY CONSULTATION
              </span>
              <h3 className="font-headline-lg text-headline-lg text-surface font-semibold tracking-tight">
                Rooted in Local Needs
              </h3>
              <p className="font-body-md text-body-md text-surface-container-highest leading-relaxed">
                Development cannot be dictated from afar. JCDF conducts regular village jirga consultations with mountain smallholders, elder custodians of terraced waterways, and women involved in seasonal harvesting. By aligning directly with valley realities, our agrarian initiatives remain durable and transparent.
              </p>
              <div className="pt-3 flex flex-wrap gap-4">
                <FlipButton
                  href="#contact"
                  variant="white"
                  frontText="Explore Rural Opportunities"
                  backText="Connecting..."
                  icon="north_east"
                />
                <FlipButton
                  href="#contact"
                  variant="secondary"
                  frontText="Contact JCDF"
                  backText="Opening Desk..."
                  icon="forum"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default AgricultureProgramSection;

