"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function DonationAssistanceSection() {
  return (
    <section className="py-12 lg:py-16 bg-navy-deep text-white relative overflow-hidden" id="donation-assistance">
      {/* Topographic pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      {/* Ambient glows */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <ScrollReveal variant="card" delay={50}>
            <span className="ui-glassmorphic inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-label-uppercase font-label-uppercase tracking-wider text-xs font-bold shadow-xs">
              <span className="material-symbols-outlined text-sm">support_agent</span>
              DONOR ASSISTANCE
            </span>
          </ScrollReveal>

          <ScrollReveal variant="heading" delay={100}>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-white font-semibold">
              Need Help With Your Donation?
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="text" delay={150}>
            <p className="font-body-lg text-xs sm:text-body-md text-slate-300 max-w-xl mx-auto leading-relaxed">
              Our team is here to assist you with donation information and payment-related questions.
            </p>
          </ScrollReveal>

          {/* Contact Details Grid */}
          <ScrollReveal variant="card" delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 text-left">
              {/* Phone */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/15 backdrop-blur-sm space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-label-uppercase">
                  Valley Helpline
                </span>
                <div className="font-bold text-sm sm:text-base text-white">
                  +92 301 6541825
                </div>
                <p className="text-[11px] text-slate-300">
                  Direct Valley Coordination Desk
                </p>
              </div>

              {/* WhatsApp */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/15 backdrop-blur-sm space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300 font-label-uppercase">
                  WhatsApp Liaison
                </span>
                <div className="font-bold text-sm sm:text-base text-white">
                  +49 171 5114247
                </div>
                <p className="text-[11px] text-slate-300">
                  International &amp; Transfer Slips
                </p>
              </div>

              {/* Location */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/15 backdrop-blur-sm space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-label-uppercase">
                  Registered Location
                </span>
                <div className="font-bold text-sm sm:text-base text-white">
                  Janglan, Mansehra
                </div>
                <p className="text-[11px] text-slate-300">
                  Khyber Pakhtunkhwa, Pakistan
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal variant="text" delay={250}>
            <div className="pt-4">
              <a
                href="tel:+923016541825"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#e5252a] hover:bg-[#c0171c] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 duration-150 border border-white/20"
              >
                <span className="material-symbols-outlined text-base">call</span>
                <span>Contact Valley Desk</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
export default DonationAssistanceSection;

