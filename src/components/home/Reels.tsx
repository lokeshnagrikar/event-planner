"use client";

import React, { useRef, useState, useEffect } from "react";
import AnimateIn from "@/components/animations/AnimateIn";
import { Icon } from "@iconify/react";
import REELS_DATA from "@/data/reels.json";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Modal";
import { useEventStore } from "@/store/useEventStore";

interface Reel {
  src: string;
  category: string;
  title: string;
}

interface ReelCardProps {
  reel: Reel;
  onSelect: () => void;
}

function ReelCard({ reel, onSelect }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      data-cursor="PLAY"
      className="group relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-white/5 bg-luxury-charcoal/40 cursor-pointer shadow-lg hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 hover:border-primary/20"
    >
      {/* Video Loop Container */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover filter brightness-[65%] transition-transform duration-700 ease-luxury group-hover:scale-105 group-hover:brightness-90"
      >
        <source src={reel.src} type="video/mp4" />
      </video>

      {/* Ambient overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080415] via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80 z-10 pointer-events-none" />

      {/* Floating Play Icon indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-primary backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:border-primary">
        <Icon
          icon={isPlaying ? "lucide:pause" : "lucide:play"}
          className={`w-5 h-5 ${!isPlaying ? "translate-x-[1.5px]" : ""}`}
        />
      </div>

      {/* Details (Absolute Bottom aligned) */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-6 flex flex-col justify-end">
        <span className="text-[8px] font-sans tracking-[0.2em] uppercase text-primary mb-2 font-bold bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full w-max">
          {reel.category}
        </span>
        <h3 className="font-serif text-lg sm:text-xl text-white tracking-wide leading-snug group-hover:text-primary transition-colors">
          {reel.title}
        </h3>

        {/* Subtle helper text */}
        <p className="text-[9px] font-sans tracking-[0.1em] text-luxury-silver mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          Click to Open Reel
        </p>
      </div>

      {/* Top reflection line */}
      <div className="absolute top-0 inset-x-0 h-[0.5px] bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </div>
  );
}

export default function Reels() {
  const { setBookingOpen } = useEventStore();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [likes, setLikes] = useState<Record<number, number>>({});
  const [hasLiked, setHasLiked] = useState<Record<number, boolean>>({});
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Initialize random simulated likes
  useEffect(() => {
    const initialLikes: Record<number, number> = {};
    REELS_DATA.forEach((_, idx) => {
      initialLikes[idx] = Math.floor(Math.random() * 200) + 120;
    });
    setLikes(initialLikes);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx(selectedIdx === 0 ? REELS_DATA.length - 1 : selectedIdx - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx(selectedIdx === REELS_DATA.length - 1 ? 0 : selectedIdx + 1);
  };

  const toggleLike = (idx: number) => {
    const active = hasLiked[idx];
    setHasLiked({ ...hasLiked, [idx]: !active });
    setLikes({ ...likes, [idx]: active ? likes[idx] - 1 : likes[idx] + 1 });
  };

  useEffect(() => {
    if (selectedIdx !== null && modalVideoRef.current) {
      modalVideoRef.current.load();
      modalVideoRef.current.play().catch(() => {});
    }
  }, [selectedIdx]);

  const selectedReel = selectedIdx !== null ? REELS_DATA[selectedIdx] : null;

  return (
    <section id="reels" className="py-24 bg-luxury-obsidian relative border-b border-white/[0.04] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute bottom-12 left-1/4 w-[400px] h-[150px] rounded-full bg-primary/5 filter blur-3xl pointer-events-none" />
      <div className="absolute top-12 right-1/4 w-[400px] h-[150px] rounded-full bg-secondary/5 filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header Block - CELEBRATE */}
        <div className="max-w-xl mb-16">
          <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-primary font-bold mb-4 block">
            04 // CELEBRATE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-wide leading-tight mb-6">
            Feel the <span className="text-gold-gradient italic">Excitement</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-silver font-light leading-relaxed">
            The pounding music, the flashing pyros, the raw energy of high-end celebrations. Watch our immersive spaces come alive in raw motion.
          </p>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {REELS_DATA.map((reel, idx) => (
            <AnimateIn
              key={idx}
              direction="up"
              delay={idx * 0.1}
              duration={1.0}
            >
              <ReelCard
                reel={reel}
                onSelect={() => setSelectedIdx(idx)}
              />
            </AnimateIn>
          ))}
        </div>
      </div>

      {/* Immersive TikTok-style Widescreen Full-Screen Modal */}
      {selectedReel && selectedIdx !== null && (
        <Dialog open={selectedIdx !== null} onOpenChange={() => setSelectedIdx(null)}>
          <DialogContent className="max-w-4xl bg-[#090518]/95 border border-white/10 p-0 overflow-hidden backdrop-blur-2xl rounded-3xl flex flex-col md:flex-row h-[85vh] md:h-[750px] shadow-[0_0_50px_rgba(255,77,141,0.25)]">
            <DialogTitle className="sr-only">{selectedReel.title}</DialogTitle>
            
            {/* Left Column: Simulated Mobile Screen Video Player */}
            <div className="relative flex-grow md:w-3/5 bg-black flex items-center justify-center overflow-hidden h-[60%] md:h-full border-r border-white/5">
              <video
                ref={modalVideoRef}
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={selectedReel.src} type="video/mp4" />
              </video>

              {/* Video overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

              {/* Arrow navigation handles */}
              <button
                onClick={handlePrev}
                className="absolute left-4 w-10 h-10 rounded-full bg-black/55 border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors z-30"
              >
                <Icon icon="solar:alt-arrow-left-line-duotone" className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 w-10 h-10 rounded-full bg-black/55 border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors z-30"
              >
                <Icon icon="solar:alt-arrow-right-line-duotone" className="w-5 h-5" />
              </button>

              {/* Overlay details */}
              <div className="absolute bottom-6 left-6 right-16 text-left z-20 pointer-events-none">
                <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-primary font-bold bg-primary/20 border border-primary/30 px-2.5 py-0.5 rounded-full">
                  {selectedReel.category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white tracking-wide mt-2 font-bold">
                  {selectedReel.title}
                </h3>
              </div>

              {/* Right overlay utility columns (TikTok-style floating actions) */}
              <div className="absolute right-4 bottom-6 flex flex-col items-center space-y-4 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(selectedIdx);
                  }}
                  className="flex flex-col items-center"
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300 ${
                    hasLiked[selectedIdx] 
                      ? "bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/20" 
                      : "bg-black/50 border-white/10 text-white hover:scale-105"
                  }`}>
                    <Icon icon={hasLiked[selectedIdx] ? "solar:heart-bold" : "solar:heart-line-duotone"} className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] text-white/80 font-sans mt-1">{likes[selectedIdx]}</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className="flex flex-col items-center"
                >
                  <div className="w-11 h-11 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:scale-105 transition-transform backdrop-blur-md">
                    <Icon icon={isMuted ? "solar:muted-bold-duotone" : "solar:volume-loud-bold-duotone"} className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] text-white/80 font-sans mt-1">{isMuted ? "Mute" : "Sound"}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Narrative Details & Call to Action */}
            <div className="md:w-2/5 p-8 flex flex-col justify-between bg-[#0e0a24]/90 h-[40%] md:h-full relative overflow-y-auto">
              <div className="space-y-6 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center text-primary font-bold font-serif text-sm">
                    ST
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-white font-bold tracking-wide">ST Events Premium</h4>
                    <p className="text-[10px] text-primary font-sans">@stevents.co</p>
                  </div>
                </div>

                <hr className="border-white/5" />

                <div className="space-y-3">
                  <span className="text-[10px] font-sans tracking-widest text-primary uppercase font-bold">Concept Story</span>
                  <p className="text-xs text-luxury-silver font-light leading-relaxed">
                    Designed and detailed with precision. This setup integrates customized neon lighting setups, premium floral arrays, and bespoke staging structures curated for high-profile Gen-Z celebrations.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <span className="text-[10px] font-sans tracking-widest text-primary uppercase font-bold">Package Highlights</span>
                  <ul className="space-y-1.5">
                    <li className="text-[11px] text-white/80 flex items-center">
                      <Icon icon="solar:check-circle-bold-duotone" className="text-secondary w-4 h-4 mr-2" />
                      Dynamic synchronized pyro triggers
                    </li>
                    <li className="text-[11px] text-white/80 flex items-center">
                      <Icon icon="solar:check-circle-bold-duotone" className="text-secondary w-4 h-4 mr-2" />
                      Aesthetic glass & metal arch layouts
                    </li>
                    <li className="text-[11px] text-white/80 flex items-center">
                      <Icon icon="solar:check-circle-bold-duotone" className="text-secondary w-4 h-4 mr-2" />
                      Celebrity-tier heavy smoke entry staging
                    </li>
                  </ul>
                </div>
              </div>

              {/* Close & Action Buttons */}
              <div className="pt-6 border-t border-white/5 space-y-4">
                <button
                  onClick={() => {
                    setSelectedIdx(null);
                    setBookingOpen(true);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-sans text-xs tracking-wider uppercase font-bold hover:shadow-[0_0_20px_rgba(255,77,141,0.3)] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Icon icon="solar:chat-round-line-bold-duotone" className="w-4 h-4" />
                  <span>Get Quote in 2 Minutes</span>
                </button>
                <button
                  onClick={() => setSelectedIdx(null)}
                  className="w-full py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-luxury-silver hover:text-white font-sans text-[11px] tracking-wider uppercase font-medium transition-colors"
                >
                  Minimize Theatre
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
