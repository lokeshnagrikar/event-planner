"use client";

import React from "react";
import SeoLandingTemplate from "@/components/common/SeoLandingTemplate";

export default function BalloonGondiaPage() {
  return (
    <SeoLandingTemplate
      title="Aesthetic Balloon Decoration & Party Styling in Gondia"
      metaTitle="Modern Balloon Decorators & Party Stylists in Gondia"
      metaDescription="Looking for creative balloon decoration in Gondia? ST Events creates modern, organic balloon arches, pastel backdrop setups, and helium cloud arrangements."
      badge="Trending Decor"
      heroImage="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1200"
      introText="We elevate standard balloon setups into premium art installations. We construct organic, flowing balloon structures paired with customized neon signs, geometric frames, and floral borders."
      showcaseImages={[
        "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800",
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=800",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800",
      ]}
      faqs={[
        {
          q: "What makes your balloon decoration different from local vendors?",
          a: "We use high-grade, double-stuffed biodegradable balloons in customized matte, pastel, and chrome finishes. We structure organic cascading arches that look elegant, not generic.",
        },
        {
          q: "Can you create balloon setups for corporate events?",
          a: "Yes. We design elegant, branded color-themed setups for product launches, store openings, and corporate celebrations.",
        },
        {
          q: "Do you include lighting and backdrops with your setups?",
          a: "Yes. All our setups are designed holistically, incorporating mesh grids, round panels, neon typography, and professional spotlights.",
        },
      ]}
      testimonials={[
        {
          quote: "The organic balloon wall they created for my baby shower was gorgeous. The matte colors looked so elegant and matching our theme.",
          author: "Pooja Sharma",
          role: "Baby Shower",
        },
        {
          quote: "Outstanding work! The double-stuffed pastel balloons held up beautifully throughout the day. Highly recommended.",
          author: "Vikram Mehta",
          role: "Store Launch",
        },
      ]}
    />
  );
}
