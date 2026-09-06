"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/Card";
import { LATEST_NEWS_ITEMS } from "@/data/content";
import { Calendar, Clock, ArrowRight, Newspaper } from "lucide-react";

export function NewsSection() {
  const [news, setNews] = useState(LATEST_NEWS_ITEMS);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const formatted = data.data.slice(0, 3).map((item: any) => ({
            slug: item.slug || item.id,
            title: item.title,
            category: (item.category as "HEALTHCARE" | "AGRICULTURE" | "ANNOUNCEMENT") || "ANNOUNCEMENT",
            date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent",
            readTime: item.readTime || "3 min read",
            summary: item.excerpt || item.summary || item.content?.slice(0, 150) + "...",
          }));
          setNews(formatted);
        }
      })
      .catch(() => {});
  }, []);

  const categoryBadgeVariant: Record<string, "danger" | "success" | "sky"> = {
    HEALTHCARE: "danger",
    AGRICULTURE: "success",
    ANNOUNCEMENT: "sky",
  };

  return (
    <section id="news" className="py-16 sm:py-24 bg-slate-50/50 border-b border-slate-100">
      <Container>
        <SectionHeader
          badge="Field Dispatches & News"
          badgeVariant="sky"
          title="Latest Updates from the Ground"
          subtitle="Stay informed about our recent emergency patient transfers, agricultural demonstrations, and organizational milestones."
        />

        {/* 3 Editorial News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {news.map((item) => (
            <Card key={item.slug} hoverEffect className="flex flex-col justify-between bg-white">
              <CardHeader>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <Badge variant={categoryBadgeVariant[item.category]} size="sm">
                    {item.category}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{item.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-2">
                  <Calendar className="w-3.5 h-3.5 text-sky-600" />
                  <span>{item.date}</span>
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
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom Archive Link */}
        <div className="text-center">
          <Button
            href="/news"
            variant="outline"
            size="md"
            leftIcon={<Newspaper className="w-4 h-4" />}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Browse News & Field Updates Archive
          </Button>
        </div>
      </Container>
    </section>
  );
}
