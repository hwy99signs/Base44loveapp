-- FINAL TEST AND FIX
-- The SQL Editor runs as postgres role, which is why SET ROLE might not work for RLS testing

-- Step 1: Check what policies actually exist and their details
SELECT 
  policyname,
  roles,
  cmd,
  qual,
  with_check,
  permissive
FROM pg_policies
WHERE tablename = 'waitlist_signups'
ORDER BY policyname;

-- Step 2: Check current RLS status
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'waitlist_signups';

-- Step 3: If policies exist but still not working, try this simpler approach
-- Drop all and recreate with most permissive settings
ALTER TABLE waitlist_signups DISABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_can_insert" ON waitlist_signups;
DROP POLICY IF EXISTS "public_can_insert" ON waitlist_signups;
DROP POLICY IF EXISTS "authenticated_can_insert" ON waitlist_signups;
DROP POLICY IF EXISTS "service_can_read" ON waitlist_signups;

-- Re-enable
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Create policy with PERMISSIVE explicitly and no WITH CHECK restrictions
CREATE POLICY "anon_insert_permissive"
  ON waitlist_signups
  AS PERMISSIVE
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also try without WITH CHECK
CREATE POLICY "anon_insert_simple"
  ON waitlist_signups
  AS PERMISSIVE  
  FOR INSERT
  TO anon;

-- Step 4: Verify
SELECT policyname, roles, cmd, with_check
FROM pg_policies
WHERE tablename = 'waitlist_signups';

