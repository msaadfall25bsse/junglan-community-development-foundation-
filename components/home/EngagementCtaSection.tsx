import React from "react";

export function EngagementCtaSection() {
  return (
    <section className="py-12 sm:py-16 bg-navy-deep text-surface relative overflow-hidden" id="support-section">
      <div className="max-w-7xl mx-auto px-[10px] relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 bg-primary-container rounded-full text-secondary-fixed text-[11px] sm:text-xs font-semibold" style={{ background: "rgba(11, 79, 140, 0.4)", border: "1px solid rgba(177, 240, 206, 0.3)", color: "rgb(177, 240, 206)" }}>
            <span className="material-symbols-outlined text-sm">verified</span>
            <span className="">100% Transparent Financial Stewardship • SECP CUIN 0348227</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-surface tracking-tight leading-tight">
            Join Us in Building a Healthier, More Resilient Mountain Community
          </h2>
          <p className="text-sm sm:text-base md:text-body-lg text-on-primary-container leading-relaxed">
            Your generous partnership fuels emergency ambulance runs across mountain passes and sponsors certified olive saplings that break the cycle of rural poverty permanently.
          </p>
          {/* Direct Channel Contact Cards: Stack on mobile, 2-col on tablet/desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left my-6 sm:my-8">
            <div className="p-3.5 sm:p-4 rounded-lg bg-primary-container/60 border border-stone-border/20 backdrop-blur-sm">
              <div className="text-[10px] sm:text-xs text-secondary-fixed uppercase font-label-uppercase mb-1">Ambulance Operations &amp; Inquiries</div>
              <div className="font-bold text-surface text-sm sm:text-base">+92 301 6541825&nbsp;</div>
              <div className="text-[11px] sm:text-xs text-on-primary-container mt-1">Direct Field Desk • Junglan Base</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-lg bg-primary-container/60 border border-stone-border/20 backdrop-blur-sm">
              <div className="text-[10px] sm:text-xs text-secondary-fixed uppercase font-label-uppercase mb-1">International Donor Desk (WhatsApp)</div>
              <div className="font-bold text-surface text-sm sm:text-base">+49 171 5114247</div>
              <div className="text-[11px] sm:text-xs text-on-primary-container mt-1">Direct Accounting &amp; Transparency Verification</div>
            </div>
          </div>
          {/* Action CTAs: full-width on mobile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <a className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#e5252a] text-white hover:bg-[#c0171c] px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg text-xs sm:text-label-md font-semibold transition-all shadow-md active:scale-95 border border-white/20" href="mailto:info@junglanfoundation.org?subject=Support%20JCDF%20Initiative">
              <span className="material-symbols-outlined text-sm">send</span>
              <span className="">Connect with Foundation Desk</span>
            </a>
            <a className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1e5631] text-white hover:bg-[#153e23] border border-emerald-400/30 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg text-xs sm:text-label-md font-semibold transition-all shadow-md active:scale-95" href="#audit-pipeline">
              <span className="material-symbols-outlined text-sm text-[#b1f0ce]">receipt_long</span>
              <span className="">Request Bank Transfer Details</span>
            </a>
          </div>
          <p className="text-[11px] sm:text-xs text-on-primary-container pt-1 sm:pt-2">
            Every contribution is acknowledged with an official foundation receipt and entered into the central public ledger.
          </p>
        </div>
      </div>
    </section>
  );
}

export default EngagementCtaSection;
