// Supabase Edge Function to send email notifications
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || '';

const personalizedEmailContent = {
  Single: {
    subject: 'Your Journey to Love Starts Here 💫',
    body: (name: string) => `Hi ${name || 'there'}!

Thank you for joining the One 2 One Love waitlist!

As someone who's single, you're in the perfect position to prepare for a meaningful relationship. Our platform will help you:

✨ Build self-awareness and emotional intelligence
💪 Develop healthy relationship habits before you meet someone
💝 Understand your love language and communication style
🎯 Set clear relationship goals and values

When we launch, you'll have access to tools and resources that help you become the best partner you can be - even before you find "the one."

Get ready to invest in yourself and your future relationship!

With love,
The One 2 One Love Team

---
Love. Grow. Evolve. Together.`
  },
  Dating: {
    subject: 'Strengthen Your Dating Journey 💕',
    body: (name: string) => `Hi ${name || 'there'}!

Thank you for joining the One 2 One Love waitlist!

Navigating the dating phase can be exciting and challenging. Our platform will help you:

💬 Improve communication with your partner
🎯 Set healthy boundaries and relationship expectations
💝 Understand each other's love languages
🌟 Create meaningful experiences together
📈 Track your relationship growth and milestones

When we launch, you'll get access to expert guidance, fun date ideas, and tools to help your relationship flourish during this important stage.

We're excited to support your journey together!

With love,
The One 2 One Love Team

---
Love. Grow. Evolve. Together.`
  },
  Engaged: {
    subject: 'Prepare for Your Forever Together 💍',
    body: (name: string) => `Hi ${name || 'there'}!

Thank you for joining the One 2 One Love waitlist! Congratulations on your engagement!

This exciting time is perfect for strengthening your foundation. Our platform will help you:

💑 Build strong communication patterns before marriage
🏡 Align on important life goals and values
💰 Navigate important discussions (finances, family, future)
💝 Keep romance alive during wedding planning stress
🎉 Create rituals and traditions for your marriage

When we launch, you'll have access to tools specifically designed to help engaged couples transition smoothly into married life.

Here's to your beautiful journey ahead!

With love,
The One 2 One Love Team

---
Love. Grow. Evolve. Together.`
  },
  Married: {
    subject: 'Deepen Your Marriage Connection ❤️',
    body: (name: string) => `Hi ${name || 'there'}!

Thank you for joining the One 2 One Love waitlist!

Marriage is a beautiful journey that requires continuous nurturing. Our platform will help you:

💑 Strengthen your emotional and physical intimacy
🔥 Reignite the spark and romance
💬 Master conflict resolution and communication
📅 Never miss important dates and anniversaries
🎯 Set and achieve relationship goals together
🌟 Create new memories and break routine patterns

When we launch, you'll have access to expert advice, creative date ideas, and tools to help your marriage thrive for years to come.

Here's to growing deeper in love!

With love,
The One 2 One Love Team

---
Love. Grow. Evolve. Together.`
  },
  Others: {
    subject: 'Your Unique Love Journey Matters 🌈',
    body: (name: string) => `Hi ${name || 'there'}!

Thank you for joining the One 2 One Love waitlist!

Every love story is unique, and we're here to support yours. Our platform will help you:

💝 Build deeper connections in your relationship
💬 Improve communication and understanding
🌟 Create meaningful experiences together
🎯 Set and achieve relationship goals
🤝 Access inclusive, supportive resources

When we launch, you'll have access to tools and guidance designed to support all types of relationships and love journeys.

We're honored to be part of your story!

With love,
The One 2 One Love Team

---
Love. Grow. Evolve. Together.`
  }
};

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

    const { name, email, relationship_status } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get email content based on relationship status
    const status = relationship_status || 'Others';
    const emailContent = personalizedEmailContent[status as keyof typeof personalizedEmailContent] || personalizedEmailContent.Others;

    // Send confirmation email to user
    const userEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'One 2 One Love <noreply@one2onelove.com>',
        to: email,
        subject: emailContent.subject,
        text: emailContent.body(name || 'there'),
      }),
    });

    if (!userEmailResponse.ok) {
      const error = await userEmailResponse.text();
      console.error('Failed to send user email:', error);
    }

    // Send notification email to admin
    if (ADMIN_EMAIL) {
      const adminEmailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'One 2 One Love <noreply@one2onelove.com>',
          to: ADMIN_EMAIL,
          subject: '💕 [ONE2ONE WAITLIST] New Signup - One 2 One Love',
          text: `🌟 NEW WAITLIST SUBSCRIBER 🌟
━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ Another couple is joining the One 2 One Love journey!

Name: ${name || 'Not provided'}
Email: ${email}
Relationship Status: ${relationship_status || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━
Love. Grow. Evolve. Together. 💜`,
        }),
      });

      if (!adminEmailResponse.ok) {
        const error = await adminEmailResponse.text();
        console.error('Failed to send admin email:', error);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Emails sent successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Error in send-waitlist-notifications:', error);
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

