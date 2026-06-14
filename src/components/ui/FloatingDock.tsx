"use client";

import React, { useState, useRef } from "react";
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
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex h-16 gap-4 items-end border border-white/10 bg-[#120b2d]/75 backdrop-blur-xl px-4.5 pb-3 rounded-full shadow-[0_12px_40px_rgba(8,4,21,0.5)]"
      >
        {items.map((item) => (
          <DockIcon key={item.title} mouseX={mouseX} {...item} />
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
}: DockItem & { mouseX: MotionValue }) {
  const ref = useRef<HTMLDivElement>(null);
  const { setBookingOpen } = useEventStore();
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Dynamic width & height mapping based on distance
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
      style={{ width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-full bg-white/[0.03] border border-white/5 hover:border-primary/45 text-white/80 hover:text-primary flex items-center justify-center cursor-pointer transition-colors duration-300 hover:shadow-[0_0_15px_rgba(255,77,141,0.15)] shadow-md outline-none"
    >
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
      <motion.div 
        style={{ width: iconSize, height: iconSize }} 
        className="flex items-center justify-center animate-none"
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
        className="focus:outline-none"
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
