-- FINAL RLS Fix - Try Multiple Approaches
-- Run each section one at a time and test

-- ==========================================
-- OPTION 1: Completely remove RLS (Simplest - recommended for public waitlist)
-- ==========================================
ALTER TABLE waitlist_signups DISABLE ROW LEVEL SECURITY;

-- ==========================================
-- OPTION 2: If you want to keep RLS enabled, try this permissive policy
-- ==========================================
-- First disable to clean up
-- ALTER TABLE waitlist_signups DISABLE ROW LEVEL SECURITY;

-- Drop ALL policies
-- DROP POLICY IF EXISTS "Allow public insert on waitlist_signups" ON waitlist_signups;
-- DROP POLICY IF EXISTS "Allow authenticated insert on waitlist_signups" ON waitlist_signups;
-- DROP POLICY IF EXISTS "Allow service role to read all" ON waitlist_signups;
-- DROP POLICY IF EXISTS "public_insert_policy" ON waitlist_signups;
-- DROP POLICY IF EXISTS "service_role_read_policy" ON waitlist_signups;

-- Re-enable RLS
-- ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Try with PUBLIC role (more permissive than anon)
-- CREATE POLICY "allow_all_inserts"
--   ON waitlist_signups
--   FOR INSERT
--   TO public
--   WITH CHECK (true);

-- ==========================================
-- OPTION 3: Check what policies currently exist
-- ==========================================
-- Run this to see all current policies:
-- SELECT 
--   schemaname,
--   tablename,
--   policyname,
--   permissive,
--   roles,
--   cmd,
--   qual,
--   with_check
-- FROM pg_policies
-- WHERE tablename = 'waitlist_signups';

