-- Add WhatsApp number field to doctors table
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;

-- Create admin_settings table for storing admin WhatsApp number and other settings
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_settings
CREATE POLICY "Anyone can view admin_settings"
ON admin_settings FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert admin_settings"
ON admin_settings FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update admin_settings"
ON admin_settings FOR UPDATE
USING (true);

-- Insert default admin WhatsApp number (you can update this later)
INSERT INTO admin_settings (setting_key, setting_value)
VALUES ('admin_whatsapp_number', '+919876543210')
ON CONFLICT (setting_key) DO NOTHING;

-- Add comment
COMMENT ON TABLE admin_settings IS 'Stores admin panel settings including WhatsApp numbers';
COMMENT ON COLUMN doctors.whatsapp_number IS 'WhatsApp number for appointment notifications';
