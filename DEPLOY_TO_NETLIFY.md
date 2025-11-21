# Deploy to Netlify (Alternative - Also Easy)

Netlify is another great option for deploying React/Vite apps.

## Option 1: Deploy via Netlify Dashboard

1. **Go to Netlify**: https://netlify.com
2. **Sign up/Login** with your GitHub account
3. **Click "Add new site" → "Import an existing project"**
4. **Choose GitHub** and select `hwy99signs/Base44loveapp`
5. **Configure Build Settings**:
   - **Branch to deploy**: `backend` (or `master`)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. **Click "Show advanced"** and add environment variables:
   - `VITE_SUPABASE_URL` = `https://hphhmjcutesqsdnubnnw.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwaGhtamN1dGVzcXNkbnVibm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMDc2ODksImV4cCI6MjA3Mjg4MzY4OX0.JBW0sannIyJmzipxoT3aRZBcbkaRzZwfY0C92B-6V88`
   - `VITE_ADMIN_EMAIL` = `subscriptions@one2onelove.com`
7. **Click "Deploy site"**
8. **Done!** Your site will be live at a URL like: `https://your-project-name.netlify.app`

## Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod

# Follow prompts to link to site and set environment variables
```

## Create netlify.toml (Optional)

Create `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

