"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
  description: string;
}

interface StatisticsProps {
  items: StatItem[];
  className?: string;
}

/**
 * Statistics Component.
 * Employs GSAP ScrollTrigger to count up numbers as they scroll into view.
 * Upgraded into premium glowing glassmorphic capsules with neon gradients.
 */
export function Statistics({ items, className = "" }: StatisticsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Select all numeric count tags
      const counts = containerRef.current?.querySelectorAll(".stat-count");
      
      counts?.forEach((count) => {
        const targetValue = parseInt(count.getAttribute("data-target") || "0", 10);
        
        // Count from 0 to target
        gsap.fromTo(
          count,
          { textContent: "0" },
          {
            textContent: targetValue.toString(),
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 }, // Snap to whole numbers
            scrollTrigger: {
              trigger: count,
              start: "top 85%", // Trigger once elements are near viewport bottom
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 py-12 ${className}`}
    >
      {items.map((item, idx) => {
        // Alternate neon gradients for numbers
        const textGradientClass = idx % 2 === 0 ? "text-neon-pink" : "text-neon-blue";
        const borderGlowClass = idx % 2 === 0 ? "hover:border-primary/20 hover:shadow-[0_0_25px_rgba(255,77,141,0.08)]" : "hover:border-secondary/20 hover:shadow-[0_0_25px_rgba(76,125,255,0.08)]";

        return (
          <div
            key={idx}
            className={`glass-panel rounded-3xl border border-white/5 p-6 flex flex-col justify-between text-left transition-all duration-500 hover:-translate-y-1 relative group ${borderGlowClass}`}
          >
            {/* Background glowing flares */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/[0.01] rounded-full filter blur-xl pointer-events-none" />

            <div>
              {/* Subtle stat index label */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-[8px] font-sans tracking-[0.3em] text-primary mb-0 uppercase font-bold">
                  Metric // 0{idx + 1}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
              </div>
              
              {/* Number + Suffix */}
              <div className={`font-serif text-5xl sm:text-6xl font-bold tracking-tight mb-3 flex items-end gap-1 ${textGradientClass}`}>
                <span
                  className="stat-count"
                  data-target={item.value}
                >
                  0
                </span>
                {item.suffix && (
                  <span className="text-3xl sm:text-4xl">{item.suffix}</span>
                )}
              </div>
              
              {/* Labels */}
              <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-white mb-2 block">
                {item.label}
              </span>
            </div>

            <p className="text-xs text-luxury-silver font-light leading-relaxed mt-2 border-t border-white/5 pt-3">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
