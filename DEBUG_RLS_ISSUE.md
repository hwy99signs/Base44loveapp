# Debug RLS Issue - All Policies Exist But Still Failing

Since all policies are created correctly (`anon_can_insert`, `public_can_insert`, etc.) but you're still getting RLS errors, let's check:

## Step 1: Test Direct Insert in Supabase SQL Editor

Run this to verify the table itself works:

```sql
-- Test direct insert as postgres role (should work)
INSERT INTO waitlist_signups (name, email, relationship_status)
VALUES ('Test Direct', 'testdirect@example.com', 'Single');

-- Check if it was inserted
SELECT * FROM waitlist_signups WHERE email = 'testdirect@example.com';
```

If this works, the table is fine. The issue is with the client connection.

## Step 2: Check What Role Your Client is Using

The error might be because:
1. Your client is connecting with a different role
2. There's a connection issue
3. The anon key isn't being used

## Step 3: Check Browser Console

Open DevTools (F12) → Console and look for:
- What URL is being called?
- What's the exact error response?
- Are there any network errors?

## Step 4: Verify Your .env File is Loaded

In browser console, run:
```javascript
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Has Anon Key:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
```

## Step 5: Try Disabling RLS Temporarily to Confirm

If disabling RLS makes it work, it's definitely an RLS/role issue:
```sql
ALTER TABLE waitlist_signups DISABLE ROW LEVEL SECURITY;
```

Then test the form. If it works with RLS disabled, we know it's a role/permission issue.

## Step 6: Check if Multiple Policies are Conflicting

Sometimes multiple policies can conflict. Try dropping all except the anon one:

```sql
DROP POLICY IF EXISTS "public_can_insert" ON waitlist_signups;
DROP POLICY IF EXISTS "authenticated_can_insert" ON waitlist_signups;
-- Keep only anon_can_insert
```

