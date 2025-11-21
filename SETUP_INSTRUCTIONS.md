# Quick Setup Instructions for Your Supabase Project

Your project is configured! Follow these steps to complete the setup.

## Your Supabase Credentials (Already Configured)
- **Project ID**: hphhmjcutesqsdnubnnw
- **Project URL**: https://hphhmjcutesqsdnubnnw.supabase.co
- **Anon Key**: Already in .env file
- **Service Role Key**: Already in .env file

## Step 1: Create the Database Table

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/hphhmjcutesqsdnubnnw
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy and paste the entire contents of `supabase/migrations/001_create_waitlist_table.sql`
5. Click **Run** (or press Ctrl+Enter)
6. Verify the table was created by going to **Table Editor** - you should see `waitlist_signups` table

## Step 2: Set Up Supabase Secrets for Edge Functions

1. In your Supabase Dashboard, go to **Project Settings** (gear icon) → **Edge Functions** → **Secrets**
2. Add the following secrets:

   **Secret 1:**
   - **Name**: `RESEND_API_KEY`
   - **Value**: `sb_secret_saZSvc3EwcSfTnTHMfw7hQ_f0j58LnT`

   **Secret 2:**
   - **Name**: `ADMIN_EMAIL`
   - **Value**: `your-email@example.com` (replace with your actual email)

   **Secret 3:**
   - **Name**: `SUPABASE_URL`
   - **Value**: `https://hphhmjcutesqsdnubnnw.supabase.co`

   **Secret 4:**
   - **Name**: `SUPABASE_SERVICE_ROLE_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwaGhtamN1dGVzcXNkbnVibm53Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzMwNzY4OSwiZXhwIjoyMDcyODgzNjg5fQ.VGpk5DGOj1vERaUEH_43X6ZPQr8xtnfRboCyjLA22eE`

## Step 3: Install Supabase CLI (if not installed)

```bash
npm install -g supabase
```

## Step 4: Login and Link Your Project

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref hphhmjcutesqsdnubnnw
```

## Step 5: Deploy Edge Functions

```bash
# Deploy the email notifications function
supabase functions deploy send-waitlist-notifications

# Deploy the invite sender function
supabase functions deploy send-invites
```

## Step 6: Update Admin Email

Update the `VITE_ADMIN_EMAIL` in your `.env` file with your actual email address:

```
VITE_ADMIN_EMAIL=your-actual-email@example.com
```

Also update the `ADMIN_EMAIL` secret in Supabase Dashboard (Step 2) with the same email.

## Step 7: Verify Resend API Key

⚠️ **Important**: The Resend API key you provided (`sb_secret_saZSvc3EwcSfTnTHMfw7hQ_f0j58LnT`) looks like it might be a Supabase secret format. 

If emails don't work:
1. Go to https://resend.com
2. Sign in or create an account
3. Navigate to API Keys
4. Create a new API key (it should start with `re_`)
5. Update the `RESEND_API_KEY` secret in Supabase Dashboard

## Step 8: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Fill out the waitlist form on your site

3. Check:
   - ✅ The signup appears in Supabase Dashboard → Table Editor → waitlist_signups
   - ✅ You receive an admin notification email
   - ✅ The user receives a confirmation email

## Troubleshooting

### Emails not sending?
- Verify your Resend API key is correct (should start with `re_`)
- Check Edge Function logs in Supabase Dashboard → Edge Functions → Logs
- Verify all secrets are set correctly in Supabase Dashboard

### Database errors?
- Make sure you ran the SQL migration script
- Check Row Level Security policies in Database → Policies

### Function not found?
- Make sure you deployed both Edge Functions
- Check function names match exactly: `send-waitlist-notifications` and `send-invites`

## Ready to Launch?

When you're ready to invite all waitlist subscribers:

1. In Supabase Dashboard → Edge Functions → `send-invites`
2. Click **Invoke** (or use the admin script in `scripts/send-invites.js`)
3. All subscribers will receive launch invitation emails

---

Need help? Check `SUPABASE_SETUP.md` for more detailed information.

