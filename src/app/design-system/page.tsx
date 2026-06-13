"use client";

import React, { useState } from "react";
import AnimateIn from "@/components/animations/AnimateIn";
import Magnetic from "@/components/ui/Magnetic";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, ShowcaseCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input, Textarea, Select } from "@/components/ui/Form";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/Modal";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/Dropdown";
import { Statistics } from "@/components/ui/Statistics";
import { Testimonial } from "@/components/ui/Testimonial";
import { Gallery } from "@/components/ui/Gallery";
import { Icon } from "@iconify/react";

// ==========================================
// Mock Data Presets
// ==========================================
const MOCK_STATS = [
  { value: 450, suffix: "+", label: "Events Orchestrated", description: "Bespoke coordinates across Maharashtra and Central India." },
  { value: 15, suffix: "L+", label: "Floral Stems Curated", description: "Fresh premium botanical installations styled by hand." },
  { value: 99, suffix: "%", label: "Client Retainers", description: "Generations of families returning for all key engagements." },
  { value: 8, suffix: "Yrs", label: "Creative Leadership", description: "Awwwards-winning standards brought to local landscapes." },
];

const MOCK_TESTIMONIALS = [
  {
    quote: "ST Events completely re-imagined what our wedding could look like. The layout felt like walking into an immersive luxury wonderland. Our guests are still talking about the ambient gold details and emerald floral pillars.",
    author: "Kabir & Ananya",
    role: "Wedding Clients, Gondia HQ",
  },
  {
    quote: "A flawless execution. For our corporate product showcase, the team brought an Apple-like minimalist elegance to the stage. Truly a premium benchmark for central India.",
    author: "Mehta Group Corp",
    role: "Corporate Client, Nagpur",
  },
  {
    quote: "The birthday decoration was breathtaking. They managed to merge high-end Gen-Z aesthetics with a sophisticated glass and light show. Simply spectacular.",
    author: "Rhea Deshmukh",
    role: "Engagement Gala, Gondia",
  },
];

const MOCK_GALLERY = [
  {
    id: "g1",
    imageSrc: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
    category: "Luxury Wedding",
    title: "The Golden Canopy",
    description: "An grand luxury glass canopy styled with over 10,000 fresh white roses, antique brass chandeliers, and immersive amber accent glows.",
  },
  {
    id: "g2",
    imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200",
    category: "Corporate",
    title: "Modern Tech Launch",
    description: "Sleek obsidian panels with custom neon light matrices, premium glass panels, and asymmetrical layout seating for VIP stakeholders.",
  },
  {
    id: "g3",
    imageSrc: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200",
    category: "Engagement",
    title: "Emerald Glasshouse",
    description: "A customized transparent greenhouse setup lit with emerald green and champagne undertones, featuring hanging botanical ceiling grids.",
  },
];

