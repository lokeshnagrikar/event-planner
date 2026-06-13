"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// ==========================================
// 1. Scroll-Driven Parallax Component
// ==========================================
interface ScrollParallaxProps {
  children: React.ReactNode;
  speed?: number;     // Parallax intensity (negative values move opposite, e.g. -10 to 10)
  className?: string;
}

/**
 * ScrollParallax Component.
 * Shifts elements relative to scroll progress. Syncs with Lenis scroll physics.
 */
export function ScrollParallax({ children, speed = 4, className = "" }: ScrollParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Convert speed values into offset percentages
    const yShift = speed * 10;

    const anim = gsap.fromTo(
      containerRef.current,
      { yPercent: -yShift },
      {
        yPercent: yShift,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Starts when element bottom enters viewport
          end: "bottom top",   // Ends when element top leaves viewport
          scrub: true,         // Links animation to scrollbar handle
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

// ==========================================
// 2. Mouse Coordinate-Driven Parallax Component
// ==========================================
interface MouseParallaxProps {
  children: React.ReactNode;
  factor?: number;    // Movement radius coefficient
  className?: string;
}

/**
 * MouseParallax Component.
 * Shakes or shifts absolute layers slightly based on mouse cursor distance from screen center.
 * Perfect for luxury ambient glows, backdrop labels, or floating badges.
 */
export function MouseParallax({ children, factor = 25, className = "" }: MouseParallaxProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!targetRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Map values relative to screen center from -0.5 to 0.5
      const normX = (clientX / innerWidth) - 0.5;
      const normY = (clientY / innerHeight) - 0.5;

      gsap.to(targetRef.current, {
        x: normX * factor * 2,
        y: normY * factor * 2,
        duration: 1.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [factor]);

  return (
    <div ref={targetRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
