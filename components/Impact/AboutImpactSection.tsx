'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ScrollReveal } from "@/components/home/ScrollReveal";

export default function AboutImpactSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-[54px] md:py-[70px] bg-surface-container-lowest border-b border-stone-border relative overflow-hidden" id="about">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="max-w-3xl mb-10">
          <ScrollReveal variant="heading" delay={100}>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-uppercase text-label-uppercase text-secondary tracking-wider text-xs font-bold">
                OUR COMMITMENT
              </span>
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary font-semibold">
              Creating Meaningful Impact Through Responsible Community Development
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="text" delay={200}>
            <div className="mt-3 space-y-2.5 text-body-md font-body-md text-on-surface-variant leading-relaxed">
              <p>
                Sustainable mountain development relies on direct alignment between community realities and charitable execution. JCDF operates through grassroots transparency, verified tracking, and open stewardship across Hazara Division.
              </p>

              {/* Expandable Context */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden space-y-2 pt-1 font-body-sm text-on-surface-variant">
                  <p>
                    Every initiative is audited against frontline needs: whether coordinating emergency patient runs during heavy snowfalls or supplying certified olive rootstocks to hillside smallholders, we ensure that every allocated rupee creates measurable change.
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Visual Left (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <ScrollReveal variant="card" delay={150} className="h-full">
              <div className="relative rounded-2xl overflow-hidden border border-stone-border shadow-sm bg-surface-container-lowest p-2 group h-full flex flex-col justify-between ui-bento-card">
                <div className="relative w-full h-[320px] sm:h-[360px] lg:h-full min-h-[300px] rounded-xl overflow-hidden">
                  <img
                    alt="Hazara hillside landscape with pine trees and terraced village settlements"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj0F3gl2agbK2BHCOGSAs4BmUSztOTCnWpJZR_5EU_0Tz10jtOYpECRqixjSendwj3mea8_mzSlFtIlUr4FAgi_x8NtIYi3WH2Eyma2UG5dHyN0WxBXBiVYrtf7zFqzTbXO2QyeNLiKa0CQsBK1uOWLoRywmcrDn5jJ1s6LnTmYkpXCqCHDeFrhBJ2BC1gltSR5I01BT4AX7mmQNl6-weAYJr2WfTxskWsYtZKaUHEILTDoKohjs_b"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-surface-container-lowest/95 backdrop-blur-md border border-stone-border flex items-center justify-between text-xs shadow-xs">
                    <span className="font-medium text-primary text-[11px] sm:text-xs">Junglan Valley Terrain &amp; Hamlets</span>
                    <span className="text-[11px] sm:text-xs font-semibold text-secondary flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">location_on</span> KP, Pakistan
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 3 Commitment Pillars Right (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-3.5">
            <ScrollReveal variant="card" delay={200}>
              <div className="relative overflow-hidden p-[14px] sm:p-4 rounded-xl bg-gradient-to-br from-surface-container-low via-white to-blue-50/20 border border-stone-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md ui-claymorphic group">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                <div className="flex items-start gap-3.5 relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-primary flex items-center justify-center shrink-0 shadow-xs border border-blue-200">
                    <span className="material-symbols-outlined text-xl">groups</span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-1">
                      1. Community-Centered Work
                    </h3>
                    <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                      Focusing on initiatives responding to verified local valley needs. From emergency medical transportation down rugged unpaved paths to agrarian sustainability, every action originates directly from dialogue with valley elders and families.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="card" delay={300}>
              <div className="relative overflow-hidden p-[14px] sm:p-4 rounded-xl bg-gradient-to-br from-surface-container-low via-white to-emerald-50/20 border border-stone-border hover:border-secondary/40 transition-all duration-300 shadow-xs hover:shadow-md ui-claymorphic group">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-secondary/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                <div className="flex items-start gap-3.5 relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-secondary flex items-center justify-center shrink-0 shadow-xs border border-emerald-200">
                    <span className="material-symbols-outlined text-xl">analytics</span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-1">
                      2. Measurable Progress
                    </h3>
                    <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                      Documenting available activities, operational transit, and resource allocation. We track ambulance trip manifests, fuel expenditure per run, and agroforestry survival yields with field honesty rather than speculative marketing numbers.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="card" delay={400}>
              <div className="relative overflow-hidden p-[14px] sm:p-4 rounded-xl bg-gradient-to-br from-surface-container-low via-white to-sky-50/20 border border-stone-border hover:border-sky-600/40 transition-all duration-300 shadow-xs hover:shadow-md ui-claymorphic group">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                <div className="flex items-start gap-3.5 relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center shrink-0 shadow-xs border border-sky-200">
                    <span className="material-symbols-outlined text-xl">policy</span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-headline-sm font-headline-sm text-primary font-semibold mb-1">
                      3. Responsible Management
                    </h3>
                    <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                      Promoting transparency and open accountability in daily governance. Formal internal review pipelines ensure donor contributions directly service fuel pumps, brake pad maintenance, and verified tree saplings.
                    </p>
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
