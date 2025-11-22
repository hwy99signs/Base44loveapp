# Fix for CORS Errors on Custom Domain

## The Problem
The console shows CORS errors because when accessing `www.one2onelove.com`, assets are being redirected to `one2onelove.com`, causing cross-origin issues.

## Solution Steps

### Step 1: Configure Both Domains in Vercel (No Redirect)

1. Go to your Vercel Dashboard
2. Navigate to **Settings** → **Domains**
3. You should see both `one2onelove.com` and `www.one2onelove.com`
4. **Important**: Make sure BOTH domains are configured as **primary** domains (not one redirecting to the other)

### Step 2: Check Domain Settings

For `one2onelove.com`:
- Should show: **Valid** SSL certificate
- Should NOT have a redirect configured

For `www.one2onelove.com`:
- Should show: **Valid** SSL certificate  
- Should NOT have a redirect configured
- OR if it has a redirect, make sure it redirects at the HTTP level (not causing CORS)

### Step 3: If One Domain is Redirecting to the Other

If you need one to redirect to the other, configure it at the **DNS level** (at your domain registrar), not at Vercel:

**Option A: Redirect www to non-www (DNS Level)**
1. At your domain registrar, set up a CNAME for `www.one2onelove.com` pointing to `cname.vercel-dns.com`
2. Keep `one2onelove.com` as A record pointing to Vercel's IP
3. This way, both resolve to the same Vercel deployment without redirects causing CORS

**Option B: Serve Both Domains (Recommended)**
1. In Vercel, configure both domains to serve the same deployment
2. Don't set up redirects between them
3. Both will work independently

### Step 4: Force a New Deployment

After changing domain settings:

1. Go to **Deployments** in Vercel
2. Click **⋮** (three dots) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Step 5: Clear Browser Cache

1. Open your browser in **Incognito/Private mode**
2. Or clear cache completely (Ctrl + Shift + Delete)
3. Visit both:
   - `https://www.one2onelove.com`
   - `https://one2onelove.com`

Both should now work without CORS errors.

## Verification

After these steps, check the browser console:
- ✅ No CORS errors
- ✅ Assets load successfully
- ✅ Page renders correctly

If you still see CORS errors, the assets are likely still using absolute URLs from an old build. The `base: './'` configuration should fix this, but you need to wait for a fresh deployment with the new build.

