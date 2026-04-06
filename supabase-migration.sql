-- ============================================================
-- KYFS Finance — Supabase Migration (v2)
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ──────────────────────────────────────────────────────────────
-- 1. PROFILES TABLE (with paid-user role)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'user'
               CHECK (role IN ('user', 'paid-user', 'admin', 'superadmin')),
  full_name   TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast role lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- ──────────────────────────────────────────────────────────────
-- 2. ROW LEVEL SECURITY — PROFILES
-- ──────────────────────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to ensure idempotency
DROP POLICY IF EXISTS "Users can read own profile"     ON profiles;
DROP POLICY IF EXISTS "Admins can read all profiles"   ON profiles;
DROP POLICY IF EXISTS "Superadmin can manage profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile"   ON profiles;

-- Own profile read
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Admin/Superadmin can read any profile
CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'superadmin')
    )
  );

-- Users can update their own non-role fields
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM profiles WHERE id = auth.uid()));

-- Superadmin full control
CREATE POLICY "Superadmin can manage profiles"
  ON profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role = 'superadmin'
    )
  );

-- ──────────────────────────────────────────────────────────────
-- 3. AUTO-CREATE PROFILE ON SIGNUP TRIGGER
-- ──────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update updated_at on row change
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_profile_updated ON profiles;
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ──────────────────────────────────────────────────────────────
-- 4. CALCULATOR USAGE TABLE
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS calculator_usage (
  id             BIGSERIAL PRIMARY KEY,
  calculator_id  TEXT        NOT NULL,
  user_id        UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id     TEXT,                   -- anonymous session tracking
  timestamp      TIMESTAMPTZ DEFAULT NOW(),
  parameters     JSONB                  -- store as JSONB for queryability
);

-- Indexes for admin dashboard queries
CREATE INDEX IF NOT EXISTS idx_calc_usage_calculator_id ON calculator_usage(calculator_id);
CREATE INDEX IF NOT EXISTS idx_calc_usage_user_id       ON calculator_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_calc_usage_timestamp     ON calculator_usage(timestamp DESC);

-- ──────────────────────────────────────────────────────────────
-- 5. ROW LEVEL SECURITY — CALCULATOR_USAGE
-- ──────────────────────────────────────────────────────────────
ALTER TABLE calculator_usage ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert usage"  ON calculator_usage;
DROP POLICY IF EXISTS "Admins can read usage"    ON calculator_usage;
DROP POLICY IF EXISTS "Users can read own usage" ON calculator_usage;

-- Anyone (anon or authed) can log a calculation
CREATE POLICY "Anyone can insert usage"
  ON calculator_usage FOR INSERT
  WITH CHECK (true);

-- Users can view their own usage
CREATE POLICY "Users can read own usage"
  ON calculator_usage FOR SELECT
  USING (auth.uid() = user_id);

-- Admin/Superadmin can read all usage for dashboard  
CREATE POLICY "Admins can read usage"
  ON calculator_usage FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'superadmin')
    )
  );

-- ──────────────────────────────────────────────────────────────
-- 6. ADMIN DASHBOARD VIEW (materialized for performance)
-- ──────────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW admin_calculator_stats AS
SELECT
  calculator_id,
  COUNT(*)                                              AS total_uses,
  COUNT(DISTINCT user_id)                               AS unique_users,
  COUNT(DISTINCT CASE WHEN timestamp >= NOW() - INTERVAL '30 days'
                      THEN user_id END)                AS monthly_active_users,
  COUNT(CASE WHEN timestamp >= NOW() - INTERVAL '30 days'
             THEN 1 END)                               AS monthly_uses,
  MAX(timestamp)                                        AS last_used_at
FROM calculator_usage
GROUP BY calculator_id
ORDER BY total_uses DESC;

-- Grant admin view access
-- (RLS is not applied to views by default; use security_invoker for stricter setup)
ALTER VIEW admin_calculator_stats SET (security_invoker = true);

-- ──────────────────────────────────────────────────────────────
-- 7. HELPER: MONTHLY ACTIVE USERS COUNT
-- ──────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_monthly_active_users()
RETURNS BIGINT
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(DISTINCT user_id)
  FROM calculator_usage
  WHERE timestamp >= NOW() - INTERVAL '30 days'
    AND user_id IS NOT NULL;
$$;

-- ──────────────────────────────────────────────────────────────
-- 8. SETUP INSTRUCTIONS
-- ──────────────────────────────────────────────────────────────
-- After running this migration, create your SuperAdmin:
-- 1. Supabase Auth → Users → Invite/Add User (e.g., admin@yourdomain.com)
-- 2. Run:
--    UPDATE profiles SET role = 'superadmin' WHERE email = 'admin@yourdomain.com';
