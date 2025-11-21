-- Alternative: Database trigger approach for email notifications
-- This uses Supabase's built-in database webhooks feature
-- You can configure this in Supabase Dashboard > Database > Webhooks

-- Create a function to log email notifications (if using webhooks)
CREATE OR REPLACE FUNCTION notify_waitlist_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- This will trigger a webhook that you configure in Supabase Dashboard
  -- The webhook will call your email service
  PERFORM net.http_post(
    url := 'https://your-api-endpoint.com/waitlist-signup',
    headers := jsonb_build_object(
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'name', NEW.name,
      'email', NEW.email,
      'relationship_status', NEW.relationship_status
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger that fires after insert
CREATE TRIGGER waitlist_signup_trigger
  AFTER INSERT ON waitlist_signups
  FOR EACH ROW
  EXECUTE FUNCTION notify_waitlist_signup();

-- Note: This approach requires:
-- 1. Enabling the pg_net extension in Supabase
-- 2. Configuring your webhook endpoint
-- 3. Setting up authentication for the webhook endpoint
-- 
-- Alternatively, use the Edge Functions approach which is simpler
-- and doesn't require external webhook endpoints.

