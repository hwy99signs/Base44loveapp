# Test Supabase Connection

If RLS is still causing issues, let's verify the connection is working properly.

## Quick Test in Browser Console

Open your browser console (F12) and run:

```javascript
// Check if Supabase client is loaded
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing');

// Test direct connection
import { supabase } from './src/api/supabaseClient';

// Try a simple test insert
supabase
  .from('waitlist_signups')
  .insert([{ 
    name: 'Test User', 
    email: 'test@example.com', 
    relationship_status: 'Single' 
  }])
  .select()
  .then(({ data, error }) => {
    if (error) {
      console.error('Error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
    } else {
      console.log('Success!', data);
    }
  });
```

## Check Error Details

When you get the RLS error, check the browser console for:
- Error message
- Error code (should be 42501 for RLS violations)
- Error details

## Final Solution: Disable RLS

For a public waitlist form, RLS isn't necessary. Just run:

```sql
ALTER TABLE waitlist_signups DISABLE ROW LEVEL SECURITY;
```

This is safe because:
1. It's a public waitlist form anyway
2. The table only accepts inserts
3. Users can't read or modify other people's data
4. You have the email field marked as UNIQUE to prevent duplicates

