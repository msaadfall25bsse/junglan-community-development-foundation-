import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FOUNDATION_INFO } from "@/data/content";
import {
  Truck,
  HeartPulse,
  PhoneCall,
  ShieldCheck,
  Clock,
  ArrowRight,
  HeartHandshake,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Emergency Healthcare & Ambulance Project | Junglan Community Development Foundation",
  description:
    "Free 24/7 emergency ambulance transport for rural mountain communities in District Mansehra. Rapid response, continuous oxygen support, and hospital transfers.",
  openGraph: {
    title: "Healthcare & Ambulance Project | Junglan Community Development Foundation",
    description:
      "Life-saving emergency transport across difficult mountain terrains. Free of charge for vulnerable patients.",
  },
};

export default function HealthcarePage() {
  const serviceHighlights = [
    {
      title: "24/7 Rapid Emergency Response",
      description:
        "Dedicated mountain rescue hotline manned around the clock to dispatch all-terrain vehicles immediately upon receiving an emergency call.",
      icon: <Clock className="w-6 h-6 text-red-600" />,
      badge: "24/7 Availability",
    },
    {
      title: "Continuous Medical Oxygen",
      description:
        "Ambulances are equipped with onboard medical-grade oxygen cylinders, pediatric masks, suction units, and emergency trauma splints.",
      icon: <HeartPulse className="w-6 h-6 text-sky-600" />,
      badge: "Life Support",
    },
    {
      title: "All-Terrain 4x4 Mountain Fleet",
      description:
        "Engineered with high ground clearance and all-terrain suspension to safely reach high-altitude hamlets cut off from normal vehicular traffic.",
      icon: <Truck className="w-6 h-6 text-emerald-600" />,
      badge: "High-Clearance 4x4",
    },
    {
      title: "100% Free for Vulnerable Patients",
      description:
        "Zero cost to needy families. Funded entirely through charitable donors, ensuring poverty is never a barrier to emergency healthcare.",
      icon: <HeartHandshake className="w-6 h-6 text-indigo-600" />,
      badge: "Zero-Cost Service",
    },
  ];

  const emergencyProtocols = [
    {
      step: "01",
      title: "Emergency Call Received",
      desc: "Community hotline registers patient location, condition, and immediate oxygen requirements.",
    },
    {
      step: "02",
      title: "Immediate Unit Dispatch",
      desc: "All-terrain ambulance deployed from Junglan Valley base with trained driver and first responder.",
    },
    {
      step: "03",
      title: "On-Site Stabilization",
      desc: "Patient secured with stretcher, vitals monitored, and supplemental oxygen administered as needed.",
    },
    {
      step: "04",
      title: "Direct Hospital Transfer",
      desc: "Safe transport to DHQ Mansehra, King Abdullah, or Ayub Abbottabad with pre-arrival hospital alert.",
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sky-50/70 via-white to-white py-16 sm:py-24 border-b border-slate-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="danger" size="md">
              Primary Healthcare Initiative
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Rapid Emergency Ambulance Service in Remote Hazara
            </h1>

            <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Bridging the life-threatening delay between isolated mountain hamlets and tertiary hospitals. Operated 100% free for pregnant mothers, trauma casualties, and acute cardiac emergencies.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={`tel:${FOUNDATION_INFO.hotline}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>24/7 Helpline: {FOUNDATION_INFO.hotline}</span>
              </a>
              <Button href="/donate" variant="primary" size="lg">
                Sponsor Ambulance Fuel
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Emergency Transport Concept & Need */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="sky" size="sm">
                The Critical Challenge
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Why Specialized Mountain Ambulance Transport is Vital
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  In District Mansehra, countless small hamlets sit above 1,500 meters elevation along unpaved ridge tracks. When emergency complications arise—such as obstructed childbirth, deep trauma from agricultural machinery, or sudden heart attacks—every minute lost on rough terrain increases mortality.
                </p>
                <p>
                  Public transit does not run during night hours, and private commercial hires can cost an entire month&apos;s household income. Families are often forced to carry injured individuals on wooden cots across footpaths.
                </p>
                <p className="font-semibold text-slate-800">
                  Junglan Community Development Foundation changes this reality by stationing heavy-duty 4x4 rescue vehicles inside the valley, providing dignity, continuous oxygen, and prompt hospital delivery free of charge.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 flex items-center gap-3 text-xs text-sky-900">
                <ShieldCheck className="w-5 h-5 text-sky-700 shrink-0" />
                <span>
                  <strong>Ethical Medical Privacy:</strong> All patient transit details are strictly anonymized per international humanitarian ethics. No private clinical information is exposed.
                </span>
              </div>
            </div>

            {/* Service Pillars Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {serviceHighlights.map((srv) => (
                <div
                  key={srv.title}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 hover:bg-white transition-all shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="p-2.5 rounded-xl bg-white text-slate-800 w-fit mb-3 shadow-2xs border border-slate-100">
                      {srv.icon}
                    </div>
                    <div className="font-bold text-slate-900 text-sm mb-1">
                      {srv.title}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                  <Badge variant="sky" size="sm" className="mt-4 w-fit">
                    {srv.badge}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 4-Stage Operational Protocol */}
      <section className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-100">
        <Container>
          <SectionHeader
            badge="Standard Operating Procedure"
            badgeVariant="sky"
            title="How Our Emergency Response Operates"
            subtitle="From the moment an emergency call is received to safe transfer at the regional hospital triage."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {emergencyProtocols.map((p) => (
              <div
                key={p.step}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-black text-sky-600 font-mono mb-2">
                    {p.step}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              href="/where-we-work"
              variant="outline"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Hospital Referral Network & Distances
            </Button>
          </div>
        </Container>
      </section>

      {/* Future Healthcare Expansion Capability */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <Container>
          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Future Capability Roadmap
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Expanding to Mobile Primary Health Camps & Telemedicine
                </h3>
                <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                  As our fleet grows, the Foundation plans to integrate mobile diagnostic screenings, maternal ultrasound camps, and first-aid volunteer certification for rural youth.
                </p>
              </div>

              <Button
                href="/donate"
                variant="primary"
                size="lg"
                className="shrink-0 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold border-none"
              >
                Support Healthcare Fund
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
