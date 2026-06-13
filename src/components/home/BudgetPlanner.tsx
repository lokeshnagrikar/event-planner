"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

interface SelectionState {
  eventType: string;
  guestCount: string;
  venueType: string;
  decorStyle: string;
  effects: string[];
}

const EVENT_TYPES = [
  { id: "wedding", name: "Luxury Wedding", icon: "solar:heart-bold-duotone", base: 250000 },
  { id: "engagement", name: "Engagement Stage", icon: "solar:diamond-bold-duotone", base: 120000 },
  { id: "birthday", name: "Premium Birthday", icon: "solar:gift-bold-duotone", base: 60000 },
  { id: "corporate", name: "Corporate Gala", icon: "solar:case-minimalistic-bold-duotone", base: 350000 },
];

const GUEST_COUNTS = [
  { id: "small", name: "50 - 150 guests", multiplier: 1.0 },
  { id: "medium", name: "150 - 350 guests", multiplier: 1.25 },
  { id: "large", name: "350 - 600 guests", multiplier: 1.5 },
  { id: "grand", name: "600+ guests", multiplier: 2.0 },
];

const VENUE_TYPES = [
  { id: "glasshouse", name: "Intimate Glasshouse", cost: 90000, icon: "solar:home-bold-duotone" },
  { id: "hotel", name: "Five-Star Ballroom", cost: 180000, icon: "solar:buildings-bold-duotone" },
  { id: "lawn", name: "Premium Scenic Lawn", cost: 70000, icon: "solar:plain-bold-duotone" },
  { id: "banquet", name: "Luxury Banquet Hall", cost: 40000, icon: "solar:gallery-bold-duotone" },
];

const DECOR_STYLES = [
  { id: "royal", name: "Royal Palace Style", cost: 150000, desc: "Traditional gold, fresh red roses, and massive stage pillars." },
  { id: "neon", name: "Neon Glam & Glow", cost: 80000, desc: "Electric neon tubes, geometric glass, and deep purple styling." },
  { id: "botanical", name: "Classical Botanical", cost: 120000, desc: "Cascading greenery, crystal chandeliers, and ambient warm lights." },
  { id: "cyber", name: "Futuristic Cyber Luxury", cost: 140000, desc: "Asymmetrical panels, LED matrices, and obsidian props." },
];

const SPECIAL_EFFECTS = [
  { id: "pyro", name: "Grand Pyro Sparklers", cost: 35000, icon: "solar:fire-bold-duotone" },
  { id: "fog", name: "Heavy Cloud Smoke", cost: 25000, icon: "solar:magic-stick-bold-duotone" },
  { id: "blast", name: "Slow-Mo Confetti Blast", cost: 15000, icon: "solar:stars-bold-duotone" },
];

