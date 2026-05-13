## Goal
Coachrony Academy logo সাইটের Header ও Footer-এ add করা — current "Sparkles + CoachRony" wordmark replace করে।

## Issue & Solution
Logo image কালো text on white/transparent bg, কিন্তু সাইট dark theme। তাই CSS filter `invert + brightness` দিয়ে logo-কে light variant-এ render করব (text white, "BRIGHT YOUR SKILLS" portion-এর orange auto preserve হবে না — তাই simple invert করলে orange-ও invert হবে → blue হয়ে যাবে)।

**Better approach:** logo PNG-এ filter ছাড়াই use করব, কিন্তু Header glass-strong bg-এর উপর কালো text পড়বে না।

**Final approach:** logo PNG-কে `filter: invert(1) hue-rotate(180deg)` use করলে black→white, orange→blue হয়। সেটাও না।

**Best & cleanest:** logo SVG/PNG দুই version লাগে। যেহেতু একটাই আছে → আমি image-কে `mix-blend-mode: screen` বা simply white background pill-এর উপর place করব না (ব্র্যান্ড এ cluttered দেখাবে)।

→ Solution: logo image-কে **invert(1)** করব (black→white), তারপর orange portion আলাদা ভাবে preserve সম্ভব না। তাই pure invert করে whole logo white-on-dark করব। "BRIGHT YOUR SKILLS"-এর orange accent টা lose হবে — কিন্তু wordmark-টা clean থাকবে।

## Changes

### 1. Asset
- `code--copy user-uploads://image-8.png` → `src/assets/logo-coachrony.png`

### 2. `src/components/site/Header.tsx`
- Sparkles + "CoachRony" wordmark replace
- `<img src={logo} alt="Coachrony Academy" className="h-9 w-auto invert brightness-0 contrast-200" />` — wait, that strips orange too
- Use: `className="h-10 w-auto"` with CSS filter that inverts only dark pixels: `style={{ filter: 'invert(1)' }}` — converts black→white, the orange becomes a complementary cyan-ish though
- **Decision:** apply `filter: invert(1)` accepting orange→cyan tradeoff, OR keep image as-is with a subtle white pill background `bg-white/95 px-3 py-1.5 rounded-lg`
- **Going with white pill** — preserves brand orange exactly as designed, looks like an official brand badge

### 3. `src/components/site/Footer.tsx`
- Same replacement: white pill containing the logo image

### 4. Untouched
- All other content, colors, layouts, routes

## Result
Header ও Footer-এ official Coachrony Academy logo (orange "BRIGHT YOUR SKILLS" intact) একটা subtle white rounded pill-এর ভিতরে — branded badge feel।

Approve to apply.