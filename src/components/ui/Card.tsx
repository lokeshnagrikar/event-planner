"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ==========================================
// 1. Core Card Component (Spotlight Reveal)
// ==========================================
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  spotlight?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = false, spotlight = true, children, ...props }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const resolvedRef = (ref || cardRef) as React.RefObject<HTMLDivElement | null>;
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!resolvedRef.current) return;
      const rect = resolvedRef.current.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    return (
      <div
        ref={resolvedRef as React.LegacyRef<HTMLDivElement>}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative rounded-none bg-luxury-charcoal/40 border border-white/5 overflow-hidden transition-all duration-500 ease-luxury p-6 backdrop-blur-md",
          isHovered ? "border-white/10" : "",
          className
        )}
        {...props}
      >
        {/* Spotlight light mask: paints a subtle gold spotlight inside the card body */}
        {spotlight && isHovered && (
          <span
            className="absolute pointer-events-none inset-0 transition-opacity duration-300 opacity-100 mix-blend-screen"
            style={{
              background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(197, 160, 89, 0.08), transparent 80%)`,
            }}
          />
        )}
        <div className="relative z-10 flex flex-col h-full">{children}</div>
      </div>
    );
  }
);
Card.displayName = "Card";

// ==========================================
// 2. Card Subcomponents
// ==========================================
export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 mb-4", className)} {...props} />
);
CardHeader.displayName = "CardHeader";

export const CardTitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("font-serif text-lg sm:text-xl tracking-wide text-luxury-champagne", className)} {...props}>
    {children}
  </h3>
);
CardTitle.displayName = "CardTitle";

export const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-xs text-luxury-silver font-light leading-relaxed", className)} {...props} />
);
CardDescription.displayName = "CardDescription";

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("text-sm text-luxury-silver font-light leading-relaxed flex-grow", className)} {...props} />
);
CardContent.displayName = "CardContent";

export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center pt-4 border-t border-white/[0.03] mt-4", className)} {...props} />
);
CardFooter.displayName = "CardFooter";

// ==========================================
// 3. Cinematic Showcase Card (Awwwards Style)
// ==========================================
interface ShowcaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  imageAlt?: string;
  category?: string;
  title: string;
  subtitle?: string;
  linkText?: string;
}

export const ShowcaseCard = ({
  className,
  imageSrc,
  imageAlt = "Event Image",
  category,
  title,
  subtitle,
  linkText = "Explore Concept",
  ...props
}: ShowcaseCardProps) => {
  return (
    <div
      className={cn(
        "group relative aspect-[3/4] w-full overflow-hidden border border-white/5 cursor-pointer bg-luxury-obsidian",
        className
      )}
      {...props}
    >
      {/* Cinematic Image with smooth scale and slow-motion filters */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover scale-[1.03] grayscale-[30%] brightness-[75%] transition-all duration-700 ease-luxury group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-[85%]"
        />
        {/* Ambient Dark Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-obsidian via-luxury-obsidian/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-85" />
      </div>

      {/* Floating Category Tag */}
      {category && (
        <div className="absolute top-6 left-6 z-10">
          <span className="text-[8px] sm:text-[9px] font-sans tracking-[0.25em] uppercase font-bold text-luxury-brass bg-luxury-charcoal/80 backdrop-blur-md px-3 py-1.5 border border-luxury-gold-dim">
            {category}
          </span>
        </div>
      )}

      {/* Info Content Block (Editorial Alignment) */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 flex flex-col justify-end h-[50%] transition-transform duration-500 ease-luxury">
        {subtitle && (
          <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-luxury-brass mb-2 opacity-80 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            {subtitle}
          </span>
        )}
        <h3 className="font-serif text-xl sm:text-2xl tracking-wide text-white mb-4 group-hover:text-luxury-champagne transition-colors duration-300">
          {title}
        </h3>

        {/* Action Link revealing on Hover */}
        <div className="overflow-hidden h-0 opacity-0 group-hover:h-6 group-hover:opacity-100 transition-all duration-500 ease-luxury">
          <span className="inline-flex items-center text-[10px] tracking-[0.2em] uppercase text-white font-semibold group-hover:text-luxury-brass transition-colors duration-300">
            {linkText}
            <span className="inline-block translate-x-1 group-hover:translate-x-2 transition-transform duration-300 ml-1">
              &rarr;
            </span>
          </span>
        </div>
      </div>

      {/* Top subtle gloss divider */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </div>
  );
};
ShowcaseCard.displayName = "ShowcaseCard";
