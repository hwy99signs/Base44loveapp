# Deploy Edge Function - Windows Instructions

Since installing Supabase CLI globally via npm doesn't work on Windows, use one of these methods:

## Method 1: Use npx (No Installation Needed) ✅ EASIEST

Run these commands one at a time:

```powershell
# Login to Supabase
npx supabase login

# Link your project
npx supabase link --project-ref hphhmjcutesqsdnubnnw

# Deploy the email notification function
npx supabase functions deploy send-waitlist-notifications
```

## Method 2: Install via Scoop (Windows Package Manager)

If you have Scoop installed:

```powershell
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

Then run:
```powershell
supabase login
supabase link --project-ref hphhmjcutesqsdnubnnw
supabase functions deploy send-waitlist-notifications
```

## Method 3: Install Scoop First (If You Don't Have It)

1. Open PowerShell as Administrator
2. Run:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
```
3. Then follow Method 2 above

## Recommended: Use Method 1 (npx)

It's the quickest and doesn't require installing anything!

