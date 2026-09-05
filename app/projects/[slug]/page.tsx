import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { HOMEPAGE_PROJECTS } from "@/data/content";
import {
  ArrowLeft,
  HeartHandshake,
  CheckCircle2,
  MapPin,
  Target,
  Activity,
  ShieldCheck,
} from "lucide-react";

export function generateStaticParams() {
  return HOMEPAGE_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = HOMEPAGE_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const isComingSoon = project.status === "COMING_SOON";

  return (
    <PublicLayout>
      {/* Detail Hero Banner */}
      <section className="bg-gradient-to-b from-sky-50/80 via-white to-slate-50/50 py-12 sm:py-16 border-b border-slate-100">
        <Container>
          {/* Breadcrumb navigation */}
          <div className="mb-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Projects</span>
            </Link>
          </div>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="sky" size="sm">
                {project.category}
              </Badge>
              <Badge
                variant={isComingSoon ? "warning" : "success"}
                dot
                size="sm"
              >
                {isComingSoon ? "Coming Soon" : "Active Field Operations"}
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight mb-4">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal">
              {project.tagline}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Detail Body */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* Mission & Overview */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-sky-600" />
                  <span>Program Mission & Scope</span>
                </h2>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 text-base leading-relaxed mb-6 font-medium">
                  {project.mission}
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Objectives */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Key Strategic Objectives</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.objectives.map((obj, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-slate-700 font-medium leading-snug">
                        {obj}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operational Activities */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-600" />
                  <span>Field Activities & Implementation</span>
                </h3>
                <div className="space-y-3">
                  {project.activities.map((act, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 text-sm text-slate-700 font-medium"
                    >
                      <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Note */}
              <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700">
                  <span className="font-bold text-slate-900">Coverage Territory: </span>
                  {project.location}
                </div>
              </div>
            </div>

            {/* Right Sidebar Column: Allocation Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 rounded-2xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold mb-4 border border-sky-400/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>Direct Allocation</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  Support this Program
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Contributions directed to this initiative directly fund specialized fuel vouchers, medical oxygen refills, or certified high-yield olive saplings.
                </p>

                <div className="space-y-3 mb-6 text-xs text-slate-300">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span>Stewardship Policy</span>
                    <span className="font-bold text-emerald-400">100% Direct</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span>Audit Frequency</span>
                    <span className="font-bold text-sky-400">Monthly</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Receipt Issued</span>
                    <span className="font-bold text-white">Yes, Formal Ledger</span>
                  </div>
                </div>

                <Button
                  href="/donate"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold border-none"
                  leftIcon={<HeartHandshake className="w-4 h-4" />}
                >
                  Donate to this Initiative
                </Button>

                <div className="mt-4 text-center">
                  <Link
                    href="/reports"
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    View Operational Audit Reports →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
