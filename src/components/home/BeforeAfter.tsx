"use client";

import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  return (
    <section className="py-24 bg-luxury-obsidian relative border-b border-white/[0.04] overflow-hidden">
      {/* Background glow flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[150px] rounded-full bg-secondary/5 filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Block - IMAGINE */}
        <div className="max-w-xl mb-16 mx-auto text-center">
          <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-primary font-bold mb-4 block">
            02 // IMAGINE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-wide leading-tight">
            See the <span className="text-gold-gradient italic">Transformation</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-silver font-light leading-relaxed mt-4">
            Drag the slider to see how our team transforms an empty venue into a premium, glowing cinematic event space.
          </p>
        </div>

        {/* Slider Container */}
        <div
          ref={containerRef}
          className="relative max-w-4xl mx-auto aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/10 select-none shadow-[0_0_50px_rgba(8,4,21,0.5)] cursor-ew-resize"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Before Image (Left Layer - Empty Hall) */}
          <div className="absolute inset-0 w-full h-full bg-[#1b172d]">
            <img
              src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1200"
              alt="Empty Venue"
              className="w-full h-full object-cover filter brightness-[50%] contrast-[105%]"
            />
            {/* Label Left */}
            <div className="absolute top-6 left-6 z-20 bg-black/60 border border-white/10 px-3 py-1 rounded-full text-[9px] font-sans uppercase tracking-[0.2em] font-bold text-white backdrop-blur-md">
              Empty Venue
            </div>
          </div>

          {/* After Image (Right Layer - Decorated Hall - Clipped) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200"
              alt="Decorated Venue"
              className="w-full h-full object-cover filter brightness-[75%] contrast-[105%]"
            />
            {/* Label Right */}
            <div className="absolute top-6 right-6 z-20 bg-primary/20 border border-primary/30 px-3 py-1 rounded-full text-[9px] font-sans uppercase tracking-[0.2em] font-bold text-white backdrop-blur-md">
              ST Events Transformation
            </div>
          </div>

          {/* Dividing Glow Line & Handle */}
          <div
            className="absolute top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-primary via-secondary to-primary pointer-events-none z-30 shadow-[0_0_10px_rgba(255,77,141,0.5)]"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Circular Drag Handle Knob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black border-2 border-primary flex items-center justify-center text-white shadow-lg cursor-ew-resize shadow-primary/20 hover:scale-105 transition-transform">
              <Icon icon="solar:alt-arrow-left-right-line-duotone" className="w-5 h-5 text-primary" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
