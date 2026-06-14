"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DevBadge() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="fixed bottom-6 left-6 z-50 pointer-events-auto hidden md:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex items-center gap-2.5 px-4 py-2 border border-white/5 bg-[#120b2d]/70 backdrop-blur-xl rounded-full text-[9px] tracking-widest uppercase text-white/60 cursor-pointer shadow-md select-none"
        animate={{
          borderColor: isHovered ? "rgba(255, 77, 141, 0.35)" : "rgba(255, 255, 255, 0.05)",
          boxShadow: isHovered 
            ? "0 0 15px rgba(255, 77, 141, 0.2)" 
            : "0 4px 10px rgba(0, 0, 0, 0.3)",
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.span
              key="collapsed"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
            >
              Dev Credits
            </motion.span>
          ) : (
            <motion.span
              key="expanded"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="text-primary font-bold"
            >
              Lokesh Nagrikar
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
