"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function AboutHeroSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative bg-surface-container-lowest border-b border-stone-border overflow-hidden py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 xl:gap-24 items-center">
          {/* Narrative Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <ScrollReveal variant="card" delay={50}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-stone-border mb-4">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider">
                  ABOUT JANGLAN COMMUNITY DEVELOPMENT FOUNDATION
                </span>
              </div>
            </ScrollReveal>

            {/* Main Heading: Right to Left */}
            <ScrollReveal variant="heading" delay={150}>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-6 tracking-tight font-semibold">
                Working Together for Stronger Communities
              </h1>
            </ScrollReveal>

            {/* Paragraph with Smooth Expandable 'See More' Toggle */}
            <ScrollReveal variant="text" delay={250} className="w-full">
              <div className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed space-y-3">
                <p>
                  Janglan Community Development Foundation works to address community needs through essential services and local development initiatives. Our core priority is building generational resilience and permanent self-reliance.
                </p>

                {/* Hidden complex text smoothly revealed */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden space-y-3 pt-1 text-on-surface-variant">
                    <p>
                      Our areas of work span 24/7 mountain patient transportation support, certified olive agroforestry, and future civic development initiatives designed directly around authentic community priorities. We bridge severe geographic isolation so no family suffers from lack of access.
                    </p>
                  </div>
                </div>

                {/* See More Toggle Button */}
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors pt-1 cursor-pointer focus:outline-none"
                >
                  <span>{isExpanded ? "Show Less" : "See More"}</span>
                  <span
                    className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="text" delay={350} className="w-full">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <FlipButton
                  href="#areas-of-work"
                  variant="primary"
                  frontText="Explore Our Work"
                  backText="Opening Areas..."
                  icon="explore"
                  className="w-full sm:w-auto"
                />
                <FlipButton
                  href="#contact"
                  variant="white"
                  frontText="Contact Us"
                  backText="Connecting..."
                  icon="mail"
                  className="w-full sm:w-auto"
                />
              </div>
            </ScrollReveal>

            {/* Operational Pillar Highlights */}
            <ScrollReveal variant="card" delay={450} className="w-full">
              <div className="grid grid-cols-3 gap-3 pt-8 mt-8 border-t border-stone-border w-full">
                <div>
                  <p className="font-headline-md text-headline-md text-secondary font-bold">100%</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Community-Centered</p>
                </div>
                <div>
                  <p className="font-headline-md text-headline-md text-primary font-bold">24/7</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Patient Transport</p>
                </div>
                <div>
                  <p className="font-headline-md text-headline-md text-primary font-bold">Hazara</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Khyber Pakhtunkhwa</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Visual Right Column (Full Card Portrait Image) - Drops down with ScrollReveal */}
          <ScrollReveal variant="card" delay={200} className="lg:col-span-5 relative flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-stone-border bg-navy-deep shadow-lg h-[340px] sm:h-[380px] md:h-[410px] group">
              <img
                alt="High-altitude mountain valley terrain and forested hills in District Mansehra, KP, Pakistan"
                className="absolute inset-0 w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-500"
                src="/about-hero-valley.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 p-5 text-surface z-10">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
                  <span className="font-label-uppercase text-label-uppercase text-secondary-fixed tracking-wider font-bold">
                    GEOGRAPHIC BASE
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-white font-medium leading-snug drop-shadow-sm">
                  Remote Mountain Hamlets • District Mansehra, KP, Pakistan
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default AboutHeroSection;
