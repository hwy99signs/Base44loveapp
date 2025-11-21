-- COMPLETE RLS RESET - This will fix everything
-- Run this ENTIRE script at once

-- Step 1: Disable RLS to clean up
ALTER TABLE waitlist_signups DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies (completely clean slate)
DROP POLICY IF EXISTS "Allow public insert on waitlist_signups" ON waitlist_signups;
DROP POLICY IF EXISTS "Allow authenticated insert on waitlist_signups" ON waitlist_signups;
DROP POLICY IF EXISTS "Allow service role to read all" ON waitlist_signups;
DROP POLICY IF EXISTS "allow_all_inserts" ON waitlist_signups;
DROP POLICY IF EXISTS "allow_anon_inserts" ON waitlist_signups;
DROP POLICY IF EXISTS "service_read_all" ON waitlist_signups;
DROP POLICY IF EXISTS "public_insert_policy" ON waitlist_signups;
DROP POLICY IF EXISTS "service_role_read_policy" ON waitlist_signups;

-- Step 3: Re-enable RLS
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Step 4: Create SIMPLE policy for anon - using PUBLIC schema explicitly
CREATE POLICY "anon_can_insert"
  ON public.waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Step 5: Also create for public role (just in case)
CREATE POLICY "public_can_insert"
  ON public.waitlist_signups
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Step 6: Create policy for authenticated users
CREATE POLICY "authenticated_can_insert"
  ON public.waitlist_signups
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Step 7: Allow service role to read
CREATE POLICY "service_can_read"
  ON public.waitlist_signups
  FOR SELECT
  TO service_role
  USING (true);

-- Step 8: Verify policies were created
SELECT 
  schemaname,
  tablename,
  policyname,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'waitlist_signups';

