import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Play, Star, Quote } from "lucide-react";
import { Section, GlassCard } from "@/components/site/Section";
import { LeadForm } from "@/components/site/LeadForm";
import { SERVICES, PROGRAMS, PORTFOLIO, TESTIMONIALS, STATS, SKILLS } from "@/lib/site-data";
import coachPortrait from "@/assets/coach-rony-portrait.png";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Animated blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full bg-primary/30 blur-3xl animate-blob" />
          <div className="absolute top-40 -right-20 h-[420px] w-[420px] rounded-full bg-accent/30 blur-3xl animate-blob [animation-delay:-6s]" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-primary-glow">
              <Star className="h-3 w-3" /> AI Creator • Digital Educator
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
              <span className="text-gradient">AI দিয়ে</span> নিজের স্কিল,<br />
              ব্র্যান্ড ও ইনকাম তৈরি করুন
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              আমি <b className="text-foreground">CoachRony</b> — AI Content Creation,
              Vibe Coding, Digital Products এবং Online Business নিয়ে কাজ করি। শুরু
              করুন আজই, বিনামূল্যে।
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/free-class"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 text-sm font-semibold text-background shadow-glow transition hover:opacity-90"
              >
                Join Free Class <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/programs"
                className="glass-strong inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition hover:border-primary/40"
              >
                <Play className="h-4 w-4" /> View Programs
              </Link>
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[oklch(0.72_0.18_152/15%)] px-5 py-3 text-sm font-semibold text-[oklch(0.85_0.15_152)] hover:bg-[oklch(0.72_0.18_152/25%)]"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-5">
              <div className="flex -space-x-2">
                {[0,1,2,3].map((i) => (
                  <div key={i} className="h-9 w-9 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent" />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <div className="text-muted-foreground">10,000+ students trust CoachRony</div>
              </div>
            </div>
          </motion.div>

          {/* Hero visual — floating UI cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[480px]"
          >
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative h-72 w-72 rounded-full bg-gradient-primary opacity-30 blur-3xl" />
            </div>
            <GlassCard className="absolute left-0 top-4 w-64 animate-float">
              <div className="text-xs text-muted-foreground">AI Workflow</div>
              <div className="mt-1 font-display text-lg font-semibold">10× faster content</div>
              <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                <div className="h-full w-4/5 rounded-full bg-gradient-primary" />
              </div>
            </GlassCard>
            <GlassCard className="absolute right-0 top-32 w-60 animate-float [animation-delay:-2s]">
              <div className="text-xs text-muted-foreground">Monthly Revenue</div>
              <div className="mt-1 font-display text-2xl font-bold text-gradient">৳ 1,24,500</div>
              <div className="mt-2 text-xs text-emerald-400">▲ 38% this month</div>
            </GlassCard>
            <GlassCard className="absolute bottom-6 left-8 w-72 animate-float [animation-delay:-4s]">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-background">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">New course launched</div>
                  <div className="text-xs text-muted-foreground">Vibe Coding Bootcamp</div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <Section className="!py-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s) => (
            <GlassCard key={s.label} className="text-center" hover={false}>
              <div className="text-3xl font-bold text-gradient">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* ABOUT preview */}
      <Section
        eyebrow="About"
        title={<>আমি কে — <span className="text-gradient">CoachRony</span></>}
        subtitle="AI দিয়ে creators ও entrepreneurs-দের জন্য শেখা ও earning সহজ করে দিচ্ছি।"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s) => (
            <GlassCard key={s} className="text-sm font-medium">
              <span className="text-gradient">●</span> {s}
            </GlassCard>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-glow hover:underline">
            Read full story <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* SERVICES */}
      <Section
        eyebrow="Services"
        title={<>What I do — <span className="text-gradient">end to end</span></>}
        subtitle="AI-powered services that help creators ও brands grow faster।"
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
                Learn more <ArrowRight className="h-3 w-3" />
              </Link>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* PROGRAMS */}
      <Section
        eyebrow="Programs"
        title={<>Learn with <span className="text-gradient">CoachRony</span></>}
        subtitle="From free classes to premium mentorship — শুরু করুন আপনার level থেকে।"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.map((p) => (
            <GlassCard key={p.title}>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-glow">
                  {p.tag}
                </span>
                <p.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-5 flex items-end justify-between">
                <div className="text-xl font-bold text-gradient">{p.price}</div>
                <Link to={p.href} className="rounded-lg bg-gradient-primary px-3 py-1.5 text-xs font-semibold text-background">
                  {p.cta}
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* PORTFOLIO */}
      <Section
        eyebrow="Portfolio"
        title="Recent work"
        subtitle="Landing pages, videos, ads, funnels — real projects, real results।"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((p) => (
            <div key={p.title} className="group relative overflow-hidden rounded-2xl border border-white/10">
              <div className={`aspect-[4/3] w-full bg-gradient-to-br ${p.color}`} />
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
        <div className="mt-8 text-center">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-glow hover:underline">
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section
        eyebrow="Testimonials"
        title="Students ও clients বলছেন"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <GlassCard key={t.name}>
              <Quote className="h-6 w-6 text-primary-glow" />
              <p className="mt-3 text-sm leading-relaxed">{t.quote}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-primary" />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* LEAD CAPTURE */}
      <Section
        eyebrow="Get Started"
        title={<>Ready to <span className="text-gradient">level up</span>?</>}
        subtitle="Free consultation ও resources পেতে নিচের form-টি fill করুন।"
      >
        <div className="mx-auto max-w-xl">
          <GlassCard className="!p-8">
            <LeadForm source="home_hero" buttonLabel="Get Free Consultation" />
          </GlassCard>
        </div>
      </Section>
    </>
  );
}
