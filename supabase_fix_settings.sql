-- Run this in Supabase SQL Editor to fix the visibility issue

-- 1. Ensure the admin_settings table exists
CREATE TABLE IF NOT EXISTS admin_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- 3. CRITICAL: Allow public users (website visitors) to READ the settings
-- Without this, the website cannot check if the section should be hidden
DROP POLICY IF EXISTS "Public settings are viewable by everyone" ON admin_settings;
CREATE POLICY "Public settings are viewable by everyone" 
ON admin_settings FOR SELECT USING (true);

-- 4. Allow admins to change settings
DROP POLICY IF EXISTS "Admins can manage settings" ON admin_settings;
CREATE POLICY "Admins can manage settings" 
ON admin_settings FOR ALL USING (auth.role() = 'authenticated');
