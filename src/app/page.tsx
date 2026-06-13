"use client";

import React, { useState, useEffect } from "react";
import Preloader from "@/components/home/Preloader";
import Hero from "@/components/home/Hero";
import ScrollStory from "@/components/animations/ScrollStory";
import Services from "@/components/home/Services";
import EventTimeline from "@/components/home/EventTimeline";
import Reels from "@/components/home/Reels";
import Gallery from "@/components/ui/Gallery";
import { Statistics } from "@/components/ui/Statistics";
import { Testimonial } from "@/components/ui/Testimonial";
import Instagram from "@/components/home/Instagram";
import BeforeAfter from "@/components/home/BeforeAfter";
import BudgetPlanner from "@/components/home/BudgetPlanner";
import ContactCTA from "@/components/home/ContactCTA";
import { useEventStore } from "@/store/useEventStore";

import HOMEPAGE_STATS from "@/data/stats.json";
import HOMEPAGE_TESTIMONIALS from "@/data/testimonials.json";
import HOMEPAGE_GALLERY from "@/data/gallery.json";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  // Prevent Next.js server-side hydration mismatches with client-side preloaders
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* 1. Cinematic Preloader Screen */}
      <Preloader />

      {/* 2. Dream Section - Hero & Opening Tagline */}
      <Hero />

      {/* 3. Dream & Imagine Sections - Pinning Story & Horizontal Scroll */}
      <ScrollStory />

      {/* 4. Imagine Section - Before/After Transformation Slider */}
      <BeforeAfter />

      {/* 5. Create Section - Experiences We Craft Bento Grid */}
      <Services />

      {/* 6. Create Section - Event Architecture Timeline */}
      <EventTimeline />

      {/* 7. Create Section - Interactive Budget & Concept Planner */}
      <BudgetPlanner />

      {/* 8. Celebrate Section - Vertical Reels Wall */}
      <Reels />

      {/* 9. Remember Section - Gallery Design Showcase */}
      <section className="py-24 bg-luxury-obsidian relative border-b border-white/[0.04] overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 filter blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="mb-16 text-center md:text-left">
            <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-primary font-bold mb-3 block">
              04 // REMEMBER
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-wide leading-tight">
              Design <span className="text-gold-gradient italic">Showcase</span>
            </h2>
            <p className="text-xs sm:text-sm text-luxury-silver font-light leading-relaxed mt-4 max-w-lg">
              Explore custom event concepts crafted by our design team. Every detail tells a story.
            </p>
          </div>

          <Gallery items={HOMEPAGE_GALLERY} />
        </div>
      </section>

      {/* 10. Statistics Section */}
      <section className="py-16 bg-[#050210] relative border-b border-white/[0.04] overflow-hidden">
        {/* Subtle center glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[60%] h-[200px] rounded-full bg-primary/5 filter blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <Statistics items={HOMEPAGE_STATS} />
        </div>
      </section>

      {/* 11. Testimonials Section */}
      <section className="py-24 bg-luxury-obsidian relative border-b border-white/[0.04] overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[250px] rounded-full bg-primary/[0.04] filter blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-xl mx-auto text-center mb-14">
            <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-primary font-bold mb-3 block">
              04 // REMEMBER
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-wide">
              Client <span className="text-gold-gradient italic">Voices</span>
            </h2>
            <p className="text-xs sm:text-sm text-luxury-silver font-light mt-4 leading-relaxed">
              Real stories from couples and families who trusted us with their most precious moments.
            </p>
          </div>

          <Testimonial items={HOMEPAGE_TESTIMONIALS} />
        </div>
      </section>

      {/* 12. Contact CTA */}
      <ContactCTA />

      {/* 13. Instagram Feed */}
      <Instagram />
    </>
  );
}
