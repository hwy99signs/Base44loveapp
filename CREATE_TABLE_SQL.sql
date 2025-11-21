-- Create waitlist_signups table
-- Fields: Name, Email Address, Relationship Status (with capitalized first letter)
-- This SQL is safe to run multiple times (handles existing table/policies)

-- Drop policies if they exist (to avoid errors)
DROP POLICY IF EXISTS "Allow public insert on waitlist_signups" ON waitlist_signups;
DROP POLICY IF EXISTS "Allow service role to read all" ON waitlist_signups;

-- Drop check constraint if it exists
ALTER TABLE IF EXISTS waitlist_signups DROP CONSTRAINT IF EXISTS check_relationship_status;

-- Create waitlist_signups table
CREATE TABLE IF NOT EXISTS waitlist_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL UNIQUE,
  relationship_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  invited_at TIMESTAMP WITH TIME ZONE,
  invited BOOLEAN DEFAULT FALSE,
  -- Constraint to ensure relationship_status has valid capitalized values
  CONSTRAINT check_relationship_status CHECK (
    relationship_status IS NULL OR 
    relationship_status IN ('Single', 'Dating', 'Engaged', 'Married', 'Others')
  )
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_signups(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist_signups(created_at DESC);

-- Enable Row Level Security
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for form submissions)
CREATE POLICY "Allow public insert on waitlist_signups"
  ON waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow service role to read all (for admin access)
CREATE POLICY "Allow service role to read all"
  ON waitlist_signups
  FOR SELECT
  TO service_role
  USING (true);