export default function DesignSystemCatalog() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEvent, setFormEvent] = useState("wedding");

  return (
    <div className="min-h-screen py-32 px-4 md:px-8 bg-luxury-obsidian relative overflow-hidden">
      {/* Dynamic Backdrops */}
      <div className="absolute top-[10%] right-[10%] w-[35%] h-[35%] rounded-full ambient-glow-gold opacity-35 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[45%] h-[45%] rounded-full ambient-glow-emerald opacity-25 filter blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Title Frame */}
        <div className="border-b border-white/5 pb-8 mb-20 text-center md:text-left">
          <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-luxury-brass font-bold block mb-4">
            Interactive Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white tracking-wide">
            UI Design <span className="text-gold-gradient italic">System</span>
          </h1>
          <p className="text-xs sm:text-sm text-luxury-silver font-light max-w-xl mt-4 leading-relaxed">
            Every component is configured in a dark luxury style using glassmorphism, precise gold accents, Outfit sans-serif, and Playfair serif.
          </p>
        </div>

        {/* ==========================================
            SECTION 1: Interactions & Buttons
           ========================================== */}
        <section className="mb-24">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-luxury-brass mb-8 font-bold border-l-2 border-luxury-brass pl-4">
            01 // Buttons & Magnetic Gravity
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-luxury-charcoal/20 border border-white/5 p-8 backdrop-blur-md">
            <div>
              <h3 className="font-serif text-lg text-luxury-champagne mb-4">Button Variants</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary" size="md">
                  Primary Gold
                </Button>
                <Button variant="secondary" size="md">
                  Secondary Carbon
                </Button>
                <Button variant="glass" size="md">
                  Glass Spotlight
                </Button>
                <Button variant="link" size="md">
                  Explore Details
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-serif text-lg text-luxury-champagne mb-4">Magnetic Gravity (Awwwards Core)</h3>
              <p className="text-xs text-luxury-silver mb-4 font-light leading-relaxed">
                Hover over the items below to see them follow your mouse cursor with custom spring tension.
              </p>
              <div className="flex gap-6 items-center">
                <Button variant="primary" magnetic={true} icon="lucide:arrow-right">
                  Magnetic Button
                </Button>
                
                <Magnetic range={50} strength={0.4}>
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-luxury-brass hover:text-white cursor-pointer transition-colors duration-300">
                    <Icon icon="lucide:instagram" className="w-5 h-5" />
                  </div>
                </Magnetic>
                
                <Magnetic range={50} strength={0.4}>
                  <span className="text-xs font-serif tracking-widest text-luxury-champagne uppercase cursor-pointer hover:text-white select-none">
                    ST LOGO
                  </span>
                </Magnetic>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 2: Badges & Dropdown & Modals
           ========================================== */}
        <section className="mb-24">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-luxury-brass mb-8 font-bold border-l-2 border-luxury-brass pl-4">
            02 // Overlays, Badges & Menus
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Badges card */}
            <Card>
              <CardHeader>
                <CardTitle>Status Badges</CardTitle>
                <CardDescription>Glass notifications with pulsing states.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col space-y-4 items-start">
                <Badge variant="gold" pulse={true}>Wedding Client</Badge>
                <Badge variant="emerald" pulse={true}>Corporate VIP</Badge>
                <Badge variant="burgundy" pulse={true}>Engagement RSVP</Badge>
                <Badge variant="silver">Archived Decor</Badge>
              </CardContent>
            </Card>

            {/* Dropdown Menu card */}
            <Card>
              <CardHeader>
                <CardTitle>Dropdown Menus</CardTitle>
                <CardDescription>Radix items with Framer Motion entry.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-[120px]">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="glass" icon="lucide:chevron-down">Select Category</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Weddings</DropdownMenuItem>
                    <DropdownMenuItem>Corporate Galas</DropdownMenuItem>
                    <DropdownMenuItem>Engagement Parties</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Decor Catalog</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>

            {/* Modals card */}
            <Card>
              <CardHeader>
                <CardTitle>Dialog Modals</CardTitle>
                <CardDescription>Immersive popup containers with blurs.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-[120px]">
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="primary">Trigger Modal</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Bespoke Event Inquiry</DialogTitle>
                      <DialogDescription>
                        Begin orchestration. Please fill in basic information below and our luxury concierges will reach out within 24 hours.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="flex flex-col">
                      <Input 
                        label="Full Name" 
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                      />
                      <Select 
                        label="Preferred Event" 
                        value={formEvent}
                        onChange={(e) => setFormEvent(e.target.value)}
                        options={[
                          { label: "Luxury Wedding", value: "wedding" },
                          { label: "Corporate Experience", value: "corporate" },
                          { label: "Private Celebration", value: "private" },
                        ]}
                      />
                      <Button variant="primary" className="mt-4" onClick={() => setModalOpen(false)}>
                        Submit Request
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ==========================================
            SECTION 3: Forms & Cards
           ========================================== */}
        <section className="mb-24">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-luxury-brass mb-8 font-bold border-l-2 border-luxury-brass pl-4">
            03 // Forms & Cards (Carbon Spotlight & Showcase)
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form Column */}
            <div className="bg-luxury-charcoal/20 border border-white/5 p-8 backdrop-blur-md lg:col-span-1">
              <h3 className="font-serif text-lg text-luxury-champagne mb-6">Luxury Forms</h3>
              <Input label="Email Address" type="email" />
              <Input label="Event Date" type="text" placeholder="DD/MM/YYYY" />
              <Textarea label="Tell us about your concept" />
              <Button variant="secondary" className="w-full">Save Draft</Button>
            </div>

            {/* Spotlight Card Column */}
            <div className="lg:col-span-1 flex flex-col justify-between">
              <Card className="h-full flex flex-col justify-between">
                <CardHeader>
                  <CardTitle>Cursor Spotlight Card</CardTitle>
                  <CardDescription>Hover over this panel. A delicate radial spotlight will follow your cursor.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-luxury-silver leading-relaxed font-light">
                    Built using react coordinate tracking and CSS mix-blend-screen masks. It highlights fine border details and glass backdrops like the Apple design system.
                  </p>
                </CardContent>
                <CardFooter>
                  <span className="text-[10px] text-luxury-brass tracking-[0.2em] font-semibold uppercase">
                    Interactive Grid Node
                  </span>
                </CardFooter>
              </Card>
            </div>

            {/* Showcase Image Card Column */}
            <div className="lg:col-span-1">
              <ShowcaseCard 
                category="Luxury Wedding"
                imageSrc="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200"
                subtitle="Exclusive Design Series"
                title="The Golden Canopy"
              />
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 4: Statistics & Testimonials
           ========================================== */}
        <section className="mb-24">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-luxury-brass mb-8 font-bold border-l-2 border-luxury-brass pl-4">
            04 // Metrics & Editorial Reviews
          </h2>
          
          <div className="mb-12">
            <h3 className="font-serif text-xl text-white mb-6 text-center md:text-left">
              GSAP Scroll-Triggered Counters
            </h3>
            <Statistics items={MOCK_STATS} />
          </div>

          <div>
            <h3 className="font-serif text-xl text-white mb-6 text-center md:text-left">
              Framer Motion Testimonial Deck
            </h3>
            <Testimonial items={MOCK_TESTIMONIALS} />
          </div>
        </section>

        {/* ==========================================
            SECTION 5: Lightbox Gallery Grid
           ========================================== */}
        <section className="mb-12">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-luxury-brass mb-8 font-bold border-l-2 border-luxury-brass pl-4">
            05 // Cinematic Concept Gallery
          </h2>
          
          <h3 className="font-serif text-2xl text-white mb-8 text-center md:text-left">
            Asymmetrical Staggered Gallery
          </h3>
          
          <p className="text-xs text-luxury-silver mb-8 leading-relaxed max-w-2xl text-center md:text-left font-light">
            Click on any event layout item below to enlarge it in an immersive cinema lightbox. Features staggered offsets to mimic Awwwards-winning grids.
          </p>
          
          <Gallery items={MOCK_GALLERY} />
        </section>

      </div>
    </div>
  );
}
