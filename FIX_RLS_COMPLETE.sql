-- Complete RLS Fix for waitlist_signups
-- This will remove ALL existing policies and recreate them correctly

-- Step 1: Disable RLS temporarily to check what's there
ALTER TABLE waitlist_signups DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies (clean slate)
DROP POLICY IF EXISTS "Allow public insert on waitlist_signups" ON waitlist_signups;
DROP POLICY IF EXISTS "Allow authenticated insert on waitlist_signups" ON waitlist_signups;
DROP POLICY IF EXISTS "Allow service role to read all" ON waitlist_signups;

-- Step 3: Re-enable RLS
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Step 4: Create policy for anonymous users (public) - THIS IS CRITICAL
CREATE POLICY "Allow public insert on waitlist_signups"
  ON waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Step 5: Create policy for authenticated users
CREATE POLICY "Allow authenticated insert on waitlist_signups"
  ON waitlist_signups
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Step 6: Create policy for service role to read all
CREATE POLICY "Allow service role to read all"
  ON waitlist_signups
  FOR SELECT
  TO service_role
  USING (true);

-- Step 7: Verify the policies were created
-- You should see 3 policies after running this
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'waitlist_signups';

