"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function MissionVisionSection() {
  return (
    <section className="py-16 md:py-20 border-b border-stone-border relative bg-surface">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-wider block mb-1 font-bold">
              FOUNDATIONAL GUIDELINES
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-semibold">
              Mission &amp; Vision
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container border border-stone-border text-outline text-[12px] font-medium">
              <span className="material-symbols-outlined text-[16px]">info</span>
              Suggested website wording for JCDF community review
            </span>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 ui-spatial-container">
          {/* Mission Card - Drops down from top */}
          <ScrollReveal variant="card" delay={150}>
            <div className="ui-spatial-card bg-surface-container-lowest border border-stone-border rounded-2xl p-8 shadow-sm flex flex-col justify-between hover:border-secondary transition-all h-full">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed/50 flex items-center justify-center text-secondary mb-6 shadow-xs">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>flag</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-semibold mb-3">
                  Our Mission
                </h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  “To support community well-being by working on essential service access and local development priorities through practical, community-focused initiatives.”
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-stone-border flex items-center justify-between text-body-sm text-outline">
                <span>Operational Anchor</span>
                <span className="font-semibold text-secondary">Action-Oriented</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Vision Card - Drops down from top */}
          <ScrollReveal variant="card" delay={250}>
            <div className="ui-spatial-card bg-surface-container-lowest border border-stone-border rounded-2xl p-8 shadow-sm flex flex-col justify-between hover:border-primary transition-all h-full">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-fixed/40 flex items-center justify-center text-primary mb-6 shadow-xs">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-semibold mb-3">
                  Our Vision
                </h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  “A stronger and more resilient community where people can access essential support and benefit from sustainable development opportunities.”
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-stone-border flex items-center justify-between text-body-sm text-outline">
                <span>Long-Term Horizon</span>
                <span className="font-semibold text-primary">Generational Impact</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default MissionVisionSection;
