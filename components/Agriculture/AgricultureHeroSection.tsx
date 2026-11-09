"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function AgricultureHeroSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative bg-surface-bright pt-[22px] pb-[54px] lg:pt-[70px] lg:pb-[70px] border-b border-stone-border" id="hero">
      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal variant="card" delay={50}>
              <div className="ui-skeuomorphic-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-secondary/20 shadow-xs">
                <span className="material-symbols-outlined text-sm text-secondary">eco</span>
                <span className="font-label-uppercase text-label-uppercase text-secondary font-bold uppercase tracking-wider text-xs">
                  JCDF AGRICULTURE &amp; RURAL DEVELOPMENT
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="heading" delay={150}>
              <h1 className="text-2xl sm:text-3xl md:text-headline-xl font-headline-xl text-primary tracking-tight font-semibold leading-tight">
                Growing Sustainable Agriculture. Strengthening Mountain Communities.
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="text" delay={250}>
              <div className="space-y-3 font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                <p>
                  Supporting rural farming communities through sustainable agricultural practices, climate-conscious approaches, and opportunities that strengthen local livelihoods across Junglan Valley and surrounding mountain areas.
                </p>

                {/* Expandable Context */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden space-y-2 pt-1 font-body-md text-on-surface-variant">
                    <p>
                      Through certified high-altitude nursery cultivars, terraced soil stabilization, and community water management, JCDF partners with smallholder farmers to build permanent agricultural wealth that counters rural poverty.
                    </p>
                  </div>
                </div>

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

            {/* CTAs */}
            <ScrollReveal variant="text" delay={300}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <FlipButton
                  href="#focus-areas"
                  variant="primary"
                  frontText="Explore Our Agriculture Work"
                  backText="Loading Areas..."
                  icon="arrow_forward"
                />
                <FlipButton
                  href="#about"
                  variant="outline"
                  frontText="Our Approach"
                  backText="Loading..."
                  icon="eco"
                />
              </div>
            </ScrollReveal>

            {/* Micro Proof Line with Neumorphic Inset */}
            <ScrollReveal variant="text" delay={350}>
              <div className="ui-neumorphic-inset py-3 px-4 rounded-xl flex flex-wrap items-center gap-6 text-on-surface-variant text-body-sm font-body-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                  <span className="font-medium">100% Non-Commercial Community Stewardship</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">public</span>
                  <span className="font-medium">Hazara Division Valley Smallholders</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Visual Column (5 cols) */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="card" delay={200}>
              <div className="relative rounded-2xl overflow-hidden border border-stone-border shadow-md bg-surface-container-lowest p-2 group h-full">
                <div className="relative w-full h-[420px] rounded-xl overflow-hidden">
                  <img
                    alt="Hazara Division mountain valley landscape showing terraced agricultural slopes and remote settlements"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    src="/agriculture-hero-mountain.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none"></div>
                  {/* Floating Pill Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/95 backdrop-blur-sm p-3.5 rounded-xl border border-stone-border/80 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-secondary animate-pulse"></span>
                      <div>
                        <p className="font-label-uppercase text-label-uppercase text-secondary uppercase font-bold text-xs">High-Altitude Agroforestry</p>
                        <p className="text-xs text-on-surface font-medium">Hazara Mountain Corridor • Junglan</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-primary text-lg">yard</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AgricultureHeroSection;

