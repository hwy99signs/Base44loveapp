-- Fix: Add policy for anon role (which is what anonymous users actually use)
-- The existing policy uses 'public' but Supabase anon key uses 'anon' role

-- Create policy specifically for anon role
CREATE POLICY "allow_anon_inserts"
  ON waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Verify all policies now
SELECT policyname, roles, cmd 
FROM pg_policies 
WHERE tablename = 'waitlist_signups';

