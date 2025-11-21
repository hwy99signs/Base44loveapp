# Quick Email Setup - You're Almost Done!

Your Resend API key is configured. Now follow these steps:

## Step 1: Set Supabase Secrets

1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/hphhmjcutesqsdnubnnw
2. Navigate to **Project Settings** → **Edge Functions** → **Secrets**
3. Add/Update these secrets:

   **Secret 1: RESEND_API_KEY**
   - Name: `RESEND_API_KEY`
   - Value: `re_MP9DpeBe_DPZEmDgyaqHcXjoBLEFtdPx4`

   **Secret 2: ADMIN_EMAIL**
   - Name: `ADMIN_EMAIL`
   - Value: `subscriptions@one2onelove.com`

## Step 2: Deploy Edge Function

Run these commands in your terminal:

```bash
# Make sure you're in the project directory
cd "C:\Users\user\Downloads\one-2-one-love-b1f12063"

# Install Supabase CLI (if not installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref hphhmjcutesqsdnubnnw

# Deploy the email notification function
supabase functions deploy send-waitlist-notifications
```

## Step 3: Test

1. Fill out the waitlist form on your site
2. Submit it
3. Check your email at `subscriptions@one2onelove.com`
4. You should receive: `💕 [ONE2ONE WAITLIST] New Signup - One 2 One Love`

## That's It!

Once deployed, every time someone joins the waitlist:
- ✅ Data saves to Supabase
- ✅ User gets confirmation email
- ✅ You get notification at subscriptions@one2onelove.com

