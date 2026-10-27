"use client";

import React from "react";

export function WhyWeWorkSection() {
  return (
    <section className="py-14 md:py-18 bg-surface-container-lowest border-b border-stone-border">
      <div className="max-w-4xl mx-auto px-margin-sm md:px-margin text-center">
        <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">
          OUR DRIVING PURPOSE
        </span>
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-6">
          Why We Work
        </h2>
        <div className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed space-y-4 text-left md:text-center">
          <p>
            Rural and mountain valleys possess tremendous resilience, proud cultural traditions, and hardworking people. However, rugged geography, steep mountain tracks, and distance from major urban centers frequently create critical bottlenecks in accessing timely emergency medical transport and realizing the full potential of local land stewardship.
          </p>
          <p className="font-body-md text-body-md text-outline">
            We work because every family in our valley deserves safe, dignity-preserving transit in times of acute medical distress, sustainable agricultural avenues that bring long-term income, and well-planned community development that respects local autonomy.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyWeWorkSection;
