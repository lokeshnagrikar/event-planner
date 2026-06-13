"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

interface BentoGridProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * BentoGrid Layout container.
 * Sets up a responsive staggered grid structure with a luxury dark feel.
 */
export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto auto-rows-[20rem] md:auto-rows-[24rem]",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  className?: string;
  title: string;
  description: string;
  header?: React.ReactNode;
  icon?: string;
  badge?: string;
  video?: string; // Optional background video loop on hover
}

/**
 * BentoGridItem Node.
 * Features an interactive cursor spotlight overlay, hover video loops, and clean border glows.
 */
export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  badge,
  video,
}: BentoGridItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Alternate spotlight color based on title length/hash for organic variation
  const spotlightColor = title.length % 2 === 0 ? "255, 77, 141" : "76, 125, 255";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="VIEW"
      className={cn(
        "row-span-1 rounded-2xl group/bento transition-all duration-500 ease-luxury p-6 bg-luxury-charcoal/40 border border-white/5 justify-between flex flex-col space-y-4 relative overflow-hidden backdrop-blur-md cursor-pointer",
        isHovered ? "border-primary/30 shadow-[0_0_30px_rgba(255,77,141,0.1)] -translate-y-1" : "",
        className
      )}
    >
      {/* Background Hover Video Preview */}
      {video && (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none z-0 filter brightness-[35%] contrast-[105%]",
            isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
          )}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      {/* Background spotlight overlay */}
      {isHovered && (
        <span
          className="absolute pointer-events-none inset-0 transition-opacity duration-300 opacity-100 mix-blend-screen z-0"
          style={{
            background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(${spotlightColor}, 0.15), transparent 80%)`,
          }}
        />
      )}

      {/* Header Visual Block */}
      {header && <div className="relative z-10 w-full h-[45%] overflow-hidden rounded-lg">{header}</div>}

      {/* Content Block */}
      <div className="relative z-10 flex flex-col justify-end flex-grow space-y-2">
        <div className="flex justify-between items-center">
          {icon && (
            <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover/bento:bg-primary group-hover/bento:text-white transition-colors duration-500 shadow-sm">
              <Icon icon={icon} className="w-5 h-5 group-hover/bento:scale-110 transition-transform duration-300" />
            </div>
          )}
          {badge && (
            <span className="text-[8px] font-sans tracking-[0.2em] uppercase font-bold text-primary border border-primary/20 bg-primary/5 px-2.5 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>

        <div className="font-serif text-lg sm:text-xl text-white group-hover/bento:text-primary transition-colors duration-300">
          {title}
        </div>
        <p className="text-xs text-luxury-silver font-light leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom accent hover indicator line */}
      <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover/bento:scale-x-100 transition-transform duration-500 origin-left z-20" />
    </div>
  );
}
