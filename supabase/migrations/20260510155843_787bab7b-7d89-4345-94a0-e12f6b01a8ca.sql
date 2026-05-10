
-- =======================
-- 1. Roles
-- =======================
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Bootstrap: first user becomes admin automatically
CREATE OR REPLACE FUNCTION public.bootstrap_first_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_bootstrap_admin
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.bootstrap_first_admin();

-- =======================
-- 2. updated_at helper
-- =======================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =======================
-- 3. Clients
-- =======================
CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  whatsapp text,
  country text,
  status text NOT NULL DEFAULT 'active',
  source text,
  tags text[] DEFAULT '{}',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage clients" ON public.clients
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_clients_updated BEFORE UPDATE ON public.clients
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =======================
-- 4. Leads — extend
-- =======================
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL;

CREATE POLICY "Admins view leads" ON public.leads
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update leads" ON public.leads
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete leads" ON public.leads
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.lead_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  note text NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage lead notes" ON public.lead_notes
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =======================
-- 5. Bookings — extend
-- =======================
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS meeting_link text,
  ADD COLUMN IF NOT EXISTS meeting_provider text,
  ADD COLUMN IF NOT EXISTS meeting_status text NOT NULL DEFAULT 'scheduled',
  ADD COLUMN IF NOT EXISTS session_notes text,
  ADD COLUMN IF NOT EXISTS recording_url text,
  ADD COLUMN IF NOT EXISTS completed_at timestamptz;

CREATE POLICY "Admins view bookings" ON public.bookings
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update bookings" ON public.bookings
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete bookings" ON public.bookings
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- =======================
-- 6. Payments
-- =======================
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  booking_id uuid REFERENCES public.bookings(id) ON DELETE SET NULL,
  amount numeric(12,2) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'BDT',
  method text NOT NULL DEFAULT 'other',
  transaction_id text,
  screenshot_path text,
  status text NOT NULL DEFAULT 'pending',
  notes text,
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage payments" ON public.payments
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_payments_updated BEFORE UPDATE ON public.payments
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =======================
-- 7. Subscribers — admin read
-- =======================
CREATE POLICY "Admins view subscribers" ON public.subscribers
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete subscribers" ON public.subscribers
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- =======================
-- 8. CMS — Blog
-- =======================
CREATE TABLE public.cms_blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text,
  cover_url text,
  tags text[] DEFAULT '{}',
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published blog" ON public.cms_blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Admins manage blog" ON public.cms_blog_posts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_blog_updated BEFORE UPDATE ON public.cms_blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Testimonials
CREATE TABLE public.cms_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author text NOT NULL,
  role text,
  quote text NOT NULL,
  avatar_url text,
  rating int DEFAULT 5,
  display_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published testimonials" ON public.cms_testimonials FOR SELECT USING (published = true);
CREATE POLICY "Admins manage testimonials" ON public.cms_testimonials FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_testimonials_updated BEFORE UPDATE ON public.cms_testimonials FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Portfolio
CREATE TABLE public.cms_portfolio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text,
  description text,
  cover_url text,
  link text,
  display_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_portfolio ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published portfolio" ON public.cms_portfolio FOR SELECT USING (published = true);
CREATE POLICY "Admins manage portfolio" ON public.cms_portfolio FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_portfolio_updated BEFORE UPDATE ON public.cms_portfolio FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Services
CREATE TABLE public.cms_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon text,
  display_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published services" ON public.cms_services FOR SELECT USING (published = true);
CREATE POLICY "Admins manage services" ON public.cms_services FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_services_updated BEFORE UPDATE ON public.cms_services FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Programs
CREATE TABLE public.cms_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price text,
  features text[] DEFAULT '{}',
  display_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published programs" ON public.cms_programs FOR SELECT USING (published = true);
CREATE POLICY "Admins manage programs" ON public.cms_programs FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_programs_updated BEFORE UPDATE ON public.cms_programs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Site Settings
CREATE TABLE public.cms_site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site settings" ON public.cms_site_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage site settings" ON public.cms_site_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_settings_updated BEFORE UPDATE ON public.cms_site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed default settings
INSERT INTO public.cms_site_settings (key, value) VALUES
  ('contact', jsonb_build_object(
    'whatsapp', '8801700000000',
    'messenger', 'https://m.me/coachrony',
    'facebook', 'https://facebook.com/coachrony',
    'email', 'hello@coachrony.com'
  ))
ON CONFLICT (key) DO NOTHING;

-- =======================
-- 9. Storage buckets
-- =======================
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-media', 'cms-media', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) VALUES ('payment-screenshots', 'payment-screenshots', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read cms-media" ON storage.objects FOR SELECT USING (bucket_id = 'cms-media');
CREATE POLICY "Admins write cms-media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update cms-media" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete cms-media" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read payment-screenshots" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'payment-screenshots' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write payment-screenshots" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'payment-screenshots' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete payment-screenshots" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'payment-screenshots' AND public.has_role(auth.uid(), 'admin'));
