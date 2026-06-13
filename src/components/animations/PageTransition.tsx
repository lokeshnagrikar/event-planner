"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * PageTransition Component.
 * Plays an immersive double-curtain transition on mount.
 * Layer 1: Luxury Gold curtain slides up.
 * Layer 2: Deep Obsidian curtain slides up with slight delay, revealing the page content.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide transition overlays after slide completes (1.4 seconds)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <div className="fixed inset-0 z-[9999] pointer-events-none">
            {/* Curtain 1: Luxury Gold Panel */}
            <motion.div
              initial={{ y: "0%" }}
              animate={{ y: "-100%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }} // easeInOutQuart
              className="absolute inset-0 bg-luxury-brass z-20 flex flex-col items-center justify-center"
            >
              {/* Sliding Title Reveal inside Transition */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
                transition={{ duration: 1.0, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
                className="text-luxury-obsidian flex flex-col items-center"
              >
                <span className="font-serif text-2xl tracking-[0.3em] font-bold">
                  ST EVENTS
                </span>
                <span className="text-[9px] font-sans tracking-[0.35em] uppercase mt-2 font-bold">
                  Central India
                </span>
              </motion.div>
            </motion.div>

            {/* Curtain 2: Luxury Obsidian Panel */}
            <motion.div
              initial={{ y: "0%" }}
              animate={{ y: "-100%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 1.25, delay: 0.1, ease: [0.76, 0, 0.24, 1] }} // slightly slower
              className="absolute inset-0 bg-luxury-obsidian z-10"
            />
          </div>
        )}
      </AnimatePresence>
      
      {/* Content wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