export default function BudgetPlanner() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<SelectionState>({
    eventType: "wedding",
    guestCount: "medium",
    venueType: "lawn",
    decorStyle: "botanical",
    effects: ["pyro"],
  });

  const handleSelect = (key: keyof SelectionState, value: any) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
  };

  const toggleEffect = (effectId: string) => {
    const active = selections.effects.includes(effectId);
    const updated = active
      ? selections.effects.filter((e) => e !== effectId)
      : [...selections.effects, effectId];
    handleSelect("effects", updated);
  };

  // Compute estimate budget
  const calculateBudget = () => {
    const baseEvent = EVENT_TYPES.find((e) => e.id === selections.eventType)?.base || 0;
    const guestMult = GUEST_COUNTS.find((g) => g.id === selections.guestCount)?.multiplier || 1.0;
    const venueCost = VENUE_TYPES.find((v) => v.id === selections.venueType)?.cost || 0;
    const decorCost = DECOR_STYLES.find((d) => d.id === selections.decorStyle)?.cost || 0;
    const effectsCost = selections.effects.reduce((sum, current) => {
      const cost = SPECIAL_EFFECTS.find((e) => e.id === current)?.cost || 0;
      return sum + cost;
    }, 0);

    const total = Math.round((baseEvent + venueCost + decorCost + effectsCost) * guestMult);
    return total;
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 5));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  const resetPlanner = () => {
    setSelections({
      eventType: "wedding",
      guestCount: "medium",
      venueType: "lawn",
      decorStyle: "botanical",
      effects: ["pyro"],
    });
    setStep(1);
  };

  const currentEventName = EVENT_TYPES.find((e) => e.id === selections.eventType)?.name;
  const currentDecorName = DECOR_STYLES.find((d) => d.id === selections.decorStyle)?.name;
  const estimatedBudget = calculateBudget();

  return (
    <section id="planner" className="py-24 bg-luxury-obsidian relative border-b border-white/[0.04] overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 right-1/10 w-[500px] h-[200px] rounded-full bg-secondary/5 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/10 w-[500px] h-[200px] rounded-full bg-primary/5 filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
        
        {/* Header Block - CREATE */}
        <div className="text-center mb-16 max-w-xl mx-auto">
          <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-primary font-bold mb-4 block">
            03 // CREATE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-wide leading-tight">
            Design Your <span className="text-gold-gradient italic">Inspiration</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-silver font-light leading-relaxed mt-4">
            Select your event style, guest capacity, and special effects to preview a custom styling plan and instant budget projection.
          </p>
        </div>

        {/* Stepper Card */}
        <div className="glass-panel rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative">
          
          {/* Progress Header */}
          <div className="px-8 py-5 bg-[#171138]/40 border-b border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-sans tracking-widest text-primary uppercase font-bold">
              Step {step} of 5
            </span>
            {/* Step bars */}
            <div className="flex space-x-1.5 w-32 sm:w-48">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-grow rounded-full transition-all duration-300 ${
                    i <= step ? "bg-gradient-to-r from-primary to-secondary" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-8 min-h-[360px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="space-y-6"
              >
                {/* STEP 1: EVENT TYPE */}
                {step === 1 && (
                  <div className="space-y-4 text-left">
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                      Select your event archetype:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {EVENT_TYPES.map((e) => (
                        <button
                          key={e.id}
                          onClick={() => handleSelect("eventType", e.id)}
                          className={`flex items-center space-x-4 p-5 rounded-2xl border text-left transition-all ${
                            selections.eventType === e.id
                              ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(255,77,141,0.15)] text-white"
                              : "bg-white/5 border-white/5 text-luxury-silver hover:bg-white/10 hover:border-white/10"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                            selections.eventType === e.id ? "bg-primary/20 border-primary text-primary" : "bg-white/5 border-white/15 text-white/70"
                          }`}>
                            <Icon icon={e.icon} className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-sans font-bold text-sm text-white">{e.name}</p>
                            <p className="text-[10px] text-luxury-silver">Bespoke layouts</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: GUEST CAPACITY */}
                {step === 2 && (
                  <div className="space-y-4 text-left">
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                      Estimate your guest scale:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {GUEST_COUNTS.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => handleSelect("guestCount", g.id)}
                          className={`flex items-center justify-between p-5 rounded-2xl border text-left transition-all ${
                            selections.guestCount === g.id
                              ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(255,77,141,0.15)] text-white"
                              : "bg-white/5 border-white/5 text-luxury-silver hover:bg-white/10 hover:border-white/10"
                          }`}
                        >
                          <span className="font-sans font-medium text-sm text-white">{g.name}</span>
                          {selections.guestCount === g.id && (
                            <Icon icon="solar:check-circle-bold" className="text-primary w-5 h-5" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: VENUE TYPE */}
                {step === 3 && (
                  <div className="space-y-4 text-left">
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                      Choose your venue setting:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {VENUE_TYPES.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => handleSelect("venueType", v.id)}
                          className={`flex items-center space-x-4 p-5 rounded-2xl border text-left transition-all ${
                            selections.venueType === v.id
                              ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(255,77,141,0.15)] text-white"
                              : "bg-white/5 border-white/5 text-luxury-silver hover:bg-white/10 hover:border-white/10"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                            selections.venueType === v.id ? "bg-primary/20 border-primary text-primary" : "bg-white/5 border-white/15 text-white/70"
                          }`}>
                            <Icon icon={v.icon} className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-sans font-bold text-sm text-white">{v.name}</p>
                            <p className="text-[10px] text-luxury-silver">Premium locations</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4: DECORATION STYLE & PACKAGES */}
                {step === 4 && (
                  <div className="space-y-4 text-left">
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                      Select your decoration style theme:
                    </h3>
                    <div className="grid grid-cols-1 gap-3.5">
                      {DECOR_STYLES.map((d) => (
                        <button
                          key={d.id}
                          onClick={() => handleSelect("decorStyle", d.id)}
                          className={`flex items-start justify-between p-4.5 rounded-2xl border text-left transition-all ${
                            selections.decorStyle === d.id
                              ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(255,77,141,0.15)] text-white"
                              : "bg-white/5 border-white/5 text-luxury-silver hover:bg-white/10 hover:border-white/10"
                          }`}
                        >
                          <div className="space-y-1 pr-6">
                            <p className="font-sans font-bold text-sm text-white">{d.name}</p>
                            <p className="text-[10px] text-luxury-silver leading-relaxed">{d.desc}</p>
                          </div>
                          {selections.decorStyle === d.id && (
                            <Icon icon="solar:check-circle-bold" className="text-primary w-5 h-5 flex-shrink-0 mt-0.5" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 5: SPECIAL FX & GENERATED ESTIMATE CARD */}
                {step === 5 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {/* Effects selections */}
                    <div className="space-y-4">
                      <h4 className="font-serif text-lg text-white font-bold tracking-wide">
                        Special FX Upgrades:
                      </h4>
                      <div className="space-y-2.5">
                        {SPECIAL_EFFECTS.map((e) => {
                          const active = selections.effects.includes(e.id);
                          return (
                            <button
                              key={e.id}
                              onClick={() => toggleEffect(e.id)}
                              className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                                active
                                  ? "bg-secondary/15 border-secondary text-white shadow-[0_0_15px_rgba(76,125,255,0.15)]"
                                  : "bg-white/5 border-white/5 text-luxury-silver hover:bg-white/10"
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <Icon icon={e.icon} className={`w-5 h-5 ${active ? "text-secondary" : "text-white/50"}`} />
                                <span className="font-sans text-xs font-semibold">{e.name}</span>
                              </div>
                              <Icon
                                icon={active ? "solar:check-circle-bold" : "solar:add-circle-line-duotone"}
                                className={`w-5 h-5 ${active ? "text-secondary" : "text-white/30"}`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Result Estimate Card */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1b123d] to-[#0c071f] border border-white/10 shadow-2xl relative flex flex-col justify-between overflow-hidden">
                      <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-primary/10 filter blur-2xl pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full bg-secondary/10 filter blur-2xl pointer-events-none" />

                      <div className="space-y-4 relative z-10">
                        <div className="flex justify-between items-center">
                          <span className="text-[8px] font-sans tracking-[0.2em] uppercase font-bold text-secondary bg-secondary/15 border border-secondary/20 px-2.5 py-0.5 rounded-full">
                            Curated Quote
                          </span>
                          <span className="text-[10px] text-white/50 font-sans">Gondia & Nagpur</span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-serif text-lg text-white font-bold">{currentEventName}</h4>
                          <p className="text-[10px] text-luxury-silver font-light leading-relaxed">
                            Styled in <strong className="text-primary">{currentDecorName}</strong> theme with custom special effects modules.
                          </p>
                        </div>

                        <hr className="border-white/5" />

                        {/* Estimated Budget */}
                        <div className="space-y-1">
                          <span className="text-[8px] font-sans tracking-[0.2em] uppercase text-luxury-silver">Estimated Project Budget</span>
                          <div className="flex items-baseline space-x-1">
                            <span className="text-3xl sm:text-4xl font-serif text-white tracking-tight font-bold">
                              ₹{estimatedBudget.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[10px] text-luxury-silver font-light font-sans">*approx cost</span>
                          </div>
                        </div>

                        {/* Action details */}
                        <p className="text-[9px] text-luxury-silver leading-relaxed font-light">
                          Calculated based on standard setups, rentals, crew coordination, and production materials. Subject to change on personalization.
                        </p>
                      </div>

                      <div className="mt-6 space-y-2 relative z-10">
                        <a
                          href={`https://wa.me/919876543210?text=${encodeURIComponent(
                            `Hi ST Events! I used your budget estimator and configured a concept for a ${currentEventName} with ${currentDecorName} theme. Estimated budget: ₹${estimatedBudget.toLocaleString("en-IN")}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-sans text-xs tracking-wider uppercase font-bold hover:shadow-[0_0_20px_rgba(255,77,141,0.25)] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <Icon icon="solar:chat-round-line-bold-duotone" className="w-4 h-4" />
                          <span>Get Quote in 2 Minutes</span>
                        </a>
                        <button
                          onClick={resetPlanner}
                          className="w-full py-1.5 rounded-xl border border-white/5 hover:border-white/10 text-luxury-silver hover:text-white font-sans text-[10px] tracking-wider uppercase transition-colors"
                        >
                          Reset Estimate
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons Footer */}
            <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-8">
              <button
                onClick={handlePrev}
                disabled={step === 1}
                className={`flex items-center space-x-2 py-2 px-5 rounded-xl border text-xs font-sans uppercase font-bold transition-all ${
                  step === 1
                    ? "opacity-30 border-white/5 text-white/20 cursor-not-allowed"
                    : "border-white/10 text-white hover:bg-white/5"
                }`}
              >
                <Icon icon="solar:alt-arrow-left-line-duotone" className="w-4.5 h-4.5" />
                <span>Back</span>
              </button>

              {step < 5 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 py-2 px-6 rounded-xl bg-primary text-white text-xs font-sans uppercase font-bold hover:bg-primary/95 transition-all shadow-[0_0_15px_rgba(255,77,141,0.15)]"
                >
                  <span>Next</span>
                  <Icon icon="solar:alt-arrow-right-line-duotone" className="w-4.5 h-4.5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    const el = document.getElementById("services");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center space-x-2 py-2 px-6 rounded-xl bg-gradient-to-r from-secondary to-primary text-white text-xs font-sans uppercase font-bold hover:shadow-[0_0_15px_rgba(76,125,255,0.15)] transition-all"
                >
                  <span>Explore Concepts</span>
                  <Icon icon="solar:gallery-line-duotone" className="w-4.5 h-4.5" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
