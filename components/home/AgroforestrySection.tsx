import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function AgroforestrySection() {
  return (
    <section className="py-12 sm:py-16 bg-surface-container-lowest border-b border-stone-border" id="agriculture-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 xl:gap-24 items-center">
          {/* Left Visual Card with Background Image and Glassmorphism Metric Badges (100% exact from index.html) - Stable Card drops down from top */}
          <ScrollReveal variant="card" delay={150} className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-stone-border shadow-lg min-h-[460px] sm:min-h-[500px] md:min-h-[520px] flex flex-col justify-end p-4 sm:p-6 group">
              <img
                alt="Hands harvesting and cultivating olive branches in mountain orchard"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                style={{ objectPosition: "50% 80%" }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo6qTjJQ2mlEmfbLnavFaqpwfD3UMmMNNybnxGlvsg_iF-qz74cQ3ZHdjhzlubkGLd1fNplsS9777GGtWoZGQjBqmv3z2l7q1T2C5L9LN3CF3XrOlFIspCip7U26vRGFsjeJsXI1I7nMQR9D6fmTp9XljovIXeXmrMnJDbzafZ2sXJw6A_piJX6YztLZgFpfqwBylDPqM84bnJPyvsfHJuY5cS_iJwdFT73GH7bh_tI0ig6QUqOqxnWhObOfpMbSPxDQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none"></div>
              
              <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4 text-center">
                <div className="p-4 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg text-white">
                  <div className="text-2xl sm:text-3xl md:text-stat-display font-stat-display font-bold text-white tracking-tight drop-shadow-sm">
                    5,000+
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/90 uppercase font-label-uppercase font-semibold tracking-wide mt-1 drop-shadow-sm">
                    Saplings Targeted
                  </div>
                </div>

                <div className="p-4 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg text-white">
                  <div className="text-2xl sm:text-3xl md:text-stat-display font-stat-display font-bold text-white tracking-tight drop-shadow-sm">
                    50+
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/90 uppercase font-label-uppercase font-semibold tracking-wide mt-1 drop-shadow-sm">
                    Farmers Enrolled
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Narrative Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 order-1 lg:order-2">
            <ScrollReveal variant="heading" delay={100}>
              <span className="text-label-uppercase font-label-uppercase text-secondary uppercase tracking-wider font-bold text-xs block mb-1">
                Sustainable Agroforestry
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary tracking-tight leading-tight font-semibold">
                Cultivating Generational Self-Reliance Through Olive Farming
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="text" delay={200}>
              <p className="text-sm sm:text-body-md font-body-md text-on-surface-variant leading-relaxed">
                Pakistan possesses ideal soil and climate conditions for high-quality commercial olive cultivation. JCDF equips smallholder mountain farmers with certified saplings, modern drip irrigation training, and ongoing agronomic mentorship.
              </p>

              <div className="space-y-3 sm:space-y-4 mt-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg sm:text-xl shrink-0 mt-0.5">park</span>
                  <div>
                    <h4 className="font-semibold text-primary text-sm sm:text-base">Commercial Variety Seedlings</h4>
                    <p className="text-xs sm:text-body-sm text-on-surface-variant mt-0.5">
                      Supplying certified, climate-resilient olive saplings specifically suited to the micro-climate and altitude of Hazara Division.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg sm:text-xl shrink-0 mt-0.5">water_drop</span>
                  <div>
                    <h4 className="font-semibold text-primary text-sm sm:text-base">Modern Drip Irrigation Training</h4>
                    <p className="text-xs sm:text-body-sm text-on-surface-variant mt-0.5">
                      Training local farmers in high-efficiency water management, mountain rain harvesting, and organic pest protection.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg sm:text-xl shrink-0 mt-0.5">landscape</span>
                  <div>
                    <h4 className="font-semibold text-primary text-sm sm:text-base">Environmental Slope Stabilization</h4>
                    <p className="text-xs sm:text-body-sm text-on-surface-variant mt-0.5">
                      Deep-root olive root systems anchor fragile terraced hillsides against catastrophic monsoonal soil erosion and mudslides.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="pt-2">
              <FlipButton
                href="#support-section"
                variant="primary"
                frontText="Sponsor Certified Olive Saplings for Smallholders"
                backText="Opening Sponsorship..."
                icon="eco"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AgroforestrySection;
