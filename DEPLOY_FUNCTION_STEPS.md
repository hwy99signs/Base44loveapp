# Deploy Edge Function - Run These Commands

Since the login requires a browser, run these commands **manually in your terminal**:

## Step 1: Login to Supabase
Open your terminal and run:
```powershell
npx supabase login
```
This will open your browser to authenticate. After logging in, come back to the terminal.

## Step 2: Link Your Project
```powershell
npx supabase link --project-ref hphhmjcutesqsdnubnnw
```
You'll be prompted to enter your database password (from Supabase Dashboard → Settings → Database).

## Step 3: Deploy the Function
```powershell
npx supabase functions deploy send-waitlist-notifications
```

## Alternative: Deploy via Supabase Dashboard

If the CLI doesn't work, you can also:
1. Go to Supabase Dashboard → Edge Functions
2. Click "Create a new function"
3. Copy the contents of `supabase/functions/send-waitlist-notifications/index.ts`
4. Paste into the dashboard editor
5. Deploy from there

## After Deployment

1. Make sure you've set the secrets in Supabase Dashboard:
   - `RESEND_API_KEY` = `re_MP9DpeBe_DPZEmDgyaqHcXjoBLEFtdPx4`
   - `ADMIN_EMAIL` = `subscriptions@one2onelove.com`

2. Test the form - when someone joins, you'll receive an email!

