-- INIT (SPLIT) MIGRATION FOR SUPABASE
-- PURPOSE: Run step-by-step in Supabase SQL editor to avoid errors like 42883 (undefined_function).
-- INSTRUCTIONS: Copy each STEP block and run it in order. Do not run the entire file in one go if you see errors.

-- ==================================================================
-- STEP 1: Create required extensions
-- Run this first. gen_random_uuid() requires pgcrypto. If pgcrypto is not available, use uuid-ossp and uuid_generate_v4().
-- ==================================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================================================================
-- STEP 2: Profiles table + helper function to create profile on auth.user insert
-- Run this after STEP 1
-- ==================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text,
  avatar_url text,
  company text,
  role text,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Helper: create a profile row when a new auth user is inserted.
-- This function is permissive: it uses both possible metadata fields, falling back to email.
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger AS $$
DECLARE
  _full_name text;
BEGIN
  -- Prefer raw_user_meta (older Supabase), fall back to user_metadata, then email
  _full_name := COALESCE(NEW.raw_user_meta->>'full_name', NEW.user_metadata->>'full_name', NEW.email);
  INSERT INTO public.profiles (id, full_name, created_at)
  VALUES (NEW.id, _full_name, now())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users if that table exists (Supabase). This block is safe to run multiple times.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'auth' AND tablename = 'users') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'profiles_after_auth_insert') THEN
      EXECUTE 'CREATE TRIGGER profiles_after_auth_insert
        AFTER INSERT ON auth.users
        FOR EACH ROW
        EXECUTE PROCEDURE public.handle_new_auth_user();';
    END IF;
  END IF;
END$$;

-- ==================================================================
-- STEP 3: Content tables (website settings, seo, hero, services, pricing, projects)
-- Run this after STEP 2
-- ==================================================================
CREATE TABLE IF NOT EXISTS public.website_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_title text,
  site_tagline text,
  logo_url text,
  favicon_url text,
  contact_email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.seo_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text,
  meta_title text,
  meta_description text,
  open_graph_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.hero (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  cta_text text,
  cta_url text,
  background_url text,
  sort_order integer DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  short_description text,
  long_description text,
  icon_url text,
  features jsonb,
  sort_order integer DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric(10,2) DEFAULT 0,
  billing_period text DEFAULT 'monthly',
  features jsonb,
  cta_text text,
  cta_url text,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text,
  description text,
  category text,
  cover_url text,
  gallery jsonb,
  project_url text,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text,
  company text,
  role text,
  rating integer,
  text text,
  avatar_url text,
  verified boolean DEFAULT false,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  sort_order integer DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- ==================================================================
-- STEP 4: Blog tables (categories, tags, posts)
-- Run this after STEP 3
-- ==================================================================
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  content jsonb,
  author_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  cover_url text,
  published boolean DEFAULT false,
  published_at timestamptz,
  read_time text,
  seo_title text,
  meta_description text,
  categories uuid[],
  tags uuid[],
  related_posts uuid[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- ==================================================================
-- STEP 5: Contact messages, bookings, media, reviews
-- Run this after STEP 4
-- ==================================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  phone text,
  message text,
  source text,
  metadata jsonb,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  phone text,
  date timestamptz,
  timezone text,
  notes text,
  status text DEFAULT 'pending',
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path text NOT NULL,
  public_url text,
  mime text,
  size bigint,
  uploaded_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.reviews (
  id text PRIMARY KEY,
  clientName text,
  company text,
  role text,
  rating integer,
  reviewText text,
  projectType text,
  verified boolean DEFAULT false,
  status text DEFAULT 'pending',
  createdAt date,
  avatar text
);

-- ==================================================================
-- STEP 6: Enable RLS on target tables
-- Run this after STEP 5
-- ==================================================================
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.reviews ENABLE ROW LEVEL SECURITY;

-- ==================================================================
-- STEP 7: Helper is_admin() function (used in policies)
-- Run this before creating policies
-- ==================================================================
CREATE OR REPLACE FUNCTION public.is_admin() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin = true);
$$;

-- ==================================================================
-- STEP 8: Policies. Run this after STEP 7
-- Note: Policies referencing auth.uid() require running inside Supabase
-- ==================================================================
-- Profiles
CREATE POLICY IF NOT EXISTS profiles_select_self_or_admin ON public.profiles
  FOR SELECT USING (auth.uid() IS NOT NULL AND (id = auth.uid() OR public.is_admin()));
CREATE POLICY IF NOT EXISTS profiles_update_self_or_admin ON public.profiles
  FOR UPDATE USING (auth.uid() IS NOT NULL AND (id = auth.uid() OR public.is_admin()));
CREATE POLICY IF NOT EXISTS profiles_insert_authenticated ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND id = auth.uid());

