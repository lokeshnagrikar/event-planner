import { create } from "zustand";

// Defines different luxury event categories offered by ST Events
export type EventCategory = "all" | "wedding" | "engagement" | "birthday" | "corporate" | "decoration";

interface EventState {
  // Navigation State
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;

  // Cinematic Intro Animation State (Awwwards-style preloader)
  isIntroCompleted: boolean;
  setIntroCompleted: (completed: boolean) => void;

  // Active page section tracking for custom navigation highlights
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Event category filtering state for portfolio/services
  selectedCategory: EventCategory;
  setSelectedCategory: (category: EventCategory) => void;

  // Booking / Inquiry Overlay Modal state
  isBookingOpen: boolean;
  setBookingOpen: (open: boolean) => void;
}

export const useEventStore = create<EventState>((set) => ({
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

  isIntroCompleted: false,
  setIntroCompleted: (completed) => set({ isIntroCompleted: completed }),

  activeSection: "hero",
  setActiveSection: (section) => set({ activeSection: section }),

  selectedCategory: "all",
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  isBookingOpen: false,
  setBookingOpen: (open) => set({ isBookingOpen: open }),
}));
