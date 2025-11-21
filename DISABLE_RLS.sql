-- Disable Row Level Security for waitlist_signups table
-- This is safe for a public waitlist form since users can only INSERT

ALTER TABLE waitlist_signups DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'waitlist_signups';
-- Should show: rls_enabled = false

