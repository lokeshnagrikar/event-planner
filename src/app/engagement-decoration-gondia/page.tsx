"use client";

import React from "react";
import SeoLandingTemplate from "@/components/common/SeoLandingTemplate";

export default function EngagementGondiaPage() {
  return (
    <SeoLandingTemplate
      title="Bespoke Engagement Stage Decoration in Gondia"
      metaTitle="Premium Engagement Stages & Ring Ceremony Decor in Gondia"
      metaDescription="Looking for premium engagement stage designers in Gondia? ST Events designs customized glass domes, botanical setups, and modern floral stage grids."
      badge="Pre-Wedding Luxury"
      heroImage="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200"
      introText="We design stunning engagement stages that set the benchmark. From glass greenhouse backdrops to cascading botanical ceiling grids, we create intimate, glowing sanctuaries for your ring ceremony."
      showcaseImages={[
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800",
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800",
      ]}
      faqs={[
        {
          q: "What concepts do you recommend for engagement stages?",
          a: "We highly recommend our Signature Emerald Glasshouse dome setup, custom mirror aisle boards, or our geometric brass grids paired with cascading local flowers.",
        },
        {
          q: "Do you provide custom ring display props?",
          a: "Yes. We design themed ring holders, custom acrylic flower podiums, and synchronized spot-lighting triggers for the ring exchange moment.",
        },
        {
          q: "Can the engagement setup be adapted for outdoor lawns?",
          a: "Definitely. We coordinate structures that are fully wind-resistant and structured specifically for open lawn backdrops, complete with warm accent illumination.",
        },
      ]}
      testimonials={[
        {
          quote: "The Emerald Glasshouse setup for our ring ceremony was breathtaking. Everyone was asking about the decorators. Best in Maharashtra!",
          author: "Aditya & Sanjana",
          role: "Engagement Gala",
        },
        {
          quote: "The mirror aisle reflecting the botanical ceiling was pure genius. Made our pictures look absolutely cinematic.",
          author: "Rhea Deshmukh",
          role: "Lawn Engagement",
        },
      ]}
    />
  );
}
