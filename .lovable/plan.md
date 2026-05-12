## Goal
Upgrade `OrbitSystem` into a premium AI-tool ecosystem around the existing center portrait (untouched), distributing 25 AI brands across 4 orbit rings with glowing glass icons, smooth orbit + counter-rotation, hover glow, and lightweight performance.

## Approach

### 1. Brand icon source
Use `simple-icons` (SVG path data, tree-shakable, ~1KB each) for tools that exist there: ChatGPT (openai), Gemini (googlegemini), Claude (anthropic), Midjourney, Runway, ElevenLabs, Perplexity, Cursor, Replit, Notion, Stability AI, Canva, n8n, Google (AI Studio), Suno, Zapier.
For brands without simple-icons coverage (Lovable, HeyGen, Flow, Nano Banana, Bolt.new, Leonardo AI, Synthesia, Pika Labs, DeepSeek, Grok), use stylised 2-letter monograms in matching brand colors inside the same glass chip — visually consistent, zero extra bundle weight.

Install: `bun add simple-icons`. A small wrapper component renders `<svg>` from `simple-icons` path data + brand hex, with monogram fallback.

### 2. Data model
Single `AI_TOOLS` array with `{ name, slug?, initials?, color, ring, featured? }` distributed to avoid crowding (25 items / 4 rings):
- Ring 1 (inner, 240px) — 4: ChatGPT, Claude, Gemini, Lovable
- Ring 2 (360px) — 6: Midjourney, Runway, ElevenLabs, HeyGen, Cursor, Grok
- Ring 3 (480px) — 7: Perplexity, Replit, Bolt.new, Leonardo AI, Notion AI, Suno AI, Canva AI
- Ring 4 (outer, 600px) — 8: Flow, Nano Banana, Google AI Studio, Synthesia, Pika Labs, Stability AI, N8N, Zapier AI, DeepSeek

Alternating CW/CCW orbits with counter-rotation on each chip so logos stay upright (existing pattern).

### 3. Chip visual treatment
- 40px glass circle, `backdrop-blur`, 1px inner border `oklch(1 0 0 / 18%)`
- Brand-color tinted glow: `box-shadow: 0 0 18px <brand>/45%`
- Hover: scale 1.15, intensified glow, ring rotation pauses via `group-hover:[animation-play-state:paused]`, name label fades in beside chip
- 3 featured chips (ChatGPT, Claude, Lovable) get continuous `animate-pulse-glow`
- Icons 18px; monogram 11px bold

### 4. Orbit paths
Reuse existing `animate-orbit-cw-1/2`, `animate-orbit-ccw-1/2`. Add `-3` and `-4` variants in `styles.css` with longer durations (90s, 120s) so outer rings don't sprint. Add faint dashed stroke on rings 3 & 4 for orbit visibility.

### 5. Performance
- Pure CSS transforms (no JS per-frame)
- SVG inlined from `simple-icons` (zero network requests)
- `prefers-reduced-motion`: pause orbit animations
- Mobile (<768px): drop ring 4, shrink rings to 200/300/400, 32px chips, cap items per ring at 5 — keeps DOM ~14 chips on phone vs 25 on desktop
- Memoize icon path lookups

### 6. Background polish
Add 6–8 slow-drifting brand-colored particle dots (pure CSS, absolute) inside `OrbitSystem` for depth. `Starfield` and `NebulaLayer` remain unchanged.

### 7. Files

```text
src/components/site/hero/
  OrbitSystem.tsx     (rewrite: 4 rings, 25 tools, hover + pulse logic)
  AiToolChip.tsx      (new: glass chip with icon/monogram + glow + label)
  ai-tools.ts         (new: AI_TOOLS data + ring distribution)
src/styles.css        (+ orbit-cw-3/4, orbit-ccw-3/4 keyframes; tool-glow utility)
package.json          (+ simple-icons)
```

`SpaceHero.tsx`, `Starfield.tsx`, `NebulaLayer.tsx`, center portrait, and the rest of the page remain untouched.

### 8. Acceptance
- Center portrait identical to current
- 25 brand chips on desktop, ~14 on mobile, no overlap
- Smooth 60fps orbit, no jank on mid-range mobile
- Hover any chip → glow intensifies, ring pauses, name appears
- Reduced-motion users see static positioned chips
- No new network requests (icons inlined)
