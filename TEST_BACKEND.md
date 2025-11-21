# How to Test if Supabase Backend is Working

## Quick Test Steps

### 1. Check if Data is Being Saved to Supabase

1. **Fill out the waitlist form** on your site
2. **Even if you see an error**, check Supabase Dashboard:
   - Go to: https://supabase.com/dashboard/project/hphhmjcutesqsdnubnnw
   - Navigate to **Table Editor** (left sidebar)
   - Click on **waitlist_signups** table
   - **Check if your data appears there!**

If you see your data in the table, **the backend is working!** The error you see is likely from the email function (which is optional).

### 2. Check the Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to **Console** tab
3. Fill out and submit the form
4. Look for:
   - ✅ Success messages (data saved)
   - ⚠️ Warning messages (email failed, but data saved)
   - ❌ Error messages (check what they say)

### 3. Common Issues and Solutions

#### Issue: "Cannot send emails to users outside the app"
- **Cause**: Edge Function not deployed yet or email service not configured
- **Solution**: Data is still being saved! The email function is optional. You can:
  - Deploy Edge Functions later (see SUPABASE_SETUP.md)
  - Or just use the database for now (emails are optional)

#### Issue: "Missing Supabase environment variables"
- **Cause**: `.env` file not loaded properly
- **Solution**: 
  1. Check `.env` file exists
  2. Restart your dev server: `npm run dev`
  3. Make sure Vite is reading the `.env` file

#### Issue: "relation 'waitlist_signups' does not exist"
- **Cause**: Database table not created yet
- **Solution**: Run the SQL in `CREATE_TABLE_SQL.sql` in Supabase SQL Editor

### 4. Test Database Directly (Advanced)

You can test if the database connection works by opening the browser console and running:

```javascript
// Test Supabase connection
import { supabase } from './src/api/supabaseClient';

// Test insert
const { data, error } = await supabase
  .from('waitlist_signups')
  .insert([
    { name: 'Test User', email: 'test@example.com', relationship_status: 'Single' }
  ])
  .select();

if (error) {
  console.error('Database error:', error);
} else {
  console.log('Success! Data saved:', data);
}
```

### 5. Verify in Supabase Dashboard

**The easiest way to verify the backend is working:**

1. Submit the form on your website
2. Go to Supabase Dashboard → Table Editor → waitlist_signups
3. If you see the data there = **Backend is working! ✅**

### 6. Check Network Requests

1. Open Developer Tools (F12) → **Network** tab
2. Submit the form
3. Look for requests to:
   - `supabase.co/rest/v1/waitlist_signups` (database insert)
   - `supabase.co/functions/v1/send-waitlist-notifications` (email function)

If you see a successful POST to `waitlist_signups`, the backend is working!

## What Success Looks Like

✅ **Success indicators:**
- Form shows success message after submission
- Data appears in Supabase Table Editor
- No errors in browser console (or only email warnings)
- Network tab shows successful POST request

⚠️ **Partial success (still good!):**
- Data saves to Supabase
- Email function fails (this is okay, emails are optional)
- User sees success message

❌ **Failure indicators:**
- Form shows error
- No data in Supabase Table Editor
- Console shows database connection errors

## Next Steps

Once you confirm data is being saved:
1. The backend is working! 🎉
2. You can deploy Edge Functions later for email notifications
3. For now, you can view all signups in Supabase Dashboard

---

**Remember**: If data appears in Supabase Dashboard → waitlist_signups table, **your backend is working correctly!**

