"use client";

import React, { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AlertCircle, RefreshCw, Home, PhoneCall } from "lucide-react";
import { FOUNDATION_INFO } from "@/data/content";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log minimal safe error signal without exposing sensitive variables
    console.error("Application encountered an operational exception:", error.message);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Container>
        <div className="max-w-md mx-auto text-center p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              An Unexpected System Issue Occurred
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              We encountered a temporary processing interruption. Our technical team has been notified. Please try refreshing the view.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              onClick={() => reset()}
              variant="primary"
              size="md"
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Try Again
            </Button>
            <Button
              href="/"
              variant="outline"
              size="md"
              leftIcon={<Home className="w-4 h-4" />}
            >
              Homepage
            </Button>
          </div>

          <div className="pt-6 border-t border-slate-100 text-xs text-slate-500">
            For urgent ambulance dispatch, please call directly:
            <div className="mt-1">
              <a
                href={`tel:${FOUNDATION_INFO.hotline}`}
                className="font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{FOUNDATION_INFO.hotline}</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
