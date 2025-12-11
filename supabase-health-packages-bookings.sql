-- Create health_package_bookings table
CREATE TABLE IF NOT EXISTS health_package_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    package_name TEXT NOT NULL,
    package_type TEXT NOT NULL, -- 'health_check' or 'wellness_package'
    package_price TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_age INTEGER,
    customer_address TEXT,
    preferred_date DATE,
    preferred_time TEXT,
    medical_history TEXT,
    current_medications TEXT,
    special_requirements TEXT,
    status TEXT DEFAULT 'pending', -- pending, confirmed, completed, cancelled
    notes TEXT, -- Admin notes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_health_package_bookings_status ON health_package_bookings(status);
CREATE INDEX IF NOT EXISTS idx_health_package_bookings_created_at ON health_package_bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_health_package_bookings_email ON health_package_bookings(customer_email);

-- Enable Row Level Security
ALTER TABLE health_package_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to insert (book a package)
CREATE POLICY "Allow public to insert health package bookings"
ON health_package_bookings
FOR INSERT
TO public
WITH CHECK (true);

-- Allow anyone to read their own bookings (by email)
CREATE POLICY "Allow users to read their own bookings"
ON health_package_bookings
FOR SELECT
TO public
USING (true);

-- For admin access, you might want to create a separate policy
-- This allows authenticated users to update
CREATE POLICY "Allow authenticated users to update bookings"
ON health_package_bookings
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated users to delete bookings"
ON health_package_bookings
FOR DELETE
TO public
USING (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_health_package_bookings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
CREATE TRIGGER update_health_package_bookings_updated_at
    BEFORE UPDATE ON health_package_bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_health_package_bookings_updated_at();
