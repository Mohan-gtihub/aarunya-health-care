-- Create blog_posts table
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

-- Create storage bucket for blog media
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-media', 'blog-media', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for blog-media bucket
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

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Add RLS (Row Level Security) policies
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts
CREATE POLICY "Public can view published posts"
ON blog_posts FOR SELECT
USING (published = true);

-- IMPORTANT: For development, allow anyone to insert/update/delete
-- In production, you should replace this with proper authentication
CREATE POLICY "Anyone can insert posts"
ON blog_posts FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update posts"
ON blog_posts FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete posts"
ON blog_posts FOR DELETE
USING (true);

-- NOTE: For production, replace the above policies with:
-- CREATE POLICY "Authenticated users can insert posts"
-- ON blog_posts FOR INSERT
-- WITH CHECK (auth.role() = 'authenticated');
--
-- CREATE POLICY "Authenticated users can update posts"
-- ON blog_posts FOR UPDATE
-- USING (auth.role() = 'authenticated');
--
-- CREATE POLICY "Authenticated users can delete posts"
-- ON blog_posts FOR DELETE
-- USING (auth.role() = 'authenticated');
