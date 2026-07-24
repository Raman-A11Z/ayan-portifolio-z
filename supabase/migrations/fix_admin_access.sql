-- ==================================================================
-- FIX ADMIN ACCESS
-- Run this in the Supabase Dashboard -> SQL Editor.
-- Safe to run multiple times (idempotent).
--
-- It repairs the bugs from the original init.sql that prevented the
-- admin panel from working:
--   1. The new-user trigger referenced a non-existent column
--      (raw_user_meta) instead of raw_user_meta_data, which made
--      user creation fail and never created a profiles row.
--   2. An invalid RLS policy (FOR UPDATE, DELETE) aborted the migration.
--   3. Ensures a profiles row exists with is_admin = true for the admin.
--
-- ADMIN EMAIL: kumarraman26520@gmail.com
-- ==================================================================

-- ------------------------------------------------------------------
-- 1. Repair the new-user trigger function (correct column name)
-- ------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, created_at)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', now())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-attach the trigger on auth.users
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'auth' AND tablename = 'users') THEN
    IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'profiles_after_auth_insert') THEN
      EXECUTE 'DROP TRIGGER profiles_after_auth_insert ON auth.users';
    END IF;
    EXECUTE 'CREATE TRIGGER profiles_after_auth_insert
      AFTER INSERT ON auth.users
      FOR EACH ROW
      EXECUTE PROCEDURE public.handle_new_auth_user();';
  END IF;
END$$;

-- ------------------------------------------------------------------
-- 2. Make sure the is_admin() helper exists
-- ------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin = true);
$$;

-- ------------------------------------------------------------------
-- 3. Fix the invalid reviews policy (split UPDATE and DELETE)
-- ------------------------------------------------------------------
DROP POLICY IF EXISTS "reviews_manage_admin" ON public.reviews;
DROP POLICY IF EXISTS "reviews_update_admin" ON public.reviews;
DROP POLICY IF EXISTS "reviews_delete_admin" ON public.reviews;
CREATE POLICY "reviews_update_admin" ON public.reviews FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "reviews_delete_admin" ON public.reviews FOR DELETE USING (public.is_admin());

-- ------------------------------------------------------------------
-- 4. Backfill profiles for any existing auth users (so nobody is stuck)
-- ------------------------------------------------------------------
INSERT INTO public.profiles (id, full_name, created_at)
SELECT u.id, (u.raw_user_meta_data->>'full_name')::text, now()
FROM auth.users u
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------
-- 5. Grant admin to the designated email (only works if the user exists)
-- ------------------------------------------------------------------
DO $$
DECLARE
  admin_uid uuid;
BEGIN
  SELECT id INTO admin_uid FROM auth.users WHERE email = 'kumarraman26520@gmail.com' LIMIT 1;

  IF admin_uid IS NULL THEN
    RAISE NOTICE 'No auth user found for kumarraman26520@gmail.com. Create the user first (Dashboard -> Authentication -> Users -> Add user), then re-run this script.';
  ELSE
    INSERT INTO public.profiles (id, is_admin, created_at)
    VALUES (admin_uid, true, now())
    ON CONFLICT (id) DO UPDATE SET is_admin = true;
    RAISE NOTICE 'Admin granted to kumarraman26520@gmail.com';
  END IF;
END$$;

-- ------------------------------------------------------------------
-- 6. Verify (optional): should return the admin row with is_admin = true
-- ------------------------------------------------------------------
SELECT p.id, u.email, p.is_admin
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE u.email = 'kumarraman26520@gmail.com';
