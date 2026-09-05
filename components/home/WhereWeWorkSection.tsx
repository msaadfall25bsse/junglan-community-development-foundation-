import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { OPERATIONAL_HUBS } from "@/data/content";
import { MapPin, Navigation, Mountain } from "lucide-react";

export function WhereWeWorkSection() {
  return (
    <section id="where-we-work" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <Container>
        <SectionHeader
          badge="Geographical Coverage"
          badgeVariant="sky"
          title="Where We Operate & Serve"
          subtitle="Our active field operations are rooted in District Mansehra and the Hazara Division, reaching villages with acute medical and economic vulnerability."
        />

        {/* 3 Operational Hub Cards */}
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
                <span className="text-emerald-700 font-semibold">Active</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Topography Context Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-sky-100 text-sky-700 shrink-0">
              <Mountain className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">
                Navigating Complex Mountain Terrain
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Many settlements in our coverage area sit above 1,500 meters elevation. Poor road networks necessitate specialized emergency vehicles and localized farmer training centers.
              </p>
            </div>
          </div>
          <div className="text-xs font-semibold text-slate-500 shrink-0 bg-white px-4 py-2 rounded-xl border border-slate-200">
            Field Office: Junglan Valley
          </div>
        </div>
      </Container>
    </section>
  );
}
