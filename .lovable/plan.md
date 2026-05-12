## Goal
Hero section-এ person-এর image (orbit system সহ) সবার উপরে দেখাবে, আর text content (badge, headline, description, CTA buttons, MissionOrb, FloatingStats) image-এর নিচে আসবে।

## Changes

### `src/components/site/hero/SpaceHero.tsx`
- বর্তমান two-column grid layout (left: text, right: orbit) পরিবর্তন করে single-column stacked layout করব।
- **Order:**
  1. **Top:** `OrbitSystem` (person portrait + AI tool rings) — center-aligned
  2. **Below:** Text content — badge → headline → description → CTA buttons → MissionOrb → FloatingStats grid
- Mobile ও desktop দুটোতেই same stacked order থাকবে।
- Text content center-aligned হবে যাতে image-এর সাথে visually balanced দেখায়।
- Spacing tune করব (image আর text-এর মাঝে proper gap)।
- Floating code chips position adjust করব নতুন layout-এর সাথে।

### Untouched
- `OrbitSystem.tsx`, `ai-tools.ts`, `AiToolChip.tsx` — কোনো change নেই
- Center portrait image — যেমন আছে তেমনই
- Starfield, NebulaLayer, MouseSpotlight backgrounds — unchanged
- বাকি page sections (Stats, About, Services ইত্যাদি) — unchanged
