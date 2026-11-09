import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function HealthcareSection() {
  return (
    <section className="py-12 sm:py-16 bg-surface border-b border-stone-border" id="healthcare-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 xl:gap-24 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal variant="heading" delay={100}>
              <span className="text-label-uppercase font-label-uppercase text-error uppercase tracking-wider font-bold text-xs block mb-1">
                Ambulance Service &amp; Emergency Transit
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary tracking-tight leading-tight font-semibold">
                High-Altitude Relief: Free 24/7 Mountain Patient Transit
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="text" delay={200}>
              <p className="text-sm sm:text-body-md font-body-md text-on-surface-variant leading-relaxed">
                In the steep terrain of Janglan and surrounding valleys, delays in reaching secondary and tertiary healthcare facilities can be fatal. Our emergency ambulance operates 24 hours a day to evacuate critical patients to Ayub Teaching Hospital Abbottabad and DHQ Hospital Mansehra.
              </p>
            </ScrollReveal>

            {/* 4 Feature Cards Grid - Stable cards drop down from top */}
            <ScrollReveal variant="card" delay={300} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="ui-brutalist p-3.5 sm:p-4 rounded-lg">
                <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm mb-1">
                  <span className="material-symbols-outlined text-secondary text-base sm:text-lg">ecg_heart</span>
                  24/7 Driver &amp; Paramedic
                </div>
                <p className="text-xs sm:text-body-sm text-on-surface-variant font-medium">
                  Dedicated local driver trained in high-altitude night transit and patient handling.
                </p>
              </div>

              <div className="ui-brutalist p-3.5 sm:p-4 rounded-lg">
                <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm mb-1">
                  <span className="material-symbols-outlined text-secondary text-base sm:text-lg">vital_signs</span>
                  Medical Oxygen Onboard
                </div>
                <p className="text-xs sm:text-body-sm text-on-surface-variant font-medium">
                  Equipped with continuous medical oxygen cylinders and pediatric masks.
                </p>
              </div>

              <div className="ui-brutalist p-3.5 sm:p-4 rounded-lg">
                <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm mb-1">
                  <span className="material-symbols-outlined text-secondary text-base sm:text-lg">airline_seat_flat</span>
                  Mountain Stretcher Kit
                </div>
                <p className="text-xs sm:text-body-sm text-on-surface-variant font-medium">
                  Reinforced suspension and cervical collar trauma kit for rugged rock paths.
                </p>
              </div>

              <div className="ui-brutalist p-3.5 sm:p-4 rounded-lg">
                <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm mb-1">
                  <span className="material-symbols-outlined text-secondary text-base sm:text-lg">money_off</span>
                  Zero Patient Cost
                </div>
                <p className="text-xs sm:text-body-sm text-on-surface-variant font-medium">
                  Strictly free of charge for impoverished mountain families, 100% donor subsidized.
                </p>
              </div>
            </ScrollReveal>

            {/* Emergency Hotline Button */}
            <ScrollReveal variant="text" delay={350} className="pt-2">
              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white px-5 py-3 rounded-lg font-bold text-xs sm:text-label-md transition-colors text-center"
                href="tel:+923016541825"
                style={{ backgroundColor: "#e5252a" }}
              >
                <span className="material-symbols-outlined text-sm">call</span>
                <span>Emergency Dispatch Hotline (+92 301 6541825)</span>
              </a>
            </ScrollReveal>
          </div>

          {/* Right Ambulance Visual Card: Full-bleed background card with complete image coverage */}
          <ScrollReveal variant="card" delay={250} className="lg:col-span-5 h-full flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-xl min-h-[480px] sm:min-h-[520px] md:min-h-[540px] flex-1 flex flex-col justify-between p-4 sm:p-5 group bg-slate-900 w-full">
              {/* Full Card Background Image: Covers 100% of the entire card surface without any gap */}
              <img
                alt="JCDF 4x4 Mountain Ambulance navigating mountain pass"
                className="absolute inset-0 w-full h-full object-cover object-bottom scale-100 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                src="/mountain-ambulance-full.jpg"
              />

              {/* Subtle top and bottom dark gradients for clean text readability while showing full center ambulance */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/60 pointer-events-none" />

              {/* Top Header Tags Layer */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-deep/80 backdrop-blur-md text-surface text-[10px] sm:text-[11px] font-mono border border-white/20 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>AMB-01 Active Service</span>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-primary text-[10px] sm:text-[11px] font-mono font-bold border border-stone-border shadow-sm">
                  Janglan Corridor
                </div>
              </div>

              {/* Bottom Information & Dispatch Layer */}
              <div className="relative z-10 space-y-3 pt-12">
                {/* Headquarters Bar */}
                <div className="bg-black/60 backdrop-blur-md text-surface p-3 rounded-xl flex items-center justify-between border border-white/20 shadow-md">
                  <div>
                    <div className="text-[10px] sm:text-xs text-secondary-fixed uppercase font-label-uppercase tracking-wider font-bold">
                      Headquarters
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-xs text-secondary-fixed">pin_drop</span>
                      <span>Janglan Base Camp</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] sm:text-xs text-secondary-fixed font-semibold">Elev: 1,520m</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-300">District Mansehra</div>
                  </div>
                </div>

                {/* Dispatch Call Bar */}
                <div className="bg-black/65 backdrop-blur-md border border-white/20 rounded-xl p-3 flex items-center justify-between shadow-lg gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-base sm:text-lg">medical_services</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-xs font-label-uppercase text-slate-300 uppercase tracking-wider truncate">
                        Emergency Dispatch Desk
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white truncate">
                        AMB-01 Mountain Standby
                      </div>
                    </div>
                  </div>
                  <FlipButton
                    href="tel:+923016541825"
                    variant="red"
                    frontText="Dial"
                    backText="Calling..."
                    icon="phone_in_talk"
                    className="shrink-0"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default HealthcareSection;
