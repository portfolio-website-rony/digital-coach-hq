import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section } from "@/components/site/Section";
import { PORTFOLIO } from "@/lib/site-data";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — CoachRony" },
      { name: "description", content: "Landing pages, AI videos, ad creatives, funnels ও websites — recent work by CoachRony।" },
      { property: "og:title", content: "Portfolio — CoachRony" },
      { property: "og:description", content: "Selected projects ও case studies." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const tags = ["All", ...Array.from(new Set(PORTFOLIO.map((p) => p.tag)))];
  const [active, setActive] = useState<string>("All");
  const items = active === "All" ? PORTFOLIO : PORTFOLIO.filter((p) => p.tag === active);

  return (
    <Section
      eyebrow="Portfolio"
      title="Selected work"
      subtitle="Real projects shipped for creators, coaches ও brands।"
    >
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              active === t
                ? "bg-gradient-primary text-background shadow-glow"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <div key={p.title} className="group relative overflow-hidden rounded-2xl border border-white/10">
            <div className={`aspect-[4/3] w-full bg-gradient-to-br ${p.color} transition group-hover:scale-105`} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-glow">
                {p.tag}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold">{p.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
