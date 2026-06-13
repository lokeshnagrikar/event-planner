"use client";

import React from "react";
import SeoLandingTemplate from "@/components/common/SeoLandingTemplate";

export default function ColdPyroGondiaPage() {
  return (
    <SeoLandingTemplate
      title="Grand Cold Pyro & Cinematic Special Effects in Gondia"
      metaTitle="Grand Cold Pyro & Event Special Effects in Gondia"
      metaDescription="Looking for professional cold pyro, smoke entry, and event special effects in Gondia? ST Events provides sound-synchronized cold fire sparkles and heavy dry-ice fog."
      badge="Special FX Production"
      heroImage="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200"
      introText="We engineer safe, dramatic, and high-impact event special effects. From synchronized cold pyro sparklers to heavy cloud dry-ice fog entries and metallic airburst confettis."
      showcaseImages={[
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=800",
        "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800",
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
      ]}
      faqs={[
        {
          q: "Are cold pyrotechnics safe to use indoors?",
          a: "Yes. Cold pyrotechnics (cold fire) operate at extremely low temperatures, emitting zero fire hazards, minimal smoke, and are completely safe for indoor ballroom setups.",
        },
        {
          q: "How does the heavy fog entry effect work?",
          a: "We utilize commercial-grade high-output dry ice machines that create a dense, low-lying white fog blanket, keeping the smoke strictly at floor level for a cloud-walking effect.",
        },
        {
          q: "Do you synchronize the pyro blasts to music?",
          a: "Yes. Our Special FX consoles are operated by certified technicians who trigger sparkler jets and confetti airburst blasts exactly at key music drop coordinates.",
        },
      ]}
      testimonials={[
        {
          quote: "Our entrance felt like a concert opening! The pyro sparklers fired exactly when the chorus hit. Our guests were amazed.",
          author: "Nikhil & Priya",
          role: "Grand Entrance",
        },
        {
          quote: "The dry-ice cloud fog was so thick, it felt like walking in heaven for our first dance. Safe, professional, and breathtaking.",
          author: "Amit Singhal",
          role: "Sangeet Night",
        },
      ]}
    />
  );
}
