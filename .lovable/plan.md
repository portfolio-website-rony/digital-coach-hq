## Goal
"Students ও clients বলছেন" সেকশনটাকে static 2-column grid থেকে **continuous auto-scrolling marquee** এ রূপান্তর করা — দুই row, একটা ডানে, একটা বামে, আস্তে আস্তে চলতে থাকবে।

## Changes

### 1. `src/lib/site-data.ts`
- `TESTIMONIALS` array কে ৪ → **8–10 entries** এ বাড়ানো হবে (smooth loop-এর জন্য বেশি কার্ড লাগবে), realistic Bengali quotes দিয়ে। প্রতিটার `name`, `role`, `quote` থাকবে।

### 2. `src/styles.css`
নতুন keyframes এবং utility classes যোগ:
```css
@keyframes marquee-left  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
@keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
.animate-marquee-left  { animation: marquee-left  60s linear infinite; }
.animate-marquee-right { animation: marquee-right 60s linear infinite; }
.marquee-mask { mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent); }
```
Hover এ `[animation-play-state:paused]` (optional)।

### 3. `src/routes/index.tsx` — TESTIMONIALS section
2-col grid রিপ্লেস হবে দুটো marquee row দিয়ে:
- **Row 1 (top)** — `animate-marquee-right` (ডান দিকে চলবে), TESTIMONIALS-এর প্রথম অর্ধেক, **2x duplicated** seamless loop-এর জন্য।
- **Row 2 (bottom)** — `animate-marquee-left` (বাম দিকে চলবে), দ্বিতীয় অর্ধেক, একইভাবে duplicated।
- Outer wrapper-এ `overflow-hidden marquee-mask` (edge fade)।
- প্রতিটা card existing `GlassCard` styling রাখবে, fixed width `w-[320px] sm:w-[380px]` + `shrink-0`, gap `gap-5`।
- `flex w-max` inner track যাতে animation translateX করে infinite মনে হয়।

## Layout sketch
```text
┌─ overflow-hidden + edge fade mask ─────────────┐
│  [card][card][card][card]... → (scrolls right) │
│  [card][card][card][card]... ← (scrolls left)  │
└────────────────────────────────────────────────┘
```

## Notes
- Pure CSS animation, no JS / no extra dependency।
- Speed slow (~60s per loop) — user বলেছে "আস্তে আস্তে"।
- Mobile-এ একই কাজ করবে; cards same width, smooth।
- কোনো অন্য সেকশন বা business logic touch হচ্ছে না।