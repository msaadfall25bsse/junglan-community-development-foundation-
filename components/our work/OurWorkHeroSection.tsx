"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function OurWorkHeroSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      className="relative border-b border-stone-border overflow-hidden py-8 md:py-12"
      style={{
        backgroundImage:
          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzsWfIKswJeBmgcOg9O-bJUe9PFD6GeDyeVOwGEomrwXTRdUIxbdMZRN9oaLAYvE3iTE4q3peMZNAZ-MEDzJk3lxv-9_XwJX57Fzl2TCn9-gGfW2ZqL9SAZGagRJROUfZ3KSeEsqh5uKvbyDs9ZqbBZojZS6Ke_Ki6qnQKIslRkpp4IhQgNGj35TB74hu8-wmkglk1yoTW0tKY6lTBteh4w8IH6yV5PPuBPv9xshBDyIYbBe2i9bVQ")',
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal variant="card" delay={50}>
              <div className="ui-skeuomorphic-badge inline-flex items-center gap-2 px-3 py-1 rounded-full text-primary font-label-uppercase text-label-uppercase border border-stone-border">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                OUR WORK
              </div>
            </ScrollReveal>

            <ScrollReveal variant="heading" delay={150}>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight max-w-xl font-semibold mb-6">
                Practical Support. Stronger Communities.
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="text" delay={250}>
              <div className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed space-y-3">
                <p>
                  JCDF focuses on practical areas of community support and development. Our work includes ambulance services for patient transportation and agriculture as an area of local development. Through these areas, we aim to highlight community needs, improve access to essential support, and explore opportunities for sustainable progress.
                </p>

                {/* Smooth Expandable Context (Optional feature preservation) */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden space-y-2 pt-1 font-body-md text-on-surface-variant">
                    <p>
                      Each area addresses persistent mountain bottlenecks: immediate survival during high-altitude medical crises, and long-term economic stability through sustainable regenerative agriculture.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors pt-1 cursor-pointer focus:outline-none"
                >
                  <span>{isExpanded ? "Show Less" : "See More"}</span>
                  <span
                    className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
              </div>
            </ScrollReveal>

            {/* Action Buttons: 3D Flip Buttons */}
            <ScrollReveal variant="text" delay={350}>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <FlipButton
                  href="#overview"
                  variant="primary"
                  frontText="Explore Our Work"
                  backText="Opening Overview..."
                  icon="south"
                />
                <FlipButton
                  href="#contact"
                  variant="outline"
                  frontText="Contact JCDF"
                  backText="Connecting..."
                  icon="mail"
                />
              </div>
            </ScrollReveal>

            {/* Operational Verification Indicators with Neumorphic Inset */}
            <ScrollReveal variant="card" delay={450}>
              <div className="ui-neumorphic-inset py-3.5 px-5 rounded-2xl flex flex-wrap items-center gap-6 text-body-sm text-on-surface-variant font-medium">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-lg">
                    domain_verification
                  </span>
                  <span>Direct Field Execution</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-lg">
                    account_balance
                  </span>
                  <span>SECP Reg. CUIN 0348227</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-lg">
                    pin_drop
                  </span>
                  <span>District Mansehra, KP</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Visual Image Card with balanced, professional height */}
          <ScrollReveal variant="card" delay={250} className="lg:col-span-5 relative flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-stone-border shadow-lg bg-surface-container h-[320px] sm:h-[360px] md:h-[390px] group">
              <img
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                alt="A breathtaking documentary-style photograph of the rugged, mist-covered mountain valleys of Mansehra in Khyber Pakhtunkhwa, Pakistan."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF45Otk75jFfXxiddGnF9yJBDgAVxOU8SRVVAptYTea8sEOAyEDtrHn_mrXt5SBAoLutTsUUyteQ8PGnUznIG6F0E62y39O-1Y_AsImzIHt7xX1yE8J8bnWYQmLCulVlZDu9PSt-6m1pLmoL0arOiOFG7TJ2ummR9XLsfEp0iayuTnPcTkK9xilt48NG-btlvCuPy1a5QQ996bWGuXnXP-aPXTgJaucfN9SrIO8lafpkovnYqpdXI59Zp_BfyWxyEJdg"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default OurWorkHeroSection;

