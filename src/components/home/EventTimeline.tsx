"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

interface TimelineStep {
  title: string;
  badge: string;
  icon: string;
  description: string;
  highlights: string[];
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    title: "Cinematic Planning",
    badge: "Phase 01",
    icon: "solar:notes-bold-duotone",
    description: "Establishing your vision, creating initial mood boards, mapping bento coordinate spacings, and selecting the perfect venue backdrop.",
    highlights: ["Interactive budget planning", "Bespoke color mapping", "Concept storyboard selection"],
  },
  {
    title: "3D Design & Rendering",
    badge: "Phase 02",
    icon: "solar:magic-stick-bold-duotone",
    description: "Developing custom 3D structures mockups, coordinating floral grid dimensions, selecting projection maps, and mapping out the special FX timed triggers.",
    highlights: ["Realistic 3D stage maps", "Floral density scaling", "Lighting matrix previews"],
  },
  {
    title: "On-Site Setup & Calibration",
    badge: "Phase 03",
    icon: "solar:settings-bold-duotone",
    description: "Executing precise logistics, erecting steel/glass canopy structures, placing botanical arrangements, and calibrating dry-ice fog carpets and pyro nozzles.",
    highlights: ["On-time coordinate assembly", "Safety pyro testing", "Sound-synced cues testing"],
  },
  {
    title: "Flawless Show Day Execution",
    badge: "Phase 04",
    icon: "solar:stars-bold-duotone",
    description: "Supervising live coordination tables, managing backstage countdowns, triggering airburst confettis, and ensuring a celebrity-tier experience.",
    highlights: ["Backstage timeline sync", "Real-time FX control", "Premium VIP host support"],
  },
];

export default function EventTimeline() {
  return (
    <section className="py-24 bg-luxury-obsidian relative border-b border-white/[0.04] overflow-hidden">
      {/* Background neon flares */}
      <div className="absolute top-1/4 left-1/10 w-[450px] h-[150px] rounded-full bg-primary/5 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[150px] rounded-full bg-secondary/5 filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-xl mb-20 mx-auto text-center">
          <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-primary font-bold mb-4 block">
            03 // CREATE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-wide leading-tight">
            The Production <span className="text-gold-gradient italic">Timeline</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-silver font-light leading-relaxed mt-4">
            How we translate your conceptual ideas into a high-fidelity cinematic event day production setup.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Central Connecting Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-white/5 -translate-x-[0.5px] pointer-events-none">
            {/* Scroll Glow line */}
            <motion.div
              className="w-full h-full bg-gradient-to-b from-primary via-secondary to-primary origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="space-y-12 md:space-y-20">
            {TIMELINE_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-stretch ${
                    isEven ? "md:flex-row-reverse" : ""
                  } relative`}
                >
                  {/* Visual Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#080415] border-2 border-white/10 flex items-center justify-center text-primary z-20 transition-all duration-500 shadow-lg group-hover:border-primary">
                    <motion.div
                      className="w-2.5 h-2.5 rounded-full bg-primary"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                    />
                  </div>

                  {/* Spacer Column */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Column */}
                  <motion.div
                    className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12 flex flex-col justify-center text-left"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-primary/20 hover:shadow-[0_0_25px_rgba(255,77,141,0.08)] transition-all duration-500 relative group overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/[0.02] rounded-full filter blur-xl" />

                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[8px] font-sans tracking-[0.25em] uppercase font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                          {step.badge}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/80">
                          <Icon icon={step.icon} className="w-4.5 h-4.5" />
                        </div>
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl text-white tracking-wide mb-3 font-semibold group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs text-luxury-silver font-light leading-relaxed mb-4">
                        {step.description}
                      </p>

                      <hr className="border-white/5 my-3" />

                      {/* Timeline steps list */}
                      <ul className="space-y-1.5">
                        {step.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="text-[10px] text-white/70 flex items-center font-sans">
                            <Icon icon="solar:check-circle-bold-duotone" className="text-secondary w-3.5 h-3.5 mr-2" />
                            {highlight}
                          </li>
                        ))}
                      </ul>

                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
