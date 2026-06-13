import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "emerald" | "burgundy" | "silver";
  pulse?: boolean;
}

/**
 * Premium glassmorphic Badge component.
 * Features elegant borders and optional pulsing indicators for status badges.
 */
export function Badge({
  className,
  variant = "gold",
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-3 py-1 text-[8px] sm:text-[9px] font-sans font-bold tracking-[0.2em] uppercase rounded-none border backdrop-blur-md";

  const variants = {
    // 1. Luxury Gold
    gold: "bg-luxury-brass/5 border-luxury-brass/20 text-luxury-brass",

    // 2. Prestige Emerald
    emerald: "bg-luxury-emerald/10 border-luxury-emerald/30 text-emerald-400",

    // 3. Velvet Burgundy
    burgundy: "bg-luxury-burgundy/15 border-luxury-burgundy/30 text-rose-400",

    // 4. Muted Silver
    silver: "bg-white/[0.01] border-white/5 text-luxury-silver",
  };

  const pulseColors = {
    gold: "bg-luxury-brass shadow-luxury-brass/50",
    emerald: "bg-emerald-400 shadow-emerald-400/50",
    burgundy: "bg-rose-400 shadow-rose-400/50",
    silver: "bg-white shadow-white/50",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {pulse && (
        <span className="relative flex h-1.5 w-1.5 mr-2">
          {/* Animated rings */}
          <span className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            pulseColors[variant]
          )} />
          {/* Central dot */}
          <span className={cn(
            "relative inline-flex rounded-full h-1.5 w-1.5",
            pulseColors[variant]
          )} />
        </span>
      )}
      <span className="leading-none translate-y-[0.5px]">{children}</span>
    </span>
  );
}
