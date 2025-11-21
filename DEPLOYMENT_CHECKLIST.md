# Deployment Checklist

Before going live, make sure everything is ready:

## ✅ Pre-Deployment Checklist

### 1. Environment Variables
- [ ] `VITE_SUPABASE_URL` is set
- [ ] `VITE_SUPABASE_ANON_KEY` is set  
- [ ] `VITE_ADMIN_EMAIL` is set to `subscriptions@one2onelove.com`

### 2. Supabase Setup
- [ ] Database table `waitlist_signups` exists and RLS is disabled
- [ ] Edge Function `send-waitlist-notifications` is deployed
- [ ] Supabase secrets are configured:
  - [ ] `RESEND_API_KEY` = `re_MP9DpeBe_DPZEmDgyaqHcXjoBLEFtdPx4`
  - [ ] `ADMIN_EMAIL` = `subscriptions@one2onelove.com`

### 3. Code
- [ ] All changes are committed and pushed to GitHub
- [ ] Build command works: `npm run build`
- [ ] Test locally: `npm run preview`

### 4. Testing
- [ ] Waitlist form submits successfully
- [ ] Data appears in Supabase table
- [ ] Test email is received at `subscriptions@one2onelove.com`

## 🚀 Deployment Steps

1. Choose platform (Vercel recommended)
2. Connect GitHub repository
3. Add environment variables
4. Deploy
5. Test live site

## 🔗 Quick Links

- **Vercel**: https://vercel.com
- **Netlify**: https://netlify.com
- **Supabase Dashboard**: https://supabase.com/dashboard/project/hphhmjcutesqsdnubnnw

## 📝 Environment Variables to Set

When deploying, add these environment variables in your hosting platform:

```
VITE_SUPABASE_URL=https://hphhmjcutesqsdnubnnw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwaGhtamN1dGVzcXNkbnVibm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMDc2ODksImV4cCI6MjA3Mjg4MzY4OX0.JBW0sannIyJmzipxoT3aRZBcbkaRzZwfY0C92B-6V88
VITE_ADMIN_EMAIL=subscriptions@one2onelove.com
```

