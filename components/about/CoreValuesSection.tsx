"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

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
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-1 font-bold">
              GUIDING PRINCIPLES
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-semibold mb-3">
              Core Values: The Principles Behind Our Work
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={200}>
            <p className="font-body-md text-body-md text-on-surface-variant font-medium">
              These four foundational pillars govern how we allocate resources, communicate with families, and conduct our daily community operations.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Value 1 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="ui-liquid-glass p-6 rounded-xl h-full transition-all duration-300 hover:scale-[1.02]">
              <div className="w-10 h-10 rounded-lg bg-surface-container/80 backdrop-blur-sm flex items-center justify-center text-primary mb-4 shadow-sm">
                <span className="material-symbols-outlined text-[24px]">diversity_3</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-2">
                Community Focus
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface leading-relaxed font-medium">
                Recognizing local needs and prioritizing community-relevant work that directly improves everyday mountain life.
              </p>
            </div>
          </ScrollReveal>

          {/* Value 2 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="ui-liquid-glass p-6 rounded-xl h-full transition-all duration-300 hover:scale-[1.02]">
              <div className="w-10 h-10 rounded-lg bg-surface-container/80 backdrop-blur-sm flex items-center justify-center text-primary mb-4 shadow-sm">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-2">
                Responsibility
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface leading-relaxed font-medium">
                Acting with careful stewardship, transparent accounting, and absolute dedication to public trust and donor intent.
              </p>
            </div>
          </ScrollReveal>

          {/* Value 3 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="ui-liquid-glass p-6 rounded-xl h-full transition-all duration-300 hover:scale-[1.02]">
              <div className="w-10 h-10 rounded-lg bg-surface-container/80 backdrop-blur-sm flex items-center justify-center text-primary mb-4 shadow-sm">
                <span className="material-symbols-outlined text-[24px]">balance</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-2">
                Transparency
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface leading-relaxed font-medium">
                Maintaining open communication, honest reporting, and public financial ledgers accessible to our community.
              </p>
            </div>
          </ScrollReveal>

          {/* Value 4 */}
          <ScrollReveal variant="card" delay={450}>
            <div className="ui-liquid-glass p-6 rounded-xl h-full transition-all duration-300 hover:scale-[1.02]">
              <div className="w-10 h-10 rounded-lg bg-surface-container/80 backdrop-blur-sm flex items-center justify-center text-primary mb-4 shadow-sm">
                <span className="material-symbols-outlined text-[24px]">nature</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-2">
                Sustainability
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface leading-relaxed font-medium">
                Developing lasting solutions that build local self-reliance rather than perpetual dependence on short-term aid.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default CoreValuesSection;
