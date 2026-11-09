"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  /**
   * Animation type:
   * - "heading": Slide in from Right to Left (translateX(50px) -> 0)
   * - "text": Fade in from Bottom to Top (translateY(35px) -> 0)
   * - "card": Drop in from Top to Bottom (translateY(-35px) -> 0)
   */
  variant?: "heading" | "text" | "card";
  /** Delay in milliseconds for staggered appearance */
  delay?: number;
  /** Transition duration in milliseconds (default: 1100ms) */
  duration?: number;
  className?: string;
}

/**
 * ScrollReveal Component (Bi-Directional Continuous Triggering)
 * - Triggers both scrolling DOWN (ooper say neeche) and scrolling UP (neeche say ooper).
 * - Har bar jab section viewport mein aaye ga (chahe user neeche jaye ya wapis ooper aaye),
 *   animation active ho kar replay ho gi.
 * - Desktop-Only (>= 1024px) for optimized performance.
 */
export function ScrollReveal({
  children,
  variant = "text",
  delay = 0,
  duration = 1100,
  className = "",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Bi-directional state: Jab screen mein aaye to visible, jab screen say bahir jaye to reset
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset animation so jab user dubara wapis scroll kare to replay ho
          setIsVisible(false);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Base transition styles
  const getInitialStyle = (): React.CSSProperties => {
    let transform = "none";
    if (!isVisible) {
      if (variant === "heading") {
        transform = "translateX(35px)"; // Right to Left
      } else if (variant === "text") {
        transform = "translateY(25px)"; // Bottom to Top
      } else if (variant === "card") {
        transform = "translateY(-25px)"; // Top to Bottom
      }
    }

    return {
      opacity: isVisible ? 1 : 0,
      transform,
      transitionProperty: "opacity, transform",
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      transitionDelay: isVisible ? `${delay}ms` : "0ms",
      willChange: "transform, opacity",
    };
  };

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal-item ${className}`}
      style={getInitialStyle()}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
