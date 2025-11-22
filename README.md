# One 2 One Love - Waitlist App

A beautiful coming soon page with waitlist functionality powered by Supabase.

This app was built with Vite+React and uses Supabase for backend storage and email notifications.

## Features

- 🌍 Multi-language support
- 📝 Waitlist signup form with relationship status
- ✉️ Automated email notifications (user confirmation + admin alerts)
- 🎨 Beautiful, responsive UI
- 🔐 Secure backend with Supabase

## Running the app

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Supabase credentials (see `README_SUPABASE.md`)

3. Run the development server:
```bash
npm run dev
```

## Building the app

```bash
npm run build
```

## Supabase Setup

This app requires Supabase for:
- Database storage of waitlist signups
- Email notifications via Edge Functions

For complete setup instructions, see `SUPABASE_SETUP.md`.

Quick start:
1. Create a Supabase project
2. Run the migration SQL script in `supabase/migrations/001_create_waitlist_table.sql`
3. Set up your `.env` file with Supabase credentials (see `README_SUPABASE.md`)
4. Deploy Edge Functions for email notifications (see `SUPABASE_SETUP.md`)

## Project Structure

- `src/components/comingsoon/` - Coming soon page components
- `src/pages/` - Page components
- `src/api/` - API client configurations (Supabase)
- `supabase/` - Database migrations and Edge Functions
- `SUPABASE_SETUP.md` - Complete Supabase setup guide

## Email Notifications

When users sign up for the waitlist:
- They receive a personalized confirmation email
- You (the admin) receive a notification email

When you're ready to launch:
- Use the `send-invites` Edge Function to send launch invitations to all waitlist subscribers

For more information and support, please contact One2onelove at subscriptions@one2onelove.com.