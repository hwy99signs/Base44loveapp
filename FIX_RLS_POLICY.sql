-- Fix Row Level Security Policy for waitlist_signups
-- This will allow public users (anon) to insert into the table

-- Drop existing policy if it exists (in case it was misconfigured)
DROP POLICY IF EXISTS "Allow public insert on waitlist_signups" ON waitlist_signups;

-- Create the policy to allow anonymous (public) inserts
CREATE POLICY "Allow public insert on waitlist_signups"
  ON waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also create a policy for authenticated users if needed
DROP POLICY IF EXISTS "Allow authenticated insert on waitlist_signups" ON waitlist_signups;

CREATE POLICY "Allow authenticated insert on waitlist_signups"
  ON waitlist_signups
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Verify RLS is enabled (should already be enabled, but this ensures it)
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

