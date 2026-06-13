"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MouseFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Refs for tracking coordinates
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Detect touch screens to disable custom cursor layout
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          (window.matchMedia && window.matchMedia("(max-width: 1023px)").matches)
      );
    };
    checkTouch();

    if (isTouchDevice) return;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    let glowX = 0;
    let glowY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      // Check hover targets dynamically using elementFromPoint or event path
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest<HTMLElement>(
        "a, button, select, input, textarea, [role='button'], [data-cursor], .cursor-ew-resize"
      );
      
      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute("data-cursor") || "";
        
        if (customText) {
          setCursorText(customText);
        } else if (interactiveEl.classList.contains("cursor-ew-resize")) {
          setCursorText("DRAG");
        } else if (interactiveEl.tagName === "A" && interactiveEl.getAttribute("href")?.includes("#reels")) {
          setCursorText("PLAY");
        } else if (interactiveEl.tagName === "BUTTON" && interactiveEl.innerText.toLowerCase().includes("plan")) {
          setCursorText("PLAN");
        } else {
          setCursorText("");
        }
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    // Animation Loop with smooth trailing lag (interpolation)
    const updatePosition = () => {
      // Lerp calculations for each layer's offset speeds
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;

      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      glowX += (mouseX - glowX) * 0.05;
      glowY += (mouseY - glowY) * 0.05;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;
      }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${ringX - (isHovered ? 40 : 16)}px, ${ringY - (isHovered ? 40 : 16)}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX - 125}px, ${glowY - 125}px, 0)`;
      }

      requestAnimationFrame(updatePosition);
    };

    const animFrame = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      cancelAnimationFrame(animFrame);
    };
  }, [isTouchDevice, isHovered]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* 1. Ambient Background Glow Light source (Lerps slowly behind cursor) */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[250px] h-[250px] rounded-full pointer-events-none z-[1] opacity-30 mix-blend-screen filter blur-[80px] will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(255, 77, 141, 0.15) 0%, rgba(76, 125, 255, 0.15) 50%, rgba(8, 4, 21, 0) 75%)",
        }}
      />

      {/* 2. Custom Outer Cursor Ring (Morphs and expands) */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[999999] flex items-center justify-center font-sans uppercase font-bold text-[7px] tracking-[0.2em] transition-all duration-300 ease-out will-change-transform ${
          isHovered
            ? "w-20 h-20 bg-primary/10 border border-primary text-white shadow-[0_0_20px_rgba(255,77,141,0.3)]"
            : "w-8 h-8 border border-white/20 text-transparent"
        } ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <AnimatePresence>
          {isHovered && cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Custom Inner Solid Cursor Dot (Lerps fast for accuracy) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[999999] transition-opacity duration-300 will-change-transform ${
          isVisible && !isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
