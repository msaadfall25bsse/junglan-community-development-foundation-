"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function AgricultureCtaSection() {
  return (
    <section className="py-[70px] lg:py-[98px] bg-[#1b4332] text-surface relative overflow-hidden border-b border-primary-container" id="cta">
      {/* Background radial accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      {/* Ambient background glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <ScrollReveal variant="card" delay={50}>
            <span className="ui-glassmorphic inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-200 text-label-uppercase font-label-uppercase uppercase tracking-wider text-xs font-bold shadow-xs">
              <span className="material-symbols-outlined text-sm">volunteer_activism</span>
              Partner With JCDF
            </span>
          </ScrollReveal>

          <ScrollReveal variant="heading" delay={150}>
            <h2 className="text-2xl sm:text-3xl md:text-headline-xl font-headline-xl text-white tracking-tight font-semibold leading-tight">
              Growing a Sustainable Future Together
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="text" delay={250}>
            <p className="text-sm sm:text-base md:text-body-lg font-body-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
              Sustainable agricultural development begins with stronger communities, responsible farming practices, and opportunities for local farmers. Join JCDF in supporting agricultural development and stronger rural livelihoods across mountain communities.
            </p>
          </ScrollReveal>

          {/* Action CTAs: 3D Flip Buttons */}
          <ScrollReveal variant="text" delay={300}>
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
              <FlipButton
                href="mailto:info@jcdf.org.pk"
                variant="white"
                frontText="Contact JCDF"
                backText="Opening Mail..."
                icon="arrow_forward"
              />
              <FlipButton
                href="#focus-areas"
                variant="outline"
                frontText="Explore Our Work"
                backText="Loading..."
                icon="eco"
              />
            </div>
          </ScrollReveal>

          {/* Direct Contact Info Strip with Glassmorphism */}
          <ScrollReveal variant="card" delay={350}>
            <div className="ui-glassmorphic mt-6 p-3.5 sm:p-4 rounded-xl border border-white/15 bg-white/5 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-200 shadow-sm backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-300 text-base">chat</span>
                <span>WhatsApp Helpline (PK): <strong className="text-white">+92 301 6541825</strong></span>
              </div>
              <div className="hidden sm:block text-white/30">|</div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-300 text-base">call</span>
                <span>International Desk: <strong className="text-white">+49 171 5114247</strong></span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default AgricultureCtaSection;

