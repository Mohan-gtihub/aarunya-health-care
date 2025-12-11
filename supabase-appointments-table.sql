-- Create appointments table in Supabase
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  department TEXT NOT NULL,
  department_id TEXT,
  doctor TEXT NOT NULL,
  doctor_id INTEGER,
  doctor_email TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  reason TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at DESC);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read appointments (for development)
CREATE POLICY "Anyone can view appointments"
ON appointments FOR SELECT
USING (true);

-- Allow anyone to insert appointments (for development)
CREATE POLICY "Anyone can insert appointments"
ON appointments FOR INSERT
WITH CHECK (true);

-- Allow anyone to update appointments (for development)
CREATE POLICY "Anyone can update appointments"
ON appointments FOR UPDATE
USING (true);

-- Allow anyone to delete appointments (for development)
CREATE POLICY "Anyone can delete appointments"
ON appointments FOR DELETE
USING (true);
