/**
 * Admin script to send launch invitations to all waitlist subscribers
 * 
 * Usage:
 * 1. Make sure you have SUPABASE_SERVICE_ROLE_KEY set in your environment
 * 2. Run: node scripts/send-invites.js
 * 
 * Note: Keep the service role key secret! Never commit it to git.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables!');
  console.error('Required: VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function sendInvites() {
  console.log('🚀 Starting to send launch invitations...\n');

  try {
    // Call the send-invites Edge Function
    const { data, error } = await supabase.functions.invoke('send-invites', {
      headers: {
        Authorization: `Bearer ${supabaseServiceKey}`,
      },
    });

    if (error) {
      console.error('❌ Error calling send-invites function:', error);
      process.exit(1);
    }

    console.log('✅ Success!');
    console.log(`📧 Processed ${data?.results?.length || 0} invitations\n`);

    if (data?.results) {
      const successCount = data.results.filter(r => r.status === 'sent').length;
      const failedCount = data.results.filter(r => r.status === 'failed' || r.status === 'error').length;

      console.log(`✅ Successfully sent: ${successCount}`);
      if (failedCount > 0) {
        console.log(`❌ Failed: ${failedCount}`);
        console.log('\nFailed emails:');
        data.results
          .filter(r => r.status === 'failed' || r.status === 'error')
          .forEach(r => {
            console.log(`  - ${r.email}: ${r.error || 'Unknown error'}`);
          });
      }
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

sendInvites();

