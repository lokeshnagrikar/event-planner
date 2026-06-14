"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Magnetic from "@/components/ui/Magnetic";
import { motion } from "framer-motion";
import { useEventStore } from "@/store/useEventStore";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { setBookingOpen } = useEventStore();

  React.useEffect(() => {
    console.log(
      "%c✦ DESIGNED & DEVELOPED BY LOKESH NAGRIKAR ✦%c\nFreelance Event Website Designer & Developer", 
      "color: #FF4D8D; font-size: 13px; font-weight: bold; background: #0c0822; padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(255, 77, 141, 0.2);",
      "color: #a3a3a3; font-size: 10px; display: block; margin-top: 4px;"
    );
  }, []);

  // Marquee text items
  const marqueeItems = [
    "Let's Create Something Extraordinary",
    "Where Moments Become Memories",
    "Dream. Create. Celebrate.",
    "Luxury Events Across India",
  ];
  const doubled = [...marqueeItems, ...marqueeItems];

  const services = [
    { name: "Luxury Wedding Experiences", href: "/wedding-decoration-gondia" },
    { name: "Creative Celebration Styling", href: "/birthday-decoration-gondia" },
    { name: "Grand Entrance Effects", href: "/cold-pyro-gondia" },
    { name: "Engagement Stages", href: "/engagement-decoration-gondia" },
    { name: "Balloon Styling", href: "/balloon-decoration-gondia" },
  ];

  const socials = [
    { name: "Instagram", icon: "ph:instagram-logo-duotone", href: "#" },
    { name: "Pinterest", icon: "ph:pinterest-logo-duotone", href: "#" },
    { name: "YouTube", icon: "ph:youtube-logo-duotone", href: "#" },
    { name: "LinkedIn", icon: "ph:linkedin-logo-duotone", href: "#" },
  ];

  return (
    <footer className="relative bg-[#050210] overflow-hidden z-10">
      {/* ─── Editorial CTA Marquee Strip ─── */}
      <div className="border-y border-white/[0.06] py-6 overflow-hidden bg-[#080415]/80 backdrop-blur-sm cursor-pointer group" onClick={() => setBookingOpen(true)}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
          className="flex whitespace-nowrap w-max"
        >
          {doubled.map((text, idx) => (
            <span key={idx} className="flex items-center gap-6">
              <span className="font-serif text-xl md:text-2xl tracking-widest text-white/90 group-hover:text-white transition-colors">
                {text}
              </span>
              <span className="text-primary text-2xl mx-6">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ─── Main Footer Grid ─── */}
      <div className="container mx-auto px-4 md:px-8 pt-20 pb-8 relative z-10">
        {/* Large ghost brand mark */}
        <div className="select-none pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 font-serif text-[12vw] tracking-[0.4em] uppercase leading-none font-bold text-white opacity-[0.012]">
          ST
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 text-left relative z-10">

          {/* Brand block */}
          <div className="flex flex-col space-y-5 lg:col-span-1">
            <div>
              <span className="font-serif text-2xl tracking-[0.25em] text-white font-bold block">ST EVENTS</span>
              <span className="text-[8px] font-sans tracking-[0.4em] text-primary uppercase mt-1 block">Where Moments Become Memories</span>
            </div>
            <p className="text-xs text-luxury-silver leading-relaxed max-w-xs font-light">
              Crafting immersive, cinematic event experiences — from luxury weddings to sleek corporate galas — across Central India.
            </p>
            {/* Social icons */}
            <div className="flex space-x-3 pt-2">
              {socials.map((platform) => (
                <Magnetic key={platform.name} range={25} strength={0.35}>
                  <Link
                    href={platform.href}
                    className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 hover:border-primary/40 flex items-center justify-center text-luxury-silver hover:text-primary transition-all duration-300 hover:shadow-[0_0_14px_rgba(255,77,141,0.2)]"
                    aria-label={platform.name}
                  >
                    <Icon icon={platform.icon} className="w-4 h-4" />
                  </Link>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Service Links */}
          <div className="flex flex-col space-y-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold">
              Experiences We Craft
            </span>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-xs text-luxury-silver hover:text-white transition-colors duration-300 font-light flex items-center gap-2 group"
                  >
                    <span className="w-3 h-[1px] bg-luxury-silver/30 group-hover:w-5 group-hover:bg-primary transition-all duration-300" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location Block */}
          <div className="flex flex-col space-y-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold">
              Gondia HQ
            </span>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Icon icon="solar:map-point-wave-bold-duotone" className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-xs text-luxury-silver font-light leading-relaxed">
                  Main Road, Civil Lines,<br />
                  Gondia - 441601,<br />
                  Maharashtra, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="solar:letter-bold-duotone" className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-xs text-luxury-silver font-light">info@stevents.in</p>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="solar:phone-bold-duotone" className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-xs text-luxury-silver font-light">+91 98765 43210</p>
              </div>
            </div>
          </div>

          {/* CTA Block */}
          <div className="flex flex-col space-y-5">
            <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold">
              Begin Your Journey
            </span>
            <p className="text-xs text-luxury-silver font-light leading-relaxed">
              Ready to transform your vision into an unforgettable event? Let's build something extraordinary together.
            </p>
            <button
              onClick={() => setBookingOpen(true)}
              className="group relative flex items-center gap-3 w-fit px-6 py-3 rounded-full border border-primary/40 bg-primary/5 hover:bg-primary/15 text-white text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,77,141,0.25)] overflow-hidden"
            >
              <span className="relative z-10">Plan My Event</span>
              <Icon icon="solar:arrow-right-line-duotone" className="w-4 h-4 text-primary relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 to-primary/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </button>

            {/* WhatsApp quick contact */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] font-sans text-luxury-silver hover:text-green-400 transition-colors duration-300 group"
            >
              <Icon icon="ph:whatsapp-logo-duotone" className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
              Quick WhatsApp Inquiry
            </a>
          </div>
        </div>

        {/* Footer Sub-bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/[0.04] text-[10px] tracking-[0.1em] text-luxury-silver/60">
          <p>
            © {currentYear} ST EVENTS. All rights reserved. Crafted in Gondia. Designed & Developed by{" "}
            <span className="font-semibold text-white hover:text-primary transition-colors cursor-default">Lokesh Nagrikar</span>
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0 font-light">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[200px] rounded-full bg-primary/8 filter blur-3xl pointer-events-none" />
    </footer>
  );
}
