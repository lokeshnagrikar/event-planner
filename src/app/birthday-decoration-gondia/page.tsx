"use client";

import React from "react";
import SeoLandingTemplate from "@/components/common/SeoLandingTemplate";

export default function BirthdayGondiaPage() {
  return (
    <SeoLandingTemplate
      title="Creative Celebration Styling & Birthday Decor in Gondia"
      metaTitle="Premium Birthday Decoration & Celebration Styling in Gondia"
      metaDescription="Looking for the best birthday party decorators in Gondia? ST Events designs aesthetic celebration themes, pastel backdrops, and modern organic balloon styling."
      badge="Creative Celebrations"
      heroImage="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1200"
      introText="We style premium birthday parties and private milestones. From minimalist neon-lit geometric stages to lush organic pastel backdrops, we ensure a highly shareable Gen-Z aesthetic."
      showcaseImages={[
        "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800",
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=800",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800",
      ]}
      faqs={[
        {
          q: "What styling themes do you offer for birthday decoration?",
          a: "We offer organic balloon arches, neon glow backdrops, floral photo booths, customized props, and immersive geometric panels tailored to any modern birthday theme.",
        },
        {
          q: "Can you manage intimate home birthday parties?",
          a: "Yes. We design for both intimate backyard gatherings and grand hotel ballroom birthday galas, scaling details to match the venue size.",
        },
        {
          q: "Are customized signs or neon typography included?",
          a: "Absolutely. We construct bespoke neon signage, customized name letters, and glowing photo backdrops as part of our celebration styling package.",
        },
      ]}
      testimonials={[
        {
          quote: "Our daughter's sweet sixteen setup was spectacular. The pastel arches and customized neon signage were the highlight of the night.",
          author: "Ananya Deshmukh",
          role: "Sweet Sixteen",
        },
        {
          quote: "Absolutely blew us away. The geometric panels and lighting looked straight out of an Instagram feed.",
          author: "Kabir Malhotra",
          role: "Milestone Birthday",
        },
      ]}
    />
  );
}
