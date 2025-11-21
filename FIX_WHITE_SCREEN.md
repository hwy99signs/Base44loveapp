# Fix White Screen on Vercel

If you're seeing a white screen after deployment, try these fixes:

## Issue 1: Missing vercel.json (Fixed)
✅ I've created `vercel.json` - this handles SPA routing

## Issue 2: Environment Variables Not Set

**Check in Vercel Dashboard:**
1. Go to your project → Settings → Environment Variables
2. Make sure ALL 3 variables are set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_EMAIL`
3. If missing, add them and **redeploy**

## Issue 3: Check Browser Console

1. Open your deployed site
2. Press F12 → Console tab
3. Look for errors:
   - "Missing Supabase environment variables" = env vars not set
   - "Failed to fetch" = network issue
   - Red errors = specific issues

## Issue 4: Redeploy After Adding Variables

After adding environment variables:
1. Go to Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"

Or push a new commit to trigger auto-deploy.

## Quick Fix Steps:

1. ✅ `vercel.json` file created (committed)
2. Push `vercel.json` to GitHub
3. Verify environment variables in Vercel Dashboard
4. Redeploy if variables were added
5. Check browser console for specific errors

## If Still White Screen:

Check browser console and look for:
- Module not found errors
- Environment variable errors
- Supabase connection errors

