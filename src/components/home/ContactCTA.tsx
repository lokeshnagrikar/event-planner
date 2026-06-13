"use client";

import React, { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import AnimateIn from "@/components/animations/AnimateIn";
import { useEventStore } from "@/store/useEventStore";

/**
 * ContactCTA Component.
 * Implements a split inquiry section for clients to book weddings, corporate galas, or birthdays.
 */
export default function ContactCTA() {
  const { isBookingOpen } = useEventStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [event, setEvent] = useState("wedding");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      // Reset after success
      setName("");
      setEmail("");
      setNotes("");
      setTimeout(() => setSuccess(false), 5000);
    }, 1800);
  };

  return (
    <section id="contact" className="py-24 bg-luxury-obsidian relative border-b border-white/[0.04] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-[-10%] w-[40%] h-[300px] rounded-full ambient-glow-gold opacity-10 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[300px] rounded-full ambient-glow-emerald opacity-10 filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Block (Location Coordinates & Brand copy) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-luxury-brass font-bold mb-4 block">
              Begin Orchestration
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-wide leading-tight mb-8">
              Start Your <br />
              <span className="text-gold-gradient italic">Narrative</span>
            </h2>
            <p className="text-xs sm:text-sm text-luxury-silver font-light leading-relaxed mb-10 max-w-sm">
              We coordinate events across Nagpur, Gondia, Raipur, and surrounding regions. Connect with our design specialists today to draft your custom blueprint.
            </p>

            {/* Address cards */}
            <div className="space-y-6 pt-6 border-t border-white/[0.05]">
              <div>
                <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-luxury-brass font-semibold block mb-1">
                  Corporate HQ
                </span>
                <p className="text-xs text-luxury-silver font-light leading-relaxed">
                  Civil Lines, Main Road, Gondia - 441601,<br />
                  Maharashtra, India
                </p>
              </div>
              <div>
                <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-luxury-brass font-semibold block mb-1">
                  Immediate Booking
                </span>
                <p className="text-xs text-luxury-silver font-light leading-relaxed">
                  info@stevents.in // +91 98765 43210
                </p>
              </div>
            </div>
          </div>

          {/* Right Block (Interactive Form Card) */}
          <div className="lg:col-span-7">
            <AnimateIn direction="up" delay={0.1} duration={1.0}>
              <form 
                onSubmit={handleSubmit}
                className="bg-luxury-charcoal/20 border border-white/5 p-8 backdrop-blur-md relative overflow-hidden"
              >
                {/* Visual glow element inside card */}
                <div className="absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full ambient-glow-gold opacity-15 pointer-events-none filter blur-xl" />

                <h3 className="font-serif text-xl sm:text-2xl text-white mb-6">
                  Design Consultation Brief
                </h3>

                {success ? (
                  <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 rounded-none bg-luxury-brass/15 border border-luxury-brass flex items-center justify-center text-luxury-brass mb-2">
                      <span className="text-xl">&radic;</span>
                    </div>
                    <span className="font-serif text-lg text-luxury-champagne">Brief Submitted</span>
                    <p className="text-xs text-luxury-silver max-w-xs leading-relaxed">
                      Thank you. We have logged your request. Our chief event architect will contact you within 24 hours to schedule a 3D planning consultation.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <Input 
                      label="Your Name" 
                      required 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                    />
                    <Input 
                      label="Email Address" 
                      type="email" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                    
                    <Select 
                      label="Event Category" 
                      value={event} 
                      onChange={(e) => setEvent(e.target.value)}
                      options={[
                        { label: "Luxury Wedding Planning", value: "wedding" },
                        { label: "Corporate Gala Staging", value: "corporate" },
                        { label: "Private Milestone Celebration", value: "private" },
                        { label: "Bespoke Backdrop Decoration", value: "decor" },
                      ]} 
                    />
                    
                    <Textarea 
                      label="Provide concept details (optional)" 
                      value={notes} 
                      onChange={(e) => setNotes(e.target.value)} 
                    />

                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="mt-4 w-full"
                      loading={isSubmitting}
                      magnetic={true}
                    >
                      Orchestrate Now
                    </Button>
                  </div>
                )}
              </form>
            </AnimateIn>
          </div>

        </div>
      </div>
    </section>
  );
}
