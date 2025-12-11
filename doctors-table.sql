-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  specialization TEXT NOT NULL,
  department TEXT NOT NULL,
  qualification TEXT,
  experience TEXT,
  about TEXT,
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  consultation_fee INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_doctors_department ON doctors(department);
CREATE INDEX IF NOT EXISTS idx_doctors_available ON doctors(available);
CREATE INDEX IF NOT EXISTS idx_doctors_name ON doctors(name);

-- Enable RLS
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view doctors" ON doctors;
DROP POLICY IF EXISTS "Anyone can insert doctors" ON doctors;
DROP POLICY IF EXISTS "Anyone can update doctors" ON doctors;
DROP POLICY IF EXISTS "Anyone can delete doctors" ON doctors;

-- Create policies
CREATE POLICY "Anyone can view doctors"
ON doctors FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert doctors"
ON doctors FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update doctors"
ON doctors FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete doctors"
ON doctors FOR DELETE
USING (true);
