import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  WHERE_WE_WORK_PAGE_DATA,
  OPERATIONAL_HUBS,
  FOUNDATION_INFO,
} from "@/data/content";
import {
  MapPin,
  Navigation,
  Mountain,
  Hospital,
  PhoneCall,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Where We Work | Junglan Community Development Foundation",
  description:
    "Explore our operational territory across District Mansehra, regional hospital transit times, mountain terrain logistics, and active field hubs.",
  openGraph: {
    title: "Where We Work | Junglan Community Development Foundation",
    description:
      "Operational coverage across remote valleys of Khyber Pakhtunkhwa. Bridging distances between isolated hamlets and regional health centers.",
  },
};

export default function WhereWeWorkPage() {
  return (
    <PublicLayout>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-sky-50/70 via-white to-white py-16 sm:py-24 border-b border-slate-100">
        <Container>
          <SectionHeader
            badge={WHERE_WE_WORK_PAGE_DATA.hero.badge}
            badgeVariant="sky"
            title={WHERE_WE_WORK_PAGE_DATA.hero.title}
            subtitle={WHERE_WE_WORK_PAGE_DATA.hero.subtitle}
          />
        </Container>
      </section>

      {/* 3 Main Field Hubs */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="sky" size="sm" className="mb-2">
              Field Deployments
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Active Operational Hubs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl mx-auto">
              Strategic ambulance staging posts and agricultural farmer training plots in District Mansehra.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {OPERATIONAL_HUBS.map((hub) => (
              <Card key={hub.name} hoverEffect className="flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-100">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full">
                      {hub.district}
                    </span>
                  </div>

                  <CardTitle className="text-lg font-bold text-slate-900 mb-1">
                    {hub.name}
                  </CardTitle>

                  <div className="text-xs font-semibold text-sky-700 mb-3">
                    {hub.role}
                  </div>

                  <CardDescription className="text-sm text-slate-600 leading-relaxed mb-4">
                    {hub.description}
                  </CardDescription>
                </CardHeader>

                <div className="p-4 mx-6 mb-6 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-sky-600" />
                    <span>{hub.keyStats}</span>
                  </span>
                  <span className="text-emerald-700 font-semibold">Active Hub</span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Hospital Referral Network Table & Logistics */}
      <section className="py-16 sm:py-24 bg-slate-50/50 border-b border-slate-100">
        <Container>
          <SectionHeader
            badge="Emergency Transit Network"
            badgeVariant="sky"
            title="Hospital Referral & Transfer Corridors"
            subtitle="Our emergency ambulance units connect remote hamlets to vital medical facilities based on clinical triage requirements."
          />

          <div className="max-w-4xl mx-auto space-y-4 mb-12">
            {WHERE_WE_WORK_PAGE_DATA.hospitalNetwork.map((hosp) => (
              <div
                key={hosp.name}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Hospital className="w-4 h-4 text-sky-600 shrink-0" />
                    <h3 className="text-base font-bold text-slate-900">
                      {hosp.name}
                    </h3>
                    <Badge variant="sky" size="sm">
                      {hosp.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500">
                    {hosp.type} • Capabilities: <span className="text-slate-700 font-medium">{hosp.capabilities}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 text-xs shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Distance</span>
                    <span className="font-bold text-slate-900 text-sm font-mono">{hosp.distanceFromBase}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Average Transit</span>
                    <span className="font-bold text-sky-700 text-sm font-mono">{hosp.typicalTransitTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Terrain & Environmental Challenges */}
          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2.5 mb-6 text-slate-900 font-bold text-base">
              <Mountain className="w-5 h-5 text-sky-600" />
              <span>Mountain Terrain Operations & Fleet Engineering</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {WHERE_WE_WORK_PAGE_DATA.terrainChallenges.map((tc) => (
                <div key={tc.title} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-slate-900 text-xs mb-1.5 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-sky-600" />
                    <span>{tc.title}</span>
                  </div>
                  <p className="text-slate-500 leading-relaxed text-[11px]">
                    {tc.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Emergency Helpline Banner */}
      <section className="py-16 bg-slate-900 text-white">
        <Container>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-red-400 mb-1 block">
                24/7 Regional Emergency Response
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                Need Emergency Ambulance Dispatch?
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-lg">
                Free emergency patient transfers across Junglan Valley and adjoining hamlets in District Mansehra.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`tel:${FOUNDATION_INFO.hotline}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Hotline: {FOUNDATION_INFO.hotline}</span>
              </a>
              <Button href="/contact" variant="outline" size="md" className="bg-transparent text-white border-slate-700 hover:bg-slate-800">
                Contact Office
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
