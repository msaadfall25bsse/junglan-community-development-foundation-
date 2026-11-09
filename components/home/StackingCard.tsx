"use client";

import React from "react";

interface StackingCardProps {
  children: React.ReactNode;
  /** Stack order index (1, 2, 3...) */
  order: number;
  /** Additional custom classes for styling/background */
  className?: string;
  /** Enable or disable rounded card appearance */
  cardAppearance?: boolean;
}

/**
 * Permanent StackingCard Component
 * Delivers the "Stacking Cards" slide-over deck effect across desktop, tablet, and mobile.
 * Uses high-performance native CSS sticky positioning with graduated top offsets and elevated shadows.
 */
export function StackingCard({
  children,
  order,
  className = "",
  cardAppearance = true,
}: StackingCardProps) {
  // Stacking z-index: order 1 => 10, order 2 => 14, order 3 => 18...
  // Stays below Header (z-50)
  const zIndex = 10 + order * 4;

  // Graduated top offsets:
  // Desktop accounts for the header height plus subtle nesting
  // Mobile uses a compact offset to maximize viewport readability
  const mobileTop = `calc(68px + ${(order - 1) * 6}px)`;
  const desktopTop = `calc(88px + ${(order - 1) * 12}px)`;

  return (
    <div
      className={`sticky w-full transition-[top,transform,box-shadow] duration-300 ${
        cardAppearance
          ? "rounded-t-2xl sm:rounded-t-3xl md:rounded-t-[32px] shadow-[0_-12px_32px_-4px_rgba(0,0,0,0.14)] border-t border-black/10 dark:border-white/10"
          : ""
      } ${className}`}
      style={{
        top: desktopTop,
        zIndex,
      }}
    >
      <style jsx>{`
        @media (max-width: 768px) {
          div {
            top: ${mobileTop} !important;
          }
        }
      `}</style>
      <div
        className={
          cardAppearance
            ? "rounded-t-2xl sm:rounded-t-3xl md:rounded-t-[32px] overflow-hidden will-change-transform"
            : ""
        }
      >
        {children}
      </div>
    </div>
  );
}

export default StackingCard;
