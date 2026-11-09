"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function OurWorkCtaSection() {
  return (
    <section className="py-20 bg-surface border-b border-stone-border" id="contact">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <ScrollReveal variant="card" delay={50}>
            <div className="ui-skeuomorphic w-14 h-14 rounded-2xl bg-white text-primary mx-auto flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-2xl text-secondary">handshake</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="heading" delay={150}>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-semibold tracking-tight">
              Working Toward a Stronger Community
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="text" delay={250}>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Explore JCDF’s work in patient transportation and rural development. Learn more about the foundation’s priorities and contact us for further information.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="text" delay={350}>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <FlipButton
                href="/about"
                variant="primary"
                frontText="About JCDF"
                backText="Opening About..."
                icon="account_balance"
              />
              <FlipButton
                href="mailto:info@junglanfoundation.org?subject=Inquiry%20Regarding%20Our%20Work"
                variant="outline"
                frontText="Contact Us"
                backText="Launching Mail..."
                icon="mail"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default OurWorkCtaSection;

