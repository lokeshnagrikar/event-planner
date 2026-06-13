"use client";

import React, { useState } from "react";
import { useEventStore } from "@/store/useEventStore";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";

const EVENT_TYPES = [
  { id: "wedding", label: "Luxury Wedding Planning", icon: "solar:heart-line-duotone", desc: "Cinematic, full-scale design & staging" },
  { id: "corporate", label: "Corporate Gala Staging", icon: "solar:case-minimalistic-line-duotone", desc: "Awwwards-quality brand environments" },
  { id: "milestone", label: "Private Milestone Celebration", icon: "solar:cup-first-line-duotone", desc: "Birthdays, anniversaries & vip dinners" },
  { id: "backdrop", label: "Bespoke Backdrop Decoration", icon: "solar:gallery-wide-line-duotone", desc: "Floral, balloon, and pyro installations" },
];

const GUEST_COUNTS = [
  { value: "Under 100", label: "Intimate Group", desc: "Under 100 guests" },
  { value: "100-300", label: "Premium Gala", desc: "100 to 300 guests" },
  { value: "300-500", label: "Grand Celebration", desc: "300 to 500 guests" },
  { value: "500+", label: "Massive Spectacle", desc: "More than 500 guests" },
];

export default function BookingModal() {
  const { isBookingOpen, setBookingOpen } = useEventStore();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  // Form Fields
  const [eventType, setEventType] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [conceptDetails, setConceptDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (step < 4) {
      setDirection(1);
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  const handleClose = () => {
    setBookingOpen(false);
    // Reset form states after closing animation completes
    setTimeout(() => {
      setStep(1);
      setDirection(1);
      setEventType("");
      setGuestCount("");
      setPreferredDate("");
      setClientName("");
      setClientEmail("");
      setClientPhone("");
      setConceptDetails("");
      setSubmitted(false);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setStep(5);
    }, 1500);
  };

  // Generate WhatsApp Message Link
  const getWhatsAppLink = () => {
    const phone = "919876543210"; // Replace with company phone number
    const selectedEventLabel = EVENT_TYPES.find((e) => e.id === eventType)?.label || eventType;
    const text = `Hi ST Events! I'd love to start planning my celebration. Here are my concept details:\n\n` +
      `🌸 Event Type: ${selectedEventLabel}\n` +
      `👥 Guest Count: ${guestCount}\n` +
      `📅 Preferred Date: ${preferredDate}\n` +
      `👤 Name: ${clientName}\n` +
      `📞 Phone: ${clientPhone}\n` +
      (clientEmail ? `📧 Email: ${clientEmail}\n` : "") +
      (conceptDetails ? `📝 Concept Details: ${conceptDetails}\n` : "") +
      `\nLooking forward to creating something extraordinary together!`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  // Sliding slide animation config
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  // Step validation check
  const isStepValid = () => {
    if (step === 1) return !!eventType;
    if (step === 2) return !!guestCount;
    if (step === 3) return !!preferredDate;
    if (step === 4) return !!clientName && !!clientPhone;
    return true;
  };

  return (
    <Dialog open={isBookingOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="max-w-xl md:p-10 border border-white/10 bg-[#080415]/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(255,77,141,0.15)] overflow-hidden">
        
        {/* Ambient pink/blue glows in corners */}
        <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full ambient-glow-pink opacity-20 pointer-events-none filter blur-2xl" />
        <div className="absolute bottom-0 left-0 w-[150px] h-[150px] rounded-full ambient-glow-blue opacity-25 pointer-events-none filter blur-2xl" />

        <DialogHeader className="relative z-10 select-none">
          <div className="flex items-center space-x-2 text-[9px] font-sans tracking-[0.3em] uppercase text-primary font-bold mb-1">
            <span>Inquiry Portal</span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span>Step {Math.min(step, 4)} of 4</span>
          </div>
          <DialogTitle className="font-serif text-2xl md:text-3xl text-white">
            {step < 5 ? (
              <>
                Let's Create <span className="text-gold-gradient italic">Extraordinary</span>
              </>
            ) : (
              <>
                Journey <span className="text-gold-gradient italic">Initialized</span>
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-xs text-luxury-silver font-light mt-1">
            {step < 5 
              ? "Tell us about your dream vision, and we'll craft the architecture of your memory."
              : "Your concept blueprint has been prepared. Finalize by connecting with our lead architect."}
          </DialogDescription>
        </DialogHeader>

        {/* Step Progress Line */}
        {step <= 4 && (
          <div className="w-full h-[3px] bg-white/5 rounded-full mt-2 mb-8 overflow-hidden relative z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: "25%" }}
              animate={{ width: `${step * 25}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        <div className="relative z-10 min-h-[260px] flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-4 w-full"
                >
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-luxury-brass mb-3">
                    Step 1 // Choose Event Category
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {EVENT_TYPES.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setEventType(type.id)}
                        className={`flex items-start text-left p-4 border rounded-xl transition-all duration-300 ${
                          eventType === type.id
                            ? "bg-primary/5 border-primary shadow-[0_0_15px_rgba(255,77,141,0.15)]"
                            : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className={`p-2 rounded-lg mr-3.5 transition-colors ${
                          eventType === type.id ? "bg-primary text-white" : "bg-white/5 text-luxury-brass"
                        }`}>
                          <Icon icon={type.icon} className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="block font-serif text-sm text-white font-semibold leading-tight mb-1">
                            {type.label}
                          </span>
                          <span className="block text-[10px] text-luxury-silver font-light leading-snug">
                            {type.desc}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-4 w-full"
                >
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-luxury-brass mb-3">
                    Step 2 // Scale of Celebration
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {GUEST_COUNTS.map((gc) => (
                      <button
                        key={gc.value}
                        type="button"
                        onClick={() => setGuestCount(gc.value)}
                        className={`flex flex-col justify-between text-left p-5 border rounded-xl transition-all duration-300 ${
                          guestCount === gc.value
                            ? "bg-secondary/5 border-secondary shadow-[0_0_15px_rgba(76,125,255,0.15)]"
                            : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className={`text-[10px] font-sans font-semibold tracking-widest uppercase mb-1 transition-colors ${
                          guestCount === gc.value ? "text-secondary" : "text-luxury-brass"
                        }`}>
                          {gc.label}
                        </span>
                        <span className="font-serif text-base text-white font-bold">
                          {gc.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-4 w-full"
                >
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-luxury-brass mb-3">
                    Step 3 // Date of Event
                  </label>
                  <div className="bg-white/[0.01] border border-white/5 p-6 rounded-xl relative overflow-hidden">
                    <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-primary/10 rounded-full filter blur-xl pointer-events-none" />
                    
                    <p className="text-[11px] text-luxury-silver font-light leading-relaxed mb-6">
                      Events require structural timelines, floral coordination, and setup windows. Please select your target date to check availability.
                    </p>

                    <div className="relative group">
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full bg-white/[0.02] text-white font-sans text-xs py-4 px-5 border border-white/10 rounded-xl outline-none transition-all duration-300 focus:border-primary focus:bg-white/[0.05] cursor-pointer"
                        style={{ colorScheme: "dark" }}
                      />
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full" />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-4 w-full"
                >
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-luxury-brass mb-2">
                    Step 4 // Contact Information
                  </label>
                  <div className="space-y-3">
                    <Input
                      label="Your Name"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Email Address"
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                      />
                      <Input
                        label="Phone Number"
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                      />
                    </div>
                    <Textarea
                      label="Visual styling notes or themes (optional)"
                      value={conceptDetails}
                      onChange={(e) => setConceptDetails(e.target.value)}
                      className="min-h-[70px]"
                    />
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-center py-6 flex flex-col items-center space-y-5 w-full"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,77,141,0.3)] mb-2 animate-pulse">
                    <Icon icon="solar:check-square-bold-duotone" className="w-7 h-7" />
                  </div>
                  
                  <div>
                    <span className="text-[10px] font-sans tracking-[0.3em] text-primary uppercase font-bold block mb-1">
                      Blueprint Assembled
                    </span>
                    <h4 className="font-serif text-xl md:text-2xl text-white font-bold">
                      Your Celebration is Synced!
                    </h4>
                  </div>
                  
                  <p className="text-xs text-luxury-silver font-light max-w-sm leading-relaxed">
                    Thank you, {clientName}. We have prepared your event layout requirements. Tap the button below to establish a direct connection with ST Events on WhatsApp.
                  </p>

                  <div className="w-full pt-4">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#25d366] to-[#128c7e] hover:shadow-[0_0_25px_rgba(37,211,102,0.3)] text-white text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 cursor-pointer"
                    >
                      <Icon icon="logos:whatsapp-icon" className="w-4 h-4 mr-2" />
                      Start Your Event Journey
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Modal Actions */}
            {step <= 4 && (
              <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-6">
                <div>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-luxury-silver hover:text-white transition-colors py-2"
                    >
                      <Icon icon="solar:arrow-left-line-duotone" className="w-3.5 h-3.5 mr-1.5" />
                      Back
                    </button>
                  )}
                </div>

                <div>
                  {step < 4 ? (
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handleNext}
                      disabled={!isStepValid()}
                      className="px-6 py-2.5 rounded-full"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={!isStepValid() || isSubmitting}
                      loading={isSubmitting}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary border-none"
                    >
                      Assemble Brief
                    </Button>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
