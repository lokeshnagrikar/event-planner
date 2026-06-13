"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
  children: React.ReactElement;
  range?: number;     // Active distance (radius) in pixels
  strength?: number;  // Pull intensity multiplier (0 to 1)
  className?: string;
}

/**
 * Custom micro-interaction wrapper.
 * Creates an elegant magnetic gravity effect where children follow the cursor.
 * Perfect for buttons, social links, and icons.
 */
export default function Magnetic({
  children,
  range = 75,
  strength = 0.35,
  className = "",
}: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const { clientX, clientY } = e;
    const rect = containerRef.current.getBoundingClientRect();

    // Calculate the center coordinates of the element
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from cursor to center
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance < range) {
      // Apply magnetic pull toward cursor
      setCoords({
        x: deltaX * strength,
        y: deltaY * strength,
      });
    } else {
      // Revert if outside range
      setCoords({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  // High-performance spring behavior (low mass and high stiffness for reactive snappiness)
  const springSettings = {
    type: "spring",
    stiffness: 160,
    damping: 15,
    mass: 0.1,
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: coords.x, y: coords.y }}
      transition={springSettings}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
