# CoachRony Admin Panel — Phase 1

একটি premium dark-mode SaaS-style admin dashboard যেখানে আপনি leads, bookings, meetings, payments, clients ও সম্পূর্ণ website content ম্যানেজ করতে পারবেন। Single admin (আপনার email) only।

---

## 1. Auth & Access Control

- Email/password signup + login (`/admin/login`, `/admin/signup`)
- `user_roles` table + `app_role` enum (`admin`) + `has_role()` security-definer function
- প্রথম signup-এ যদি কোনো admin না থাকে → auto-promote (bootstrap)। পরে শুধু allowlisted email admin হবে
- `_admin` layout route — `beforeLoad` চেক করে session + admin role; না হলে `/admin/login`-এ redirect
- Logout, session timeout handling

## 2. Database (new tables via migration)

- **clients** — name, email, phone, whatsapp, country, tags[], notes, status, source, created_at
- **bookings** (extend) — link to client_id, meeting_link, meeting_provider (meet/zoom/manual), meeting_status, session_notes, completed_at
- **payments** — client_id, booking_id, amount, currency, method (bkash/nagad/rocket/stripe/sslcommerz/other), txn_id, screenshot_url, status (pending/paid/refunded), paid_at, notes
- **lead_notes** — lead_id, note, created_at (timeline)
- **lead_status** column on `leads` (new/contacted/qualified/converted/lost) + `tags[]`
- **CMS tables**: `cms_blog_posts`, `cms_testimonials`, `cms_portfolio`, `cms_services`, `cms_programs`, `cms_site_settings` (key/value JSON for hero, about, contact info, social links, WhatsApp number)
- **Storage buckets**: `payment-screenshots` (private), `cms-media` (public)
- RLS: all admin tables — read/write only via `has_role(auth.uid(), 'admin')`. Public read on CMS published rows.

## 3. Admin Layout

- Collapsible shadcn sidebar with nav: Dashboard, Leads, Bookings, Meetings, Clients, Payments, CMS, Settings
- Top bar: search, notifications bell, profile menu
- Glassmorphism cards, dark premium theme matching existing site tokens
- Mobile responsive (sidebar → sheet)

## 4. Pages

### Dashboard (`/admin`)
Stat cards (Total Leads, Bookings, Today's Meetings, Revenue, Pending Payments, Active Clients) + monthly revenue chart (recharts) + lead-source pie + recent activity feed

### Leads (`/admin/leads`)
- Data table: search, filter by status/source/date, sortable
- Row click → drawer with full details, notes timeline, status/tag editor, "WhatsApp" + "Email" + "Convert to Client" buttons
- CSV export

### Bookings (`/admin/bookings`)
- Table + calendar view toggle
- Confirm / reschedule / cancel
- Attach meeting link (manual paste Meet/Zoom URL), set provider
- Auto-send confirmation status (logged for now; email/WhatsApp wiring later)

### Meetings (`/admin/meetings`)
- Today / Upcoming / Past tabs
- Join button (opens link), copy link, mark completed, add session notes, upload recording URL

### Clients (`/admin/clients`)
- List + profile page (`/admin/clients/$id`) showing: info, booking history, payment history, notes, tags, WhatsApp button
- Convert lead → client action

### Payments (`/admin/payments`)
- Manual entry form (client, amount, method, txn id, screenshot upload)
- Filter by status/method/date, totals summary
- Mark paid/refunded, view screenshot

### CMS (`/admin/cms`)
Tabs: Blog | Testimonials | Portfolio | Services | Programs | Site Settings
- CRUD for each (rich text via simple textarea/markdown for now)
- Image upload to `cms-media` bucket
- Public site reads from these tables (replacing static `site-data.ts` for those sections)

### Settings (`/admin/settings`)
- Profile, change password
- Site-wide settings (WhatsApp number, social links, email)
- Admin allowlist management

## 5. Public Site Updates

- Replace hardcoded WhatsApp/Messenger/Facebook links in Header, Footer, FloatingActions, Contact with values from `cms_site_settings`
- Blog/Portfolio/Testimonials sections fetch from CMS tables (with fallback to current static content if empty)
- Booking form on `/book` saves with `client_id` lookup-or-create

## 6. Integrations (this phase)

- **WhatsApp**: `wa.me/<number>?text=...` deep links from every client/lead row
- **Meet/Zoom**: manual link paste field on bookings — admin pastes, system displays on Thank You page + client profile
- **Email/SMS reminders**: NOT in this phase (placeholders + status flags only)
- **Payment gateways**: NOT integrated — manual tracking only

## 7. Out of Scope (future phases)

- Google Calendar/Meet auto-creation, Zoom API
- WhatsApp Business API, automated reminders (email/SMS cron)
- Live payment gateways (bKash/Stripe/SSLCommerz checkout)
- AI assistant, 2FA, activity audit log, PWA

## Technical notes

- TanStack Start route structure: `src/routes/_admin.tsx` (layout + auth guard) + `src/routes/_admin/*.tsx` for each page
- Server functions (`createServerFn` + `requireSupabaseAuth`) for all admin reads/writes; admin role re-checked server-side via `has_role`
- CMS public reads use the regular browser `supabase` client with public-read RLS policies
- File uploads via `supabase.storage` directly from admin UI
- Charts: recharts (already common); tables: shadcn table + tanstack-table

```text
src/routes/
  _admin.tsx                     (auth guard layout)
  _admin/index.tsx               (dashboard)
  _admin/leads.tsx
  _admin/bookings.tsx
  _admin/meetings.tsx
  _admin/clients.tsx
  _admin/clients.$id.tsx
  _admin/payments.tsx
  _admin/cms.tsx                 (tabs)
  _admin/settings.tsx
  admin.login.tsx
  admin.signup.tsx
```
