import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, GlassCard } from "@/components/site/Section";
import { SERVICES } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — CoachRony" },
      { name: "description", content: "AI Content, Video Ads, Landing Pages, Digital Products, Facebook Ads, WhatsApp Automation, Coaching ও Vibe Coding training।" },
      { property: "og:title", content: "Services — CoachRony" },
      { property: "og:description", content: "AI-powered services for creators ও brands." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <Section
      eyebrow="Services"
      title={<>End-to-end <span className="text-gradient">AI services</span></>}
      subtitle="From idea to launch — সব কিছু এক জায়গায়।"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <GlassCard key={s.title}>
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-background shadow-glow">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            <Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary-glow hover:underline">
              Get a quote <ArrowRight className="h-3 w-3" />
            </Link>
          </GlassCard>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link
          to="/book"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-semibold text-background shadow-glow"
        >
          Book a free discovery call <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
