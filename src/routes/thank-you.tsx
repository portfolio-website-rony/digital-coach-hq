import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, GlassCard } from "@/components/site/Section";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You — CoachRony" },
      { name: "description", content: "Thank you for connecting with CoachRony। We'll be in touch soon।" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <Section>
      <div className="mx-auto max-w-xl text-center">
        <GlassCard className="!p-10" hover={false}>
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-primary text-background shadow-glow">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold">ধন্যবাদ! 🎉</h1>
          <p className="mt-3 text-muted-foreground">
            আপনার registration সফল হয়েছে। আমরা ইমেইল ও WhatsApp-এ details পাঠিয়ে দেবো।
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/programs" className="rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-background shadow-glow">
              Explore Programs
            </Link>
            <a href="https://wa.me/8801700000000" target="_blank" rel="noreferrer" className="glass rounded-xl px-4 py-2 text-sm font-semibold">
              Join on WhatsApp
            </a>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
