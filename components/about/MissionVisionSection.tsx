"use client";

import React from "react";

export function MissionVisionSection() {
  return (
    <section className="py-16 md:py-20 bg-stone-white border-b border-stone-border">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-wider block mb-1">
              FOUNDATIONAL GUIDELINES
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
              Mission &amp; Vision
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container border border-stone-border text-outline text-[12px] font-medium">
            <span className="material-symbols-outlined text-[16px]">info</span>
            Suggested website wording for JCDF community review
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Mission Card */}
          <div className="bg-surface-container-lowest border border-stone-border rounded-xl p-8 shadow-sm flex flex-col justify-between hover:border-secondary transition-colors">
            <div>
              <div className="w-12 h-12 rounded-lg bg-secondary-fixed/50 flex items-center justify-center text-secondary mb-6">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>flag</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary font-bold mb-3">
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

          {/* Vision Card */}
          <div className="bg-surface-container-lowest border border-stone-border rounded-xl p-8 shadow-sm flex flex-col justify-between hover:border-primary transition-colors">
            <div>
              <div className="w-12 h-12 rounded-lg bg-primary-fixed/40 flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary font-bold mb-3">
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
        </div>
      </div>
    </section>
  );
}

export default MissionVisionSection;
