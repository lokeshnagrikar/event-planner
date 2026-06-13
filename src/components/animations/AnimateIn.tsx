"use client";

import React from "react";
import { motion } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface AnimateInProps {
  children: React.ReactNode;
  direction?: Direction; // Direction of entrance slide
  delay?: number;          // Delay in seconds
  duration?: number;       // Duration in seconds
  distance?: number;       // Slide distance in pixels
  className?: string;
  once?: boolean;          // Animate once or every time it enters the viewport
  staggerChildren?: number;// Stagger duration for child animations
}

/**
 * Cinematic entrance animation wrapper utilizing Framer Motion.
 * Standardizes premium transitions across text blocks and grid cards.
 */
export default function AnimateIn({
  children,
  direction = "up",
  delay = 0,
  duration = 1.2,
  distance = 30,
  className = "",
  once = true,
  staggerChildren = 0,
}: AnimateInProps) {
  // Translate direction options into translation values
  const getOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      default:
        return {};
    }
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      ...getOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo curve
        when: "beforeChildren",
        staggerChildren: staggerChildren,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
