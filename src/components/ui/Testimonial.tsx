"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Magnetic from "./Magnetic";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string; // e.g. "Wedding, Nagpur", "Corporate Gala, Gondia"
  image?: string;
}

interface TestimonialProps {
  items: TestimonialItem[];
  className?: string;
}

/**
 * Premium editorial Testimonial Slider.
 * Rebuilt as a floating glass card with custom border-glows, next/prev navigation circles,
 * and simulated avatar badges with gradient initials.
 */
export function Testimonial({ items, className = "" }: TestimonialProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const current = items[activeIndex];

  // Generate client avatar initials (e.g. "R&D" for "Rohan & Devika")
  const getInitials = (author: string) => {
    if (author.includes(" & ")) {
      const parts = author.split(" & ");
      return `${parts[0][0]}&${parts[1][0]}`;
    }
    const words = author.split(" ");
    if (words.length > 1) {
      return `${words[0][0]}${words[1][0]}`;
    }
    return author.slice(0, 2);
  };

  const initials = getInitials(current.author);

  return (
    <div className={`relative w-full max-w-4xl mx-auto py-16 px-6 md:px-10 glass-panel rounded-3xl border border-white/5 backdrop-blur-xl overflow-hidden shadow-2xl hover:border-primary/20 transition-all duration-500 shadow-primary/5 ${className}`}>
      
      {/* Decorative Giant neon quotation mark in background */}
      <span className="absolute top-2 left-6 font-serif text-[12rem] leading-none text-primary/5 select-none pointer-events-none">
        &ldquo;
      </span>

      {/* Slide Content */}
      <div className="relative z-10 min-h-[220px] flex flex-col justify-center items-center text-center px-4 md:px-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center space-y-6"
          >
            {/* Quote text */}
            <p className="font-serif text-lg sm:text-2xl italic tracking-wide text-white leading-relaxed max-w-2xl">
              &ldquo;{current.quote}&rdquo;
            </p>
            
            {/* Client Avatar & Details */}
            <div className="flex items-center space-x-4 pt-4 text-left border-t border-white/5 w-full justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-serif text-xs font-bold border border-white/10 shadow-lg shadow-primary/20">
                {initials}
              </div>
              <div>
                <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.2em] text-white uppercase block">
                  {current.author}
                </span>
                <span className="text-[10px] font-sans tracking-[0.25em] text-primary uppercase font-bold mt-0.5 block">
                  {current.role}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Magnetic Navigations */}
      <div className="flex justify-center items-center space-x-6 mt-10 relative z-10">
        <Magnetic range={30} strength={0.4}>
          <button
            onClick={handlePrev}
            className="flex items-center justify-center w-11 h-11 border border-white/10 hover:border-primary bg-black/40 text-white hover:bg-primary transition-all duration-300 rounded-full hover:shadow-[0_0_15px_rgba(255,77,141,0.25)]"
            aria-label="Previous review"
          >
            <Icon icon="solar:alt-arrow-left-line-duotone" className="w-5 h-5" />
          </button>
        </Magnetic>

        <span className="text-[9px] font-sans tracking-[0.2em] text-luxury-silver font-bold">
          {activeIndex + 1} <span className="opacity-30">/</span> {items.length}
        </span>

        <Magnetic range={30} strength={0.4}>
          <button
            onClick={handleNext}
            className="flex items-center justify-center w-11 h-11 border border-white/10 hover:border-primary bg-black/40 text-white hover:bg-primary transition-all duration-300 rounded-full hover:shadow-[0_0_15px_rgba(255,77,141,0.25)]"
            aria-label="Next review"
          >
            <Icon icon="solar:alt-arrow-right-line-duotone" className="w-5 h-5" />
          </button>
        </Magnetic>
      </div>
    </div>
  );
}
