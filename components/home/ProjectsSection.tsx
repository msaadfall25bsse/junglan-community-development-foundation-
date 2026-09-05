import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { HOMEPAGE_PROJECTS } from "@/data/content";
import { Truck, Sprout, Users, ArrowRight, CheckCircle2 } from "lucide-react";

export function ProjectsSection() {
  const categoryIcons = {
    HEALTHCARE: <Truck className="w-5 h-5 text-red-600" />,
    AGRICULTURE: <Sprout className="w-5 h-5 text-emerald-600" />,
    COMMUNITY: <Users className="w-5 h-5 text-amber-600" />,
  };

  const categoryBadgeVariant = {
    HEALTHCARE: "danger" as const,
    AGRICULTURE: "success" as const,
    COMMUNITY: "warning" as const,
  };

  return (
    <section id="projects" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <Container>
        <SectionHeader
          badge="Focused Field Projects"
          badgeVariant="sky"
          title="Direct Initiatives Transforming Communities"
          subtitle="Our programs target high-priority basic needs: life-saving emergency medical transit today, and sustainable agricultural wealth for tomorrow."
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {HOMEPAGE_PROJECTS.map((project) => {
            const isComingSoon = project.status === "COMING_SOON";

            return (
              <Card
                key={project.slug}
                hoverEffect={!isComingSoon}
                className={isComingSoon ? "border-dashed bg-slate-50/60" : "flex flex-col justify-between"}
              >
                <div>
                  <CardHeader>
                    {/* Category & Status Bar */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-slate-100/80">
                          {categoryIcons[project.category]}
                        </div>
                        <Badge variant={categoryBadgeVariant[project.category]} size="sm">
                          {project.category}
                        </Badge>
                      </div>

                      <Badge
                        variant={isComingSoon ? "warning" : "success"}
                        dot
                        size="sm"
                      >
                        {isComingSoon ? "Coming Soon" : "Active Field Project"}
                      </Badge>
                    </div>

                    <CardTitle className="text-xl font-bold text-slate-950 mb-1">
                      {project.title}
                    </CardTitle>

                    <div className="text-xs font-semibold text-sky-700 mb-3">
                      {project.tagline}
                    </div>

                    <CardDescription className="text-sm text-slate-600 leading-relaxed">
                      {project.summary}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Key Operational Highlights:
                      </div>
                      {project.impactMetrics.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-xs font-medium text-slate-700"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="mt-auto">
                  <span className="text-xs font-semibold text-slate-500">
                    {isComingSoon ? "Project in Planning" : "Verified Field Operations"}
                  </span>
                  <Button
                    href={`/projects/${project.slug}`}
                    variant={isComingSoon ? "outline" : "primary"}
                    size="sm"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    {project.ctaText}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Bottom Project Directory Link */}
        <div className="mt-12 text-center">
          <Button
            href="/projects"
            variant="outline"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Browse Full Projects Directory & Roadmaps
          </Button>
        </div>
      </Container>
    </section>
  );
}
