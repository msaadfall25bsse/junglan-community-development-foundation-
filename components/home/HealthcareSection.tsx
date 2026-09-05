import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Truck,
  PhoneCall,
  CheckCircle2,
  HeartPulse,
  Activity,
  Clock,
  ArrowRight,
} from "lucide-react";
import { FOUNDATION_INFO } from "@/data/content";

export function HealthcareSection() {
  const ambulanceSpecs = [
    "24/7 round-the-clock emergency driver & paramedic on standby",
    "Equipped with continuous medical oxygen cylinders and regulators",
    "Foldable emergency stretcher and cervical collar trauma kit",
    "All-terrain suspension engineered for high-altitude unpaved mountain roads",
    "Zero transportation fee charged to impoverished families",
  ];

  return (
    <section id="healthcare" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission Narrative & Specs */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <Badge variant="danger" dot size="md">
                Healthcare & Emergency Service
              </Badge>
              <span className="text-xs font-semibold text-slate-500">
                High-Altitude Relief
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
              Free Emergency Ambulance Transportation for Rural Mountain Communities
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 font-normal">
              In the steep terrain of Junglan and surrounding valleys, delays in reaching secondary and tertiary healthcare facilities can be fatal. Our emergency ambulance operates 24 hours a day to evacuate critical patients to Ayub Teaching Hospital Abbottabad and DHQ Hospital Mansehra.
            </p>

            {/* Checklist of Features */}
            <div className="space-y-3 mb-8">
              {ambulanceSpecs.map((spec) => (
                <div key={spec} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 leading-snug">
                    {spec}
                  </span>
                </div>
              ))}
            </div>

            {/* Emergency Hotline Action Trigger */}
            <div className="p-5 rounded-2xl bg-red-50/80 border border-red-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  Emergency Medical Hotline
                </div>
                <div className="text-lg sm:text-xl font-black text-slate-900">
                  {FOUNDATION_INFO.hotline}
                </div>
                <div className="text-xs text-slate-500">
                  Free dispatch for acute emergencies, maternal labor, and trauma cases.
                </div>
              </div>

              <a
                href={`tel:${FOUNDATION_INFO.hotline}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all shrink-0"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Hotline</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Grade Visual Feature Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
              {/* Subtle visual badge */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">
                      Ambulance Fleet Status
                    </h3>
                    <p className="text-xs text-slate-400">
                      Primary Response Vehicle AMB-01
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  On-Call Ready
                </span>
              </div>

              {/* Service Capabilities Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    <span>Availability</span>
                  </div>
                  <div className="text-xl font-bold text-white">24/7 Hours</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Continuous standby
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                    <HeartPulse className="w-3.5 h-3.5 text-red-400" />
                    <span>Patient Cost</span>
                  </div>
                  <div className="text-xl font-bold text-emerald-400">100% Free</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Donor supported
                  </div>
                </div>
              </div>

              {/* Destination Hospitals */}
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/40 text-xs text-slate-300 space-y-2 mb-6">
                <div className="font-semibold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-sky-400" />
                  <span>Transfer Destinations</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-700/40 pb-1.5">
                  <span>Ayub Teaching Hospital Abbottabad</span>
                  <span className="text-sky-400 font-medium">Tertiary Trauma</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-700/40 pb-1.5">
                  <span>DHQ Hospital Mansehra</span>
                  <span className="text-sky-400 font-medium">Secondary Care</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>King Abdullah Hospital Mansehra</span>
                  <span className="text-sky-400 font-medium">General / Pediatric</span>
                </div>
              </div>

              {/* Footer action link */}
              <Button
                href="/projects/healthcare-ambulance"
                variant="outline"
                size="sm"
                className="w-full justify-center bg-slate-800 text-white hover:bg-slate-700 border-slate-700"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View Full Healthcare Project Details
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
