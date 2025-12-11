-- Create videos table for video gallery
CREATE TABLE IF NOT EXISTS videos (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    category TEXT DEFAULT 'General',
    display_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create video_settings table for section customization
CREATE TABLE IF NOT EXISTS video_settings (
    id BIGSERIAL PRIMARY KEY,
    section_title TEXT DEFAULT 'Watch Our Stories',
    section_subtitle TEXT DEFAULT 'Video Gallery',
    section_description TEXT DEFAULT 'Discover more about our healthcare services, facilities, and patient experiences',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO video_settings (section_title, section_subtitle, section_description)
VALUES (
    'Watch Our Stories',
    'Video Gallery',
    'Discover more about our healthcare services, facilities, and patient experiences'
) ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON videos
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON video_settings
    FOR SELECT USING (true);

-- Create policies for insert/update/delete (for admin)
CREATE POLICY "Enable insert for all users" ON videos
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON videos
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON videos
    FOR DELETE USING (true);

CREATE POLICY "Enable update for all users" ON video_settings
    FOR UPDATE USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_videos_published ON videos(published);
CREATE INDEX IF NOT EXISTS idx_videos_display_order ON videos(display_order);
CREATE INDEX IF NOT EXISTS idx_videos_created_at ON videos(created_at DESC);

-- Insert sample videos (optional - you can remove these)
INSERT INTO videos (title, description, video_url, category, display_order, published)
VALUES 
    ('Welcome to Aarunya Health Care', 'Learn about our state-of-the-art facilities and compassionate care', 'dQw4w9WgXcQ', 'Introduction', 1, true),
    ('Advanced Diagnostic Services', 'Explore our cutting-edge diagnostic equipment and procedures', 'dQw4w9WgXcQ', 'Services', 2, true),
    ('Patient Testimonials', 'Hear from our satisfied patients about their experience', 'dQw4w9WgXcQ', 'Testimonials', 3, true),
    ('Meet Our Doctors', 'Get to know our expert medical team', 'dQw4w9WgXcQ', 'Team', 4, true)
ON CONFLICT DO NOTHING;
