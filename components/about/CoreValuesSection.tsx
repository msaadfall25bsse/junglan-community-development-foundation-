"use client";

import React from "react";

export function CoreValuesSection() {
  return (
    <section
      className="py-16 md:py-20 border-b border-stone-border relative"
      style={{
        backgroundImage:
          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuByQeIWQwJpV00TQHdVYAcUZvsXdZNkzGUZL5C5CKqqMHyDf_zSaUV15CJQSS01jvEJv1QuV_Ub6UUgRtUSmi9rw1AC62t3w7LKHFoxLPnzOlWeXepy-Xot5dGRJujy6WUgdcjbMM_gi1d4a6eRwNbGZ3rLKkWVQMjMep3jE4wzu8n3bOybBdYINzJ6bnObJJaMLl0RD4QWdYM0gQ831G3MvcvMu4MM8E__8iX3MWfs0uU6EMsjNc-B')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
          <div className="backdrop-blur-md bg-white/20 border border-white/40 shadow-sm p-6 rounded-xl transition-all hover:bg-white/30">
            <div className="w-10 h-10 rounded-lg bg-surface-container/80 backdrop-blur-sm flex items-center justify-center text-primary mb-4 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">diversity_3</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
              Community Focus
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface leading-relaxed font-medium">
              Recognizing local needs and prioritizing community-relevant work that directly improves everyday mountain life.
            </p>
          </div>

          {/* Value 2 */}
          <div className="backdrop-blur-md bg-white/20 border border-white/40 shadow-sm p-6 rounded-xl transition-all hover:bg-white/30">
            <div className="w-10 h-10 rounded-lg bg-surface-container/80 backdrop-blur-sm flex items-center justify-center text-primary mb-4 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
              Responsibility
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface leading-relaxed font-medium">
              Clear communication, ethical governance, and responsible stewardship of all donor and communal resources.
            </p>
          </div>

          {/* Value 3 */}
          <div className="backdrop-blur-md bg-white/20 border border-white/40 shadow-sm p-6 rounded-xl transition-all hover:bg-white/30">
            <div className="w-10 h-10 rounded-lg bg-surface-container/80 backdrop-blur-sm flex items-center justify-center text-primary mb-4 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">handshake</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
              Cooperation
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface leading-relaxed font-medium">
              Constructive, respectful cooperation with community members, elders, administrative authorities, and local stakeholders.
            </p>
          </div>

          {/* Value 4 */}
          <div className="backdrop-blur-md bg-white/20 border border-white/40 shadow-sm p-6 rounded-xl transition-all hover:bg-white/30">
            <div className="w-10 h-10 rounded-lg bg-surface-container/80 backdrop-blur-sm flex items-center justify-center text-primary mb-4 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">eco</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
              Sustainable Development
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface leading-relaxed font-medium">
              Fostering long-term community resilience through regenerative agroforestry and practical economic opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoreValuesSection;
