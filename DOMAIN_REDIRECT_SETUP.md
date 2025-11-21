# Setup Domain Redirect: www.one2onelove.com → one2onelove.com

To make both `www.one2onelove.com` and `one2onelove.com` work (with www redirecting to non-www):

## Option 1: In Vercel Dashboard (Recommended)

1. Go to your Vercel project → **Settings** → **Domains**
2. Add both domains:
   - `one2onelove.com` (primary)
   - `www.one2onelove.com` (secondary)
3. Vercel will automatically set up redirects
4. Make sure `one2onelove.com` is set as the **primary domain**

## Option 2: Using vercel.json (Already Added)

The `vercel.json` file now includes a redirect rule that will redirect `www.one2onelove.com` to `one2onelove.com`. This will work once:
- Both domains are added in Vercel Dashboard
- The changes are deployed

## DNS Configuration

At your domain registrar, make sure you have:

**For non-www (one2onelove.com):**
- **A Record**: `@` → Vercel IP (76.76.21.21)
- OR **CNAME**: `@` → `cname.vercel-dns.com`

**For www (www.one2onelove.com):**
- **CNAME Record**: `www` → `cname.vercel-dns.com`

## Verification

After setup:
- ✅ `one2onelove.com` → Works
- ✅ `www.one2onelove.com` → Redirects to `one2onelove.com`
- ✅ HTTPS works for both (automatic via Vercel)

---

**Note:** The redirect in `vercel.json` will handle the www → non-www redirect automatically once both domains are configured in Vercel.

