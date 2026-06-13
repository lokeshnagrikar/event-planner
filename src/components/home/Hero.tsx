"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import TextReveal from "@/components/animations/TextReveal";
import { useEventStore } from "@/store/useEventStore";
import { motion } from "framer-motion";

/**
 * Hero Component.
 * Plays a continuous slow-motion video loop of a luxury table/banquet layout.
 * Features a central typographic layout and triggers the Zustand Booking dialog.
 */
export default function Hero() {
  const { isIntroCompleted, setBookingOpen } = useEventStore();

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-luxury-obsidian">
      {/* Background Video Layer with Awwwards-grade capsule reveal */}
      <motion.div
        initial={{ width: "80vw", height: "70vh", borderRadius: "100px", top: "50%", left: "50%", x: "-50%", y: "-50%" }}
        animate={isIntroCompleted ? {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        } : {}}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        className="absolute z-0 overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter brightness-[45%] contrast-[105%] scale-[1.01]"
        >
          {/* Local luxury video asset */}
          <source
            src="/videos/vdo1.mp4"
            type="video/mp4"
          />
        </video>
        {/* Contrast Overlay Radial and Linear Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-obsidian/60 via-transparent to-luxury-obsidian z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-luxury-obsidian/85 z-10 pointer-events-none" />
      </motion.div>

      {/* Main Core Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-20 text-center flex flex-col items-center max-w-5xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
          className="text-[10px] sm:text-xs font-sans tracking-[0.45em] uppercase text-primary font-bold mb-6 block"
        >
          ST EVENTS // WHERE MOMENTS BECOME MEMORIES
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-tight text-white mb-8 leading-[1.1] max-w-4xl mx-auto"
        >
          We create <span className="text-gold-gradient italic">experiences</span>
          <br />
          people never forget.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.8, ease: "easeOut" }}
          className="text-sm sm:text-base text-luxury-silver font-light max-w-xl mx-auto leading-relaxed mb-12"
        >
          Orchestrating bespoke luxury wedding stages, curated engagements, and high-energy celebrations across Maharashtra.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Button
            variant="primary"
            magnetic={true}
            onClick={() => setBookingOpen(true)}
            icon="solar:magic-stick-line-duotone"
            data-cursor="PLAN"
          >
            Plan My Event
          </Button>
          <Button
            variant="glass"
            magnetic={true}
            onClick={() => {
              const el = document.getElementById("dream");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            icon="solar:plain-line-duotone"
          >
            Start Your Event Journey
          </Button>
        </motion.div>

        {/* Floating Social Proof Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 1.0 }}
          className="flex items-center gap-3 mt-10"
        >
          <div className="flex -space-x-2">
            {["#FF4D8D", "#4C7DFF", "#D86BFF", "#FF8C42"].map((color, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-[#080415]"
                style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}
              />
            ))}
          </div>
          <span className="text-[10px] font-sans text-luxury-silver font-light tracking-wide">
            <span className="text-white font-bold">500+</span> celebrations crafted
          </span>
          <span className="w-1 h-1 rounded-full bg-primary/60" />
          <span className="text-[10px] font-sans text-luxury-silver tracking-wide">
            <span className="text-white font-bold">5.0 ★</span> rated
          </span>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator Widget */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none select-none">
        <span className="text-[8px] font-sans tracking-[0.3em] uppercase text-luxury-silver/60 mb-2.5">
          Scroll Down
        </span>
        <div className="w-5 h-9 rounded-full border border-white/20 flex justify-center p-1.5">
          {/* Mouse wheel looping dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-luxury-brass animate-bounce" />
        </div>
      </div>

      {/* Editorial side grids */}
      <div className="absolute left-8 top-0 bottom-0 w-[0.5px] bg-white/[0.03] hidden xl:block" />
      <div className="absolute right-8 top-0 bottom-0 w-[0.5px] bg-white/[0.03] hidden xl:block" />
    </section>
  );
}
