-- Initial Supabase schema and RLS policies for Ayan Web Studio
-- Run this in Supabase SQL editor or via supabase CLI.
-- NOTE: Replace or run the admin-seed block after the admin user has signed up (or run now if user exists).

-- Enable extensions if not present (Supabase already provides pgcrypto/gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==================================================================
-- Profiles (linked to auth.users)
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

-- Create or update profile when a user registers (helper function)
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, created_at)
  VALUES (NEW.id, NEW.raw_user_meta->>'full_name', now())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users if table exists
-- Note: auth.users is a system table in Supabase — create trigger only if it exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'auth' AND tablename = 'users') THEN
    -- drop existing trigger if any
    IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'profiles_after_auth_insert') THEN
      EXECUTE 'DROP TRIGGER profiles_after_auth_insert ON auth.users';
    END IF;
    EXECUTE 'CREATE TRIGGER profiles_after_auth_insert
      AFTER INSERT ON auth.users
      FOR EACH ROW
      EXECUTE PROCEDURE public.handle_new_auth_user();';
  END IF;
END$$;

-- ==================================================================
-- Website & SEO Settings (single-row tables)
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

-- ==================================================================
-- Hero, Services, Pricing, Projects, Testimonials, FAQs
-- ==================================================================

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
-- Blog: posts, categories, tags
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

-- Helper many-to-many tables are optional; arrays are used above for simplicity

-- ==================================================================
-- Contact messages & bookings (form submissions)
-- ==================================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  phone text,
  message text,
  source text,
  metadata jsonb,
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

-- ==================================================================
-- Media metadata (optional indexing for media library)
-- ==================================================================
CREATE TABLE IF NOT EXISTS public.media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path text NOT NULL,
  public_url text,
  mime text,
  size bigint,
  uploaded_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- ==================================================================
-- Reviews (existing client reviews used in UI)
-- ==================================================================
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
-- Row Level Security (RLS) & Policies
-- ==================================================================

-- Enable RLS on tables that require it
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

-- Helper: check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin = true);
$$;

-- Profiles policies: users can read their own profile; admins can read all; users can update their own profile
CREATE POLICY "profiles_select_self_or_admin" ON public.profiles
  FOR SELECT USING (auth.uid() IS NOT NULL AND (id = auth.uid() OR public.is_admin()));
CREATE POLICY "profiles_update_self_or_admin" ON public.profiles
  FOR UPDATE USING (auth.uid() IS NOT NULL AND (id = auth.uid() OR public.is_admin()));
CREATE POLICY "profiles_insert_authenticated" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND id = auth.uid());

-- Website & content: public read; only admin insert/update/delete
CREATE POLICY "public_read" ON public.website_settings
  FOR SELECT USING (true);
CREATE POLICY "admin_manage_website_settings" ON public.website_settings
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "public_read_seo" ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY "admin_manage_seo" ON public.seo_settings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Content tables public read when published OR admin
CREATE POLICY "hero_select" ON public.hero FOR SELECT USING (published = true OR public.is_admin());
CREATE POLICY "hero_manage_admin" ON public.hero FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "services_select" ON public.services FOR SELECT USING (published = true OR public.is_admin());
CREATE POLICY "services_manage_admin" ON public.services FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "pricing_select" ON public.pricing_plans FOR SELECT USING (published = true OR public.is_admin());
CREATE POLICY "pricing_manage_admin" ON public.pricing_plans FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "projects_select" ON public.projects FOR SELECT USING (published = true OR public.is_admin());
CREATE POLICY "projects_manage_admin" ON public.projects FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "testimonials_select" ON public.testimonials FOR SELECT USING (status = 'approved' OR public.is_admin());
CREATE POLICY "testimonials_manage_admin" ON public.testimonials FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "faqs_select" ON public.faqs FOR SELECT USING (published = true OR public.is_admin());
CREATE POLICY "faqs_manage_admin" ON public.faqs FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Blog: only published posts visible publicly; admin sees all
CREATE POLICY "blog_select" ON public.blog_posts FOR SELECT USING (published = true OR public.is_admin());
CREATE POLICY "blog_manage_admin" ON public.blog_posts FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Contact messages and bookings: anyone can insert; only admin can read/manage
CREATE POLICY "contact_insert" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "contact_manage_admin" ON public.contact_messages FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "booking_insert" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "booking_manage_admin" ON public.bookings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Media: admin manage; public read handled via storage public URLs
CREATE POLICY "media_manage_admin" ON public.media FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Reviews: public select where approved; users can insert (pending); admin can manage
CREATE POLICY "reviews_select_public" ON public.reviews FOR SELECT USING (status = 'approved' OR public.is_admin());
CREATE POLICY "reviews_insert_any" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "reviews_manage_admin" ON public.reviews FOR UPDATE, DELETE USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ==================================================================
-- Initial seed for website_settings (optional)
-- ==================================================================
INSERT INTO public.website_settings (site_title, site_tagline, contact_email, logo_url, favicon_url, created_at)
SELECT 'Ayan Web Studio', 'Design • Build • Optimize', 'hello@ayanweb.studio', NULL, NULL, now()
WHERE NOT EXISTS (SELECT 1 FROM public.website_settings);

-- ==================================================================
-- Admin seeding: mark profile of given email as is_admin = true
-- Replace the email(s) below or run this block after the user signs up.
-- Provided admin email from user: 19dragongo.g@gmail.com

-- If a user with that email already exists in auth.users, set or insert a profile with is_admin=true
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = '19dragongo.g@gmail.com') THEN
    -- Upsert into profiles
    INSERT INTO public.profiles (id, full_name, is_admin, created_at)
    SELECT id, (raw_user_meta->>'full_name')::text, true, now() FROM auth.users WHERE email = '19dragongo.g@gmail.com'
    ON CONFLICT (id) DO UPDATE SET is_admin = true;
  END IF;
END$$;

-- ==================================================================
-- Indexes and housekeeping
-- ==================================================================
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects (published);
CREATE INDEX IF NOT EXISTS idx_services_published ON public.services (published);

-- Done.
