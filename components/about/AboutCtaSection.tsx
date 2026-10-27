"use client";

import React from "react";

export function AboutCtaSection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-surface relative overflow-hidden" id="support">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin text-center relative z-10">
        <span className="inline-block px-3 py-1 rounded-full bg-primary-container text-secondary-fixed font-label-uppercase text-label-uppercase tracking-wider mb-4 border border-outline/30">
          PARTNER WITH US
        </span>
        <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl font-extrabold mb-6 tracking-tight">
          Be Part of Community Development
        </h2>
        <p className="font-body-lg text-body-lg text-primary-fixed max-w-2xl mx-auto mb-10 leading-relaxed">
          Learn more about JCDF’s work, explore our development priorities, or contact us to discuss ways to engage with our initiatives.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-surface text-primary font-label-md text-label-md hover:bg-stone-white shadow-md transition-all active:scale-95" href="#areas-of-work">
            <span className="material-symbols-outlined text-[18px] text-secondary">explore</span>
            <span>Explore Our Work</span>
          </a>
          <a className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-primary-fixed/40 text-surface font-label-md text-label-md hover:bg-navy-deep transition-all" href="mailto:info@junglanfoundation.org?subject=Support%20JCDF%20Initiative">
            <span className="material-symbols-outlined text-[18px]">forum</span>
            <span>Contact JCDF</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutCtaSection;
