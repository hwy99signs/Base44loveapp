-- Simple RLS Policy for waitlist_signups
-- This allows anyone (anonymous users) to insert into the table

-- First, disable RLS temporarily
ALTER TABLE waitlist_signups DISABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Allow public insert on waitlist_signups" ON waitlist_signups;
DROP POLICY IF EXISTS "Allow authenticated insert on waitlist_signups" ON waitlist_signups;
DROP POLICY IF EXISTS "Allow service role to read all" ON waitlist_signups;

-- Re-enable RLS
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Create ONE simple policy that allows anonymous inserts
-- This is the simplest possible policy
CREATE POLICY "public_insert_policy"
  ON waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Optional: Allow service role to read (for admin access)
CREATE POLICY "service_role_read_policy"
  ON waitlist_signups
  FOR SELECT
  TO service_role
  USING (true);

