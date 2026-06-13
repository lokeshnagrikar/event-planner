"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * Premium scroll controller using Lenis.
 * Automatically updates GSAP ScrollTrigger positioning for high-performance scroll effects.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis scroll engine
    const lenis = new Lenis({
      duration: 1.4, // Slightly longer duration for a cinematic gliding feeling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo ease curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // 2. Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // 3. Connect Lenis frame updates to GSAP's central ticker
    const updateRaf = (time: number) => {
      lenis.raf(time * 1000); // convert seconds to milliseconds
    };
    
    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    // 4. Configure ScrollTrigger to track custom scrolling container
    ScrollTrigger.defaults({
      scroller: document.documentElement,
    });

    // 5. Cleanup on unmount to prevent memory leaks and ticker pileup
    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateRaf);
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
