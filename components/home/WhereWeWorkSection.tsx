"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Compass, CheckCircle2, Users, Building, ChevronRight } from "lucide-react";
import { LOCATIONS_DATA, LocationItem } from "@/data/homepage-data";

export const WhereWeWorkSection: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<number>(0);

  return (
    <section id="where-we-work" className="py-16 sm:py-24 bg-slate-50/80 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            <span>Geographic Presence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Where We Work
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Our operational presence spans remote valleys, agricultural belts, and developing settlements where community infrastructure and emergency medical access are most urgently needed.
          </p>
        </div>

        {/* 2-Column Grid: Location List Tabs & Detailed Region Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Location Cards Selectors */}
          <div className="lg:col-span-5 space-y-3">
            {LOCATIONS_DATA.map((loc, idx) => {
              const isSelected = selectedLocation === idx;

              return (
                <button
                  key={loc.region}
                  type="button"
                  onClick={() => setSelectedLocation(idx)}
                  className={`w-full p-5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group ${
                    isSelected
                      ? "bg-white border-sky-600 shadow-md ring-2 ring-sky-500/20"
                      : "bg-white/70 border-slate-200 hover:border-sky-300 hover:bg-white"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin
                        className={`w-4 h-4 ${
                          isSelected ? "text-sky-600" : "text-slate-400 group-hover:text-sky-600"
                        }`}
                      />
                      <span className="font-bold text-sm text-slate-900">{loc.region}</span>
                    </div>
                    <p className="text-xs text-slate-500 pl-6">{loc.focusArea}</p>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? "text-sky-600 translate-x-1" : "text-slate-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Hub Overview Card */}
          <div className="lg:col-span-7">
            {LOCATIONS_DATA[selectedLocation] && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-sky-100 shadow-xl space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                      Regional Operating Hub
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                      {LOCATIONS_DATA[selectedLocation].region}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {LOCATIONS_DATA[selectedLocation].district}
                    </p>
                  </div>

                  <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {LOCATIONS_DATA[selectedLocation].status}
                  </span>
                </div>

                {/* Focus Area & Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Primary Focus
                    </span>
                    <div className="font-bold text-sm text-slate-900 mt-1">
                      {LOCATIONS_DATA[selectedLocation].focusArea}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Estimated Coverage
                    </span>
                    <div className="font-bold text-sm text-sky-800 mt-1">
                      {LOCATIONS_DATA[selectedLocation].peopleServed}
                    </div>
                  </div>
                </div>

                {/* Key Interventions List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Active Ground Interventions:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {LOCATIONS_DATA[selectedLocation].keyInterventions.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 text-xs text-slate-700 border border-slate-100"
                      >
                        <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Map Simulation Area */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-sky-300">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Field Operations Protocol</div>
                      <div className="text-[11px] text-sky-200">Coordinated with regional community councils</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-sky-300 bg-sky-900/60 px-2.5 py-1 rounded-lg border border-sky-700/50">
                    Verified Base
                  </span>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhereWeWorkSection;
