"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Magnetic from "./Magnetic";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  isOpen?: boolean;
}

export const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-luxury-obsidian/70 backdrop-blur-md",
      className
    )}
    asChild
    {...props}
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    />
  </DialogPrimitive.Overlay>
));
DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, isOpen, ...props }, ref) => {
    return (
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full max-w-xl translate-x-[-50%] translate-y-[-50%] bg-luxury-charcoal border border-white/5 p-8 shadow-2xl focus:outline-none rounded-none outline-none overflow-hidden",
            className
          )}
          asChild
          {...props}
        >
          {/* Framer motion transition container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: "-40%", x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: "-40%", x: "-50%" }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
          >
            {/* Ambient gold glow in top corner of dialog */}
            <div className="absolute -top-20 -left-20 w-[200px] h-[200px] rounded-full ambient-glow-gold opacity-35 pointer-events-none filter blur-xl" />

            <div className="relative z-10 flex flex-col">{children}</div>

            {/* Close Button */}
            <DialogPrimitive.Close className="absolute top-6 right-6 z-20 outline-none rounded-none">
              <Magnetic range={40} strength={0.4}>
                <span className="flex items-center justify-center w-8 h-8 bg-white/5 hover:bg-luxury-brass text-luxury-champagne hover:text-luxury-obsidian transition-colors duration-300">
                  <Icon icon="solar:close-square-line-duotone" className="w-4 h-4" />
                </span>
              </Magnetic>
            </DialogPrimitive.Close>
          </motion.div>
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = "DialogContent";

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-left mb-6", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("font-serif text-xl sm:text-2xl tracking-wide text-white", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-xs text-luxury-silver font-light leading-relaxed", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";
