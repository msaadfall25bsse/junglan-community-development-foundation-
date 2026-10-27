import React from "react";

export function AuditPipelineSection() {
  return (
    <section className="py-12 sm:py-16 bg-surface-container-lowest border-b border-stone-border" id="audit-pipeline">
      <div className="max-w-7xl mx-auto px-[10px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <span className="text-label-uppercase font-label-uppercase text-secondary uppercase tracking-wider text-xs">
              Absolute Accountability
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary tracking-tight mt-1 leading-tight">
              How Your Support Directly Reaches the Field
            </h2>
            <p className="text-sm sm:text-body-md font-body-md text-on-surface-variant mt-2 max-w-xl leading-relaxed">
              We operate under a strict fiduciary mandate: zero diversion, itemized disbursements, and monthly reconciliation against verifiable bank accounts.
            </p>
          </div>
          <div className="bg-surface-container-low border border-stone-border p-3 sm:p-4 rounded-lg flex items-center gap-3 self-start md:self-auto">
            <span className="material-symbols-outlined text-secondary text-2xl sm:text-3xl shrink-0">verified_user</span>
            <div>
              <div className="text-xs font-bold text-primary uppercase">Direct Allocation Guarantee</div>
              <div className="text-[11px] sm:text-xs text-on-surface-variant">
                100% of public gifts fund fuel, oxygen &amp; saplings.
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Verified Audit Pipeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Step 01 */}
          <div className="bg-surface-container-low border border-stone-border rounded-lg p-4 sm:p-5 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-stat-display text-2xl sm:text-headline-md text-secondary">01</span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded bg-surface-container-lowest border border-stone-border text-on-surface-variant font-semibold">
                  Verified Step
                </span>
              </div>
              <h4 className="text-base sm:text-headline-sm font-headline-sm text-primary mb-1">Your Donation</h4>
              <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                Direct bank transfer or online gift allocated to mountain ambulance fuel or certified olive saplings.
              </p>
            </div>
          </div>

          {/* Step 02 */}
          <div className="bg-surface-container-low border border-stone-border rounded-lg p-4 sm:p-5 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-stat-display text-2xl sm:text-headline-md text-secondary">02</span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded bg-surface-container-lowest border border-stone-border text-on-surface-variant font-semibold">
                  Verified Step
                </span>
              </div>
              <h4 className="text-base sm:text-headline-sm font-headline-sm text-primary mb-1">Central Ledger Logging</h4>
              <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                Contribution logged into public audit ledger with formal receipt number under SECP guidelines.
              </p>
            </div>
          </div>

          {/* Step 03 */}
          <div className="bg-surface-container-low border border-stone-border rounded-lg p-4 sm:p-5 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-stat-display text-2xl sm:text-headline-md text-secondary">03</span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded bg-surface-container-lowest border border-stone-border text-on-surface-variant font-semibold">
                  Verified Step
                </span>
              </div>
              <h4 className="text-base sm:text-headline-sm font-headline-sm text-primary mb-1">Field Execution</h4>
              <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                Disbursements purchase medical oxygen, vehicle maintenance, and certified saplings in Junglan.
              </p>
            </div>
          </div>

          {/* Step 04 */}
          <div className="bg-surface-container-low border border-stone-border rounded-lg p-4 sm:p-5 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-stat-display text-2xl sm:text-headline-md text-secondary">04</span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded bg-surface-container-lowest border border-stone-border text-on-surface-variant font-semibold">
                  Verified Step
                </span>
              </div>
              <h4 className="text-base sm:text-headline-sm font-headline-sm text-primary mb-1">Saved Lives &amp; Orchards</h4>
              <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                Critical patients reach ICUs in time, and smallholders harvest commercial grade olives for decades.
              </p>
            </div>
          </div>
        </div>

        {/* Operational Gap Callout Card */}
        <div className="mt-6 sm:mt-8 bg-surface-container-low border-l-4 border-status-planned border-stone-border rounded-r-xl p-4 sm:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-status-planned mb-1">
                <span className="material-symbols-outlined text-sm">warning</span> Critical Operational Reality
              </div>
              <h4 className="text-base sm:text-headline-sm font-headline-sm text-primary">
                Closing the Single-Vehicle Mountain Risk
              </h4>
              <p className="text-xs sm:text-body-sm font-body-sm text-on-surface-variant max-w-3xl mt-1 leading-relaxed">
                Currently, AMB-01 serves as the sole dedicated life-support unit for multiple isolated hamlets. When AMB-01 is en route to Abbottabad (a 3.5-hour round trip), a simultaneous medical emergency in Junglan must wait. Your donor partnership directly funds operational reserves to ensure uninterrupted field readiness.
              </p>
            </div>
            <a
              className="w-full sm:w-auto text-center shrink-0 px-4 py-2.5 bg-primary hover:bg-navy-deep text-white rounded text-xs sm:text-label-md font-semibold transition-colors"
              href="#support-section"
            >
              Help Fund Reserve Ops
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuditPipelineSection;
