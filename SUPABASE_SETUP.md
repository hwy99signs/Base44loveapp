# Supabase Setup Guide for Waitlist

This guide will help you set up Supabase to handle waitlist signups with email notifications.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A Resend account for sending emails (sign up at https://resend.com) - or use another email service
3. Your project URL and API keys from Supabase

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in your project details and wait for it to be set up

## Step 2: Set Up the Database

1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `supabase/migrations/001_create_waitlist_table.sql`
3. Run the SQL script to create the `waitlist_signups` table

## Step 3: Configure Environment Variables

1. In your Supabase project, go to Settings > API
2. Copy your Project URL and anon/public key
3. Create a `.env` file in your project root with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_EMAIL=your-email@example.com
```

Replace:
- `your_supabase_project_url` with your actual Supabase project URL
- `your_supabase_anon_key` with your actual anon/public key
- `your-email@example.com` with the email where you want to receive notifications

## Step 4: Set Up Email Service (Resend)

### Option A: Using Resend (Recommended)

1. Sign up at https://resend.com
2. Verify your domain or use Resend's test domain
3. Create an API key in Resend dashboard
4. In Supabase, go to Project Settings > Edge Functions > Secrets
5. Add the following secrets:
   - `RESEND_API_KEY`: Your Resend API key
   - `ADMIN_EMAIL`: Your admin email address

### Option B: Using Another Email Service

You can modify the Edge Functions (`supabase/functions/send-waitlist-notifications/index.ts`) to use your preferred email service (SendGrid, Mailgun, AWS SES, etc.)

## Step 5: Deploy Edge Functions

1. Install Supabase CLI (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```
   (Find your project ref in Settings > General > Reference ID)

4. Deploy the Edge Functions:
   ```bash
   supabase functions deploy send-waitlist-notifications
   supabase functions deploy send-invites
   ```

## Step 6: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Fill out the waitlist form on your site
3. Check:
   - The signup appears in Supabase dashboard (Table Editor > waitlist_signups)
   - You receive an admin notification email
   - The user receives a confirmation email

## Step 7: Sending Invites When You Launch

When you're ready to launch and invite all waitlist subscribers:

1. In Supabase dashboard, go to Edge Functions
2. Call the `send-invites` function with your service role key, OR
3. Create a simple admin script to call the function:

```javascript
// admin-send-invites.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Keep this secret!

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function sendInvites() {
  const { data, error } = await supabase.functions.invoke('send-invites', {
    headers: {
      Authorization: `Bearer ${supabaseServiceKey}`,
    },
  });

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success:', data);
  }
}

sendInvites();
```

## Database Schema

The `waitlist_signups` table has the following structure:

- `id`: UUID (primary key)
- `name`: TEXT (optional)
- `email`: TEXT (required, unique)
- `relationship_status`: TEXT (optional)
- `created_at`: TIMESTAMP (auto-generated)
- `invited_at`: TIMESTAMP (set when invite is sent)
- `invited`: BOOLEAN (tracks if invite email was sent)

## Security Notes

- Row Level Security (RLS) is enabled on the table
- Public users can only INSERT (sign up)
- Only service role can read all records (for admin access)
- Keep your service role key secret and never expose it in client-side code
- The anon key is safe to use in client-side code

## Troubleshooting

### Emails not sending?
- Check that your Resend API key is set correctly in Supabase secrets
- Verify your Resend account is active and domain is verified
- Check the Edge Function logs in Supabase dashboard

### Database errors?
- Make sure you ran the migration SQL script
- Check that RLS policies are set correctly
- Verify your anon key is correct in `.env`

### Function not found?
- Make sure you deployed the Edge Functions
- Check the function name matches exactly
- Verify you're using the correct Supabase URL

## Support

For issues with:
- Supabase: Check https://supabase.com/docs
- Resend: Check https://resend.com/docs
- This implementation: Check the code comments or open an issue

