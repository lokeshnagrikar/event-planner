"use client";

import React from "react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import AnimateIn from "@/components/animations/AnimateIn";

import SERVICES_BENTO from "@/data/services.json";

/**
 * Services Component.
 * Refactored to employ a premium 21st.dev style Bento Grid layout.
 */
export default function Services() {
  return (
    <section id="services" className="py-24 bg-luxury-obsidian relative border-b border-white/[0.04] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[150px] rounded-full bg-luxury-brass/5 filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block - CREATE */}
        <div className="max-w-xl mb-16">
          <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-primary font-bold mb-4 block">
            03 // CREATE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-wide leading-tight mb-6">
            Experiences <span className="text-gold-gradient italic">We Craft</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-silver font-light leading-relaxed">
            We bring your dreams to life through custom-designed installations, immersive lighting arrays, and masterfully curated atmospheres.
          </p>
        </div>

        {/* Bento Grid */}
        <AnimateIn direction="up" delay={0.1} duration={1.2}>
          <BentoGrid>
            {SERVICES_BENTO.map((item, idx) => {
              const header = item.image ? (
                <div className="relative w-full h-full border border-white/5 bg-luxury-charcoal overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover/bento:scale-105 filter brightness-[65%]"
                  />
                </div>
              ) : undefined;

              return (
                <BentoGridItem
                  key={idx}
                  title={item.title}
                  description={item.description}
                  header={header}
                  icon={item.icon}
                  badge={item.badge}
                  video={item.video}
                  className={item.className}
                />
              );
            })}
          </BentoGrid>
        </AnimateIn>

      </div>
    </section>
  );
}
