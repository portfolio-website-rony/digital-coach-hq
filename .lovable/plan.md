## Futuristic Space-Themed AI Hero — Redesign Plan

Complete redesign of the home hero section into a cinematic, space/AI-themed experience with an orbital animation system on the right and mission storytelling on the left. Existing dark purple/blue tokens will be retuned toward a deeper space palette, but no other pages will change.

---

### 1. Design tokens (`src/styles.css`)

Add/tune (keep existing names so other pages stay intact):
- `--background`: deeper near-black `oklch(0.08 0.02 270)`
- New tokens: `--space-blue`, `--space-purple`, `--space-cyan`, `--moon-white`
- New gradients: `--gradient-space`, `--gradient-orb`
- New shadows: `--shadow-neon-blue`, `--shadow-neon-purple`, `--shadow-moon`
- New keyframes: `orbit-cw`, `orbit-ccw`, `pulse-glow`, `twinkle`, `nebula-drift`
- New utilities: `.neon-border`, `.glow-text`, `.starfield`, `.noise-overlay`

Body background already has radial glows — extend with a subtle noise SVG data-URI overlay.

### 2. New components (`src/components/site/hero/`)

Split the hero into focused pieces so `routes/index.tsx` stays readable:

- `SpaceHero.tsx` — wrapper, full-viewport, layers + grid
- `Starfield.tsx` — 80–120 absolutely-positioned twinkling dots, generated once with `useMemo`
- `NebulaLayer.tsx` — 2–3 large blurred radial gradients drifting slowly
- `MouseSpotlight.tsx` — radial gradient that follows pointer (CSS variables + `pointermove`); disabled on touch
- `MissionOrb.tsx` — circular glass orb with rotating ring + animated SVG progress ring (1,25,000 / 1,000,000)
- `FloatingStat.tsx` — small glass card (used for 10K+ Students, 500+ Projects, 98% Success, 50+ Countries)
- `OrbitSystem.tsx` — central AI core + 4 orbit rings with avatars
  - Central core: glowing moon sphere (radial gradients + pulse)
  - Orbits: 4 rings, alternating CW/CCW, varying durations (18s/26s/34s/44s)
  - Avatars: counter-rotate each item so faces stay upright
  - Use existing portrait `coach-rony-portrait.png` as the central element fallback OR keep moon and place portrait small in center

All animations via Framer Motion (already installed) + CSS keyframes for infinite orbits. No GSAP/Three.js — pure CSS/SVG keeps the bundle light and works on edge SSR.

### 3. Hero structure (rewrites only the hero `<section>` in `src/routes/index.tsx`)

```text
<SpaceHero>                          // 100vh, overflow hidden
  <Starfield/> <NebulaLayer/> <MouseSpotlight/> <NoiseOverlay/>

  <div grid: 45% / 55% on lg, stacked on mobile>

    LEFT (45%)
      • Glass pill: "🚀 Future of AI Learning"
      • H1: "Learn AI & Build Digital Products For The Future"
        - "AI", "Future", "Digital Products" use text-gradient + glow
      • Subtitle paragraph (Bangla + English mix, matches site tone)
      • CTA row: [Start Learning — neon] [Watch Demo — glass]
      • MissionOrb + 4 FloatingStat cards arranged around it

    RIGHT (55%)
      • OrbitSystem
        - Central moon/AI core
        - 4 orbit rings, avatars + small planets/icons on paths
        - Floating code-snippet glass chip + AI icon chips
  </div>
</SpaceHero>
```

The existing nav (`Header.tsx`) stays — no changes there unless you want navbar restyled too (ask below).

### 4. Sections below the hero
Keep STATS / ABOUT / SERVICES / PROGRAMS / PORTFOLIO / TESTIMONIALS / LEAD as-is. Only the hero changes.

### 5. Responsive behavior
- `lg+`: side-by-side 45/55 grid, full orbit system, mouse spotlight on
- `md`: stacked, orbit system scaled to 70%, fewer floating chips
- `sm`: text → CTAs → mission orb → simplified single-ring orbit; starfield reduced to ~40 dots; mouse spotlight disabled

### 6. Performance & SSR notes
- `Starfield` and orbit positions generated with `useMemo` for stability across renders
- Use `prefers-reduced-motion` to pause orbits and floats
- All animation purely transform/opacity for GPU compositing
- No new npm packages required

### 7. Files touched
- create: `src/components/site/hero/SpaceHero.tsx`, `Starfield.tsx`, `NebulaLayer.tsx`, `MouseSpotlight.tsx`, `MissionOrb.tsx`, `FloatingStat.tsx`, `OrbitSystem.tsx`
- edit: `src/routes/index.tsx` (replace hero `<section>`, keep rest), `src/styles.css` (add tokens + keyframes)

---

### Open questions before I build

1. **Central orbit element** — keep the moon/AI core as the center, OR put your portrait inside the moon? (Right now the portrait is the center of the current hero.)
2. **Navbar** — restyle Header to match space theme (neon glow logo, glass nav), or leave it as-is?
3. **Avatars on orbits** — use generated placeholder gradient circles, or do you want to upload student photos / brand logos?
4. **Mission counter** — "1,25,000 / 1,000,000" as in spec, or use your real number?