# Setup Email Notifications to subscriptions@one2onelove.com

When users join the waitlist, you'll receive an email notification at **subscriptions@one2onelove.com**.

## Step 1: Set Up Resend Account

1. Go to https://resend.com
2. Sign up or log in
3. Navigate to **API Keys** in the dashboard
4. Create a new API key (it should start with `re_`)
5. Copy the API key

## Step 2: Configure Supabase Secrets

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/hphhmjcutesqsdnubnnw
2. Navigate to **Project Settings** → **Edge Functions** → **Secrets**
3. Add these secrets:

   **Secret 1:**
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (starts with `re_`)

   **Secret 2:**
   - **Name**: `ADMIN_EMAIL`
   - **Value**: `subscriptions@one2onelove.com`

## Step 3: Deploy the Edge Function

1. **Install Supabase CLI** (if not installed):
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**:
   ```bash
   supabase login
   ```

3. **Link your project**:
   ```bash
   supabase link --project-ref hphhmjcutesqsdnubnnw
   ```

4. **Deploy the Edge Function**:
   ```bash
   supabase functions deploy send-waitlist-notifications
   ```

## Step 4: Test

1. Fill out the waitlist form on your site
2. Submit it
3. Check your email at `subscriptions@one2onelove.com`
4. You should receive an email with subject: `💕 [ONE2ONE WAITLIST] New Signup - One 2 One Love`

## What Happens When Someone Joins

1. ✅ Data is saved to Supabase database
2. ✅ User receives a personalized confirmation email
3. ✅ You receive a notification email at subscriptions@one2onelove.com

## Troubleshooting

### Emails not sending?
- Check Edge Function logs in Supabase Dashboard → Edge Functions → Logs
- Verify RESEND_API_KEY is correct in Supabase secrets
- Make sure you deployed the Edge Function

### Function not found error?
- Make sure you deployed the Edge Function: `supabase functions deploy send-waitlist-notifications`
- Check function name matches exactly

---

**Note:** The form will still work and save data even if emails fail. Data saving to Supabase is the primary function - emails are a bonus!

