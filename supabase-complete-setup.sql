-- ============================================
-- COMPLETE SUPABASE SETUP SCRIPT
-- Run this ONCE in your Supabase SQL Editor
-- ============================================

-- 1. CREATE BLOG POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL DEFAULT 'health',
  author TEXT,
  image_url TEXT,
  video_url TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CREATE APPOINTMENTS TABLE
-- ============================================
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

-- 3. CREATE STORAGE BUCKET FOR BLOG MEDIA
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-media', 'blog-media', true)
ON CONFLICT (id) DO NOTHING;

-- 4. SET UP STORAGE POLICIES FOR BLOG-MEDIA BUCKET
-- ============================================
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-media');

CREATE POLICY "Anyone can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-media');

CREATE POLICY "Anyone can update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog-media');

CREATE POLICY "Anyone can delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog-media');

-- 5. CREATE INDEXES FOR BETTER PERFORMANCE
-- ============================================

-- Blog posts indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Appointments indexes
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at DESC);

-- 6. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

-- Blog posts RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Appointments RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- 7. CREATE RLS POLICIES FOR BLOG POSTS
-- ============================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public can view all posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can insert posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can update posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can delete posts" ON blog_posts;

-- Create new policies
CREATE POLICY "Public can view all posts"
ON blog_posts FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert posts"
ON blog_posts FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update posts"
ON blog_posts FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete posts"
ON blog_posts FOR DELETE
USING (true);

-- 8. CREATE RLS POLICIES FOR APPOINTMENTS
-- ============================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view appointments" ON appointments;
DROP POLICY IF EXISTS "Anyone can insert appointments" ON appointments;
DROP POLICY IF EXISTS "Anyone can update appointments" ON appointments;
DROP POLICY IF EXISTS "Anyone can delete appointments" ON appointments;

-- Create new policies
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

-- ============================================
-- SETUP COMPLETE! ✅
-- ============================================
-- You can now:
-- 1. Create blog posts from /admin
-- 2. Book appointments from /appointment
-- 3. View all data in /admin
-- ============================================
