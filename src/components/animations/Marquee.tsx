"use client";

import React from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";

interface MarqueeProps {
  text: string;
  baseSpeed?: number;  // Default float speed (pixels per frame)
  className?: string;
}

// Custom wrapping calculation to keep the loop infinite and seamless
const wrapVal = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * VelocityMarquee Component.
 * An infinite marquee that reacts dynamically to page scrolling:
 * accelerates movement speed and horizontally skews (tilts) the text in real-time.
 */
export default function Marquee({ text, baseSpeed = 0.15, className = "" }: MarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  
  // Track scroll velocity
  const scrollVelocity = useVelocity(scrollY);
  
  // Dampen velocity values to create organic smooth physics
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Map scroll velocity to a speed modifier (capped at 0.6, with clamping)
  const velocityFactor = useTransform(smoothVelocity, [0, 2500], [0, 0.6], {
    clamp: true,
  });

  // Map scroll velocity to a skew angle (tilts text forward or backward)
  const skewFactor = useTransform(smoothVelocity, [-1500, 1500], [-10, 10], {
    clamp: true,
  });
  const skewSpring = useSpring(skewFactor, {
    damping: 30,
    stiffness: 250,
  });

  // Convert raw coordinate offset into wrapping percentage translate
  const x = useTransform(baseX, (v) => `${wrapVal(-20, -45, v)}%`);

  // Animation frame handler running at 60fps/120fps
  useAnimationFrame((_, delta) => {
    // Base speed adjusted for screen frame rates (delta is approx 16.6ms at 60Hz)
    let moveBy = baseSpeed * (delta / 16);

    // If scrolling down, moveBy is positive, boosting speed in scroll direction
    // Retrieve latest velocity value
    const currentVelocity = velocityFactor.get();
    moveBy += Math.abs(currentVelocity);

    // Shift coordinate
    baseX.set(baseX.get() - moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap w-full py-2 select-none pointer-events-none">
      <motion.div
        style={{ x, skewX: skewSpring }}
        className={`flex space-x-8 whitespace-nowrap will-change-transform ${className}`}
      >
        {/* Repeat the text content multiple times to allow seamless background coverage */}
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
}
