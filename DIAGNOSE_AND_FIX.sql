-- COMPLETE DIAGNOSE AND FIX SCRIPT
-- Run this entire script to completely reset RLS

-- Step 1: Check current RLS status and policies
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'waitlist_signups';

-- Step 2: See all existing policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'waitlist_signups';

-- Step 3: DISABLE RLS (This is the simplest solution for a public waitlist)
ALTER TABLE waitlist_signups DISABLE ROW LEVEL SECURITY;

-- Step 4: If you MUST use RLS, try this approach instead:
-- First ensure we're in public schema explicitly
-- ALTER TABLE public.waitlist_signups DISABLE ROW LEVEL SECURITY;

-- Drop ALL policies in ALL schemas
-- DO $$ 
-- DECLARE
--   r RECORD;
-- BEGIN
--   FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'waitlist_signups') LOOP
--     EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON waitlist_signups';
--   END LOOP;
-- END $$;

-- Re-enable
-- ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Create using a simple format
-- CREATE POLICY "allow_insert" ON public.waitlist_signups
--   FOR INSERT
--   TO anon
--   WITH CHECK (true);

