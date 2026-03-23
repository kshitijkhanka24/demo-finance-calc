-- Supabase Migration: Create profiles table and calculator_usage improvements
-- Run this SQL in your Supabase SQL Editor (Dashboard > SQL Editor)

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'superadmin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Allow authenticated users to read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- 4. Allow superadmin/admin to read all profiles
CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- 5. Allow superadmin to insert/update/delete profiles
CREATE POLICY "Superadmin can manage profiles"
  ON profiles
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'superadmin'
    )
  );

-- 6. Auto-create profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if any
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Ensure calculator_usage table exists with parameters column
CREATE TABLE IF NOT EXISTS calculator_usage (
  id BIGSERIAL PRIMARY KEY,
  calculator_id TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  parameters TEXT
);

-- 8. Allow everyone to insert into calculator_usage (public analytics)
ALTER TABLE calculator_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert usage"
  ON calculator_usage
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can read usage"
  ON calculator_usage
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- NOTE: After running this migration, manually create the super admin user:
-- 1. Go to Supabase Auth > Users > Add User
-- 2. Email: admin@kyfs.com, Password: Kyfs@123#
-- 3. Then run: UPDATE profiles SET role = 'superadmin' WHERE email = 'admin@kyfs.com';
