'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export default function ImpactCtaSection() {
  return (
    <section className="py-[70px] lg:py-[98px] bg-primary-container text-surface-container-lowest relative overflow-hidden border-b border-primary-container" id="cta">
      {/* Background topographic dot pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      {/* Ambient background glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <ScrollReveal variant="card" delay={50}>
            <span className="ui-glassmorphic inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-200 text-label-uppercase font-label-uppercase tracking-wider text-xs font-bold shadow-xs">
              <span className="material-symbols-outlined text-sm">volunteer_activism</span>
              JOIN OUR MOUNTAIN STEWARDSHIP
            </span>
          </ScrollReveal>

          <ScrollReveal variant="heading" delay={150}>
            <h2 className="font-headline-xl text-2xl sm:text-3xl md:text-headline-xl font-semibold text-white tracking-tight leading-tight">
              Transparency Builds Trust. Impact Strengthens Communities.
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="text" delay={250}>
            <p className="font-body-lg text-sm sm:text-base md:text-body-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Whether you are an individual donor, institutional foundation, or community advocate, your partnership sustains emergency ambulance runs and restores mountain ecosystems in Hazara.
            </p>
          </ScrollReveal>

          {/* Action CTAs: 3D Flip Buttons */}
          <ScrollReveal variant="text" delay={300}>
            <div className="flex flex-wrap justify-center gap-3.5 pt-3">
              <FlipButton
                href="tel:+923016541825"
                variant="white"
                frontText="Contact JCDF Valley Desk"
                backText="Connecting..."
                icon="call"
              />
              <FlipButton
                href="/our-work"
                variant="outline"
                frontText="Explore Our Programs"
                backText="Loading..."
                icon="arrow_forward"
              />
            </div>
          </ScrollReveal>

          {/* Direct Verification Strip with Glassmorphism */}
          <ScrollReveal variant="card" delay={350}>
            <div className="ui-glassmorphic mt-6 p-3.5 sm:p-4 rounded-xl border border-white/15 bg-white/5 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-200 shadow-sm backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-emerald-300">phone</span>
                <span>Helpline: <strong className="text-white">+92 301 6541825</strong></span>
              </div>
              <div className="hidden sm:block text-white/30">|</div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-emerald-300">chat</span>
                <span>WhatsApp Liaison: <strong className="text-white">+49 171 5114247</strong></span>
              </div>
              <div className="hidden sm:block text-white/30">|</div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-emerald-300">location_on</span>
                <span>Janglan, Mansehra, KP, Pakistan</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
