"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ImageRevealProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  curtainColor?: "obsidian" | "charcoal" | "primary" | "secondary";
}

/**
 * ImageReveal Component.
 * Implements an Awwwards-style sliding curtain reveal effect when scrolled into view.
 */
export default function ImageReveal({
  src,
  alt,
  aspectRatio = "aspect-[16/9]",
  curtainColor = "obsidian",
}: ImageRevealProps) {
  // Map curtain color to background class
  const curtainBg = {
    obsidian: "bg-[#080415]",
    charcoal: "bg-[#0d091e]",
    primary: "bg-primary",
    secondary: "bg-secondary",
  }[curtainColor];

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/5 w-full ${aspectRatio}`}>
      {/* Sliding Curtain Overlay */}
      <motion.div
        initial={{ x: "0%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        className={`absolute inset-0 z-20 ${curtainBg}`}
      />

      {/* Zoom scale reveal on image */}
      <motion.div
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full relative z-10"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover filter brightness-[75%] contrast-[105%]"
        />
      </motion.div>
    </div>
  );
}
