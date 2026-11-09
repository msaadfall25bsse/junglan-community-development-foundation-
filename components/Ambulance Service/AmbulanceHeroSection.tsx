"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function AmbulanceHeroSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative bg-surface-container-lowest pt-[22px] pb-[54px] lg:pt-[70px] lg:pb-[70px] border-b border-stone-border overflow-hidden">
      {/* Ambient topographic visual texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#00162d_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="max-w-[1280px] mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Content Narrative Column */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <ScrollReveal variant="card" delay={50}>
              <div className="inline-flex items-center gap-2">
                <span className="ui-skeuomorphic-badge px-3 py-1 text-primary font-label-uppercase text-label-uppercase tracking-wider rounded-md text-xs font-bold">
                  JCDF AMBULANCE SERVICES
                </span>
                <span className="ui-glassmorphic px-3 py-1 text-on-surface-variant font-label-uppercase text-label-uppercase rounded-md text-xs font-semibold">
                  SECP CUIN: 0348227
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="heading" delay={150}>
              <h1 className="font-headline-xl text-headline-xl lg:text-headline-xl text-headline-xl-mobile font-semibold text-primary tracking-tight">
                Reliable Ambulance Support for Remote Mountain Communities
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="text" delay={250}>
              <div className="space-y-3 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                <p>
                  JCDF provides patient transportation support to help individuals and families in Janglan Valley and surrounding remote communities reach healthcare facilities despite challenging mountain terrain and limited transport options.
                </p>

                {/* Mobile & Desktop Expandable Context */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden space-y-2 pt-1 font-body-md text-on-surface-variant">
                    <p>
                      Stationed permanently in Tehsil Baffa Pakhal, our customized high-roof 4WD ambulance unit ensures critical maternity cases, cardiac emergencies, and trauma patients bypass hazardous unpaved terrain with uninterrupted medical oxygen.
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

            {/* Dispatch Trust Indicators */}
            <ScrollReveal variant="text" delay={300}>
              <div className="grid grid-cols-2 gap-3 py-2 border-y border-stone-border">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[22px]">check_circle</span>
                  <span className="font-label-md text-label-md text-primary font-semibold">Operating Since 2018</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[22px]">altitude</span>
                  <span className="font-label-md text-label-md text-primary font-semibold">Hazara Mountain Corridor</span>
                </div>
              </div>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal variant="text" delay={350}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <FlipButton
                  href="#contact"
                  variant="red"
                  frontText="Request Ambulance Support"
                  backText="Dispatching..."
                  icon="emergency"
                />
                <FlipButton
                  href="#about-service"
                  variant="outline"
                  frontText="Explore Our Service"
                  backText="Loading..."
                  icon="arrow_forward"
                />
              </div>
            </ScrollReveal>

            {/* Authentic Dispatch Sub-note with Neumorphic Inset */}
            <div className="ui-neumorphic-inset px-4 py-2.5 rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-status-active">shield</span>
              <p className="font-body-sm text-body-sm text-outline font-medium">
                Non-profit public interest service based in Tehsil Baffa Pakhal, Mansehra.
              </p>
            </div>
          </div>

          {/* Hero Image & Operational Frame */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal variant="card" delay={200}>
              <div className="relative rounded-xl overflow-hidden border border-stone-border bg-surface-container shadow-md group">
                <img
                  alt="Real Suzuki Mountain Ambulance Van of JCDF on mountain road in Hazara Pakistan"
                  className="w-full h-auto object-cover max-h-[520px] group-hover:scale-105 transition-transform duration-700 ease-out"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuACK-RKInwlGJtXenPyuCKVr90G2Xomm8bn3QlaWyUi1gHbyYDkbHrYkqkEdy9vw3c5CNbCQD5ODofIhh1fPz4zqrqDaJFFrfjVriQvCNTcvTGFq4BZ05cQPL1u7t07GB9m0WitFp7IR0ni22l2Oda3MfHICmQc7WDVC_dna5nBeCbqPS3rHeqeO4DpQnWoOofE01Xddb6RRcDMcqOcufLoxc_n7dfFvWQ2mJyQi948KVhNFqABtd_O"
                />
                {/* Real-time Mountain Badging Overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-navy-deep/90 backdrop-blur text-surface-container-lowest rounded-full font-label-uppercase text-label-uppercase shadow-sm text-xs font-bold text-white">
                    <span className="w-2 h-2 rounded-full bg-status-active animate-pulse"></span>
                    OPERATING SINCE 2018
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-surface-container-lowest/95 backdrop-blur text-primary rounded-full font-label-uppercase text-label-uppercase border border-stone-border shadow-sm text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]">terrain</span>
                    HAZARA MOUNTAIN CORRIDOR
                  </span>
                </div>
                {/* Banner Base Tag */}
                <div className="p-4 bg-surface-container-lowest border-t border-stone-border flex items-center justify-between">
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-primary font-semibold">Dedicated Suzuki High-Roof Van</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Customized for steep switchbacks &amp; unpaved terrain</p>
                  </div>
                  <div className="text-right">
                    <span className="font-label-uppercase text-label-uppercase text-secondary font-bold text-xs block">1 AMBULANCE • 4 VILLAGES</span>
                    <p className="font-body-sm text-body-sm text-outline">Direct Emergency Dispatch</p>
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

export default AmbulanceHeroSection;

