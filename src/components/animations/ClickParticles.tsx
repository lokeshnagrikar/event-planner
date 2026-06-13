"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number; // 1 → 0
}

interface Dot {
  x: number;
  y: number;
  vy: number;        // floats upward
  vx: number;        // slight horizontal drift
  size: number;
  life: number;      // 1 → 0
}

const PINK = "255, 77, 141"; // #FF4D8D as RGB for rgba()

export default function ClickParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const dotsRef = useRef<Dot[]>([]);
  const rafRef = useRef<number>(0);

  const spawnEffect = useCallback((x: number, y: number) => {
    // One expanding ripple ring
    ripplesRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius: 55 + Math.random() * 20,
      life: 1,
    });

    // 5–7 tiny floating dots
    const count = 5 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      dotsRef.current.push({
        x: x + (Math.random() - 0.5) * 20,
        y,
        vy: -(1.2 + Math.random() * 2.0), // float upward
        vx: (Math.random() - 0.5) * 0.8,  // gentle drift
        size: 1.5 + Math.random() * 2,
        life: 1,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Ripple rings ──────────────────────────────────────────
      ripplesRef.current = ripplesRef.current.filter((r) => r.life > 0);

      for (const r of ripplesRef.current) {
        r.radius += (r.maxRadius - r.radius) * 0.07; // eases out
        r.life -= 0.028;

        const alpha = Math.max(0, r.life * 0.5);

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${PINK}, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = `rgba(${PINK}, ${alpha * 0.6})`;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // ── Floating dots ─────────────────────────────────────────
      dotsRef.current = dotsRef.current.filter((d) => d.life > 0);

      for (const d of dotsRef.current) {
        d.x += d.vx;
        d.y += d.vy;
        d.vy *= 0.97; // gentle deceleration
        d.life -= 0.018;

        const alpha = Math.max(0, d.life * 0.85);

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PINK}, ${alpha})`;
        ctx.shadowColor = `rgba(${PINK}, ${alpha})`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const handleClick = (e: MouseEvent) => spawnEffect(e.clientX, e.clientY);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, [spawnEffect]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999]"
      aria-hidden="true"
    />
  );
}
