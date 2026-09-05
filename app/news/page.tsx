"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/Card";
import { LATEST_NEWS_ITEMS } from "@/data/content";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categoryBadgeVariant = {
    HEALTHCARE: "danger" as const,
    AGRICULTURE: "success" as const,
    ANNOUNCEMENT: "sky" as const,
  };

  const filteredNews =
    selectedCategory === "ALL"
      ? LATEST_NEWS_ITEMS
      : LATEST_NEWS_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <PublicLayout>
      <section className="bg-gradient-to-b from-sky-50/70 via-white to-white py-16 sm:py-20 border-b border-slate-100">
        <Container>
          <SectionHeader
            badge="Field Dispatches"
            badgeVariant="sky"
            title="News, Stories & Foundation Updates"
            subtitle="Follow our on-the-ground progress across rural District Mansehra, emergency ambulance milestones, and agricultural field achievements."
          />

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
            {["ALL", "HEALTHCARE", "AGRICULTURE", "ANNOUNCEMENT"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  selectedCategory === cat
                    ? "bg-sky-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat === "ALL" ? "All Updates" : cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50/50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <Card
                key={item.slug}
                hoverEffect
                className="flex flex-col justify-between bg-white"
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Badge
                      variant={categoryBadgeVariant[item.category]}
                      size="sm"
                    >
                      {item.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <User className="w-3 h-3" />
                      <span>{item.author}</span>
                    </div>
                  </div>

                  <CardTitle className="text-lg font-bold text-slate-900 leading-snug mb-2 hover:text-sky-700 transition-colors">
                    <Link href={`/news/${item.slug}`}>{item.title}</Link>
                  </CardTitle>

                  <CardDescription className="text-sm text-slate-600 leading-relaxed">
                    {item.summary}
                  </CardDescription>
                </CardHeader>

                <CardFooter>
                  <span className="text-xs font-semibold text-slate-400">
                    Field Bulletin
                  </span>
                  <Link
                    href={`/news/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-800 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
