"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useEventStore } from "@/store/useEventStore";

interface DockItem {
  title: string;
  icon: string;
  href: string;
}

const DEFAULT_ITEMS: DockItem[] = [
  { title: "Home", icon: "solar:home-2-line-duotone", href: "#" },
  { title: "Services", icon: "solar:case-minimalistic-line-duotone", href: "#services" },
  { title: "Reels", icon: "solar:gallery-line-duotone", href: "#reels" },
  { title: "Estimator", icon: "solar:calculator-minimalistic-line-duotone", href: "#planner" },
  { title: "Inquire", icon: "solar:letter-line-duotone", href: "inquire" },
];

/**
 * Minimalist Glassmorphic Bottom Navigation Bar.
 * Upgraded from macOS-style coordinate scaling to a clean, static pill layout.
 * Features hover/tap spring micro-animations, glowing borders, and direct modal integrations.
 */
export default function FloatingDock({ items = DEFAULT_ITEMS }: { items?: DockItem[] }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <div className="flex h-14 md:h-16 gap-3 md:gap-5 items-center border border-white/10 bg-[#120b2d]/75 backdrop-blur-xl px-4.5 rounded-full shadow-[0_12px_40px_rgba(8,4,21,0.5)]">
        {items.map((item) => (
          <DockIcon key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}

function DockIcon({ title, icon, href }: DockItem) {
  const [isHovered, setIsHovered] = useState(false);
  const { setBookingOpen } = useEventStore();

  const handleClick = (e: React.MouseEvent) => {
    if (href === "inquire") {
      e.preventDefault();
      setBookingOpen(true);
    }
  };

  const buttonContent = (
    <>
      {/* Tooltip Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            transition={{ duration: 0.2 }}
            className="absolute -top-11 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#090518] border border-white/10 text-[8px] font-sans font-bold tracking-[0.2em] uppercase text-primary whitespace-nowrap z-50 pointer-events-none rounded-full backdrop-blur-md shadow-md"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vector Icon */}
      <Icon icon={icon} className="w-5 h-5 md:w-5.5 md:h-5.5" />
    </>
  );

  const commonProps = {
    whileHover: { scale: 1.12, y: -3 },
    whileTap: { scale: 0.95 },
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    className: "relative w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/[0.03] border border-white/5 hover:border-primary/45 text-white/80 hover:text-primary flex items-center justify-center cursor-pointer transition-colors duration-300 hover:shadow-[0_0_15px_rgba(255,77,141,0.15)] shadow-md outline-none p-0 bg-transparent"
  };

  if (href === "inquire") {
    return (
      <motion.button
        onClick={handleClick}
        aria-label={title}
        type="button"
        {...commonProps}
      >
        {buttonContent}
      </motion.button>
    );
  }

  return (
    <Link href={href} aria-label={title} className="flex items-center justify-center outline-none">
      <motion.div {...commonProps}>
        {buttonContent}
      </motion.div>
    </Link>
  );
}
