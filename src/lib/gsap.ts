import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safely register ScrollTrigger for client-side usage in SSR environments
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  
  // Set default GSAP settings for smoother transitions
  gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
  });
}

// Custom luxury cubic-bezier easing tokens matching Tailwind's presets
export const LUXURY_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";       // easeOutExpo (Porsche/Apple feel)
export const LUXURY_EASE_SLOW = "cubic-bezier(0.25, 1, 0.5, 1)";    // easeOutQuad (gentle reveal)
export const LUXURY_EASE_IN_OUT = "cubic-bezier(0.76, 0, 0.24, 1)"; // easeInOutQuart (cinematic dramatic)

export { gsap, ScrollTrigger };
export default gsap;
