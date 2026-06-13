"use client";

import React from "react";
import SeoLandingTemplate from "@/components/common/SeoLandingTemplate";

export default function WeddingGondiaPage() {
  return (
    <SeoLandingTemplate
      title="Luxury Wedding Decoration & Experiences in Gondia"
      metaTitle="Luxury Wedding Decoration & Event Planners in Gondia"
      metaDescription="Looking for premium wedding decoration and designers in Gondia? ST Events creates monument-scale floral structures, custom staging, and luxury wedding setups."
      badge="Signature Experience"
      heroImage="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200"
      introText="We engineer luxury weddings featuring massive botanical structures, ambient warm lighting grids, hanging crystal chandeliers, and custom-theme coordination across Gondia and Vidarbha."
      showcaseImages={[
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800",
      ]}
      faqs={[
        {
          q: "What areas in Gondia do you service for wedding decoration?",
          a: "We cover all major regions within Gondia, Nagpur, Raipur, Bhandara, and nearby cities. We specialize in luxury resorts, private estates, and banquet setups.",
        },
        {
          q: "How early should we book our wedding decoration setup?",
          a: "For large-scale weddings, we recommend booking 3 to 6 months in advance. This permits our structure engineers and floral importers to coordinate materials properly.",
        },
        {
          q: "Do you offer custom 3D layouts before execution?",
          a: "Yes. Once booked, our design cell constructs a full 3D simulation of your stage, entrance tunnel, and banquet seating mapping.",
        },
      ]}
      testimonials={[
        {
          quote: "ST Events turned our wedding stage into a work of art. The floating white flower canopy and amber lighting made it feel like a fairytale.",
          author: "Rohan & Devika",
          role: "Nagpur Wedding",
        },
        {
          quote: "The team is incredibly professional. The setup was ready 3 hours before the guest arrival. Outstanding attention to detail.",
          author: "Singhania Family",
          role: "Gondia Gala",
        },
      ]}
    />
  );
}
