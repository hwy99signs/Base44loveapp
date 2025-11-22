# 🚨 URGENT: Fix CORS Errors on Custom Domain

## The Problem
Your site works on the Vercel URL but shows a **blank white page** on `www.one2onelove.com` due to CORS errors caused by redirects between www and non-www domains.

## Quick Fix (Do This Now in Vercel Dashboard)

### Step 1: Configure Domain Settings in Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click on your project** (the one with `one2onelove.com`)
3. **Go to Settings → Domains**
4. **You should see both domains listed**:
   - `one2onelove.com`
   - `www.one2onelove.com`

### Step 2: Remove the Redirect

**Critical:** If `www.one2onelove.com` shows "Redirects to: one2onelove.com" - **THIS IS THE PROBLEM**

**Fix it:**
1. Click on `www.one2onelove.com` in the domains list
2. Look for a redirect setting
3. **Change it to "Primary" or remove the redirect entirely**
4. Both domains should now **serve the same content** (not redirect)

### Step 3: Force a New Deployment

**Option A: Via Vercel Dashboard (Easiest)**
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **⋮ (three dots)** menu
4. Click **Redeploy**
5. Wait 2-3 minutes for it to finish

**Option B: Push a New Commit**
The code has already been updated with relative paths. Just push any change:
```bash
git commit --allow-empty -m "Force rebuild with relative paths"
git push origin master
```

### Step 4: Clear Cache and Test

1. **Open browser in Incognito mode** (Ctrl + Shift + N)
2. Visit **BOTH**:
   - `https://www.one2onelove.com`
   - `https://one2onelove.com`
3. **Both should work now!** ✅

## What We Changed in the Code

✅ Added `base: './'` in `vite.config.js` - makes all asset paths relative  
✅ Added CORS headers in `vercel.json` - allows cross-origin requests  
✅ Updated `index.html` - uses relative paths for assets

## Why This Fixes It

**Before:**
- `www.one2onelove.com` redirects to `one2onelove.com`
- Assets try to load from `one2onelove.com` 
- Browser blocks due to CORS policy ❌

**After:**
- Both domains serve the same content (no redirect)
- Assets load with relative paths (from same domain)
- No CORS issues ✅

## Still Not Working?

1. **Check browser console** (F12 → Console tab)
2. **Look for errors** - should be gone now
3. **Verify deployment completed** - check Vercel dashboard
4. **Try different browser** - or clear all cache

## If Redirect is Required

If you MUST have www redirect to non-www, do it at **DNS level** (not Vercel):
1. At your domain registrar, set up proper DNS
2. Let Vercel serve both domains without redirects
3. Configure redirect at DNS/CDN level (like Cloudflare)

---

**The key fix is in Vercel Dashboard → Settings → Domains**  
**Make sure `www.one2onelove.com` is NOT redirecting to `one2onelove.com`**

