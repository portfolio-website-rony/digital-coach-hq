import { createFileRoute } from "@tanstack/react-router";
import { Section, GlassCard } from "@/components/site/Section";
import { Youtube, FileText, BookOpen } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Content Hub — CoachRony" },
      { name: "description", content: "AI tips, tutorials, free resources, YouTube videos ও blog posts — সব এক জায়গায়।" },
      { property: "og:title", content: "Blog & Content Hub — CoachRony" },
      { property: "og:description", content: "AI tips, tutorials ও free resources." },
    ],
  }),
  component: Blog,
});

const POSTS = [
  { type: "Article", icon: FileText, title: "5 AI tools every Bangla creator-র জানা উচিত", date: "May 2026", read: "5 min" },
  { type: "Video", icon: Youtube, title: "Vibe Coding দিয়ে SaaS launch — Step by Step", date: "Apr 2026", read: "12 min" },
  { type: "Guide", icon: BookOpen, title: "Facebook Ads — Pixel + CAPI complete setup", date: "Apr 2026", read: "8 min" },
  { type: "Article", icon: FileText, title: "Digital products দিয়ে monthly recurring income", date: "Mar 2026", read: "6 min" },
  { type: "Video", icon: Youtube, title: "AI Content Workflow — আমার full setup", date: "Mar 2026", read: "15 min" },
  { type: "Guide", icon: BookOpen, title: "Personal Brand 101 — শুরু করুন zero থেকে", date: "Feb 2026", read: "10 min" },
];

function Blog() {
  return (
    <Section
      eyebrow="Content Hub"
      title={<>Latest <span className="text-gradient">articles, videos & guides</span></>}
      subtitle="AI, content ও business — সব কিছু এক জায়গায়।"
    >
      <div className="mx-auto mb-10 max-w-md">
        <input
          placeholder="Search content..."
          className="glass w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/60"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((p) => (
          <GlassCard key={p.title}>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <p.icon className="h-4 w-4 text-primary-glow" />
              <span className="uppercase tracking-wider">{p.type}</span>
              <span>•</span>
              <span>{p.read}</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{p.title}</h3>
            <div className="mt-4 text-xs text-muted-foreground">{p.date}</div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
