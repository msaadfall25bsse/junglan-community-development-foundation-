"use client";

import React from "react";

export function CoreValuesSection() {
  return (
    <section className="py-16 md:py-20 bg-surface-container-lowest border-b border-stone-border">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-1">
            GUIDING PRINCIPLES
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-3">
            Core Values: The Principles Behind Our Work
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            These four foundational pillars govern how we allocate resources, communicate with families, and conduct our daily community operations.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Value 1 */}
          <div className="border border-stone-border rounded-xl p-6 bg-stone-white hover:bg-surface-container-lowest transition-all hover:shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined text-[24px]">diversity_3</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
              Community Focus
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Recognizing local needs and prioritizing community-relevant work that directly improves everyday mountain life.
            </p>
          </div>

          {/* Value 2 */}
          <div className="border border-stone-border rounded-xl p-6 bg-stone-white hover:bg-surface-container-lowest transition-all hover:shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
              Responsibility
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Clear communication, ethical governance, and responsible stewardship of all donor and communal resources.
            </p>
          </div>

          {/* Value 3 */}
          <div className="border border-stone-border rounded-xl p-6 bg-stone-white hover:bg-surface-container-lowest transition-all hover:shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined text-[24px]">handshake</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
              Cooperation
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Constructive, respectful cooperation with community members, elders, administrative authorities, and local stakeholders.
            </p>
          </div>

          {/* Value 4 */}
          <div className="border border-stone-border rounded-xl p-6 bg-stone-white hover:bg-surface-container-lowest transition-all hover:shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined text-[24px]">eco</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
              Sustainable Development
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Fostering long-term community resilience through regenerative agroforestry and practical economic opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoreValuesSection;
