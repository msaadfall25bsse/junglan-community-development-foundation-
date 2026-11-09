"use client";

import React, { useState, useEffect, Children } from "react";

interface ResponsiveCardCarouselProps {
  children: React.ReactNode;
  intervalMs?: number; // default: 4000ms (4 seconds)
  className?: string;
  gridClassName?: string;
}

/**
 * ResponsiveCardCarousel
 * - On Mobile (screen < md / 768px): Shows 1 card at a time, smoothly auto-advancing every 4 seconds.
 *   Includes manual indicator dots, pause on hover/touch, and swipe/tap navigation.
 * - On Tablet & Desktop (screen >= md): Renders children in their standard responsive multi-column grid layout.
 */
export function ResponsiveCardCarousel({
  children,
  intervalMs = 4000,
  className = "",
  gridClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
}: ResponsiveCardCarouselProps) {
  const items = Children.toArray(children);
  const totalItems = items.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (totalItems <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [totalItems, intervalMs, isPaused]);

  if (totalItems === 0) return null;

  return (
    <div className={`w-full ${className}`}>
      {/* 1. Mobile View (screen < md): 4-second Auto-Rotating Card Viewer */}
      <div
        className="md:hidden relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="relative min-h-[220px]">
          {items.map((child, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={index}
                className={`transition-all duration-700 ease-in-out ${
                  isActive
                    ? "opacity-100 translate-x-0 relative z-10 pointer-events-auto"
                    : "opacity-0 absolute inset-0 -translate-x-4 pointer-events-none z-0"
                }`}
              >
                {child}
              </div>
            );
          })}
        </div>

        {/* Indicator Dots & Controls on Mobile */}
        {totalItems > 1 && (
          <div className="flex items-center justify-center gap-2 pt-3.5 pb-1">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems)}
              className="w-7 h-7 rounded-full bg-surface border border-stone-border flex items-center justify-center text-primary text-xs shadow-2xs cursor-pointer active:scale-95"
              aria-label="Previous card"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>

            <div className="flex items-center gap-1.5 px-2">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? "w-6 bg-secondary" : "w-1.5 bg-stone-border"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % totalItems)}
              className="w-7 h-7 rounded-full bg-surface border border-stone-border flex items-center justify-center text-primary text-xs shadow-2xs cursor-pointer active:scale-95"
              aria-label="Next card"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. Tablet & Desktop View (screen >= md): Standard Responsive Multi-Column Grid */}
      <div className={`hidden md:grid ${gridClassName}`}>
        {children}
      </div>
    </div>
  );
}

export default ResponsiveCardCarousel;

