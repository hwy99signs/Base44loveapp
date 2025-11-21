// Supabase Edge Function to send launch invitations
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

serve(async (req) => {
  try {
    // Handle CORS
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        },
      });
    }

    // Verify this is called by admin (you can add authentication here)
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get all waitlist signups that haven't been invited yet
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: signups, error } = await supabase
      .from('waitlist_signups')
      .select('*')
      .eq('invited', false);

    if (error) {
      throw error;
    }

    const results = [];

    // Send invitation email to each signup
    for (const signup of signups || []) {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'One 2 One Love <noreply@one2onelove.com>',
            to: signup.email,
            subject: '🎉 You\'re Invited! One 2 One Love is Now Live!',
            text: `Hi ${signup.name || 'there'}!

🎉 Great news! One 2 One Love is now live, and you're invited to join us!

As one of our early waitlist subscribers, you have exclusive early access to all our features and tools to help your relationship grow.

Visit us at: https://one2onelove.com

We're so excited to have you on this journey with us!

With love,
The One 2 One Love Team

---
Love. Grow. Evolve. Together. 💜`,
          }),
        });

        if (emailResponse.ok) {
          // Mark as invited
          await supabase
            .from('waitlist_signups')
            .update({ invited: true, invited_at: new Date().toISOString() })
            .eq('id', signup.id);

          results.push({ email: signup.email, status: 'sent' });
        } else {
          results.push({ email: signup.email, status: 'failed' });
        }
      } catch (err) {
        console.error(`Failed to send invite to ${signup.email}:`, err);
        results.push({ email: signup.email, status: 'error', error: err.message });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Processed ${results.length} invitations`,
        results,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Error in send-invites:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});

