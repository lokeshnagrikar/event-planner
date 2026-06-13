"use client";

import React from "react";
import AnimateIn from "@/components/animations/AnimateIn";

const TIMELINE_PHASES = [
  {
    phase: "01",
    title: "Vision Briefing",
    subtitle: "Discovery & Blueprinting",
    description: "Collaborative consultation to establish core motifs, color values, spatial requirements, and target emotional milestones for the client.",
  },
  {
    phase: "02",
    title: "Spatial Conception",
    subtitle: "3D Rendering & Lighting Design",
    description: "Translating layouts into high-resolution 3D renders. Modeling lighting paths, structural frameworks, and banquet pathways before building.",
  },
  {
    phase: "03",
    title: "Botanical Sourcing",
    subtitle: "Floristry & Material Curation",
    description: "Sourcing premium exotic florals and luxury decor fabrics. Sizing custom physical frames, columns, and backdrops in our local workshops.",
  },
  {
    phase: "04",
    title: "Precision Execution",
    subtitle: "On-Site Coordination",
    description: "Flawless site construction under direct structural supervision. Aligning florals, lighting presets, and sound scales for the grand reveal.",
  }
];

/**
 * Timeline Component.
 * Implements a vertical chronological layout detailing our luxury design orchestration process.
 */
export default function Timeline() {
  return (
    <section className="py-24 bg-luxury-obsidian relative border-b border-white/[0.04] overflow-hidden">
      {/* Dynamic background glows */}
      <div className="absolute top-[20%] left-[-10%] w-[30%] h-[300px] rounded-full ambient-glow-gold opacity-10 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[300px] rounded-full ambient-glow-emerald opacity-10 filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-xl mx-auto text-center mb-20">
          <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-luxury-brass font-bold mb-4 block">
            Orchestration Blueprint
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-wide leading-tight mb-6">
            The Design <span className="text-gold-gradient italic">Journey</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-silver font-light leading-relaxed">
            How we translate abstract concepts into immersive, physical luxury setups. A step-by-step commitment to visual excellence.
          </p>
        </div>

        {/* Timeline Path Grid */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[0.5px] bg-white/10 -translate-x-[0.25px]" />

          {/* Phase Items mapping */}
          <div className="space-y-16 relative">
            {TIMELINE_PHASES.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={idx} 
                  className={`flex flex-col md:flex-row items-stretch relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Outer margin spacer for desktop balance */}
                  <div className="hidden md:block w-1/2" />

                  {/* Golden connector dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-none bg-luxury-brass border border-luxury-obsidian -translate-x-[6px] top-6 z-20 flex items-center justify-center">
                    <span className="w-1 h-1 bg-white" />
                  </div>

                  {/* Content Card Panel */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                    <AnimateIn 
                      direction={isEven ? "left" : "right"} 
                      delay={0.1}
                      duration={1.0}
                    >
                      <div className="bg-luxury-charcoal/20 border border-white/5 p-6 hover:border-luxury-brass/20 transition-colors duration-500 relative rounded-none backdrop-blur-md">
                        
                        {/* Golden Step Index */}
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] font-sans tracking-[0.3em] text-luxury-brass font-bold uppercase">
                            Phase {item.phase}
                          </span>
                          <span className="font-serif text-white/10 text-2xl font-bold leading-none select-none">
                            /{item.phase}
                          </span>
                        </div>

                        {/* Title block */}
                        <h3 className="font-serif text-lg sm:text-xl text-white mb-1">
                          {item.title}
                        </h3>
                        <span className="text-[10px] font-sans tracking-[0.15em] text-luxury-silver uppercase block mb-4">
                          {item.subtitle}
                        </span>

                        <p className="text-xs text-luxury-silver font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </AnimateIn>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
