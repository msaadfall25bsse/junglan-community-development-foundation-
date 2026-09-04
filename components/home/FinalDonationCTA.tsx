"use client";

import React from "react";
import Link from "next/link";
import { Heart, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

interface FinalDonationCTAProps {
  onOpenDonateModal: () => void;
}

export const FinalDonationCTA: React.FC<FinalDonationCTAProps> = ({ onOpenDonateModal }) => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-sky-50 to-sky-100/70 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full pointer-events-none -z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-sky-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-sky-700 via-sky-800 to-sky-900 p-8 sm:p-12 md:p-16 text-white shadow-2xl border border-sky-600/50 text-center relative overflow-hidden">
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            {/* Small Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-sky-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
              <Sparkles className="w-4 h-4 text-red-300" />
              <span>Make A Direct Difference Today</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Help Us Build Stronger Communities
            </h2>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-sky-100 max-w-2xl mx-auto leading-relaxed">
              Your support can help us continue developing meaningful projects that create lasting impact in our communities — from lifesaving ambulance transit to sustainable olive orchards.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenDonateModal}
                className="w-full sm:w-auto py-4 px-9 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-extrabold text-base rounded-2xl transition-all shadow-xl shadow-red-950/30 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <Heart className="w-5 h-5 fill-white transition-transform group-hover:scale-115" />
                <span>Donate Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                href="#about"
                className="w-full sm:w-auto py-4 px-8 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-2xl transition-all border border-white/20 flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <span>Learn About Our Work</span>
              </Link>
            </div>

            {/* Transparency Trust Metrics */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-sky-200">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Non-Profit Foundation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-300" />
                <span>Direct Ground Allocation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                <span>Donor Transparency Guaranteed</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalDonationCTA;
