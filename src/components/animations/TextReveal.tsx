"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface TextRevealProps {
  text: string;
  type?: "words" | "chars";
  delay?: number;
  duration?: number;
  className?: string;
  triggerStart?: string; // ScrollTrigger start configuration
}

/**
 * TextReveal Component.
 * Splits text into words or letters and animates them upwards out of an overflow-hidden mask.
 * Avoids text-wrapping bugs by grouping characters within word containers.
 */
export default function TextReveal({
  text,
  type = "words",
  delay = 0,
  duration = 1.0,
  className = "",
  triggerStart = "top 88%",
}: TextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const targetClass = type === "chars" ? ".reveal-char" : ".reveal-word";
    const elements = containerRef.current.querySelectorAll(targetClass);

    // Initial setup to ensure elements are hidden before animation triggers
    gsap.set(elements, { y: "110%", rotate: type === "chars" ? 2 : 0 });

    const anim = gsap.to(elements, {
      y: "0%",
      rotate: 0,
      duration: duration,
      delay: delay,
      stagger: type === "chars" ? 0.02 : 0.06,
      ease: "power4.out", // Smooth deceleration
      scrollTrigger: {
        trigger: containerRef.current,
        start: triggerStart,
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [type, delay, duration, triggerStart]);

  const words = text.split(" ");

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          className="inline-block overflow-hidden mr-[0.25em] vertical-align-middle"
        >
          {type === "chars" ? (
            word.split("").map((char, charIdx) => (
              <span
                key={charIdx}
                className="reveal-char inline-block origin-bottom-left"
                style={{ display: "inline-block" }}
              >
                {char}
              </span>
            ))
          ) : (
            <span
              className="reveal-word inline-block"
              style={{ display: "inline-block" }}
            >
              {word}
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
