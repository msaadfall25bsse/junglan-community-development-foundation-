import React from "react";

export function MetricsSection() {
  return (
    <section className="py-7 sm:py-10 md:py-12 bg-surface-container-lowest border-b border-stone-border">
      <div className="max-w-7xl mx-auto px-[10px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-7 md:mb-8 gap-2 sm:gap-3 md:gap-4">
          <div className="space-y-1">
            <span className="text-label-uppercase font-label-uppercase text-secondary uppercase tracking-wider text-[10px] sm:text-[11px] font-bold">
              Field Operational Verification
            </span>
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-headline-md font-headline-md text-primary font-bold tracking-tight">
              Measurable Progress Across Junglan Valley
            </h2>
          </div>
          <div className="text-body-sm font-body-sm text-on-surface-variant max-w-md text-xs sm:text-sm leading-relaxed">
            Field data updated on monthly accounting cycle • 100% verified against bank receipts and emergency dispatch trip logs.
          </div>
        </div>

        {/* Responsive Cards Grid:
            - Mobile (< 640px): 2 columns with fluid compact padding & balanced font sizes
            - Tablets (640px - 1023px): 2 columns on small tabs, 4 columns on large tabs
            - Desktop (>= 1024px): 4 clean spacious columns
        */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-5 lg:gap-6">
          {/* Metric 1 */}
          <div className="p-3 xs:p-3.5 sm:p-5 md:p-6 rounded-xl bg-surface-container-low border border-stone-border flex flex-col justify-between shadow-xs hover:shadow-sm transition-shadow">
            <div>
              <div className="flex items-center justify-between text-on-surface-variant mb-1.5 sm:mb-2">
                <span className="text-[9.5px] xs:text-[10px] sm:text-xs uppercase font-label-uppercase font-semibold tracking-wide text-[#e5252a] line-clamp-1">
                  Emergency Evacuations
                </span>
                <span className="material-symbols-outlined text-[#e5252a] text-base xs:text-lg sm:text-xl shrink-0">
                  ambulance
                </span>
              </div>
              <div className="text-2xl xs:text-3xl sm:text-4xl md:text-stat-display font-stat-display font-extrabold tracking-tight text-[#e5252a] leading-none my-1">
                462
              </div>
              <p className="text-[10.5px] xs:text-[11px] sm:text-xs md:text-body-sm text-on-surface-variant mt-1.5 sm:mt-2 leading-snug">
                Critical patients safely transported in 2.5 years (maternity, trauma, cardiac).
              </p>
            </div>
            <div className="mt-2.5 sm:mt-3 md:mt-4 pt-2 sm:pt-2.5 md:pt-3 border-t border-stone-border/80 text-[9.5px] xs:text-[10px] sm:text-xs text-[#e5252a] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] sm:text-xs shrink-0">verified</span>
              <span className="truncate">Logged in Dispatch Register</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-3 xs:p-3.5 sm:p-5 md:p-6 rounded-xl bg-surface-container-low border border-stone-border flex flex-col justify-between shadow-xs hover:shadow-sm transition-shadow">
            <div>
              <div className="flex items-center justify-between text-on-surface-variant mb-1.5 sm:mb-2">
                <span className="text-[9.5px] xs:text-[10px] sm:text-xs uppercase font-label-uppercase font-semibold tracking-wide text-[#1e5631] line-clamp-1">
                  Core Settlements
                </span>
                <span className="material-symbols-outlined text-[#1e5631] text-base xs:text-lg sm:text-xl shrink-0">
                  location_city
                </span>
              </div>
              <div className="text-2xl xs:text-3xl sm:text-4xl md:text-stat-display font-stat-display font-extrabold tracking-tight text-[#1e5631] leading-none my-1">
                4
              </div>
              <p className="text-[10.5px] xs:text-[11px] sm:text-xs md:text-body-sm text-on-surface-variant mt-1.5 sm:mt-2 leading-snug">
                Core mountain villages served continuously, plus 15+ surrounding isolated hamlets.
              </p>
            </div>
            <div className="mt-2.5 sm:mt-3 md:mt-4 pt-2 sm:pt-2.5 md:pt-3 border-t border-stone-border/80 text-[9.5px] xs:text-[10px] sm:text-xs text-[#1e5631] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] sm:text-xs shrink-0">terrain</span>
              <span className="truncate">Hazara High-Altitude</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="p-3 xs:p-3.5 sm:p-5 md:p-6 rounded-xl bg-surface-container-low border border-stone-border flex flex-col justify-between shadow-xs hover:shadow-sm transition-shadow">
            <div>
              <div className="flex items-center justify-between text-on-surface-variant mb-1.5 sm:mb-2">
                <span className="text-[9.5px] xs:text-[10px] sm:text-xs uppercase font-label-uppercase font-semibold tracking-wide text-[#0b4f8c] line-clamp-1">
                  Ambulance Unit
                </span>
                <span className="material-symbols-outlined text-[#0b4f8c] text-base xs:text-lg sm:text-xl shrink-0">
                  emergency
                </span>
              </div>
              <div className="text-2xl xs:text-3xl sm:text-4xl md:text-stat-display font-stat-display font-extrabold tracking-tight text-[#0b4f8c] leading-none my-1">
                1
              </div>
              <p className="text-[10.5px] xs:text-[11px] sm:text-xs md:text-body-sm text-on-surface-variant mt-1.5 sm:mt-2 leading-snug">
                Dedicated mountain unit (AMB-01, oxygen-equipped, 24/7 mountain driver).
              </p>
            </div>
            <div className="mt-2.5 sm:mt-3 md:mt-4 pt-2 sm:pt-2.5 md:pt-3 border-t border-stone-border/80 text-[9.5px] xs:text-[10px] sm:text-xs text-[#0b4f8c] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] sm:text-xs shrink-0">check_circle</span>
              <span className="truncate">100% Free for Needy</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="p-3 xs:p-3.5 sm:p-5 md:p-6 rounded-xl bg-surface-container-low border border-stone-border flex flex-col justify-between shadow-xs hover:shadow-sm transition-shadow">
            <div>
              <div className="flex items-center justify-between text-on-surface-variant mb-1.5 sm:mb-2">
                <span className="text-[9.5px] xs:text-[10px] sm:text-xs uppercase font-label-uppercase font-semibold tracking-wide text-[#1e5631] line-clamp-1">
                  Fiduciary Audit
                </span>
                <span className="material-symbols-outlined text-[#1e5631] text-base xs:text-lg sm:text-xl shrink-0">
                  receipt_long
                </span>
              </div>
              <div className="text-2xl xs:text-3xl sm:text-4xl md:text-stat-display font-stat-display font-extrabold tracking-tight text-[#1e5631] leading-none my-1">
                100%
              </div>
              <p className="text-[10.5px] xs:text-[11px] sm:text-xs md:text-body-sm text-on-surface-variant mt-1.5 sm:mt-2 leading-snug">
                Transparent stewardship verified against bank receipts and field ledgers.
              </p>
            </div>
            <div className="mt-2.5 sm:mt-3 md:mt-4 pt-2 sm:pt-2.5 md:pt-3 border-t border-stone-border/80 text-[9.5px] xs:text-[10px] sm:text-xs text-[#1e5631] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] sm:text-xs shrink-0">policy</span>
              <span className="truncate">SECP Reg. CUIN 0348227</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MetricsSection;
