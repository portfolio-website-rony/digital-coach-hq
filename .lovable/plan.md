## Goal
Build a premium, futuristic "আমি কে — CoachRony" About section on `/about` with image + intro side-by-side, glow/glass effects, animated skill cards, and social proof badges.

## Changes

### `src/routes/about.tsx` — full rewrite
Replace current About page with a richer composition (still uses existing `Section`, `GlassCard`, `STATS`, `SKILLS` tokens).

**Layout (sections top → bottom):**

1. **Hero intro split** (`grid lg:grid-cols-2`)
   - **Left:** Profile image card
     - Placeholder `src/assets/coach-rony-portrait.webp` (already exists) — user will swap later
     - Wrapped in glassmorphism frame: `glass-strong rounded-3xl p-2`
     - Outer glow: gradient blur halo (`bg-gradient-primary blur-3xl opacity-40`) behind image
     - Floating corner accent chips ("AI Creator", "Coach") with `animate-float`
     - Subtle border with `shadow-glow` and `neon-border` variant in brand orange
   - **Right:** Intro
     - Eyebrow chip: "About Me"
     - H1: `আমি কে — <span text-gradient>CoachRony</span>`
     - Lead paragraph (Bengali content provided by user, first paragraph)
     - "আমি মূলত:" label
     - Skill chip grid (7 items) — small animated cards with icon + label, hover lift + glow
     - Closing mission paragraph (last paragraph)
     - CTA row: "Book a Call" (primary) + "View Courses" (ghost)

2. **Social proof badges strip**
   - 4 glass pill badges: "৫০K+ Students", "১০০+ Brands", "৫+ Years", "AI Certified"
   - Use `STATS` from site-data where overlap, plus 1–2 hardcoded trust badges
   - Horizontal row, gold-accent border (`border-gold-soft`), `shadow-gold`

3. **Skills/expertise cards grid** (`sm:grid-cols-2 lg:grid-cols-4`)
   - 7 cards (one per skill from user content): AI Content Creation, Website & Landing Page Design, Digital Product Business, AI Automation, Personal Branding, Facebook Marketing, Vibe Coding
   - Each card: lucide icon (Sparkles, Layout, ShoppingBag, Bot, User, Megaphone, Code2), title, 1-line description
   - `GlassCard` with hover glow + `framer-motion` `whileInView` fade-up stagger
   - Floating gradient blob behind grid for depth

4. **Mission CTA band**
   - Full-width glass card, gold gradient text headline
   - "Let's build your AI-powered brand together"
   - Buttons: Book a Call → `/book`, See Courses → `/courses`

**Animations (framer-motion):**
- `whileInView` fade-up for each block (already pattern in `Section`)
- Stagger on skill cards (delay index * 0.08)
- Floating glow orbs using existing `animate-float`, `animate-blob` utilities
- Smooth scroll already enabled via `html { scroll-behavior: smooth }`

**Design tokens (all from `src/styles.css`):**
- `glass`, `glass-strong`, `neon-border`, `text-gradient`, `text-gold-gradient`
- `shadow-glow`, `shadow-glow-blue`, `shadow-gold`, `shadow-moon`
- `bg-gradient-primary`, `border-gold-soft`
- No custom color classes — fully themed

**Responsive:**
- `lg:grid-cols-2` collapses to single column on mobile
- Image card centers on mobile, max-w-sm
- Skill grid: 1 → 2 → 4 columns
- Padding/typography scales via `sm:` `md:` breakpoints

**SEO `head()`** — keep existing meta, slightly polish description for new content.

### No other files touched
- `STATS`, `SKILLS` reused from `src/lib/site-data.ts` (no edit)
- No new components extracted (single-route composition keeps it simple); if it grows >300 lines, will extract `<AboutHero/>` + `<SkillGrid/>` into `src/components/site/about/`

## Result
A premium, conversion-focused About page: glowing profile image with glass frame, clean Bengali intro, animated skill cards, gold social proof strip, and a closing CTA — all responsive and on-brand.
