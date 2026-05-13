import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, GlassCard } from "@/components/site/Section";
import { ShoppingBag, ArrowRight, Package } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Coachrony Academy" },
      { name: "description", content: "Digital products, templates, prompts ও premium কোর্স — সব এক জায়গায়।" },
      { property: "og:title", content: "Shop — Coachrony Academy" },
      { property: "og:description", content: "Coachrony Academy-র digital products ও templates।" },
    ],
  }),
  component: Shop,
});

const ITEMS = [
  { title: "AI Prompt Pack", desc: "200+ tested prompts — content, code, marketing।", price: "Coming soon" },
  { title: "Notion Templates", desc: "Creator workflow, content calendar, project tracker।", price: "Coming soon" },
  { title: "Vibe Coding Kit", desc: "AI-powered web build templates ও components।", price: "Coming soon" },
];

function Shop() {
  return (
    <Section
      eyebrow="Shop"
      title={<>Digital <span className="text-gradient">Products</span></>}
      subtitle="Templates, prompts, kits — আপনার AI workflow accelerate করুন।"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {ITEMS.map((it) => (
          <GlassCard key={it.title} className="flex flex-col">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <Package className="h-5 w-5 text-background" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            <div className="mt-auto pt-5">
              <span className="inline-flex items-center gap-2 rounded-full border-gold-soft px-3 py-1 text-xs font-semibold text-gold-gradient">
                <ShoppingBag className="h-3.5 w-3.5" /> {it.price}
              </span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/book"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 text-sm font-semibold text-background shadow-glow transition hover:-translate-y-0.5"
        >
          Get Notified <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
