"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function AboutCtaSection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-surface relative overflow-hidden" id="support">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin text-center relative z-10">
        <ScrollReveal variant="card" delay={50}>
          <span className="inline-block px-3 py-1 rounded-full bg-primary-container text-secondary-fixed font-label-uppercase text-label-uppercase tracking-wider mb-4 border border-outline/30 font-bold">
            PARTNER WITH US
          </span>
        </ScrollReveal>

        <ScrollReveal variant="heading" delay={150}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-surface mb-6 tracking-tight">
            Be Part of Community Development
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="text" delay={250}>
          <p className="font-body-lg text-body-lg text-primary-fixed max-w-2xl mx-auto mb-10 leading-relaxed">
            Learn more about JCDF’s work, explore our development priorities, or contact us to discuss ways to engage with our initiatives.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="text" delay={350}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <FlipButton
              href="#areas-of-work"
              variant="white"
              frontText="Explore Our Work"
              backText="Opening Areas..."
              icon="explore"
              className="w-full sm:w-auto"
            />
            <FlipButton
              href="mailto:info@junglanfoundation.org?subject=Support%20JCDF%20Initiative"
              variant="secondary"
              frontText="Contact JCDF"
              backText="Launching Mail..."
              icon="forum"
              className="w-full sm:w-auto"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default AboutCtaSection;
