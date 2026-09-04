"use client";

import React from "react";
import {
  Ambulance,
  Heart,
  PhoneCall,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Activity,
  ArrowRight,
} from "lucide-react";

interface HealthcareProjectSectionProps {
  onOpenDonateModal: (project?: string) => void;
}

export const HealthcareProjectSection: React.FC<HealthcareProjectSectionProps> = ({
  onOpenDonateModal,
}) => {
  return (
    <section id="healthcare-section" className="py-16 sm:py-24 bg-gradient-to-b from-white via-sky-50/40 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Composition & Ambulance Showcase */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 p-6 sm:p-8 text-white shadow-2xl border border-sky-800/40 overflow-hidden">
              
              {/* Emergency Status Indicator */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
                    Active Healthcare Service
                  </span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-white/10 rounded-full border border-white/10 text-sky-200">
                  24/7 Operations
                </span>
              </div>

              {/* Central Vector Ambulance Illustration & Mission Graphics */}
              <div className="py-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-inner">
                  <Ambulance className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Emergency Medical Transit
                  </h3>
                  <p className="text-xs text-sky-200 mt-1 max-w-sm mx-auto leading-relaxed">
                    Dedicated mobile ambulance units equipped with oxygen support, first aid trauma kits, and emergency paramedical staff.
                  </p>
                </div>
              </div>

              {/* Service Stats Matrix */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center">
                <div className="p-3 bg-white/5 rounded-2xl">
                  <div className="text-lg font-bold text-sky-300">1,850+</div>
                  <div className="text-[10px] text-slate-300">Transits Made</div>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl">
                  <div className="text-lg font-bold text-sky-300">&lt; 15 min</div>
                  <div className="text-[10px] text-slate-300">Avg. Response</div>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl">
                  <div className="text-lg font-bold text-emerald-400">100%</div>
                  <div className="text-[10px] text-slate-300">Subsidized Aid</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Healthcare Narrative & Support CTA */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-sky-600" />
              <span>Project Spotlight • Healthcare</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Rapid Medical Care When Every Minute Counts
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              In remote communities, distances to major medical complexes can exceed 40 kilometers over challenging roads. Without reliable transport, medical emergencies, maternal deliveries, and trauma cases face critical delays.
            </p>

            {/* Core Healthcare Features */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-sky-100 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">24/7 Rapid Emergency Dispatch</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Always ready to respond to village distress calls and coordinate hospital handovers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-sky-100 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Maternal & Urgent Care Subsidies</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Free or deeply subsidized transit for impoverished families and expectant mothers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-sky-100 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Trained Paramedic Drivers</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Equipped with basic life support, CPR certifications, and oxygen administration training.</p>
                </div>
              </div>
            </div>

            {/* Support CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenDonateModal("Healthcare & Ambulance Project")}
                className="py-3.5 px-7 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Support Healthcare Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-xs text-slate-500 text-center sm:text-left">
                <strong>$25</strong> covers fuel & sterile first aid for 2 emergency transits.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HealthcareProjectSection;
