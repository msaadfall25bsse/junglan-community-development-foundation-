"use client";

import React from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function DonationHero() {
  const scrollToDonationForm = () => {
    const el = document.getElementById("donation-form-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToImpact = () => {
    const el = document.getElementById("impact-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-surface-bright pt-8 pb-12 lg:pt-14 lg:pb-16 border-b border-stone-border overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal variant="card" delay={50}>
              <div className="ui-skeuomorphic-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-secondary/20 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-label-uppercase text-label-uppercase text-secondary font-bold uppercase tracking-wider text-xs">
                  SECP REGISTERED CUIN: 0348227 • DIRECT ALLOCATION
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="heading" delay={150}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline-xl text-primary tracking-tight font-semibold leading-tight">
                Together, We Can Make a Difference
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="text" delay={200}>
              <p className="font-body-lg text-sm sm:text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Your contribution helps us strengthen community support, improve access to essential services, and create meaningful opportunities for people in underserved and remote areas.
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal variant="text" delay={250}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={scrollToDonationForm}
                  className="px-6 py-3 rounded-xl bg-[#e5252a] hover:bg-[#c0171c] text-white font-bold text-sm sm:text-base transition-all shadow-md active:scale-95 duration-150 inline-flex items-center gap-2 cursor-pointer border border-white/20"
                >
                  <span className="material-symbols-outlined text-lg">volunteer_activism</span>
                  <span>Donate Now</span>
                </button>

                <button
                  type="button"
                  onClick={scrollToImpact}
                  className="px-5 py-3 rounded-xl border border-primary/30 bg-white hover:bg-slate-50 text-primary font-semibold text-sm sm:text-base transition-colors shadow-xs inline-flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg text-secondary">explore</span>
                  <span>Explore Our Impact</span>
                </button>
              </div>
            </ScrollReveal>

            {/* Micro Proof Bar */}
            <ScrollReveal variant="text" delay={300}>
              <div className="ui-neumorphic-inset py-3 px-4 rounded-xl flex flex-wrap items-center gap-5 sm:gap-6 text-on-surface-variant text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">verified</span>
                  <span className="font-medium">100% Direct Frontline Allocation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">support_agent</span>
                  <span className="font-medium">Valley Desk: +92 301 6541825</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Visual Image Card */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="card" delay={200}>
              <div className="relative rounded-2xl overflow-hidden border border-stone-border shadow-md bg-surface-container-lowest p-2 group h-full">
                <div className="relative w-full h-[360px] sm:h-[420px] rounded-xl overflow-hidden">
                  <img
                    src="/agriculture-hero-mountain.jpg"
                    alt="Junglan Valley mountain community terrain and settlement pathways in Hazara Division"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Pill Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/95 backdrop-blur-sm p-3.5 rounded-xl border border-stone-border/80 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
                      <div>
                        <p className="font-label-uppercase text-label-uppercase text-secondary uppercase font-bold text-xs">
                          Community Relief &amp; Healthcare
                        </p>
                        <p className="text-xs text-on-surface font-medium">
                          Hazara Division • Junglan Valley
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-primary text-xl">favorite</span>
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
export default DonationHero;

