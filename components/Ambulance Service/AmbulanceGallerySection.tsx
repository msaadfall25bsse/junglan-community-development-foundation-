"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function AmbulanceGallerySection() {
  return (
    <section className="py-[54px] lg:py-[86px] bg-surface-container-low border-b border-stone-border">
      <div className="max-w-[1280px] mx-auto px-2 sm:px-3.5 lg:px-5.5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <ScrollReveal variant="heading" delay={100}>
              <span className="font-label-uppercase text-label-uppercase tracking-wider text-secondary font-bold text-xs block mb-1">
                OUR WORK IN THE COMMUNITY
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary font-semibold">
                Supporting Patients Across Janglan Valley
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal variant="text" delay={200}>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-4 md:mt-0 leading-relaxed">
              Field photography documenting ongoing vehicle readiness, high-altitude passes, and mountain road patient transport.
            </p>
          </ScrollReveal>
        </div>

        {/* Bento Grid Gallery with Rich Image Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Card 1: JCDF Ambulance Vehicle (Wide) */}
          <ScrollReveal variant="card" delay={150} className="md:col-span-2 lg:col-span-2">
            <div className="relative group rounded-2xl overflow-hidden border border-stone-border bg-surface-container h-72 sm:h-80 shadow-sm">
              <img
                alt="JCDF Ambulance van with high-roof and red crescent graphics on remote mountain route"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4_pSUGVByb8tRsOgvYLcjqOSZuJEgmBQNsrBn9ktd6GNSl2TwY3_YsNexZ889EO2CwWr_dwxJSaUTyUa9XkQxNcFwpzSMB4DngDNT8i9UVFYY49u0jHQZOFGEH1PAEhDVUvLhkM-uFZ2vt2UaBbHp-8OE1dWoEgdwo4OJOcyPEnkOyzPPNU2aK53Dkc0rODEsM4Se4zKXxoZTzqNtZ74AgVz-TIRvaPNodN6u5ReZ7Z2pg2XmI5xm"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 text-surface-container-lowest z-10 text-white">
                <span className="font-label-uppercase text-label-uppercase bg-primary text-white px-2 py-0.5 rounded text-[10px] font-bold">Fleet Vehicle</span>
                <h4 className="font-headline-sm text-headline-sm mt-1 text-white font-semibold">JCDF Mountain Ambulance Van</h4>
                <p className="font-body-sm text-body-sm text-slate-200">Custom reinforced chassis, high ground clearance, red-crescent insignia</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Mountain Road Transportation */}
          <ScrollReveal variant="card" delay={250}>
            <div className="relative group rounded-2xl overflow-hidden border border-stone-border bg-surface-container h-72 sm:h-80 shadow-sm">
              <img
                alt="JCDF ambulance van navigating mountainous road at sunrise"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src="/mountain-transit-ambulance.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 text-surface-container-lowest z-10 text-white">
                <span className="font-label-uppercase text-label-uppercase bg-secondary text-white px-2 py-0.5 rounded text-[10px] font-bold">Active Dispatch</span>
                <h4 className="font-headline-sm text-headline-sm mt-1 text-white font-semibold">Mountain Transit</h4>
                <p className="font-body-sm text-body-sm text-slate-200">Dawn patient transport along Hazara ridges</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Remote Village Access & Valley Terrain */}
          <ScrollReveal variant="card" delay={350}>
            <div className="relative group rounded-2xl overflow-hidden border border-stone-border bg-surface-container h-72 sm:h-80 shadow-sm">
              <img
                alt="Panoramic mountain slopes of Janglan Valley with scattered rural hamlets"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src="/remote-valley-terrain.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 text-surface-container-lowest z-10 text-white">
                <span className="font-label-uppercase text-label-uppercase bg-navy-deep text-white px-2 py-0.5 rounded text-[10px] font-bold">Geography</span>
                <h4 className="font-headline-sm text-headline-sm mt-1 text-white font-semibold">Remote Valley Terrain</h4>
                <p className="font-body-sm text-body-sm text-slate-200">Janglan settlements spread along steep foothills</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4: Base Station & Vehicle Inspection (Wide) */}
          <ScrollReveal variant="card" delay={450} className="md:col-span-2 lg:col-span-2">
            <div className="relative group rounded-2xl overflow-hidden border border-stone-border bg-surface-container h-72 sm:h-80 shadow-sm">
              <img
                alt="Side profile of real JCDF ambulance vehicle parked at valley staging point"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0rpcurCGfpBp9OsFoIjNppH2tQht7oZ1QZFV1ZoLZvscE6rMiZNt4GSWN_NWZZoJlmrXVftcSHqLiKzN0Up4BIbTPbAttdJU0CtBbVO_ztezpgIrT4b3AC-kqc_5NekpPycOTmgVbxob3VTDtIbAR2Obfa2cY68EeML5my7B36-uJ4IAEn6fjwuSUlY2Fa2vv83CJgVJ4bkkhNuME_oh3IQTZX0XZZZAbaZssLBvVe2cx9VFDqt8u"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 text-surface-container-lowest z-10 text-white">
                <span className="font-label-uppercase text-label-uppercase bg-primary text-white px-2 py-0.5 rounded text-[10px] font-bold">Staging Post</span>
                <h4 className="font-headline-sm text-headline-sm mt-1 text-white font-semibold">Patient Transportation Support &amp; Base Station</h4>
                <p className="font-body-sm text-body-sm text-slate-200">Vehicle maintenance and emergency fuel reserves maintained locally</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 5: High Altitude Settlements */}
          <ScrollReveal variant="card" delay={550} className="md:col-span-1 lg:col-span-2">
            <div className="relative group rounded-2xl overflow-hidden border border-stone-border bg-surface-container h-72 sm:h-80 shadow-sm">
              <img
                alt="Janglan High-Altitude Settlements vista with rural homes nestled on mountain ridges"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src="/janglan-high-altitude-settlements-new.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 text-surface-container-lowest z-10 text-white">
                <span className="font-label-uppercase text-label-uppercase bg-secondary text-white px-2 py-0.5 rounded text-[10px] font-bold">Reaching Families</span>
                <h4 className="font-headline-sm text-headline-sm mt-1 text-white font-semibold">Janglan High-Altitude Settlements</h4>
                <p className="font-body-sm text-body-sm text-slate-200">Connecting families where standard transport halts</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default AmbulanceGallerySection;

