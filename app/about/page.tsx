import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ABOUT_PAGE_DATA,
  ABOUT_PILLARS,
} from "@/data/content";
import { getSiteSettings } from "@/lib/services";
import {
  ShieldCheck,
  HeartHandshake,
  Sprout,
  Scale,
  Users,
  CheckCircle2,
  Heart,
  Landmark,
  Compass,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Junglan Community Development Foundation",
  description:
    "Learn about our mission, vision, trustees, and constitutional commitment to emergency healthcare and sustainable agriculture in District Mansehra.",
  openGraph: {
    title: "About Junglan Community Development Foundation",
    description:
      "Rooted in community service and Islamic humanitarian principles. Free emergency ambulance transport and sustainable olive cultivation in Khyber Pakhtunkhwa.",
  },
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  const originStoryParagraphs =
    settings.aboutOriginStory && settings.aboutOriginStory.length > 0
      ? settings.aboutOriginStory
      : ABOUT_PAGE_DATA.originStory.paragraphs;

  const originHeading = settings.aboutHeading || ABOUT_PAGE_DATA.originStory.heading;

  const pillarIcons = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-sky-600" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6 text-indigo-600" />,
    Sprout: <Sprout className="w-6 h-6 text-emerald-600" />,
    Scale: <Scale className="w-6 h-6 text-amber-600" />,
  };

  return (
    <PublicLayout>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-sky-50/70 via-white to-white py-16 sm:py-24 border-b border-slate-100">
        <Container>
          <SectionHeader
            badge={ABOUT_PAGE_DATA.hero.badge}
            badgeVariant="sky"
            title={ABOUT_PAGE_DATA.hero.title}
            subtitle={ABOUT_PAGE_DATA.hero.subtitle}
          />
        </Container>
      </section>

      {/* Origin Story Section (Dynamic CMS Managed) */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="sky" size="sm" className="mb-3">
                Our Foundation Story
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {originHeading}
              </h2>
            </div>

            <div className="prose prose-slate max-w-none space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed bg-slate-50/60 p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-2xs">
              {originStoryParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              {/* Dynamic Mission & Vision Highlight Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200/80">
                <div className="p-4 rounded-xl bg-white border border-sky-100 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-sky-700" />
                    <span className="text-xs font-bold uppercase text-sky-800 tracking-wider">Constitutional Mission</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {settings.missionStatement || "Delivering round-the-clock emergency medical transit and agrarian prosperity across remote mountain villages."}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <Compass className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold uppercase text-emerald-800 tracking-wider">Long-Term Vision</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {settings.visionStatement || "A self-sustaining rural valley where no life is lost to transit delays and households thrive through climate-resilient olive orchards."}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold text-slate-800">
                <div className="p-4 rounded-xl bg-white border border-sky-100 flex items-start gap-3 shadow-2xs">
                  <div className="p-2 rounded-lg bg-sky-50 text-sky-700 shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Life Preservation First</div>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">
                      24/7 free ambulance dispatch for trauma and obstetric emergencies.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-emerald-100 flex items-start gap-3 shadow-2xs">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Economic Self-Reliance</div>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">
                      Transforming low-yield terraces into high-value olive orchards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4 Core Pillars of Integrity */}
      <section className="py-16 sm:py-24 bg-slate-50/50 border-b border-slate-100">
        <Container>
          <SectionHeader
            badge="Institutional Core"
            badgeVariant="sky"
            title="Our 4 Core Pillars of Stewardship"
            subtitle="Inspired by Al-Khidmat and UNICEF principles: Complete donor transparency, human dignity, and verified community impact."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

          <div className="p-6 rounded-2xl bg-sky-50 border border-sky-100 max-w-3xl mx-auto flex items-center gap-3 text-xs text-sky-900">
            <ShieldCheck className="w-5 h-5 text-sky-700 shrink-0" />
            <span>
              <strong>100% Direct Allocation Policy:</strong> Trustee administrative overhead is completely volunteer-funded. Public donations exclusively fund ambulance fuel, trauma care supplies, and olive nursery tools.
            </span>
          </div>
        </Container>
      </section>

      {/* Governance & Council Structure */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <Container>
          <SectionHeader
            badge="Organizational Structure"
            badgeVariant="sky"
            title={ABOUT_PAGE_DATA.governance.title}
            subtitle={ABOUT_PAGE_DATA.governance.description}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {ABOUT_PAGE_DATA.governance.trustees.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 rounded-xl bg-slate-50 text-slate-700 w-fit mb-4">
                    <Users className="w-5 h-5 text-sky-700" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    {t.name}
                  </h4>
                  <div className="text-xs font-semibold text-sky-700 mb-3">
                    {t.role}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Honorary & Volunteer</span>
                </div>
              </div>
            ))}
          </div>

          {/* Legal & Registration Specifications (Dynamic Bank and Headquarters) */}
          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-xl">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-6">
              <Landmark className="w-6 h-6 text-sky-400" />
              <div>
                <h4 className="text-base font-bold text-white">
                  Official Registration & Institutional Identity
                </h4>
                <p className="text-xs text-slate-400">
                  Operated in full compliance with Pakistani nonprofit laws and financial auditing frameworks.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Legal Registration
                </span>
                <span className="text-slate-200 leading-snug block">
                  {ABOUT_PAGE_DATA.legal.registrationType}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Official Headquarters
                </span>
                <span className="text-slate-200 leading-snug block">
                  {settings.officeAddress || ABOUT_PAGE_DATA.legal.headquarters}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Financial Transparency
                </span>
                <span className="text-slate-200 leading-snug block">
                  {ABOUT_PAGE_DATA.legal.auditStandard}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Designated Shariah Banking
                </span>
                <span className="text-slate-200 leading-snug block">
                  {settings.bankName} — A/C {settings.accountNumber} ({settings.accountTitle})
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Join Our Community Mission
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whether through direct donation, voluntary service, or public advocacy, your partnership ensures no family is left without medical transit or economic opportunity.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button href="/donate" variant="primary" size="lg">
                Support Our Mission
              </Button>
              <Button href="/reports" variant="outline" size="lg">
                View Public Reports
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
