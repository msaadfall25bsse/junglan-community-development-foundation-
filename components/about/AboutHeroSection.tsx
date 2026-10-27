"use client";

import React from "react";

export function AboutHeroSection() {
  return (
    <section className="relative bg-surface-container-lowest border-b border-stone-border overflow-hidden py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Narrative Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-stone-border mb-4">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider">
                ABOUT JUNGLAN COMMUNITY DEVELOPMENT FOUNDATION
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary mb-6 tracking-tight font-extrabold">
              Working Together for Stronger Communities
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
              Junglan Community Development Foundation works to address community needs through essential services and local development initiatives. Our areas of work include patient transportation support, agriculture, and future development initiatives designed around community priorities.
            </p>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-label-md text-label-md hover:bg-navy-deep shadow-sm transition-all" href="#areas-of-work">
                <span>Explore Our Work</span>
                <span className="material-symbols-outlined ml-1.5 text-[18px]">arrow_forward</span>
              </a>
              <a className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-stone-border bg-stone-white text-primary font-label-md text-label-md hover:bg-surface-container-low transition-colors" href="#contact">
                <span className="material-symbols-outlined mr-1.5 text-[18px]">mail</span>
                <span>Contact Us</span>
              </a>
            </div>
            {/* Operational Pillar Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-8 mt-8 border-t border-stone-border w-full">
              <div>
                <p className="font-headline-md text-headline-md text-secondary font-bold">100%</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Community-Centered</p>
              </div>
              <div>
                <p className="font-headline-md text-headline-md text-primary font-bold">24/7</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Patient Transport</p>
              </div>
              <div>
                <p className="font-headline-md text-headline-md text-primary font-bold">Hazara</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Khyber Pakhtunkhwa</p>
              </div>
            </div>
          </div>

          {/* Visual Right Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-stone-border bg-surface-container shadow-md">
              <img
                alt="High-altitude mountain valley terrain and forested hills in District Mansehra, KP, Pakistan"
                className="w-full h-80 md:h-[420px] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpPxGP3Zx33RQ7YxHrDp_lnqzGB7EoFqbj-_eqEueYGOmy2ZxYbzo1h48XQ9ocwq2r6F5x7jGyTYVrja3CWWNSbpqaLqqlHAVn3T28U-xg6pURrnSE7k_E4vOGDNv77WHwsTwuJjg4Dvc1JNYdpgTjzXiXsWYicb9Y7lH2-MomT_BWRGI4ZSun4WDRkpvBnmt76mHfMr1USXKE09icz5U_St7jkGMc4-nt8JEduTFDRqB-RqaUHqvdAPPKuMavugKQGg"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-transparent text-surface">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
                  <span className="font-label-uppercase text-label-uppercase text-secondary-fixed tracking-wider">GEOGRAPHIC BASE</span>
                </div>
                <p className="font-body-sm text-body-sm text-inverse-on-surface">
                  Remote Mountain Hamlets • District Mansehra, KP, Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHeroSection;
