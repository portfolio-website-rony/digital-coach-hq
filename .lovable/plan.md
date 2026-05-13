## Goal
Header navigation restructure:
**Home · About · Courses · Events · Shop · Book a Call**

## Changes

### 1. `src/components/site/Header.tsx`
Replace `NAV` array:
```ts
const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/events", label: "Events" },
  { to: "/shop", label: "Shop" },
];
```
"Book a Call" CTA button — already there, stays.

### 2. New route files (placeholders with proper SEO head + branded hero)
- `src/routes/courses.tsx` → `/courses` — show existing PROGRAMS data as course cards
- `src/routes/events.tsx` → `/events` — "Upcoming Events" placeholder section with empty state + CTA to book a call
- `src/routes/shop.tsx` → `/shop` — "Shop" placeholder ("Coming soon: digital products, templates, courses") with CTA

Each new route gets its own `head()` metadata (title/description/og), section header, and consistent design language (gold/orange brand).

### 3. About page
Already exists at `src/routes/about.tsx` — keep as-is (will show all "about me" info as user described). No change needed in this turn.

### 4. Old routes (services, programs, portfolio, blog, contact)
Keep the route files (still URL-accessible, used in Footer links etc.), just remove from main nav. Footer untouched.

### 5. Mobile menu
Same NAV array drives mobile menu — auto-updated.

## Result
Clean focused header: **Home, About, Courses, Events, Shop, Book a Call**. Three new routes with proper SEO and brand-consistent placeholder content ready for you to fill in later.

Approve to apply.