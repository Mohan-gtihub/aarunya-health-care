-- ONLY RUN THIS - Just the appointments table
-- The blog stuff is already set up

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

CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at DESC);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view appointments" ON appointments;
DROP POLICY IF EXISTS "Anyone can insert appointments" ON appointments;
DROP POLICY IF EXISTS "Anyone can update appointments" ON appointments;
DROP POLICY IF EXISTS "Anyone can delete appointments" ON appointments;

CREATE POLICY "Anyone can view appointments"
ON appointments FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert appointments"
ON appointments FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update appointments"
ON appointments FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete appointments"
ON appointments FOR DELETE
USING (true);
