"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEventStore } from "@/store/useEventStore";

/**
 * Preloader Component.
 * Full-screen loading preloader displaying a luxury brand coordinate and counter.
 * Triggers a state update in the Zustand store once loading reaches 100%.
 */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const { isIntroCompleted, setIntroCompleted } = useEventStore();

  useEffect(() => {
    if (isIntroCompleted) return;

    // Organic loading counter ticks (ticks every 20-40ms with varied step size)
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIntroCompleted(true);
          }, 500); // Tiny pause to allow reading 100%
          return 100;
        }

        const step = Math.floor(Math.random() * 5) + 1; // 1 to 5% increments
        return Math.min(prev + step, 100);
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isIntroCompleted, setIntroCompleted]);

  return (
    <AnimatePresence>
      {!isIntroCompleted && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between p-8 md:p-16 select-none pointer-events-none"
        >
          {/* Liquid Curtain SVG Layer */}
          <svg
            className="absolute inset-0 w-full h-[calc(100%+100px)] fill-[#050505] z-0 pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <motion.path
              initial={{ d: "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z" }}
              exit={{ d: "M 0 0 L 100 0 L 100 0 Q 50 -25 0 0 Z" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            />
          </svg>

          {/* Animating Content Layer */}
          <motion.div
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-full flex flex-col justify-between relative z-10 pointer-events-auto"
          >
            {/* Top Coordinates */}
            <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-sans tracking-[0.35em] text-primary uppercase font-bold">
              <span>Gondia, Maharashtra // Central India</span>
              <span>Est. 2018</span>
            </div>

            {/* Core Brand Banner */}
            <div className="flex flex-col items-center">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.25em] text-white uppercase font-bold text-center"
              >
                ST EVENTS
              </motion.h1>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-[8px] font-sans tracking-[0.45em] uppercase text-luxury-silver mt-2 font-bold"
              >
                Luxury Event Architects
              </motion.span>
              <div className="flex justify-center space-x-2 mt-4 select-none">
                {"Where Moments Become Memories".split(" ").map((word, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.9, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + idx * 0.15, ease: "easeOut" }}
                    className="text-xs font-serif italic tracking-wide text-primary"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="flex justify-between items-end border-t border-white/[0.03] pt-6">
              <span className="text-[9px] font-sans tracking-[0.2em] text-luxury-silver uppercase font-semibold">
                Orchestrating Cinematic Canvas...
              </span>
              <div className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tighter text-primary font-bold leading-none translate-y-2">
                {count.toString().padStart(3, "0")}%
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
