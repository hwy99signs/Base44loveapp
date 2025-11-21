# Add Custom Domain: one2onelove.com

## Step 1: Add Domain in Vercel

1. **Go to Vercel Dashboard** → Your Project
2. Click **"Settings"** → **"Domains"**
3. Click **"Add"** button
4. Enter your domain: `one2onelove.com`
5. Click **"Add"**

## Step 2: Configure DNS Records

Vercel will show you DNS records to add. You'll need to add these at your domain registrar (where you bought one2onelove.com):

### Option A: A Record (IPv4)
- **Type**: `A`
- **Name**: `@` (or leave blank/root)
- **Value**: Vercel's IP address (Vercel will show this, usually `76.76.21.21`)

### Option B: CNAME Record (Recommended)
- **Type**: `CNAME`
- **Name**: `@` (or leave blank/root)
- **Value**: `cname.vercel-dns.com`

### For www subdomain:
- **Type**: `CNAME`
- **Name**: `www`
- **Value**: `cname.vercel-dns.com`

## Step 3: Domain Providers Guide

### If using popular registrars:

**GoDaddy:**
1. Login → My Products → DNS
2. Add the A or CNAME record
3. Save changes

**Namecheap:**
1. Domain List → Manage → Advanced DNS
2. Add the A or CNAME record
3. Save changes

**Cloudflare:**
1. Select domain → DNS → Records
2. Add the A or CNAME record
3. Make sure proxy is disabled (gray cloud) for initial setup

**Google Domains / Squarespace:**
1. DNS settings
2. Add the records shown in Vercel
3. Save

## Step 4: Wait for DNS Propagation

- DNS changes can take **5 minutes to 48 hours** to propagate
- Usually takes **15-30 minutes**
- Vercel will show when the domain is connected (green checkmark)

## Step 5: SSL Certificate

Vercel automatically provides SSL certificates (HTTPS). After DNS propagates:
- Vercel will automatically issue a Let's Encrypt certificate
- Your site will be available at `https://one2onelove.com`
- This usually happens automatically within a few minutes

## Step 6: Redirect www to non-www (Optional)

Vercel can redirect `www.one2onelove.com` → `one2onelove.com`:
1. Add `www.one2onelove.com` as another domain in Vercel
2. Vercel will automatically set up redirect

## Troubleshooting

### Domain not connecting?
- Wait longer (up to 48 hours)
- Check DNS records are correct
- Make sure no conflicting records exist
- Verify domain isn't already connected elsewhere

### SSL not working?
- Wait for DNS to fully propagate
- Vercel usually issues SSL within minutes after DNS is correct
- Check Vercel dashboard for SSL status

### Need help finding your domain registrar?
- Check your email for domain purchase confirmation
- Common registrars: GoDaddy, Namecheap, Google Domains, Cloudflare

---

**Quick Summary:**
1. Add domain in Vercel Dashboard → Settings → Domains
2. Add DNS records at your domain registrar (A or CNAME)
3. Wait for DNS to propagate (15-30 minutes usually)
4. Vercel automatically sets up HTTPS
5. Done! Your site will be live at one2onelove.com

