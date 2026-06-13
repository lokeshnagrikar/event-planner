"use client";

import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";

interface Particle {
  x: number;
  y: number;
  size: number;
  baseSpeedY: number;
  speedY: number;
  speedX: number;
  alpha: number;
  decayRate: number;
}

interface FloatingParticlesProps {
  particleColor?: string; // e.g. "197, 160, 89" (rgb brass values)
  maxParticles?: number;
}

/**
 * FloatingParticles Component.
 * Implements a high-efficiency Canvas emitter of floating luxury gold embers.
 * Coordinates drift speed with mouse movement and scroll velocity (using ScrollTrigger.getVelocity()).
 */
export default function FloatingParticles({
  particleColor = "197, 160, 89", // ST brass (#C5A059)
  maxParticles = 50,
}: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // 1. Fit canvas size to viewport
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // 2. Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // 3. Initialize ScrollTrigger instance to track scroll velocity
    let scrollTriggerInstance: ScrollTrigger | null = null;
    if (typeof window !== "undefined") {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: "max",
      });
    }

    // 4. Initialize particles
    const createParticle = (initYAtBottom = false): Particle => {
      const size = Math.random() * 2.5 + 0.5;
      return {
        x: Math.random() * canvas.width,
        y: initYAtBottom ? canvas.height + 10 : Math.random() * canvas.height,
        size,
        baseSpeedY: -(Math.random() * 0.4 + 0.1),
        speedY: 0,
        speedX: Math.random() * 0.2 - 0.1,
        alpha: Math.random() * 0.5 + 0.15,
        decayRate: Math.random() * 0.0005 + 0.0002,
      };
    };

    // Pre-populate particles across full canvas height
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(false));
    }

    // 5. Render animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Query the current scroll velocity via the ScrollTrigger instance
      const scrollVelocity = scrollTriggerInstance ? scrollTriggerInstance.getVelocity() : 0;
      
      // Map scroll velocity to a speed multiplier (up to 5x speed increase)
      const velocityFactor = Math.min(Math.abs(scrollVelocity) / 800, 4);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply scroll velocity push to upward speed
        p.speedY = p.baseSpeedY - (p.baseSpeedY * velocityFactor * 2.5);

        // Adjust coordinates
        p.y += p.speedY;
        p.x += p.speedX;

        // Mouse gravity: push particles slightly away from cursor
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.alpha})`;
        ctx.fill();

        // Recycle particle if it leaves the top of the canvas
        if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[i] = createParticle(true);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // 6. Cleanups
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [maxParticles, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-70"
    />
  );
}
