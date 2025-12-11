-- FIX SCRIPT: Run this to fix the RLS policy issue
-- This will drop the restrictive policies and add permissive ones for development

-- Drop existing policies
DROP POLICY IF EXISTS "Public can view published posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can do everything" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete posts" ON blog_posts;

-- Create new permissive policies for development
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

-- Verify RLS is enabled
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
