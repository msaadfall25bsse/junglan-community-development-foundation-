"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function AgricultureGallerySection() {
  return (
    <section className="py-[54px] md:py-[70px] bg-surface border-b border-stone-border relative overflow-hidden" id="gallery">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-3.5 lg:px-5.5 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <ScrollReveal variant="heading" delay={100}>
              <span className="font-label-uppercase text-label-uppercase text-secondary uppercase font-bold tracking-widest text-xs block mb-1">
                OUR AGRICULTURAL WORK
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary font-semibold">
                A Closer Look at Mountain Agriculture
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal variant="text" delay={200}>
            <p className="text-body-sm font-body-sm text-on-surface-variant max-w-md leading-relaxed">
              Visual documentation of terraced slopes, high-altitude soil stewardship, and healthy olive nursery crops across Hazara Division.
            </p>
          </ScrollReveal>
        </div>

        {/* Masonry / Editorial Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Item 1: Wide Valley (7 cols) */}
          <ScrollReveal variant="card" delay={150} className="md:col-span-7">
            <div className="rounded-xl overflow-hidden border border-stone-border h-72 sm:h-80 relative group shadow-sm bg-surface-container-lowest p-1.5 ui-bento-card">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <img
                  alt="Hazara valley overview showing mountain terrain and rural agricultural settlement"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCckayHsFtXgT-Mh-xDw7SKj7ufS1wTR9OfRDNKRxq5EZImYOcPSrOQ_CCSgO2hoLO8IA-74KfHz84fdu9C8c7uNoSKwAuC-Cj7HzYG2mTpGDGmPQ7GEH7EWgn-cyiBVqlHxSYPvQatWc3mxmdn2opSW3iNk8PuqNuKScGzPz-XyPFwPcemPL4FEdFrV8bRD5Jja6kkVFgHWE30BPEzwISO-nUIAAXPNE3si-VUazXJb7BvTUJwENX"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-3.5 left-3.5 text-white z-10">
                  <span className="text-[10.5px] uppercase font-label-uppercase text-emerald-400 font-bold tracking-wider block mb-0.5">Terraced Slopes</span>
                  <h4 className="font-headline-sm text-headline-sm font-semibold text-white">Hazara Mountain Terraces</h4>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Item 2: Olive Fruit Close-up (5 cols) */}
          <ScrollReveal variant="card" delay={250} className="md:col-span-5">
            <div className="rounded-xl overflow-hidden border border-stone-border h-72 sm:h-80 relative group shadow-sm bg-surface-container-lowest p-1.5 ui-bento-card">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  alt="A detailed close-up shot of hands gently inspecting ripe green olives on a productive branch"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA5_XLoh3eFXl6F9pimeDbA8DESphI2HYsj49XLabbMw1ruit85TapgssENTf1jZ5l5WNHm2Htt9cOKIPpNGQNFoGvLy26l_0xRWeyNvDNl_NJe2VDQp2Kr4w-wpqwqFJuDQpN_Q7NrvKtHPEcyMEGYp0dkoi544vVsZ7CbSXZDqmKRWTQffZ3xHQWyJrQh-KQ4aDMs35ZPZOQKM7o19WfLl8Xt85hDCYbr2cXmYg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-3.5 left-3.5 text-white z-10">
                  <span className="text-[10.5px] uppercase font-label-uppercase text-emerald-400 font-bold tracking-wider block mb-0.5">Cultivar Health</span>
                  <h4 className="font-headline-sm text-headline-sm font-semibold text-white">Olive Branch Inspection</h4>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Item 3: Olive Oil & Harvest Yields (5 cols) */}
          <ScrollReveal variant="card" delay={350} className="md:col-span-5">
            <div className="rounded-xl overflow-hidden border border-stone-border h-72 sm:h-80 relative group shadow-sm bg-surface-container-lowest p-1.5 ui-bento-card">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  alt="Glass bottle of cold pressed olive oil glowing with amber green tones set outdoors on a stone terrace wall"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIYJetSoW37vS0s_0DXee-Ak9XOs7dHWwhyBPVUg_G__xaqrI6OCxZUf5ZDa8DZyuRc-c3YcIufcKE1QshFAtGrwnZ35S1CozyyxF42uM72ZSgImLeiTzDzOSSZinoEZ6A0pm-EiTd0x7aBBrLBl9TVnDOORRAAY0UCmI-SQ_ozlDleg1uVx601wXmQC8UVTF7RDHklIJk3Lucy9ctJB0SkI_krP6PL2uPMZOm_a0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-3.5 left-3.5 text-white z-10">
                  <span className="text-[10.5px] uppercase font-label-uppercase text-emerald-400 font-bold tracking-wider block mb-0.5">Harvest Yields</span>
                  <h4 className="font-headline-sm text-headline-sm font-semibold text-white">Extra Virgin Olive Extraction</h4>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Item 4: Mountain Landscape (7 cols) */}
          <ScrollReveal variant="card" delay={450} className="md:col-span-7">
            <div className="rounded-xl overflow-hidden border border-stone-border h-72 sm:h-80 relative group shadow-sm bg-surface-container-lowest p-1.5 ui-bento-card">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <img
                  alt="Mountain terrace landscapes showing agricultural potential"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCckayHsFtXgT-Mh-xDw7SKj7ufS1wTR9OfRDNKRxq5EZImYOcPSrOQ_CCSgO2hoLO8IA-74KfHz84fdu9C8c7uNoSKwAuC-Cj7HzYG2mTpGDGmPQ7GEH7EWgn-cyiBVqlHxSYPvQatWc3mxmdn2opSW3iNk8PuqNuKScGzPz-XyPFwPcemPL4FEdFrV8bRD5Jja6kkVFgHWE30BPEzwISO-nUIAAXPNE3si-VUazXJb7BvTUJwENX"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-3.5 left-3.5 text-white z-10">
                  <span className="text-[10.5px] uppercase font-label-uppercase text-emerald-400 font-bold tracking-wider block mb-0.5">Ecosystem Preservation</span>
                  <h4 className="font-headline-sm text-headline-sm font-semibold text-white">Junglan Mountain Valley Catchment</h4>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default AgricultureGallerySection;

