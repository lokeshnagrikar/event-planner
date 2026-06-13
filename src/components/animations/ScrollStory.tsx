"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import TextReveal from "./TextReveal";
import ImageReveal from "./ImageReveal";

// Sample project slides for horizontal scroll demo
const HORIZONTAL_SLIDES = [
  {
    num: "01",
    title: "Ethereal Greenhouses",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
    description: "Crystal canopies, custom floral pathways, and warm candlelit tables engineered to evoke timeless romance.",
  },
  {
    num: "02",
    title: "Cinematic Backdrops",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800",
    description: "Sharp geometric panels, neon glow streaks, and interactive elements tailored for avant-garde events.",
  },
  {
    num: "03",
    title: "Intimate Whimsy",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800",
    description: "Cascading emerald vines, brass framing, and fairy light clouds that feel like stepping into a fairy tale.",
  },
];

/**
 * ScrollStory Component.
 * Contains two advanced scroll mechanics:
 * 1. Pinned Story Section (Left pins, Right scrolls)
 * 2. Horizontal Scroll Section (Translates Y scroll into X sliding)
 */
export default function ScrollStory() {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const pinLeftRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ----------------------------------------
    // 1. Left-Pinning Section Trigger
    // ----------------------------------------
    if (pinSectionRef.current && pinLeftRef.current) {
      const pinTrigger = ScrollTrigger.create({
        trigger: pinSectionRef.current,
        start: "top 12%",
        end: "bottom 90%",
        pin: pinLeftRef.current,
        pinSpacing: false,
      });

      return () => {
        pinTrigger.kill();
      };
    }
  }, []);

  useEffect(() => {
    // ----------------------------------------
    // 2. Horizontal Translation Trigger
    // ----------------------------------------
    if (horizontalSectionRef.current && horizontalTrackRef.current) {
      const scrollWidth = horizontalTrackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const xTranslation = -(scrollWidth - viewportWidth);

      const anim = gsap.to(horizontalTrackRef.current, {
        x: xTranslation,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollWidth * 1.8}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        anim.scrollTrigger?.kill();
        anim.kill();
      };
    }
  }, []);

  return (
    <div className="w-full">

      {/* SECTION 1: Left-Pinning Section (Split Layout) - DREAM */}
      <div
        id="dream"
        ref={pinSectionRef}
        className="relative min-h-[160vh] container mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-12 py-24 border-b border-white/[0.04]"
      >
        {/* Left Column (Pinned Area) */}
        <div ref={pinLeftRef} className="w-full md:w-2/5 flex flex-col justify-start pt-4 self-start">
          <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-primary font-bold mb-4 block">
            01 // DREAM
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-wide mb-6 leading-tight">
            Where Moments <br /><span className="text-gold-gradient italic">Become Memories</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-silver font-light leading-relaxed max-w-sm mb-6">
            We construct stages for raw emotions. The grand entrance, the quiet whispers, the tears of joy. Every crystal canopy and floral archway is custom-crafted to form the unforgettable backdrop of your life story.
          </p>
          <div className="w-12 h-[1px] bg-luxury-brass/40" />
        </div>

        {/* Right Column (Scrolling Items) */}
        <div className="w-full md:w-3/5 flex flex-col space-y-24">
          <div className="flex flex-col space-y-4">
            <ImageReveal
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000"
              alt="Luxury Wedding Setup"
              aspectRatio="aspect-[4/3]"
            />
            <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-luxury-brass font-semibold">
              01 // The Grande Ballroom
            </span>
          </div>

          <div className="flex flex-col space-y-4">
            <ImageReveal
              src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000"
              alt="Luxury Engagement Stage"
              aspectRatio="aspect-[4/3]"
              curtainColor="charcoal"
            />
            <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-luxury-brass font-semibold">
              02 // Emerald Greenhouses
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 2: Horizontal Scrolling Showcase - IMAGINE */}
      <div id="imagine" ref={horizontalSectionRef} className="relative h-screen bg-luxury-charcoal/30 overflow-hidden flex items-center border-b border-white/[0.04]">
        {/* Horizontal Scroll Track */}
        <div
          ref={horizontalTrackRef}
          className="flex space-x-12 px-12 md:px-24 w-max h-[70vh] items-center will-change-transform"
        >
          {/* Section Introduction Card */}
          <div className="w-[350px] md:w-[450px] flex-shrink-0 pr-12 flex flex-col justify-center h-full">
            <span className="text-[9px] font-sans tracking-[0.4em] uppercase text-primary font-bold mb-4 block">
              02 // IMAGINE
            </span>
            <h3 className="font-serif text-3xl md:text-5xl text-white tracking-wide leading-tight mb-6">
              Symphony of <span className="text-gold-gradient italic">Spaces</span>
            </h3>
            <p className="text-xs text-luxury-silver font-light leading-relaxed">
              Every table setting, structural light column, and hanging floral cloud is engineered to create a deep sensory connection. Let your imagination run wild with what we can stage.
            </p>
          </div>

          {/* Project Items mapping */}
          {HORIZONTAL_SLIDES.map((slide) => (
            <div
              key={slide.num}
              className="w-[300px] sm:w-[380px] md:w-[460px] h-[55vh] flex-shrink-0 bg-luxury-obsidian/60 border border-white/5 p-6 flex flex-col justify-between backdrop-blur-md group hover:border-luxury-brass/30 transition-colors duration-500"
            >
              <div className="relative w-full h-[65%] overflow-hidden bg-luxury-charcoal border border-white/5">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="pt-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-serif text-base md:text-lg text-white group-hover:text-luxury-champagne transition-colors">
                      {slide.title}
                    </h4>
                    <span className="font-sans text-[10px] text-luxury-brass tracking-widest font-bold">
                      {slide.num}
                    </span>
                  </div>
                  <p className="text-[11px] text-luxury-silver font-light leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
