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

        {/* Narrative Teaser */}
        <div className="max-w-4xl mx-auto mb-12 p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-slate-600 text-base leading-relaxed space-y-4">
            <p>
              In many rural mountainous pockets of District Mansehra, access to immediate healthcare is hindered by steep terrain and absence of public transport. A medical emergency often turns tragic purely due to travel delays.
            </p>
            <p>
              At the same time, traditional rain-fed subsistence farming leaves local families financially vulnerable. Junglan Community Development Foundation bridges both urgent life-safety needs and long-term economic stability through dedicated emergency ambulances and commercial olive cultivation.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Founded on Islamic humanitarian service and civic integrity.
            </div>
            <Button
              href="/about"
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Read Our Full Story & Governance
            </Button>
          </div>
        </div>

        {/* 4 Pillars of Integrity Summary Grid */}
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
      </Container>
    </section>
  );
}
