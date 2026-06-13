"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const INSTA_POSTS = [
  { id: "post1", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600", likes: "1,240", tag: "#WeddingDecor" },
  { id: "post2", img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600", likes: "982", tag: "#EngagementStage" },
  { id: "post3", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600", likes: "1,502", tag: "#LuxuryEvent" },
  { id: "post4", img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=600", likes: "2,045", tag: "#CelebrationVibes" },
  { id: "post5", img: "https://images.unsplash.com/photo-1478146059778-26028b07395a?q=80&w=600", likes: "879", tag: "#FlowerWall" },
  { id: "post6", img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=600", likes: "1,320", tag: "#NeonGlow" },
];

// Duplicate for seamless infinite marquee
const DOUBLED = [...INSTA_POSTS, ...INSTA_POSTS];

export default function Instagram() {
  return (
    <section className="py-24 bg-luxury-obsidian relative border-b border-white/[0.04] overflow-hidden">
      {/* Subtle ambient glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[200px] rounded-full bg-primary/5 filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 mb-16">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-primary font-bold mb-4 block">
              05 // REMEMBER
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-wide leading-tight">
              Life on <span className="text-gold-gradient italic">Instagram</span>
            </h2>
            <p className="text-xs sm:text-sm text-luxury-silver font-light leading-relaxed mt-3 max-w-md">
              Follow <span className="text-primary font-bold">@st_events</span> for behind-the-scenes magic, live setup reveals, and raw celebration moments.
            </p>
          </div>

          {/* Instagram link badge */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="VIEW"
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group flex-shrink-0"
          >
            <Icon icon="ph:instagram-logo-duotone" className="w-5 h-5 text-primary" />
            <span className="text-xs font-sans font-bold tracking-[0.15em] uppercase text-white">
              @st_events
            </span>
            <Icon icon="solar:arrow-right-up-line-duotone" className="w-4 h-4 text-luxury-silver group-hover:text-primary transition-colors" />
          </a>
        </div>
      </div>

      {/* Infinite marquee row */}
      <div className="relative w-full overflow-hidden">
        {/* Left/right fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080415] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080415] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          className="flex gap-4 w-max"
        >
          {DOUBLED.map((post, idx) => (
            <div
              key={`${post.id}-${idx}`}
              data-cursor="VIEW"
              className="relative w-60 h-72 flex-shrink-0 rounded-2xl overflow-hidden border border-white/5 bg-luxury-charcoal/40 group cursor-pointer"
            >
              <Image
                src={post.img}
                alt={post.tag}
                fill
                sizes="240px"
                className="object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-90"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080415]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Hover details */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 z-10">
                <span className="text-[9px] font-sans font-bold tracking-widest text-primary uppercase block mb-1">
                  {post.tag}
                </span>
                <div className="flex items-center gap-1.5 text-[10px] text-white/80">
                  <Icon icon="solar:heart-bold" className="w-3.5 h-3.5 text-primary" />
                  <span>{post.likes}</span>
                </div>
              </div>

              {/* Top glare sweep */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
