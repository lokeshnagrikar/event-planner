"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
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

export default function FloatingDock({ items = DEFAULT_ITEMS }: { items?: DockItem[] }) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    setMounted(true);
    // Check if device screen size is mobile/touch
    const media = window.matchMedia("(max-width: 768px)");
    setIsMobile(media.matches);
    
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <motion.div
        onMouseMove={(e) => !isMobile && mouseX.set(e.clientX)}
        onMouseLeave={() => !isMobile && mouseX.set(Infinity)}
        className={`flex border border-white/10 bg-[#120b2d]/75 backdrop-blur-xl rounded-full shadow-[0_12px_40px_rgba(8,4,21,0.5)] transition-all duration-300 ${
          isMobile 
            ? "h-14 gap-3.5 items-center px-4.5" 
            : "h-16 gap-4 items-end px-4.5 pb-3"
        }`}
      >
        {items.map((item) => (
          <DockIcon key={item.title} mouseX={mouseX} isMobile={isMobile} {...item} />
        ))}
      </motion.div>
    </div>
  );
}

function DockIcon({
  title,
  icon,
  href,
  mouseX,
  isMobile,
}: DockItem & { mouseX: MotionValue; isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { setBookingOpen } = useEventStore();
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Dynamic width & height mapping based on distance (Desktop Only)
  const widthTransform = useTransform(distance, [-150, 0, 150], [44, 72, 44]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [44, 72, 44]);

  // Spring physics for authentic fluid macOS magnification motion
  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  // Proportional icon size scaling inside the button
  const iconSizeTransform = useTransform(distance, [-150, 0, 150], [20, 34, 20]);
  const iconSize = useSpring(iconSizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const handleClick = (e: React.MouseEvent) => {
    if (href === "inquire") {
      e.preventDefault();
      setBookingOpen(true);
    }
  };

  const content = (
    <motion.div
      ref={ref}
      // Apply Framer Motion dynamic sizes ONLY on desktop
      style={isMobile ? {} : { width, height }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      className={`relative rounded-full bg-white/[0.03] border border-white/5 hover:border-primary/45 text-white/80 hover:text-primary flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,77,141,0.15)] shadow-md outline-none ${
        isMobile ? "w-10 h-10" : ""
      }`}
    >
      {/* Tooltip Overlay (Desktop Only) */}
      <AnimatePresence>
        {!isMobile && isHovered && (
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
      <motion.div 
        style={isMobile ? {} : { width: iconSize, height: iconSize }} 
        className={`flex items-center justify-center ${isMobile ? "w-5 h-5" : ""}`}
      >
        <Icon icon={icon} className="w-full h-full" />
      </motion.div>
    </motion.div>
  );

  if (href === "inquire") {
    return (
      <button
        onClick={handleClick}
        aria-label={title}
        type="button"
        className="focus:outline-none flex items-center justify-center"
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={href} aria-label={title} className="focus:outline-none flex items-center justify-center">
      {content}
    </Link>
  );
}
