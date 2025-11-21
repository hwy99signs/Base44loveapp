# Quick Start: Supabase Environment Variables

Create a `.env` file in your project root with these variables:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_EMAIL=your-email@example.com
```

## Getting Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** > **API**
3. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

## Next Steps

See `SUPABASE_SETUP.md` for complete setup instructions including:
- Database setup
- Email service configuration (Resend)
- Edge Function deployment
- Testing and troubleshooting

