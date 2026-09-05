import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { ShieldCheck, HeartHandshake, Sprout, Scale, ArrowRight } from "lucide-react";
import { ABOUT_PILLARS } from "@/data/content";
import { Button } from "@/components/ui/Button";

export function AboutSection() {
  const pillarIcons = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-sky-600" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6 text-indigo-600" />,
    Sprout: <Sprout className="w-6 h-6 text-emerald-600" />,
    Scale: <Scale className="w-6 h-6 text-amber-600" />,
  };

  return (
    <section id="about" className="py-16 sm:py-24 bg-slate-50/50 border-b border-slate-100">
      <Container>
        {/* Section Header */}
        <SectionHeader
          badge="About Foundation"
          badgeVariant="sky"
          title="Rooted in Community, Dedicated to Humanity"
          subtitle="Junglan Community Development Foundation was founded to bring tangible, transparent assistance to remote rural populations in Khyber Pakhtunkhwa where basic services are out of reach."
        />

        {/* Narrative & Vision Overview */}
        <div className="max-w-4xl mx-auto mb-16 p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="prose prose-slate max-w-none text-slate-600 text-base sm:text-lg leading-relaxed space-y-4">
            <p>
              In many rural mountainous pockets of District Mansehra, access to immediate healthcare is hindered by steep terrain and absence of public transport. A medical emergency often turns tragic purely due to travel delays.
            </p>
            <p>
              At the same time, traditional rain-fed subsistence farming leaves local families financially vulnerable. Junglan Foundation bridges both urgent life-safety needs and long-term economic stability:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm font-medium text-slate-800">
              <div className="p-3 rounded-xl bg-sky-50/80 border border-sky-100 flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                <span>Immediate Relief: Dedicated emergency ambulance transfers operated free for vulnerable patients.</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-100 flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>Generational Prosperity: Commercial olive cultivation transforming low-yield land into sustainable income.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Integrity */}
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Our 4 Core Pillars of Stewardship
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            Principles that guide every vehicle dispatch, olive seedling, and donor contribution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ABOUT_PILLARS.map((pillar) => (
            <Card key={pillar.title} hoverEffect className="bg-white">
              <CardHeader className="pb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 shadow-2xs">
                  {pillarIcons[pillar.iconName]}
                </div>
                <CardTitle className="text-base font-bold text-slate-900 mb-2">
                  {pillar.title}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Call to action bar */}
        <div className="mt-12 text-center">
          <Button
            href="/reports"
            variant="outline"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Read Our Transparency & Governance Pledge
          </Button>
        </div>
      </Container>
    </section>
  );
}
