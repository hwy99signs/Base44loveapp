-- Check existing policy configuration
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

-- If "anon_insert" policy exists but still not working, drop and recreate it
DROP POLICY IF EXISTS "anon_insert" ON waitlist_signups;

-- Recreate with explicit PERMISSIVE and proper WITH CHECK
CREATE POLICY "anon_insert" 
  ON waitlist_signups
  AS PERMISSIVE
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Verify it was recreated
SELECT policyname, roles, cmd, with_check
FROM pg_policies
WHERE tablename = 'waitlist_signups'
AND policyname = 'anon_insert';

