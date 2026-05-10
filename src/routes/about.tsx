import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, GlassCard } from "@/components/site/Section";
import { SKILLS, STATS } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CoachRony — AI Creator & Digital Educator" },
      { name: "description", content: "CoachRony-র journey, mission ও skills। AI content, vibe coding, digital products নিয়ে কেন আমি কাজ করি।" },
      { property: "og:title", content: "About CoachRony" },
      { property: "og:description", content: "My journey, mission ও skills." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <Section
        eyebrow="About"
        title={<>Hi, I'm <span className="text-gradient">CoachRony</span></>}
        subtitle="AI দিয়ে creators ও entrepreneurs-দের জন্য একটা সহজ পথ তৈরি করা — সেটাই আমার mission।"
      >
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              আমার journey শুরু হয়েছিলো একদম zero থেকে। Content creation,
              freelancing, ad-buying — সবকিছু hands-on শিখেছি।
              এরপর AI tools আসায় আমি দেখলাম একটা পুরো নতুন possibility।
            </p>
            <p>
              আজ আমি AI-driven workflows দিয়ে creators-দের শেখাই কিভাবে
              <b className="text-foreground"> 10× faster</b> কাজ করা যায়, কিভাবে digital
              products বানিয়ে recurring income তৈরি করা যায়, এবং কিভাবে
              personal brand গ্রো করা যায় globally।
            </p>
            <p>
              <b className="text-foreground">Mission:</b> প্রতিটি ambitious বাঙালির হাতে
              AI-র power তুলে দেওয়া — যাতে geography বা budget কোনোটাই বাধা না হয়।
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-glow hover:underline">
              Let's work together <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <GlassCard className="!p-6" hover={false}>
            <h3 className="font-display text-lg font-semibold">By the numbers</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl bg-white/5 p-4 text-center">
                  <div className="text-xl font-bold text-gradient">{s.value}</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </Section>

      <Section eyebrow="Skills" title="What I bring to the table">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s) => (
            <GlassCard key={s} className="text-sm font-medium">
              <span className="text-gradient">●</span> {s}
            </GlassCard>
          ))}
        </div>
      </Section>
    </>
  );
}
