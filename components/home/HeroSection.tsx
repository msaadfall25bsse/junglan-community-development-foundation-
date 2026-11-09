import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function HeroSection() {
  return (
    <section
      className="relative border-b border-stone-border overflow-hidden min-h-[500px] sm:min-h-[560px] md:min-h-[620px] flex items-center bg-[#FDFBF7]"
    >
      {/* Mobile Background Image (screen < sm) */}
      <div
        className="sm:hidden absolute inset-0 bg-cover bg-center no-repeat pointer-events-none"
        style={{
          backgroundImage: `url("/hero-mobile-illustration.jpg")`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      />

      {/* Desktop / Tablet Background Image (screen >= sm) */}
      <div
        className="hidden sm:block absolute inset-0 bg-cover bg-right sm:bg-center no-repeat pointer-events-none"
        style={{
          backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBkQ3bHoJIL3AnHWLMFcDf5DFgGJQrP3x-8VuwT5MIBQJ5CnVHbXtTlgUrEy_QtSADnBnrZxsmEC6xZ2i3VcbaOSLWURcNoIetNYW0JCi_fbWvG5RbhQCLw3kHWEC--9GG-Mnta25U08rHbT86Gzc8-Sn2NWhEyYVZaqAwjlhE9Ouw9UW-vzhSi_wXtkK8Udsny8hOHun9ESrjEtG7ohzwP-u8_7ZYYcJd5FryFYwCGmV5oSiQWd9KEBrWebnFLqu8MCA")`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      />

      {/* Subtle overlay to ensure immaculate text readability on both mobile and desktop */}
      <div className="absolute inset-0 bg-white/70 sm:bg-white/60 backdrop-blur-[1px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-14 md:py-20 w-full relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-6 flex flex-col items-center">
          {/* SECP CUIN Badge */}
          <ScrollReveal variant="card" delay={50}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/95 sm:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 shadow-sm">
              <span className="material-symbols-outlined text-sm text-[#166534]">verified</span>
              <span>SECP CUIN 0348227 · Non-Profit Organization</span>
            </div>
          </ScrollReveal>

          {/* Main Headline: Right to Left */}
          <ScrollReveal variant="heading" delay={150}>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-semibold tracking-tight leading-tight sm:leading-[1.2]">
              <span className="text-[#00162d]">Empowering </span>
              <span style={{ color: "rgb(30, 86, 49)" }}>Mountain Communities</span>{" "}
              <span className="text-[#00162d]">Through </span>
              <span style={{ color: "rgb(229, 37, 42)" }}>Ambulance Service</span>
              <span className="text-[#00162d]">, </span>
              <span style={{ color: "rgb(30, 86, 49)" }}>Sustainable Agriculture</span>{" "}
              <span className="text-[#00162d]">&amp; </span>
              <span style={{ color: "rgb(11, 79, 140)" }}>Community Development</span>
            </h1>
          </ScrollReveal>

          {/* Subtitle / Paragraph: Bottom to Top fade */}
          <ScrollReveal variant="text" delay={250}>
            <p className="text-sm sm:text-base md:text-body-lg text-slate-700 leading-relaxed font-normal max-w-2xl mx-auto">
              Rooted in the steep valleys of District Mansehra, JCDF bridges critical life-safety gaps and builds permanent generational self-reliance for underserved rural families.
            </p>
          </ScrollReveal>

          {/* Action Buttons: 3D Flip Buttons */}
          <ScrollReveal variant="text" delay={350}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
              <FlipButton
                href="#work-pillars"
                variant="primary"
                frontText="Explore Our Work"
                backText="Exploring Work..."
                icon="explore"
              />
              <FlipButton
                href="#audit-pipeline"
                variant="outline"
                frontText="View Audit Reports"
                backText="Loading Ledger..."
                icon="visibility"
              />
            </div>
          </ScrollReveal>

          {/* Trust Indicators / Badges */}
          <ScrollReveal variant="text" delay={450}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-xs font-semibold text-slate-700 border-t border-slate-200/80 mt-3">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#1e5631]">check_circle</span>
                <span>100% Direct Allocation Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#1e5631]">check_circle</span>
                <span>Zero Admin Diversion Policy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#0b4f8c]">verified_user</span>
                <span>Public Operational Ledgers</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
