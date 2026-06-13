"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Magnetic from "./Magnetic";
import { Icon } from "@iconify/react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "link";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
  loading?: boolean;
}

/**
 * Luxury Button Component.
 * Features customizable variants (Gold gradient, Obsidian card, Glass spotlight reveal)
 * and can be wrapped dynamically with magnetic interactions.
 */
const ButtonElement = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      magnetic = false,
      icon,
      iconPosition = "right",
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    const localRef = useRef<HTMLButtonElement>(null);
    const resolvedRef = (ref || localRef) as React.RefObject<HTMLButtonElement | null>;
    
    // Mouse hover tracking for custom radial glow spotlights
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!resolvedRef.current) return;
      const rect = resolvedRef.current.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const baseStyles = "relative inline-flex items-center justify-center font-sans uppercase tracking-[0.2em] font-semibold text-[10px] sm:text-xs transition-all duration-500 ease-luxury overflow-hidden select-none disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      // 1. Primary Gold: High impact metallic gold with scale & shift hover
      primary: "bg-luxury-brass text-luxury-obsidian border border-luxury-brass hover:bg-transparent hover:text-white",
      
      // 2. Secondary Obsidian: Deep black card element with fine borders
      secondary: "bg-luxury-charcoal text-luxury-champagne border border-white/5 hover:border-luxury-brass/30 hover:bg-luxury-onyx",
      
      // 3. Glass: Immersive transparent panel featuring cursor spotlights
      glass: "bg-white/[0.02] backdrop-blur-md text-luxury-champagne border border-white/5 hover:border-luxury-brass/20 hover:text-white",
      
      // 4. Editorial Link: Minimalist text link with interactive underline reveals
      link: "bg-transparent text-luxury-champagne hover:text-white py-1.5 px-0 border-b border-transparent hover:border-luxury-brass",
    };

    const sizes = {
      sm: "px-5 py-2.5 text-[9px] tracking-[0.15em]",
      md: "px-7 py-3.5 text-[10px] tracking-[0.2em]",
      lg: "px-9 py-4 text-[11px] tracking-[0.25em]",
    };

    // Construct button layout
    const buttonNode = (
      <button
        ref={resolvedRef as React.LegacyRef<HTMLButtonElement>}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          baseStyles,
          variant !== "link" ? sizes[size] : "",
          variants[variant],
          className
        )}
        disabled={loading}
        {...props}
      >
        {/* Radial Mouse Tracker Glow Overlay for "glass" and "secondary" modes */}
        {(variant === "glass" || variant === "secondary") && isHovered && (
          <span
            className="absolute pointer-events-none inset-0 transition-opacity duration-300 opacity-100 mix-blend-screen"
            style={{
              background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, rgba(197, 160, 89, 0.12), transparent 80%)`,
            }}
          />
        )}

        {/* Loading Spinner */}
        {loading && (
          <Icon
            icon="line-md:loading-twotone-loop"
            className="w-4 h-4 mr-2 text-current animate-spin"
          />
        )}

        {/* Left Icon */}
        {!loading && icon && iconPosition === "left" && (
          <Icon icon={icon} className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
        )}

        <span className="relative z-10">{children}</span>

        {/* Right Icon */}
        {!loading && icon && iconPosition === "right" && (
          <Icon icon={icon} className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </button>
    );

    if (magnetic) {
      return <Magnetic>{buttonNode}</Magnetic>;
    }

    return buttonNode;
  }
);

ButtonElement.displayName = "Button";

export { ButtonElement as Button };
