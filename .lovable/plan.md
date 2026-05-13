## Goal

লোগোর vibe (bold black + vibrant orange "BRIGHT YOUR SKILLS" accent, clean strong sans-serif) সাইটের সাথে align করা — কিন্তু existing structure, sections, hero animations, gold stat bar — সবই আগের মতো থাকবে, শুধু color language ও typography ব্র্যান্ডের সাথে মিলবে।

## Changes

### 1. `src/styles.css` — Brand color tokens
- `--primary` purple → **brand orange** `oklch(0.7 0.2 40)` (logo-র orange-red)
- `--primary-glow` → lighter warm orange `oklch(0.8 0.18 50)`
- `--accent` blue → **deep ink/charcoal** `oklch(0.25 0.02 270)` (logo black)
- `--accent-glow` → soft warm white
- `--ring` → orange
- `--gradient-primary` → orange → warm amber
- `--shadow-glow` → orange glow
- Background gradient radial spots: tone down purple/blue, add subtle warm orange wash at top
- Keep gold/bronze stat bar tokens as-is (complements orange beautifully)

### 2. Typography
- `--font-display`: keep Poppins but bump weight usage to **800/900** in headings for the "bold block" logo feel
- Add tighter letter-spacing on h1 (`-0.04em`) for that compressed logo energy
- No font swap needed — Poppins Black already matches the logo's geometric sans

### 3. Hero / sections
- No structural changes
- Existing `.text-gradient` automatically picks up new orange gradient
- Neon purple/blue shadow utilities → keep but reduce usage where they clash; primary glows now read as warm orange
- Logo wordmark (if used in `Header`) gets the orange "BRIGHT YOUR SKILLS"-style treatment via existing accent token

### 4. Untouched
- All routes, components, copy, layouts, hero animations, gold stat bar, SpaceHero structure
- Bengali content
- Section order

## Result
Same premium space-aesthetic site, but the dominant glow shifts from purple/blue → **brand orange + black**, matching the logo identity. Gold stat bar still reads premium because warm orange + gold + black is a cohesive palette.

Approve to apply.