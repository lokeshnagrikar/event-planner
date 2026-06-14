"use client";

import React from "react";
import Link from "next/link";
import { useEventStore } from "@/store/useEventStore";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#", num: "01" },
  { label: "Services", href: "#services", num: "02" },
  { label: "Reels", href: "#reels", num: "03" },
  { label: "Estimator", href: "#planner", num: "04" },
  { label: "Portfolio", href: "#portfolio", num: "05" },
];

export default function Header() {
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen, setBookingOpen } = useEventStore();

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 h-16 bg-[#080415]/75 border border-white/10 rounded-full shadow-[0_12px_40px_rgba(8,4,21,0.5)] backdrop-blur-md transition-all duration-300">
        <div className="w-full px-6 md:px-8 h-full flex items-center justify-between">

          {/* Brand Logo */}
          <Link
            href="/"
            className="flex flex-col select-none group text-left"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="font-serif text-lg md:text-xl tracking-[0.25em] text-white font-bold leading-none group-hover:text-primary transition-colors">
              ST EVENTS
            </span>
            <span className="text-[7px] font-sans tracking-[0.45em] text-primary mt-1.5 uppercase leading-none font-bold">
              Luxury Experiences
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-8">
            <nav className="hidden lg:flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-[10px] uppercase tracking-[0.2em] font-bold text-white/80 hover:text-white transition-colors duration-300 py-1.5 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setBookingOpen(true)}
                className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-[9px] tracking-[0.2em] uppercase font-bold text-white hover:shadow-[0_0_20px_rgba(255,77,141,0.3)] transition-all duration-300"
              >
                Inquire Now
              </button>

              {/* Hamburger Toggle — always visible below lg */}
              <button
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
                className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 text-white hover:text-primary"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMobileMenuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 56px) 56px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 56px) 56px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 56px) 56px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#050210]/97 backdrop-blur-xl lg:hidden flex flex-col justify-center items-center"
          >
            {/* Ambient glows */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 pointer-events-none blur-[80px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-secondary/5 pointer-events-none blur-[60px]" />

            {/* Nav Links */}
            <nav className="flex flex-col items-center space-y-1 text-center z-10 w-full px-8">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: 0.1 + idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between w-full py-4 border-b border-white/5 hover:border-primary/20 transition-colors duration-300"
                  >
                    <span className="text-[10px] font-mono tracking-[0.3em] text-primary/60 group-hover:text-primary transition-colors">
                      {link.num}
                    </span>
                    <span className="text-2xl font-serif tracking-[0.1em] text-white group-hover:text-primary transition-colors duration-300">
                      {link.label}
                    </span>
                    <span className="text-white/20 group-hover:text-primary/60 transition-colors text-xs">→</span>
                  </Link>
                </motion.div>
              ))}

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 + NAV_LINKS.length * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="pt-8 w-full flex flex-col items-center gap-4"
              >
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setBookingOpen(true);
                  }}
                  className="w-full max-w-xs flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-xs tracking-[0.25em] uppercase font-bold text-white hover:shadow-[0_0_30px_rgba(255,77,141,0.4)] transition-all duration-300"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Plan My Event
                </button>

                <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase">
                  Where Moments Become Memories
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
