import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, GlassCard } from "@/components/site/Section";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Coachrony Academy" },
      { name: "description", content: "Live workshops, masterclasses ও community meetups। সব AI ইভেন্ট এক জায়গায়।" },
      { property: "og:title", content: "Events — Coachrony Academy" },
      { property: "og:description", content: "Upcoming AI workshops, masterclasses ও meetups।" },
    ],
  }),
  component: Events,
});

function Events() {
  return (
    <Section
      eyebrow="Events"
      title={<>Upcoming <span className="text-gradient">Events</span></>}
      subtitle="Live workshops, masterclasses ও AI community meetups।"
    >
      <GlassCard className="mx-auto max-w-2xl text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
          <Calendar className="h-6 w-6 text-background" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold">নতুন event শীঘ্রই আসছে</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          আমাদের পরবর্তী live workshop ও masterclass-এর schedule প্রকাশ হবে শীঘ্রই। আগে থেকে seat
          reserve করতে চাইলে সরাসরি যোগাযোগ করুন।
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/free-class"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 text-sm font-semibold text-background shadow-glow transition hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4" /> Join Free Class
          </Link>
          <Link
            to="/book"
            className="glass-strong inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
          >
            Reserve Seat <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </GlassCard>
    </Section>
  );
}
