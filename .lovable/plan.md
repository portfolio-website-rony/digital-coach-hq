## Goal
Hero-এর নিচে যে STATS section আছে (10K+, 500+, 50+, 5+) সেটাকে প্রথম reference image-এর মতো একটা **premium horizontal bar** হিসেবে redesign করব — gold/amber বড় numbers, thin vertical separators, dark bordered container, এবং বড় impressive values (seconds, hours ইত্যাদি)।

## Design Direction (inspired by reference)
- একটা single rounded container, subtle amber/gold border, deep black background
- ভিতরে 5টা stat cell, মাঝে thin vertical gold divider line
- বড় serif-ish display number (gold gradient: amber → bronze)
- নিচে ছোট uppercase-ish white label
- "+" sign number-এর পাশে gold-tinted

## New Stat Values (CoachRony কার্যক্রম-এর উপর based)
বর্তমান STATS array থেকে inspire নিয়ে impressive বড় numbers calculate করব:

| Value | Label | Logic |
|---|---|---|
| **259,200,000+** | Seconds Dedication | 5+ years × 365 × 24 × 60 × 60 (rounded) |
| **43,800+** | Hours Experience | 5 years active coaching hours |
| **10,000+** | Students Trained | existing |
| **500+** | Projects Delivered | existing |
| **50+** | AI Tools Mastered | existing |

(যদি আপনি অন্য numbers/labels চান, plan approve করার সময় বলে দিতে পারেন।)

## Files to Change

### `src/lib/site-data.ts`
- `STATS` array update — উপরের 5টা entry বসাব

### `src/routes/index.tsx` — STATS section
- বর্তমান `grid` of `GlassCard` সরিয়ে নতুন horizontal bar layout
- Single rounded container, amber border, internal flex row with dividers
- Mobile-এ 2-column wrap, desktop-এ single row 5 columns

### `src/styles.css`
- নতুন token যোগ: `--gold` এবং `--gold-glow` (oklch), `--gradient-gold` (amber → bronze gradient)
- Reusable utility class `.text-gold-gradient` এবং `.border-gold-soft`

## Untouched
- Hero section (SpaceHero) — কোনো change নেই
- বাকি সব section unchanged
- Design tokens semantic-ই থাকবে (hardcoded color নয়)

## Visual Result
```
┌─────────────────────────────────────────────────────────────┐
│  259,200,000+ │ 43,800+  │ 10,000+ │ 500+    │ 50+         │
│  Seconds...   │ Hours... │ Students│ Projects│ AI Tools... │
└─────────────────────────────────────────────────────────────┘
```
