"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

export default function WhatsAppCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 flex items-center space-x-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Slide-out Badge Label */}
          <motion.div
            initial={{ opacity: 0, x: 20, width: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0.9,
              x: 0,
              width: "auto",
            }}
            className="overflow-hidden bg-[#0a071d]/90 border border-[#25d366]/30 px-4 py-2.5 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.1)] backdrop-blur-md hidden sm:flex items-center space-x-2 cursor-pointer"
          >
            <span className="text-[10px] font-sans uppercase tracking-[0.15em] font-extrabold text-[#25d366] whitespace-nowrap">
              Get Quote in 2 Minutes
            </span>
          </motion.div>

          {/* Floating Circle Button */}
          <a
            href="https://wa.me/919999999999?text=Hi%20ST%20Events!%20I'd%20like%20to%20get%20a%20quote%20for%20an%20upcoming%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:shadow-[0_0_35px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300 relative group"
          >
            {/* Pulsing ring outer */}
            <div className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-25 scale-105 pointer-events-none" />

            <Icon icon="solar:whatsapp-bold" className="w-7 h-7" />

            {/* Micro Badge for mobile */}
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF4D8D] text-[8px] font-bold text-white flex items-center justify-center shadow-md sm:hidden animate-pulse">
              1
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