-- Website & SEO (public read, admin manage)
CREATE POLICY IF NOT EXISTS website_public_read ON public.website_settings FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS website_admin_manage ON public.website_settings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY IF NOT EXISTS seo_public_read ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS seo_admin_manage ON public.seo_settings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Content read for published OR admin
CREATE POLICY IF NOT EXISTS hero_select ON public.hero FOR SELECT USING (published = true OR public.is_admin());
CREATE POLICY IF NOT EXISTS hero_manage_admin ON public.hero FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY IF NOT EXISTS services_select ON public.services FOR SELECT USING (published = true OR public.is_admin());
CREATE POLICY IF NOT EXISTS services_manage_admin ON public.services FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY IF NOT EXISTS pricing_select ON public.pricing_plans FOR SELECT USING (published = true OR public.is_admin());
CREATE POLICY IF NOT EXISTS pricing_manage_admin ON public.pricing_plans FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY IF NOT EXISTS projects_select ON public.projects FOR SELECT USING (published = true OR public.is_admin());
CREATE POLICY IF NOT EXISTS projects_manage_admin ON public.projects FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY IF NOT EXISTS testimonials_select ON public.testimonials FOR SELECT USING (status = 'approved' OR public.is_admin());
CREATE POLICY IF NOT EXISTS testimonials_manage_admin ON public.testimonials FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY IF NOT EXISTS faqs_select ON public.faqs FOR SELECT USING (published = true OR public.is_admin());
CREATE POLICY IF NOT EXISTS faqs_manage_admin ON public.faqs FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Blog
CREATE POLICY IF NOT EXISTS blog_select ON public.blog_posts FOR SELECT USING (published = true OR public.is_admin());
CREATE POLICY IF NOT EXISTS blog_manage_admin ON public.blog_posts FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Contact messages and bookings: public insert, admin manage
CREATE POLICY IF NOT EXISTS contact_insert ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS contact_manage_admin ON public.contact_messages FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY IF NOT EXISTS booking_insert ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS booking_manage_admin ON public.bookings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Media admin only
CREATE POLICY IF NOT EXISTS media_manage_admin ON public.media FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Reviews public select where approved, insert allowed
CREATE POLICY IF NOT EXISTS reviews_select_public ON public.reviews FOR SELECT USING (status = 'approved' OR public.is_admin());
CREATE POLICY IF NOT EXISTS reviews_insert_any ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS reviews_manage_admin ON public.reviews FOR UPDATE, DELETE USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ==================================================================
-- STEP 9: Seed basic website settings (safe, idempotent)
-- Run after content tables exist
-- ==================================================================
INSERT INTO public.website_settings (site_title, site_tagline, contact_email, logo_url, favicon_url, created_at)
SELECT 'Ayan Web Studio', 'Design • Build • Optimize', 'hello@ayanweb.studio', NULL, NULL, now()
WHERE NOT EXISTS (SELECT 1 FROM public.website_settings);

-- ==================================================================
-- STEP 10: ADMIN SEED (RUN THIS ONLY AFTER YOU CREATE THE AUTH USER)
-- Steps:
-- 1) Create the admin Auth user in Supabase Auth (Dashboard -> Authentication -> Users -> New User)
-- 2) Then run the following block to upsert the profile and set is_admin=true for that user.
-- Replace the email address if needed.

-- Example (run after the auth user is created):
-- INSERT INTO public.profiles (id, full_name, is_admin, created_at)
-- SELECT id, COALESCE(raw_user_meta->>'full_name', user_metadata->>'full_name', email), true, now() FROM auth.users WHERE email = 'kumarraman26520@gmail.com'
-- ON CONFLICT (id) DO UPDATE SET is_admin = true;

-- ==================================================================
-- STEP 11: Indexes and housekeeping (optional)
-- ==================================================================
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects (published);
CREATE INDEX IF NOT EXISTS idx_services_published ON public.services (published);

-- End of migration
