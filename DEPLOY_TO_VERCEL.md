# Deploy to Vercel (Recommended - Easiest)

Vercel is the easiest way to deploy your Vite + React app. It's free and takes 2 minutes!

## Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with your GitHub account
3. **Click "Add New Project"**
4. **Import your repository**: 
   - Select `hwy99signs/Base44loveapp`
   - Choose the `backend` branch (or `master`)
5. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
6. **Add Environment Variables**:
   Click "Environment Variables" and add:
   - `VITE_SUPABASE_URL` = `https://hphhmjcutesqsdnubnnw.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwaGhtamN1dGVzcXNkbnVibm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMDc2ODksImV4cCI6MjA3Mjg4MzY4OX0.JBW0sannIyJmzipxoT3aRZBcbkaRzZwfY0C92B-6V88`
   - `VITE_ADMIN_EMAIL` = `subscriptions@one2onelove.com`
7. **Click "Deploy"**
8. **Done!** Your site will be live in ~2 minutes at a URL like: `https://your-project-name.vercel.app`

## Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from your project directory)
vercel

# Follow the prompts:
# - Link to existing project? No (first time)
# - Project name? (press Enter for default)
# - Directory? ./ (press Enter)
# - Override settings? No (press Enter)

# Add environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_ADMIN_EMAIL

# Deploy to production
vercel --prod
```

## After Deployment

- ✅ Your site is live!
- ✅ Every push to GitHub will auto-deploy
- ✅ Check your site at the Vercel-provided URL
- ✅ Test the waitlist form - it should work!

## Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `one2onelove.com`)

