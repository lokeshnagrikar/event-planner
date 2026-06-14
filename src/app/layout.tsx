import type { Metadata } from "next";
import { Outfit, Playfair_Display, Syne } from "next/font/google";
import "./globals.css";
import Providers from "@/components/common/Providers";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import FloatingDock from "@/components/ui/FloatingDock";
import DevBadge from "@/components/ui/DevBadge";
import ClickParticles from "@/components/animations/ClickParticles";
import BookingModal from "@/components/common/BookingModal";
import FloatingParticles from "@/components/animations/FloatingParticles";

// Configure Outfit as the primary sans-serif body font
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Configure Playfair Display as the elegant luxury editorial serif
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Configure Syne for bold, avant-garde display headings (Awwwards-style)
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ST Events | Luxury Event Management & Decoration Gondia",
  description:
    "ST Events orchestrates high-end cinematic weddings, engagements, corporate events, and bespoke birthday decorations in Gondia, Maharashtra. Immersive designs tailored for the modern Gen-Z & luxury clients.",
  keywords: [
    "Luxury Event Management",
    "Gondia Events",
    "Wedding Decoration Maharashtra",
    "Luxury Weddings Gondia",
    "Gen-Z Birthdays",
    "Corporate Events Gondia",
    "Cinematic Wedding Decorators",
  ],
  authors: [{ name: "ST Events Team" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "ST Events | Luxury Event Management & Decoration Gondia",
    description:
      "ST Events orchestrates high-end cinematic weddings, engagements, corporate events, and bespoke birthday decorations in Gondia, Maharashtra.",
    type: "website",
    locale: "en_IN",
    siteName: "ST Events",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} ${syne.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="bg-luxury-obsidian font-sans antialiased text-foreground min-h-screen flex flex-col selection:bg-luxury-brass/30">
        <Providers>
          {/* Click-burst Particle Effect */}
          <ClickParticles />

          {/* Global Multi-Step Booking Modal */}
          <BookingModal />

          {/* Global Floating Sparks */}
          <FloatingParticles particleColor="255, 77, 141" maxParticles={40} />

          {/* Ambient cinematic glow layers for premium Gen-Z dark aesthetic */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full ambient-glow-pink opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full ambient-glow-blue opacity-40" />
            <div className="absolute top-[30%] right-[15%] w-[40%] h-[40%] rounded-full ambient-glow-purple opacity-30" />
            
            {/* Subtle luxury background grid overlay */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                                  linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Layout wrappers */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {/* Global Header */}
            <Header />

            {/* Main Cinematic Content */}
            <main className="flex-grow flex flex-col justify-start w-full">
              {children}
            </main>

            {/* macOS Floating Dock */}
            <FloatingDock />

            {/* Floating Developer Badge */}
            <DevBadge />

            {/* Global Footer */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
