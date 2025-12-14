-- Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    department TEXT,
    bio TEXT,
    image_url TEXT,
    email TEXT,
    linkedin_url TEXT,
    display_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Founder Info Table
CREATE TABLE IF NOT EXISTS founder_info (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    quote TEXT,
    bio TEXT,
    image_url TEXT,
    years_experience INTEGER,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE founder_info ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on team_members" ON team_members
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on founder_info" ON founder_info
    FOR SELECT USING (true);

-- Create policies for authenticated users (admin) to manage
CREATE POLICY "Allow authenticated users to insert team_members" ON team_members
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update team_members" ON team_members
    FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated users to delete team_members" ON team_members
    FOR DELETE USING (true);

CREATE POLICY "Allow authenticated users to insert founder_info" ON founder_info
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update founder_info" ON founder_info
    FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated users to delete founder_info" ON founder_info
    FOR DELETE USING (true);

-- Insert default founder data (you can modify this)
INSERT INTO founder_info (name, title, quote, bio, years_experience, image_url)
VALUES (
    'Mr. Vaishnav',
    'Founder & Director',
    'Our mission is to provide compassionate, accessible, and world-class healthcare to every individual who walks through our doors.',
    'With over two decades of experience in healthcare management and a vision to transform medical services in the region, Mr. Vaishnav founded Aarunya Health Care with a commitment to excellence and patient-centered care. His leadership has been instrumental in establishing state-of-the-art facilities and bringing together a team of dedicated healthcare professionals.',
    20,
    '/images/founder.jpg'
) ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX idx_team_members_active ON team_members(active);
CREATE INDEX idx_team_members_display_order ON team_members(display_order);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_founder_info_updated_at BEFORE UPDATE ON founder_info
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
