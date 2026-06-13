import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1920px",
      },
    },
    extend: {
      colors: {
        // Shadcn UI tokens (mapped to CSS variables in globals.css)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // Re-mapped to Gen-Z Cinematic Theme (Deep Purple, Neon Pink, Electric Blue)
        luxury: {
          obsidian: "#080415",    // Mapped to Deep Gen-Z Purple background
          charcoal: "#0d091e",    // Mapped to Gen-Z Card Purple
          onyx: "#18113c",        // Mapped to Gen-Z border purple
          gold: "#FF4D8D",        // Mapped to Neon Pink
          brass: "#FF4D8D",       // Mapped to Neon Pink (primary accent)
          champagne: "#ffffff",   // Mapped to Pure White (text)
          silver: "#b3adc8",      // Mapped to Soft Lavender Silver
          emerald: "#4C7DFF",     // Mapped to Electric Blue (secondary accent)
          burgundy: "#FF4D8D",
        },
        genz: {
          purple: "#120B2D",
          pink: "#FF4D8D",
          blue: "#4C7DFF",
          darkpurple: "#080415",
          cardpurple: "#0d091e",
          silver: "#b3adc8",
        },
      },
      fontFamily: {
        // Typography System: Outfit (Geometric modern sans) + Playfair Display (Luxury editorial serif)
        sans: ["var(--font-outfit)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
        display: ["var(--font-syne)", "sans-serif"], // High-end display font for bold cinematic headings
      },
      animation: {
        "fade-in": "fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up": "fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-down": "fadeInDown 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-up": "scaleUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleUp: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.2", filter: "blur(40px)" },
          "50%": { opacity: "0.4", filter: "blur(60px)" },
        },
      },
      transitionTimingFunction: {
        // Premium brand transition curves (e.g. Apple / Porsche ease-out-expo)
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      borderWidth: {
        "0.5": "0.5px",
      },
    },
  },
  plugins: [],
};

export default config;
