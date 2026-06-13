"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Magnetic from "./Magnetic";

interface GalleryItem {
  id: string;
  imageSrc: string;
  title: string;
  category: string;
  description?: string;
}

interface GalleryProps {
  items: GalleryItem[];
  className?: string;
}

/**
 * Premium Luxury Gallery Grid.
 * Displays items in an editorial staggered layout with micro-zoom triggers,
 * and includes a cinematic split-screen widescreen theatre lightbox.
 */
export function Gallery({ items, className = "" }: GalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx(selectedIdx === 0 ? items.length - 1 : selectedIdx - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx(selectedIdx === items.length - 1 ? 0 : selectedIdx + 1);
  };

  const selectedItem = selectedIdx !== null ? items[selectedIdx] : null;

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${className}`}>
        {items.map((item, index) => {
          // Calculate asymmetrical height heights to achieve Awwwards-style editorial spacing
          const heightClasses = [
            "aspect-[3/4]",
            "aspect-square lg:translate-y-8",
            "aspect-[3/4] lg:translate-y-4",
            "aspect-square lg:-translate-y-4",
            "aspect-[3/4]",
            "aspect-square lg:-translate-y-8",
          ];
          const heightClass = heightClasses[index % heightClasses.length];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-luxury-charcoal/50 cursor-pointer shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 hover:-translate-y-1 ${heightClass}`}
              onClick={() => setSelectedIdx(index)}
            >
              {/* Image node */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover scale-[1.02] filter brightness-[75%] transition-transform duration-700 ease-luxury group-hover:scale-105 group-hover:brightness-90"
                />
                {/* Underlay dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080415] via-transparent to-transparent opacity-85" />
              </div>

              {/* Hover Content Frame */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                <span className="text-[8px] sm:text-[9px] font-sans tracking-[0.25em] uppercase font-bold text-primary mb-2 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full w-max">
                  {item.category}
                </span>
                <h4 className="font-serif text-lg sm:text-xl text-white tracking-wide mb-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                
                {/* Slide out explorer link indicator */}
                <div className="flex items-center text-[9px] tracking-[0.2em] uppercase text-white font-semibold mt-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-luxury">
                  Enlarge Concept
                  <Icon icon="solar:arrow-right-line-duotone" className="w-3.5 h-3.5 ml-2 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              {/* Top border shine reflection */}
              <div className="absolute top-0 inset-x-0 h-[0.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.div>
          );
        })}
      </div>

      {/* Cinematic Fullscreen Lightbox Modal (Split Screen Widescreen Layout) */}
      <AnimatePresence>
        {selectedItem && selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#080415]/95 backdrop-blur-xl p-4 md:p-8"
          >
            {/* Ambient glows behind lightbox */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 filter blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 filter blur-3xl pointer-events-none" />

            {/* Click backdrop to exit */}
            <div 
              className="absolute inset-0 z-0 cursor-zoom-out" 
              onClick={() => setSelectedIdx(null)} 
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="relative z-10 w-full max-w-4xl bg-[#090518]/95 border border-white/10 p-0 overflow-hidden backdrop-blur-2xl rounded-3xl flex flex-col md:flex-row h-[80vh] md:h-[650px] shadow-[0_0_50px_rgba(255,77,141,0.25)]"
            >
              {/* Left Column: Media Section */}
              <div className="relative flex-grow md:w-3/5 w-full bg-black flex items-center justify-center overflow-hidden h-[55%] md:h-full border-r border-white/5">
                <Image
                  src={selectedItem.imageSrc}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 pointer-events-none" />

                {/* Arrow navigation handles */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors z-30 shadow-md"
                >
                  <Icon icon="solar:alt-arrow-left-line-duotone" className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors z-30 shadow-md"
                >
                  <Icon icon="solar:alt-arrow-right-line-duotone" className="w-5 h-5" />
                </button>
              </div>

              {/* Right Column: Specs & Description Section */}
              <div className="md:w-2/5 w-full p-8 flex flex-col justify-between bg-[#0e0a24]/90 h-[45%] md:h-full relative overflow-y-auto text-left">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-primary font-bold block bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                      Concept Gallery
                    </span>
                    <span className="text-[10px] text-white/40 font-sans">#{selectedItem.category}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-wide leading-tight font-bold">
                    {selectedItem.title}
                  </h3>

                  <hr className="border-white/5" />

                  <p className="text-xs text-luxury-silver font-light leading-relaxed">
                    {selectedItem.description || 
                      "An immersive review of our event space design layout. Standard setup coordinates fresh premium florals, warm candelabra assemblies, and bespoke structural styling."}
                  </p>

                  <div className="space-y-2.5">
                    <span className="text-[10px] font-sans tracking-widest text-primary uppercase font-bold">Production Assets</span>
                    <ul className="grid grid-cols-2 gap-2">
                      <li className="text-[10px] text-white/70 flex items-center">
                        <Icon icon="solar:check-circle-bold-duotone" className="text-secondary w-3.5 h-3.5 mr-2" />
                        Premium Florals
                      </li>
                      <li className="text-[10px] text-white/70 flex items-center">
                        <Icon icon="solar:check-circle-bold-duotone" className="text-secondary w-3.5 h-3.5 mr-2" />
                        Neon Accent Glows
                      </li>
                      <li className="text-[10px] text-white/70 flex items-center">
                        <Icon icon="solar:check-circle-bold-duotone" className="text-secondary w-3.5 h-3.5 mr-2" />
                        Custom Drapings
                      </li>
                      <li className="text-[10px] text-white/70 flex items-center">
                        <Icon icon="solar:check-circle-bold-duotone" className="text-secondary w-3.5 h-3.5 mr-2" />
                        LED Matrix Backing
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Close & Action Buttons */}
                <div className="pt-6 border-t border-white/5 space-y-3 mt-6">
                  <a
                    href={`https://wa.me/919999999999?text=Hi%20ST%20Events!%20I'm%20inquiring%20about%20your%20setup%20concept:%20${encodeURIComponent(selectedItem.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-sans text-xs tracking-wider uppercase font-bold hover:shadow-[0_0_20px_rgba(255,77,141,0.3)] transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Icon icon="solar:chat-round-line-bold-duotone" className="w-4 h-4" />
                    <span>Inquire this Setup</span>
                  </a>
                  <button 
                    onClick={() => setSelectedIdx(null)}
                    className="w-full py-2 rounded-xl border border-white/10 hover:border-white/20 text-luxury-silver hover:text-white font-sans text-[11px] tracking-wider uppercase transition-colors"
                  >
                    Minimize Theatre
                  </button>
                </div>
              </div>

              {/* Close Icon (Magnetic) */}
              <div className="absolute top-4 right-4 z-20">
                <Magnetic range={40} strength={0.4}>
                  <button
                    onClick={() => setSelectedIdx(null)}
                    className="flex items-center justify-center w-9 h-9 bg-black/60 border border-white/10 hover:border-primary text-white hover:text-primary transition-all duration-300 rounded-full"
                    aria-label="Close lightbox"
                  >
                    <Icon icon="solar:close-square-line-duotone" className="w-4 h-4" />
                  </button>
                </Magnetic>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default Gallery;
