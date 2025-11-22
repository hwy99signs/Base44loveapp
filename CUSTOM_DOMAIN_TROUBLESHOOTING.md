# Custom Domain Troubleshooting Guide

If your website works on the Vercel URL but shows a blank page on `one2onelove.com`, follow these steps:

## 1. Check Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Verify these variables are set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. **Important:** Make sure they're available for **Production**, **Preview**, and **Development**
6. If they're missing, add them and **redeploy**

## 2. Verify Domain Configuration

1. Go to **Settings** → **Domains** in Vercel
2. Check that `one2onelove.com` is listed and shows a green checkmark
3. Verify the DNS records are correct:
   - `one2onelove.com` should have an A record pointing to `76.76.21.21` (Vercel's IP)
   - OR use CNAME: `cname.vercel-dns.com`
4. Check that SSL certificate is valid (should show "Valid")

## 3. Clear Cache and Redeploy

1. In Vercel dashboard, go to **Deployments**
2. Click on the three dots (⋮) next to your latest deployment
3. Click **Redeploy**
4. Or make a small change and push to trigger a new deployment

## 4. Hard Refresh Browser

1. Open `one2onelove.com` in your browser
2. Press `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
3. Or clear browser cache completely

## 5. Check Browser Console

1. Open `one2onelove.com`
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Look for any red error messages
5. Common errors:
   - `Missing Supabase environment variables` → Add env vars in Vercel
   - `Failed to fetch` → Check network connectivity
   - `404` errors → Check if assets are being served correctly

## 6. Verify Build Output

1. Check that `dist` folder exists after build
2. Verify `index.html` is in the root of `dist`
3. Check that `vercel.json` is in the project root

## 7. Test DNS Propagation

Run these commands in terminal:
```bash
# Check A record
nslookup one2onelove.com

# Check if domain resolves correctly
ping one2onelove.com
```

## 8. Check Vercel Deployment Logs

1. Go to **Deployments** in Vercel
2. Click on the latest deployment
3. Check **Build Logs** for any errors
4. Check **Function Logs** if you have Edge Functions

## 9. Force Redeploy

If nothing works, try:
1. Delete the domain from Vercel (Settings → Domains)
2. Wait 5 minutes
3. Re-add the domain
4. Wait for DNS propagation (can take up to 48 hours, usually much faster)
5. Redeploy the project

## 10. Contact Support

If the issue persists:
- Check Vercel's status page: https://vercel-status.com
- Contact Vercel support with:
  - Your project name
  - Domain name
  - Screenshot of browser console errors
  - Deployment logs

## Quick Checklist

- [ ] Environment variables are set in Vercel for all environments
- [ ] Domain is properly configured in Vercel
- [ ] DNS records are correct at your domain registrar
- [ ] SSL certificate is valid
- [ ] Latest deployment is successful
- [ ] Browser cache is cleared
- [ ] No errors in browser console

