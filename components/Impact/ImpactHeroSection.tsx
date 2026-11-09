'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export default function ImpactHeroSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative bg-surface overflow-hidden border-b border-stone-border pt-[22px] pb-[54px] lg:pt-[70px] lg:pb-[70px]" id="hero">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Content Column */}
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal variant="card" delay={50}>
              <div className="ui-skeuomorphic-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-stone-border/80 shadow-xs">
                <span className="material-symbols-outlined text-sm text-secondary">verified_user</span>
                <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold">
                  OUR IMPACT &amp; ACCOUNTABILITY
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="heading" delay={150}>
              <h1 className="font-headline-xl text-2xl sm:text-3xl md:text-headline-xl text-primary font-semibold tracking-tight leading-tight">
                Measuring Progress. Building Trust. Strengthening Communities.
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="text" delay={250}>
              <div className="space-y-3 font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                <p>
                  At Junglan Community Development Foundation, we believe that meaningful community development requires measurable progress, responsible resource management, and transparent accountability. We are committed to documenting our work and demonstrating how our initiatives contribute to the communities we serve.
                </p>

                {/* Expandable Context */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden space-y-2 pt-1 font-body-md text-on-surface-variant">
                    <p>
                      Through open governance, third-party audits, and regular field audits conducted under SECP non-profit standards, we protect public trust and prove that every rupee delivers verifiable field impact in mountain settlements.
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

            {/* Action Buttons: 3D Flip Buttons */}
            <ScrollReveal variant="text" delay={300}>
              <div className="flex flex-wrap gap-3.5 pt-1">
                <FlipButton
                  href="#at-a-glance"
                  variant="primary"
                  frontText="Explore Our Impact"
                  backText="Navigating..."
                  icon="arrow_downward"
                />
                <FlipButton
                  href="#transparency"
                  variant="outline"
                  frontText="View Transparency"
                  backText="Opening..."
                  icon="menu_book"
                />
              </div>
            </ScrollReveal>

            {/* Micro Stats Strip with Claymorphic Style */}
            <ScrollReveal variant="card" delay={350}>
              <div className="pt-5 border-t border-stone-border/80 grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/20 border border-stone-border shadow-xs ui-claymorphic">
                  <p className="font-stat-display text-xl sm:text-2xl font-bold text-primary">~450</p>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant font-medium mt-0.5">Mountain Patients Transported</p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-surface-container-lowest via-white to-emerald-50/20 border border-stone-border shadow-xs ui-claymorphic">
                  <p className="font-stat-display text-xl sm:text-2xl font-bold text-secondary">2018</p>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant font-medium mt-0.5">Founded in Janglan Valley</p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-surface-container-lowest via-white to-sky-50/20 border border-stone-border shadow-xs ui-claymorphic">
                  <p className="font-stat-display text-xl sm:text-2xl font-bold text-primary">SECP</p>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant font-medium mt-0.5">CUIN: 0348227 Registered</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal variant="card" delay={200}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-border bg-surface-container-lowest p-2 group ui-bento-card">
                <div className="relative w-full h-[380px] sm:h-[420px] rounded-xl overflow-hidden">
                  <img
                    alt="Panoramic vista of Hazara pine valley with rural mountain homesteads in Junglan"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj0F3gl2agbK2BHCOGSAs4BmUSztOTCnWpJZR_5EU_0Tz10jtOYpECRqixjSendwj3mea8_mzSlFtIlUr4FAgi_x8NtIYi3WH2Eyma2UG5dHyN0WxBXBiVYrtf7zFqzTbXO2QyeNLiKa0CQsBK1uOWLoRywmcrDn5jJ1s6LnTmYkpXCqCHDeFrhBJ2BC1gltSR5I01BT4AX7mmQNl6-weAYJr2WfTxskWsYtZKaUHEILTDoKohjs_b"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3.5 sm:p-4 rounded-xl bg-navy-deep/90 backdrop-blur-md border border-white/10 text-white shadow-md">
                    <span className="inline-block px-2.5 py-0.5 bg-secondary text-white text-[10.5px] font-label-uppercase uppercase font-bold tracking-wider rounded mb-1.5 shadow-2xs">
                      FIELD CORRIDOR OBSERVATION
                    </span>
                    <p className="font-headline-sm text-sm sm:text-base text-white font-bold leading-tight">
                      Hazara Mountain Belt • Mansehra District
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-200 mt-1 leading-relaxed">
                      Ground monitoring of high-altitude accessibility and patient transit infrastructure.
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
