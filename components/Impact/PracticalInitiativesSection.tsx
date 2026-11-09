'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from "@/components/home/ScrollReveal";

export default function PracticalInitiativesSection() {
  return (
    <section className="py-[54px] md:py-[70px] bg-surface-container-lowest border-b border-stone-border relative overflow-hidden" id="initiatives">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <ScrollReveal variant="heading" delay={100}>
              <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
                WHERE OUR WORK MAKES A DIFFERENCE
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary font-semibold">
                Supporting Communities Through Practical Initiatives
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal variant="text" delay={200}>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-md leading-relaxed">
              Direct, measurable stewardship addressing healthcare access, regenerative agroforestry, and resilient mountain civic infrastructure.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1 */}
          <ScrollReveal variant="card" delay={150}>
            <div className="bg-gradient-to-br from-surface-container-lowest via-white to-red-50/20 rounded-2xl border border-stone-border hover:border-red-600/40 overflow-hidden flex flex-col group shadow-xs hover:shadow-md transition-all duration-300 ui-bento-card h-full">
              <div className="relative h-52 sm:h-56 overflow-hidden bg-surface-container p-1.5">
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img
                    alt="White Suzuki Bolan ambulance of Junglan Community Development Foundation parked on mountain dirt path"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcnRGSCabmPSP-rcyva0m06CS4YUH9ev1cUOVwa495fz_dK2JfrngsSc28rBjZIVD1m2H8iBLGf0aMlOpLH9Vi3OOW7qF1lpZGYnYRE50v_cuKVuhzor4osgIxA9zhSfqel2OyvD54sgo86W27VaR-BeX8_ZkUwrQNao6jjeQ24kvEp2Mlsujq4GtGj3topw57s6ZKtUzGPQdEGhMhw7nbcDIpVHsrQcHG2YKdQCnX-1SW79r_IqRR"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-red-700 text-white rounded text-[10.5px] font-label-uppercase font-bold tracking-wider shadow-xs">
                    HEALTHCARE DISPATCH
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">
                    Ambulance Transportation Support
                  </h3>
                  <p className="mt-2 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                    Providing critical emergency transit between remote Janglan Valley homes and regional healthcare facilities in Mansehra and Abbottabad. Mitigating perilous transit delays for expecting mothers and urgent trauma cases.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-border/70 flex items-center justify-between text-xs">
                  <span className="font-semibold text-primary">~450 Transits Recorded</span>
                  <a className="font-semibold text-primary flex items-center gap-1 group-hover:text-secondary transition-colors" href="/ambulance-service">
                    <span>View Program</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal variant="card" delay={250}>
            <div className="bg-gradient-to-br from-surface-container-lowest via-white to-emerald-50/20 rounded-2xl border border-stone-border hover:border-secondary/40 overflow-hidden flex flex-col group shadow-xs hover:shadow-md transition-all duration-300 ui-bento-card h-full">
              <div className="relative h-52 sm:h-56 overflow-hidden bg-surface-container p-1.5">
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img
                    alt="Bottle of fresh extra virgin olive oil with fresh green olives on branch in mountain grove"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8CvSNEZgabIrxs70jkkt-yFXmKVi3f70clNS0cXLkcDliWDHkly4_bxk4OuFMBnrp9G0sRStmLIRTGn9W1DR8RCkgYSw-PEU9r-OYCwFnH8OAexI6kMEsO6S57nghBt2SVocLLDrxFGvydfpRjZ2DYi-e-EPtT15gXt4AqmjkYaOsjmXqjJ3xDeMZt69S3L2HEJYGC9-lWlrSzciyFUCBa6tWkCNlhDQ2VAnAZ_QeFJZh1yu8IKS_"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-secondary text-white rounded text-[10.5px] font-label-uppercase font-bold tracking-wider shadow-xs">
                    AGROFORESTRY &amp; SOIL
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">
                    Agricultural Development &amp; Olives
                  </h3>
                  <p className="mt-2 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                    Championing hillside terrace stabilization and income diversification through high-yield olive sapling distribution. Protecting fragile watershed topsoil while introducing durable agrarian value chains to local farmers.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-border/70 flex items-center justify-between text-xs">
                  <span className="font-semibold text-secondary">Terraced Olive Groves</span>
                  <a className="font-semibold text-secondary flex items-center gap-1 group-hover:text-primary transition-colors" href="/agriculture">
                    <span>View Farming</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal variant="card" delay={350}>
            <div className="bg-gradient-to-br from-surface-container-lowest via-white to-blue-50/20 rounded-2xl border border-stone-border hover:border-primary/40 overflow-hidden flex flex-col group shadow-xs hover:shadow-md transition-all duration-300 ui-bento-card h-full">
              <div className="relative h-52 sm:h-56 overflow-hidden bg-surface-container p-1.5">
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img
                    alt="Scenic mountain valley village rooftops surrounded by pine slopes in KP Pakistan"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj0F3gl2agbK2BHCOGSAs4BmUSztOTCnWpJZR_5EU_0Tz10jtOYpECRqixjSendwj3mea8_mzSlFtIlUr4FAgi_x8NtIYi3WH2Eyma2UG5dHyN0WxBXBiVYrtf7zFqzTbXO2QyeNLiKa0CQsBK1uOWLoRywmcrDn5jJ1s6LnTmYkpXCqCHDeFrhBJ2BC1gltSR5I01BT4AX7mmQNl6-weAYJr2WfTxskWsYtZKaUHEILTDoKohjs_b"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-primary text-white rounded text-[10.5px] font-label-uppercase font-bold tracking-wider shadow-xs">
                    INFRASTRUCTURE
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-semibold">
                    Civic &amp; Community Infrastructure
                  </h3>
                  <p className="mt-2 text-xs sm:text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                    Mobilizing local volunteer labor and targeted resources for gravity-fed spring water channels, footpath safety reinforcements, and communal winter support across isolated mountain settlement perimeters.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-border/70 flex items-center justify-between text-xs">
                  <span className="font-semibold text-primary">Village Stewardship</span>
                  <a className="font-semibold text-primary flex items-center gap-1 group-hover:text-secondary transition-colors" href="/our-work">
                    <span>Explore Works</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
