"use client";

import React from "react";
import TextReveal from "@/components/animations/TextReveal";
import ImageReveal from "@/components/animations/ImageReveal";
import { ScrollParallax, MouseParallax } from "@/components/animations/Parallax";
import FloatingParticles from "@/components/animations/FloatingParticles";
import Marquee from "@/components/animations/Marquee";
import ScrollStory from "@/components/animations/ScrollStory";
import { Button } from "@/components/ui/Button";

export default function MotionLab() {
  return (
    <div className="relative min-h-screen bg-luxury-obsidian text-white overflow-hidden pb-24">
      {/* Background canvas particles (velocity-driven) */}
      <FloatingParticles particleColor="197, 160, 89" maxParticles={70} />

      {/* Ambient gradient backdrops */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full ambient-glow-gold opacity-30 filter blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] rounded-full ambient-glow-emerald opacity-20 filter blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* ==========================================
            HERO SECTION: Text reveals & Mouse Parallax
           ========================================== */}
        <section className="min-h-screen flex flex-col justify-center items-center px-4 relative border-b border-white/[0.04]">
          {/* Mouse Parallax background decoration */}
          <MouseParallax factor={35} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div className="w-[30vw] h-[30vw] rounded-full border border-luxury-brass/10 opacity-30 flex items-center justify-center">
              <div className="w-[20vw] h-[20vw] rounded-full border border-white/5 flex items-center justify-center">
                <span className="font-serif text-[10vw] text-white/[0.01] uppercase tracking-[0.2em]">ST</span>
              </div>
            </div>
          </MouseParallax>

          <div className="container mx-auto max-w-4xl text-center z-10 flex flex-col items-center">
            {/* Split character reveal heading */}
            <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-luxury-brass font-bold mb-6 block">
              Motion Laboratory // Vol. 01
            </span>
            
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight text-white mb-8 leading-[1.05]">
              <TextReveal text="Immersive" type="chars" duration={1.2} />
              <br />
              <span className="text-gold-gradient italic">
                <TextReveal text="Cinematic" type="words" delay={0.4} />
              </span>{" "}
              <TextReveal text="Artistry" type="chars" delay={0.6} />
            </h1>

            <p className="text-xs sm:text-sm text-luxury-silver font-light max-w-lg mx-auto leading-relaxed mb-12">
              Every section utilizes custom physics. Scroll down to trigger scroll-driven parallax layers, velocity marquees, and pinned layouts.
            </p>

            <Button variant="primary" magnetic={true} icon="lucide:arrow-down" className="mt-4">
              Scroll to Explore
            </Button>
          </div>
        </section>

        {/* ==========================================
            SECTION 1: Dynamic Velocity Marquees
           ========================================== */}
        <section className="py-24 border-b border-white/[0.04] bg-luxury-charcoal/20">
          <div className="mb-12 text-center">
            <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-luxury-brass font-semibold">
              Framer Motion // Scroll Velocity Skew
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white tracking-wide mt-2">
              The Velocity Marquees
            </h2>
            <p className="text-xs text-luxury-silver font-light mt-3 max-w-md mx-auto">
              Scroll rapidly to observe the text tilt (skew) horizontally and speed up, then relax back into a slow hover.
            </p>
          </div>

          <div className="space-y-6 py-6 border-y border-white/[0.03]">
            <Marquee 
              text="ST EVENTS // BESPOKE DESIGN // IMMERSIVE EXPERIENCES // LUXURY WEDDINGS // " 
              baseSpeed={0.15} 
              className="font-serif text-5xl md:text-8xl font-semibold tracking-wider text-luxury-brass/80" 
            />
            <Marquee 
              text="GONDIA // MAHARASHTRA // CENTRAL INDIA // EXCLUSIVITY // PORSCHE DESIGN // " 
              baseSpeed={-0.2} // runs opposite direction
              className="font-sans text-4xl md:text-7xl uppercase tracking-widest font-light text-white/50" 
            />
          </div>
        </section>

        {/* ==========================================
            SECTION 2: Scroll Parallax Grid
           ========================================== */}
        <section className="py-24 border-b border-white/[0.04] container mx-auto px-4 md:px-8">
          <div className="mb-16 text-center md:text-left">
            <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-luxury-brass font-bold">
              GSAP ScrollTrigger // Scroll Parallax
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-wide mt-2">
              Asymmetrical Speeds
            </h2>
            <p className="text-xs text-luxury-silver font-light mt-3 max-w-sm">
              Columns translate at different scroll velocities relative to each other, generating a premium 3D depth perception.
            </p>
          </div>

          {/* Staggered Speed Parallax columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            
            {/* Column 1: Slow Speed */}
            <ScrollParallax speed={-2} className="flex flex-col space-y-6">
              <ImageReveal 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600" 
                alt="Slow Parallax" 
                aspectRatio="aspect-[3/4]"
              />
              <div className="p-4 bg-luxury-charcoal/40 border border-white/5">
                <span className="text-[9px] font-sans text-luxury-brass tracking-widest uppercase block mb-1">Speed Ratio: -2</span>
                <h4 className="font-serif text-lg text-white">The Slow Descent</h4>
              </div>
            </ScrollParallax>

            {/* Column 2: Neutral Speed */}
            <ScrollParallax speed={1} className="flex flex-col space-y-6 md:translate-y-12">
              <ImageReveal 
                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600" 
                alt="Neutral Parallax" 
                aspectRatio="aspect-[3/4]"
                curtainColor="charcoal"
              />
              <div className="p-4 bg-luxury-charcoal/40 border border-white/5">
                <span className="text-[9px] font-sans text-luxury-brass tracking-widest uppercase block mb-1">Speed Ratio: +1</span>
                <h4 className="font-serif text-lg text-white">The Median Ascent</h4>
              </div>
            </ScrollParallax>

            {/* Column 3: High Speed */}
            <ScrollParallax speed={4} className="flex flex-col space-y-6 md:translate-y-6">
              <ImageReveal 
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600" 
                alt="Fast Parallax" 
                aspectRatio="aspect-[3/4]"
                curtainColor="obsidian"
              />
              <div className="p-4 bg-luxury-charcoal/40 border border-white/5">
                <span className="text-[9px] font-sans text-luxury-brass tracking-widest uppercase block mb-1">Speed Ratio: +4</span>
                <h4 className="font-serif text-lg text-white">The Velocity Ascent</h4>
              </div>
            </ScrollParallax>

          </div>
        </section>

        {/* ==========================================
            SECTION 3: Pinning & Horizontal Storytelling
           ========================================== */}
        <section className="border-b border-white/[0.04]">
          <ScrollStory />
        </section>

      </div>
    </div>
  );
}
