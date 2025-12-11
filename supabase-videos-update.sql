-- Add section_visible column to video_settings table
ALTER TABLE video_settings ADD COLUMN IF NOT EXISTS section_visible BOOLEAN DEFAULT true;

-- Update existing record to have section visible
UPDATE video_settings SET section_visible = true WHERE id = 1;
