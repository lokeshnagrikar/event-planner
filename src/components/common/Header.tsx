"use client";

import React from "react";
import Link from "next/link";
import { useEventStore } from "@/store/useEventStore";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Reels", href: "#reels" },
  { label: "Estimator", href: "#planner" },
  { label: "Portfolio", href: "#portfolio" },
];

export default function Header() {
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen, setBookingOpen } = useEventStore();

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 h-16 bg-[#080415]/75 border border-white/10 rounded-full shadow-[0_12px_40px_rgba(8,4,21,0.5)] backdrop-blur-md transition-all duration-300">
        <div className="w-full px-6 md:px-8 h-full flex items-center justify-between">
          
          {/* Cinematic Brand Logo */}
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

          {/* Desktop Navigation Links & Action Button */}
          <div className="flex items-center space-x-8">
            <nav className="hidden lg:flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-[10px] uppercase tracking-[0.2em] font-bold text-white/80 hover:text-white transition-colors duration-300 py-1.5 group"
                >
                  {link.label}
                  {/* Micro-hover sliding underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setBookingOpen(true)}
                className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-[9px] tracking-[0.2em] uppercase font-bold text-white hover:shadow-[0_0_20px_rgba(255,77,141,0.3)] transition-all duration-300"
              >
                Inquire Now
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden text-white hover:text-primary transition-colors p-1"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <Icon icon="solar:close-square-line-duotone" className="w-5 h-5" />
                ) : (
                  <Icon icon="solar:menu-hamburger-line-duotone" className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Menu Panel - Drawer Slideout using Framer Motion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#080415]/95 backdrop-blur-lg lg:hidden flex flex-col justify-center items-center"
          >
            {/* Ambient glows behind mobile menu */}
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full ambient-glow-pink opacity-25 pointer-events-none filter blur-2xl" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full ambient-glow-blue opacity-25 pointer-events-none filter blur-2xl" />

            <nav className="flex flex-col items-center space-y-6 text-center z-10">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg md:text-xl font-serif tracking-[0.15em] text-white hover:text-primary transition-colors duration-300 block py-1"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ delay: NAV_LINKS.length * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6"
              >
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setBookingOpen(true);
                  }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-xs tracking-[0.2em] uppercase text-white hover:shadow-[0_0_20px_rgba(255,77,141,0.3)] transition-all duration-300"
                >
                  Inquire Now
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
