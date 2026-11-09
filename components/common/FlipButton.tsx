"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export interface FlipButtonProps {
  /** Target link href (e.g. "/about", "#work-pillars", "tel:...", "mailto:...") */
  href?: string;
  /** Primary label displayed on front of button */
  frontText?: React.ReactNode;
  /** Optional custom text on the back of the button (default: "Opening..." or custom) */
  backText?: React.ReactNode;
  /** Optional icon to show with the front label */
  icon?: string;
  /** Optional icon to show with back label (default: 'sync' spinning or 'check') */
  backIcon?: string;
  /** Color theme variant */
  variant?: "primary" | "secondary" | "red" | "outline" | "white" | "dark";
  /** Optional extra classes */
  className?: string;
  /** Delay before navigation triggers in ms (default: 1000ms as requested by user) */
  delayMs?: number;
  /** Optional onClick handler (if button is an action rather than link) */
  onClick?: (e: React.MouseEvent) => void;
  /** Children fallback if frontText not provided */
  children?: React.ReactNode;
}

export function FlipButton({
  href,
  frontText,
  backText,
  icon,
  backIcon = "sync",
  variant = "primary",
  className = "",
  delayMs = 1000,
  onClick,
  children,
}: FlipButtonProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const router = useRouter();

  // Color schemes for front and back surfaces
  const variantStyles = {
    primary: {
      front: "bg-[#1e5631] text-white hover:bg-[#153e23] border border-[#1e5631]/40 shadow-md",
      back: "bg-[#153e23] text-[#b1f0ce] border border-[#b1f0ce]/40 shadow-lg",
    },
    secondary: {
      front: "bg-[#0b4f8c] text-white hover:bg-[#083a66] border border-[#0b4f8c]/40 shadow-md",
      back: "bg-[#083a66] text-[#bce0fd] border border-[#bce0fd]/40 shadow-lg",
    },
    red: {
      front: "bg-[#e5252a] text-white hover:bg-[#c0171c] border border-red-500/40 shadow-md",
      back: "bg-[#991b1b] text-[#ffdcd8] border border-red-300/40 shadow-lg",
    },
    outline: {
      front: "bg-white/95 sm:bg-white text-slate-800 hover:bg-slate-50 border border-[#0b4f8c]/40 shadow-sm hover:text-[#0b4f8c]",
      back: "bg-slate-900 text-white border border-slate-700 shadow-md",
    },
    white: {
      front: "bg-white text-primary hover:bg-stone-white border border-stone-border shadow-md font-semibold",
      back: "bg-primary text-white border border-white/20 shadow-lg font-semibold",
    },
    dark: {
      front: "bg-slate-900 text-white hover:bg-slate-800 border border-slate-700 shadow-md",
      back: "bg-[#00162d] text-secondary-fixed border border-secondary-fixed/40 shadow-lg",
    },
  };

  const currentStyles = variantStyles[variant] || variantStyles.primary;
  const content = frontText || children;
  const targetBackText = backText || (
    href?.startsWith("#") ? "Navigating..." : href?.startsWith("mailto:") ? "Launching Mail..." : href?.startsWith("tel:") ? "Connecting Call..." : "Opening Page..."
  );

  const handleClick = (e: React.MouseEvent) => {
    // If already flipping, prevent double-click
    if (isFlipped) return;

    if (onClick) {
      onClick(e);
    }

    if (href) {
      e.preventDefault();
      setIsFlipped(true);

      setTimeout(() => {
        if (href.startsWith("#")) {
          // Smooth scroll to anchor on same page
          const targetEl = document.querySelector(href);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.hash = href;
          }
          // Flip back after a little bit
          setTimeout(() => setIsFlipped(false), 800);
        } else if (href.startsWith("tel:") || href.startsWith("mailto:")) {
          window.location.href = href;
          setTimeout(() => setIsFlipped(false), 800);
        } else if (href.startsWith("http://") || href.startsWith("https://")) {
          window.open(href, "_blank", "noopener,noreferrer");
          setTimeout(() => setIsFlipped(false), 800);
        } else {
          // Next.js client-side router navigation
          router.push(href);
          // Optional safety reset
          setTimeout(() => setIsFlipped(false), 1200);
        }
      }, delayMs);
    }
  };

  return (
    <div
      className={`perspective-1000 inline-block select-none cursor-pointer ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick(e as any);
        }
      }}
    >
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-700 ease-out min-h-[46px] ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT SIDE */}
        <div
          className={`backface-hidden w-full h-full rounded-lg px-6 py-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all ${currentStyles.front}`}
        >
          {icon && (
            <span className="material-symbols-outlined text-[18px] shrink-0">
              {icon}
            </span>
          )}
          <span>{content}</span>
          {!icon && (
            <span className="material-symbols-outlined text-[16px] shrink-0 opacity-80">
              arrow_forward
            </span>
          )}
        </div>

        {/* BACK SIDE (Flips 180 degrees) */}
        <div
          className={`backface-hidden rotate-y-180 absolute inset-0 w-full h-full rounded-lg px-6 py-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold ${currentStyles.back}`}
        >
          <span className="material-symbols-outlined text-[18px] animate-spin shrink-0">
            {backIcon}
          </span>
          <span className="tracking-wide">{targetBackText}</span>
        </div>
      </div>
    </div>
  );
}

export default FlipButton;

