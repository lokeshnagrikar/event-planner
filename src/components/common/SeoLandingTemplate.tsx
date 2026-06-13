"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/Button";
import { useEventStore } from "@/store/useEventStore";
import AnimateIn from "@/components/animations/AnimateIn";

interface FaqItem {
  q: string;
  a: string;
}

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

interface SeoLandingTemplateProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  heroImage: string;
  introText: string;
  showcaseImages: string[];
  faqs: FaqItem[];
  testimonials: TestimonialItem[];
}

function FaqAccordion({ q, a }: FaqItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 pb-4.5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left py-4 hover:text-primary transition-colors group"
      >
        <span className="font-serif text-sm sm:text-base text-white group-hover:text-primary transition-colors">
          {q}
        </span>
        <Icon
          icon="solar:alt-arrow-down-line-duotone"
          className={`w-5 h-5 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="pl-2 pr-6 pb-2 text-xs sm:text-sm text-luxury-silver font-light leading-relaxed animate-fade-in">
          {a}
        </div>
      )}
    </div>
  );
}

export default function SeoLandingTemplate({
  title,
  metaTitle,
  metaDescription,
  badge,
  heroImage,
  introText,
  showcaseImages,
  faqs,
  testimonials,
}: SeoLandingTemplateProps) {
  const { setBookingOpen } = useEventStore();

  return (
    <div className="bg-luxury-obsidian min-h-screen text-white pt-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-primary/5 filter blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] rounded-full bg-secondary/5 filter blur-3xl pointer-events-none" />

      {/* SEO metadata tags mock structure or server elements */}
      {/* 1. Hero Block */}
      <section className="relative py-20 border-b border-white/[0.04]">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center relative z-10 space-y-8">
          <span className="text-[10px] sm:text-xs font-sans tracking-[0.45em] uppercase text-primary font-bold bg-primary/10 border border-primary/20 px-3 py-1 rounded-full w-max mx-auto block">
            {badge} // Gondia
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl tracking-tight text-white leading-[1.1] max-w-3xl mx-auto">
            {title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-luxury-silver font-light max-w-2xl mx-auto leading-relaxed">
            {introText}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4.5 pt-4">
            <Button
              variant="primary"
              magnetic={true}
              onClick={() => setBookingOpen(true)}
              icon="solar:chat-round-line-bold-duotone"
            >
              Consult Event Designer
            </Button>
            <Button
              variant="glass"
              magnetic={true}
              onClick={() => {
                const el = document.getElementById("faq");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Read FAQs
            </Button>
          </div>
        </div>

        {/* Hero image preview */}
        <div className="container mx-auto px-4 md:px-8 max-w-4xl mt-16 relative z-10">
          <div className="relative aspect-[16/8] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <Image
              src={heroImage}
              alt={title}
              fill
              className="object-cover filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-obsidian via-transparent to-transparent opacity-80" />
          </div>
        </div>
      </section>

      {/* 2. Visual Showcase Gallery */}
      <section className="py-24 border-b border-white/[0.04]">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="max-w-xl mb-12">
            <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-primary font-bold mb-4 block">
              Portfolio
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white tracking-wide">
              Showcase <span className="text-gold-gradient italic">Gallery</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {showcaseImages.map((src, idx) => (
              <AnimateIn key={idx} direction="up" delay={idx * 0.08} duration={0.8}>
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/5 bg-luxury-charcoal hover:border-primary/20 transition-all duration-300 group cursor-pointer">
                  <Image
                    src={src}
                    alt={`${title} Portfolio`}
                    fill
                    className="object-cover filter brightness-[70%] group-hover:scale-105 group-hover:brightness-90 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                      ST Events Setup
                    </span>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Customer Testimonials */}
      <section className="py-24 border-b border-white/[0.04]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <div className="mb-12">
            <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-primary font-bold mb-4 block">
              Reviews
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white tracking-wide">
              Client <span className="text-gold-gradient italic">Testimonials</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/5 text-left flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-luxury-silver font-light leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
                <div>
                  <h4 className="font-serif text-sm text-white font-bold">{t.author}</h4>
                  <p className="text-[10px] text-primary font-sans mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions (FAQ) Accordion */}
      <section id="faq" className="py-24 border-b border-white/[0.04]">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="text-center mb-16">
            <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-primary font-bold mb-4 block">
              FAQ
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white tracking-wide">
              Got <span className="text-gold-gradient italic">Questions?</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FaqAccordion key={idx} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA banner */}
      <section className="py-20 bg-gradient-to-br from-[#10072d] to-[#070414] relative">
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/30 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center relative z-10 space-y-6">
          <h2 className="font-serif text-2xl sm:text-4xl text-white font-bold">
            Ready to design your cinematic moment?
          </h2>
          <p className="text-xs sm:text-sm text-luxury-silver max-w-xl mx-auto leading-relaxed">
            Get in touch with our design team today. Let's create an unforgettable premium event setup in Gondia.
          </p>
          <div className="pt-4 flex justify-center">
            <a
              href="https://wa.me/919999999999?text=Hi%20ST%20Events!%20I'm%20inquiring%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-8 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-sans text-xs tracking-wider uppercase font-bold hover:shadow-[0_0_20px_rgba(255,77,141,0.3)] transition-all duration-300 flex items-center justify-center space-x-2 w-max"
            >
              <Icon icon="solar:whatsapp-bold" className="w-5 h-5 text-white" />
              <span>Get Quote in 2 Minutes</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
