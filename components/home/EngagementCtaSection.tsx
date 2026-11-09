import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function EngagementCtaSection() {
  return (
    <section className="py-12 sm:py-16 bg-navy-deep text-surface relative overflow-hidden" id="support-section">
      <div className="max-w-7xl mx-auto px-[10px] relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">
          <ScrollReveal variant="card" delay={50}>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 bg-primary-container rounded-full text-secondary-fixed text-[11px] sm:text-xs font-semibold" style={{ background: "rgba(11, 79, 140, 0.4)", border: "1px solid rgba(177, 240, 206, 0.3)", color: "rgb(177, 240, 206)" }}>
              <span className="material-symbols-outlined text-sm">verified</span>
              <span className="">100% Transparent Financial Stewardship • SECP CUIN 0348227</span>
            </div>
          </ScrollReveal>

          {/* Heading: Right to Left */}
          <ScrollReveal variant="heading" delay={150}>
            <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-surface tracking-tight leading-tight">
              Join Us in Building a Healthier, More Resilient Mountain Community
            </h2>
          </ScrollReveal>

          {/* Subtitle / Text: Bottom to Top fade */}
          <ScrollReveal variant="text" delay={250}>
            <p className="text-sm sm:text-base md:text-body-lg text-on-primary-container leading-relaxed">
              Your generous partnership fuels emergency ambulance runs across mountain passes and sponsors certified olive saplings that break the cycle of rural poverty permanently.
            </p>
          </ScrollReveal>

          {/* Direct Channel Contact Cards: Stable cards dropping down from top */}
          <ScrollReveal variant="card" delay={300} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left my-6 sm:my-8">
            <div className="p-3.5 sm:p-4 rounded-xl ui-glassmorphic-dark hover:border-white/30 transition-all">
              <div className="text-[10px] sm:text-xs text-secondary-fixed uppercase font-label-uppercase mb-1">Ambulance Operations &amp; Inquiries</div>
              <div className="font-bold text-surface text-sm sm:text-base">+92 301 6541825&nbsp;</div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-1">Direct Field Desk • Janglan Base</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl ui-glassmorphic-dark hover:border-white/30 transition-all">
              <div className="text-[10px] sm:text-xs text-secondary-fixed uppercase font-label-uppercase mb-1">International Donor Desk (WhatsApp)</div>
              <div className="font-bold text-surface text-sm sm:text-base">+49 171 5114247</div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-1">Direct Accounting &amp; Transparency Verification</div>
            </div>
          </ScrollReveal>

          {/* Action CTAs: 3D Flip Buttons */}
          <ScrollReveal variant="text" delay={350} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <FlipButton
              href="mailto:info@junglanfoundation.org?subject=Support%20JCDF%20Initiative"
              variant="red"
              frontText="Connect with Foundation Desk"
              backText="Opening Mail..."
              icon="send"
              className="w-full sm:w-auto"
            />
            <FlipButton
              href="#audit-pipeline"
              variant="primary"
              frontText="Request Bank Transfer Details"
              backText="Loading Details..."
              icon="receipt_long"
              className="w-full sm:w-auto"
            />
          </ScrollReveal>

          <p className="text-[11px] sm:text-xs text-on-primary-container pt-1 sm:pt-2">
            Every contribution is acknowledged with an official foundation receipt and entered into the central public ledger.
          </p>
        </div>
      </div>
    </section>
  );
}

export default EngagementCtaSection;
