# ST Events — Luxury Event Management Website

> *Where Moments Become Memories*

A premium, award-worthy luxury event management website built for ST Events — an event planning company based in Gondia, Maharashtra. Designed with an emotional storytelling flow, cinematic animations, and a modern dark aesthetic.

---

## ✨ Live Preview

> Coming soon — deploy on [Vercel](https://vercel.com)

---

## 🎯 Brand Philosophy

The site follows a 5-stage emotional storytelling journey:

| Stage | Section |
|-------|---------|
| 01 / DREAM | Hero + Scroll Story |
| 02 / IMAGINE | Before & After Transformation |
| 03 / CREATE | Services + Timeline + Budget Planner |
| 04 / CELEBRATE | Reels Wall |
| 05 / REMEMBER | Gallery + Testimonials + Instagram |

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 15](https://nextjs.org/) | App Router, SSR, routing |
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer-motion.com/) | Animations & transitions |
| [GSAP + ScrollTrigger](https://gsap.com/) | Scroll-based animations |
| [Zustand](https://zustand-demo.pmnd.rs/) | Global state management |
| [Lenis](https://lenis.darkroom.engineering/) | Smooth scrolling |
| [Iconify](https://iconify.design/) | Icon system |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/lokeshnagrikar/event-planner.git
cd event-planner

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles & design tokens
│   ├── wedding-decoration-gondia/
│   ├── birthday-decoration-gondia/
│   ├── engagement-decoration-gondia/
│   ├── cold-pyro-gondia/
│   └── balloon-decoration-gondia/
│
├── components/
│   ├── animations/             # Motion components
│   │   ├── ClickParticles.tsx  # Click burst particle effect
│   │   ├── FloatingParticles.tsx
│   │   ├── ScrollStory.tsx     # Pinned scroll storytelling
│   │   ├── TextReveal.tsx
│   │   └── ImageReveal.tsx
│   │
│   ├── common/                 # Layout components
│   │   ├── Header.tsx          # Floating glass capsule nav
│   │   ├── Footer.tsx          # Editorial footer with marquee
│   │   ├── BookingModal.tsx    # Multi-step booking wizard
│   │   └── Providers.tsx
│   │
│   ├── home/                   # Page sections
│   │   ├── Hero.tsx            # Capsule zoom reveal hero
│   │   ├── BeforeAfter.tsx     # Transformation slider
│   │   ├── Services.tsx        # Bento grid services
│   │   ├── EventTimeline.tsx   # Production timeline
│   │   ├── BudgetPlanner.tsx   # Interactive budget tool
│   │   ├── Reels.tsx           # Vertical reels wall
│   │   ├── Instagram.tsx       # Infinite marquee feed
│   │   ├── ContactCTA.tsx      # Contact form
│   │   └── Preloader.tsx       # Liquid curtain preloader
│   │
│   └── ui/                     # Reusable UI components
│       ├── Button.tsx
│       ├── BentoGrid.tsx
│       ├── Gallery.tsx
│       ├── Statistics.tsx
│       ├── Testimonial.tsx
│       └── FloatingDock.tsx
│
├── data/                       # Static JSON content
│   ├── services.json
│   ├── gallery.json
│   ├── stats.json
│   ├── testimonials.json
│   └── reels.json
│
├── store/
│   └── useEventStore.ts        # Zustand global state
│
└── lib/
    ├── gsap.ts                 # GSAP + ScrollTrigger setup
    └── utils.ts

public/
└── videos/                     # Local video assets
    ├── vdo1.mp4
    ├── vdo2.mp4
    ├── Vdo3.mp4
    └── Reels/
```

---

## 🎨 Key Features

- **Cinematic Preloader** — Liquid SVG curtain exit animation with brand tagline reveal
- **Hero Capsule Reveal** — Video zooms from rounded pill to fullscreen on load
- **Multi-Step Booking Modal** — 4-step wizard (Event Type → Guests → Date → Contact) with WhatsApp CTA
- **Custom Click Particles** — Rose ripple + floating dots on every click
- **Smooth Lerp Scroll** — Lenis-powered buttery smooth scrolling
- **Bento Grid Services** — Premium 21st.dev style service cards
- **Before/After Slider** — Drag-to-compare event transformation
- **Budget Planner** — Interactive real-time quote calculator
- **Vertical Reels Wall** — Auto-playing video wall with hover controls
- **Statistics Counter** — GSAP scroll-triggered number count-up
- **Instagram Marquee** — Infinite auto-scrolling photo feed
- **Floating Glass Navbar** — Top-center capsule with scroll-hide behavior
- **macOS Floating Dock** — Bottom navigation dock with magnification

---

## 🌐 SEO Pages

Each service has a dedicated SEO-optimised landing page:

- `/wedding-decoration-gondia`
- `/birthday-decoration-gondia`
- `/engagement-decoration-gondia`
- `/cold-pyro-gondia`
- `/balloon-decoration-gondia`

---

## 📦 Deployment

### Deploy on Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect the GitHub repo directly at [vercel.com/new](https://vercel.com/new).

> **Note:** Video files in `public/videos/` are served as static assets. For production, consider uploading to **Cloudinary** or **AWS S3** and updating the `src` paths for better CDN performance.

---

## 🧑‍💻 Development Commands

```bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint check
```

---

## 📄 License

© 2025 ST Events. All rights reserved.  
Built with ❤️ in Gondia, Maharashtra.
