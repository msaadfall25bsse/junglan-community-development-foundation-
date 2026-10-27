import React from "react";

export function HealthcareSection() {
  return (
    <section className="py-12 sm:py-16 bg-surface border-b border-stone-border" id="healthcare-section">
      <div className="max-w-7xl mx-auto px-[10px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-label-uppercase font-label-uppercase text-error uppercase tracking-wider font-bold text-xs">
              Healthcare &amp; Emergency Service
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary tracking-tight leading-tight">
              High-Altitude Relief: Free 24/7 Mountain Patient Transit
            </h2>
            <p className="text-sm sm:text-body-md font-body-md text-on-surface-variant leading-relaxed">
              In the steep terrain of Junglan and surrounding valleys, delays in reaching secondary and tertiary healthcare facilities can be fatal. Our emergency ambulance operates 24 hours a day to evacuate critical patients to Ayub Teaching Hospital Abbottabad and DHQ Hospital Mansehra.
            </p>

            {/* 4 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3.5 sm:p-4 bg-surface-container-lowest border border-stone-border rounded-lg">
                <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm mb-1">
                  <span className="material-symbols-outlined text-secondary text-base sm:text-lg">ecg_heart</span>
                  24/7 Driver &amp; Paramedic
                </div>
                <p className="text-xs sm:text-body-sm text-on-surface-variant">
                  Dedicated local driver trained in high-altitude night transit and patient handling.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 bg-surface-container-lowest border border-stone-border rounded-lg">
                <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm mb-1">
                  <span className="material-symbols-outlined text-secondary text-base sm:text-lg">vital_signs</span>
                  Medical Oxygen Onboard
                </div>
                <p className="text-xs sm:text-body-sm text-on-surface-variant">
                  Equipped with continuous medical oxygen cylinders and pediatric masks.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 bg-surface-container-lowest border border-stone-border rounded-lg">
                <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm mb-1">
                  <span className="material-symbols-outlined text-secondary text-base sm:text-lg">airline_seat_flat</span>
                  Mountain Stretcher Kit
                </div>
                <p className="text-xs sm:text-body-sm text-on-surface-variant">
                  Reinforced suspension and cervical collar trauma kit for rugged rock paths.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 bg-surface-container-lowest border border-stone-border rounded-lg">
                <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm mb-1">
                  <span className="material-symbols-outlined text-secondary text-base sm:text-lg">money_off</span>
                  Zero Patient Cost
                </div>
                <p className="text-xs sm:text-body-sm text-on-surface-variant">
                  Strictly free of charge for impoverished mountain families, 100% donor subsidized.
                </p>
              </div>
            </div>

            {/* Emergency Hotline Button */}
            <div className="pt-2">
              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white px-5 py-3 rounded-lg font-bold text-xs sm:text-label-md transition-colors text-center"
                href="tel:+923016541825"
                style={{ backgroundColor: "#e5252a" }}
              >
                <span className="material-symbols-outlined text-sm">call</span>
                <span>Emergency Dispatch Hotline (+92 301 6541825)</span>
              </a>
            </div>
          </div>

          {/* Right Ambulance Visual Card (100% exact from index.html) */}
          <div className="lg:col-span-5">
            <div className="bg-surface-container-lowest border border-stone-border rounded-xl p-4 sm:p-5 shadow-md space-y-3 sm:space-y-4 relative group">
              <div className="relative rounded-lg overflow-hidden border-2 border-stone-border aspect-[4/3] shadow-sm ring-1 ring-black/5">
                <img
                  alt="JCDF 4x4 Mountain Ambulance - 4 Villages. 3000 People. 1 Ambulance. No Backup."
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.01]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmr4hKb_HMqDutGRELVHRK7j89DaIvsEthZp5-fJdMBVwROwIgOuZYA5WEHlG41SF7mGafYqqzWDp4K0A7ktcaEA1nh_U8oMJ6Q26FRclxNUsW8wdq_zsHyI5XN-lTLKmqS7KuO4CBp_FuehuiRsRSOPVHsTfVrMKoWTck0cpCSJHGzdwAbOkoDrPtjpA5RYnerz704865uev-63yuMjC-1QmEVk9w1BmKvkgxzI896HR74RG34VKYhjGrP0YmboPDWQ"
                />
                <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-navy-deep/80 backdrop-blur-sm text-surface text-[10px] sm:text-[11px] font-mono border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>AMB-01 Active Service</span>
                </div>
                <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded bg-white/90 backdrop-blur-sm text-primary text-[10px] font-mono font-bold border border-stone-border shadow-sm">
                  Junglan Corridor
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-navy-deep/90 backdrop-blur-sm text-surface p-2.5 sm:p-3 rounded-lg flex items-center justify-between border border-white/10 shadow-sm">
                  <div>
                    <div className="text-[10px] sm:text-xs text-on-primary-container uppercase font-label-uppercase tracking-wider">
                      Headquarters
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-xs text-secondary-fixed">pin_drop</span>
                      <span>Junglan Base Camp</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] sm:text-xs text-secondary-fixed font-semibold">Elev: 1,520m</div>
                    <div className="text-[10px] sm:text-[11px] text-surface-container-high">District Mansehra</div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Dispatch Banner */}
              <div className="bg-surface-container-low border border-stone-border rounded-lg p-3 sm:p-3.5 flex items-center justify-between shadow-sm gap-2">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base sm:text-lg">medical_services</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-xs font-label-uppercase text-on-surface-variant uppercase tracking-wider truncate">
                      Emergency Dispatch Desk
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-primary truncate">
                      AMB-01 Mountain Standby
                    </div>
                  </div>
                </div>
                <a
                  className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-white rounded text-xs font-bold transition-colors shadow-sm shrink-0"
                  href="tel:+923016541825"
                  style={{ backgroundColor: "#e5252a" }}
                >
                  <span className="material-symbols-outlined text-xs sm:text-sm">phone_in_talk</span>
                  <span>Dial</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HealthcareSection;
