# Blog & Admin Setup Guide

## 🎉 New Features Added

### 1. **Blog System** (`/blog`)
- Beautiful, responsive blog page with filtering by category
- Support for images and embedded videos
- Rich content with HTML formatting
- Automatic date formatting
- Smooth animations and modern design

### 2. **Admin Dashboard** (`/admin`)
- **Hidden admin panel** - Not shown in navigation, accessible only via direct URL
- Three main sections:
  - **📅 Bookings**: View all appointment bookings in a table
  - **📝 Blog Posts**: Manage existing blog posts (publish/unpublish/delete)
  - **➕ Create Blog**: Upload new blog posts with images and videos

## 🚀 Setup Instructions

### Step 1: Install Dependencies
The Supabase client library has been installed automatically. If you need to reinstall:
```bash
npm install @supabase/supabase-js
```

### Step 2: Set Up Supabase Database

1. **Go to your Supabase Dashboard**: https://app.supabase.com
2. **Navigate to SQL Editor**
3. **Copy and paste the contents of `supabase-setup.sql`** (located in the root directory)
4. **Click "Run"** to execute the SQL

This will:
- Create the `blog_posts` table
- Set up the `blog-media` storage bucket for images
- Configure proper security policies
- Add indexes for better performance

### Step 3: Configure Storage Bucket

1. In Supabase Dashboard, go to **Storage**
2. You should see a bucket called `blog-media`
3. Make sure it's set to **Public** (this was done in the SQL script)

### Step 4: Test the Setup

1. **Visit the Blog Page**: http://localhost:3000/blog
   - You should see an empty blog with a message "No blog posts available yet"

2. **Visit the Admin Panel**: http://localhost:3000/admin
   - You should see the admin dashboard with three tabs

3. **Create a Test Blog Post**:
   - Click on "➕ Create Blog" tab
   - Fill in the form:
     - Title: "Welcome to Our Health Blog"
     - Category: Select any category
     - Content: Add some HTML content like:
       ```html
       <h2>Welcome!</h2>
       <p>This is our first blog post about health and wellness.</p>
       <ul>
         <li>Expert health tips</li>
         <li>Latest medical news</li>
         <li>Wellness advice</li>
       </ul>
       ```
     - Upload an image (optional)
     - Add a video URL (optional - use YouTube embed URL like: `https://www.youtube.com/embed/VIDEO_ID`)
   - Click "✓ Create Blog Post"

4. **View Your Blog Post**:
   - Go back to http://localhost:3000/blog
   - You should see your new blog post!

## 📝 How to Use the Admin Panel

### Accessing the Admin Panel
- **URL**: http://localhost:3000/admin
- **Note**: This link is NOT shown in the main navigation for security
- Only people who know the URL can access it

### Managing Bookings
1. Click on "📅 Bookings" tab
2. View all appointment bookings in a table format
3. See patient details, doctor, date, time, and status

### Managing Blog Posts
1. Click on "📝 Blog Posts" tab
2. View all blog posts (published and drafts)
3. Actions available:
   - **Publish/Unpublish**: Toggle post visibility
   - **Delete**: Remove a blog post permanently

### Creating Blog Posts
1. Click on "➕ Create Blog" tab
2. Fill in the form:
   - **Title**: Main heading of your blog post
   - **Category**: Choose from health, wellness, cardiology, etc.
   - **Author**: Name of the author (optional)
   - **Excerpt**: Short summary shown on blog cards
   - **Content**: Main blog content (HTML supported)
   - **Image**: Upload a featured image
   - **Video**: Add YouTube/Vimeo embed URL
   - **Publish**: Check to publish immediately, uncheck to save as draft

## 🎨 Supported HTML in Blog Content

You can use these HTML tags in your blog content:

```html
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<p>Paragraph text</p>
<strong>Bold text</strong>
<em>Italic text</em>
<ul>
  <li>Bullet point 1</li>
  <li>Bullet point 2</li>
</ul>
<ol>
  <li>Numbered item 1</li>
  <li>Numbered item 2</li>
</ol>
<a href="https://example.com">Link text</a>
<img src="image-url.jpg" alt="Description" />
```

## 🎥 Adding Videos

### YouTube Videos
1. Go to your YouTube video
2. Click "Share" → "Embed"
3. Copy the URL from the iframe src (e.g., `https://www.youtube.com/embed/dQw4w9WgXcQ`)
4. Paste it in the "Video URL" field

### Vimeo Videos
1. Go to your Vimeo video
2. Click "Share" → Get the embed code
3. Copy the URL from the iframe src (e.g., `https://player.vimeo.com/video/123456789`)
4. Paste it in the "Video URL" field

## 🔒 Security Notes

### Admin Panel Security
- The admin panel is accessible via `/admin` URL
- It's not linked in the main navigation
- For production, you should add authentication:
  - Use Supabase Auth
  - Add login requirement
  - Implement role-based access control

### Recommended: Add Authentication
To secure the admin panel, you can add this to `admin.jsx`:

```jsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

// Add this at the start of the Admin component
const router = useRouter();

useEffect(() => {
  checkAuth();
}, []);

const checkAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    router.push('/login'); // Redirect to login page
  }
};
```

## 📱 Features

### Blog Page Features
- ✅ Responsive grid layout
- ✅ Category filtering
- ✅ Beautiful card design with hover effects
- ✅ Full post view with images and videos
- ✅ Smooth animations
- ✅ Mobile-friendly

### Admin Dashboard Features
- ✅ Dark theme with glassmorphism
- ✅ View all bookings
- ✅ Manage blog posts
- ✅ Upload images to Supabase Storage
- ✅ Embed videos
- ✅ Publish/unpublish posts
- ✅ Delete posts
- ✅ Rich text content support

## 🎯 Next Steps

1. **Add Authentication**: Secure the admin panel with Supabase Auth
2. **Add Rich Text Editor**: Consider using a WYSIWYG editor like TinyMCE or Quill
3. **Add Comments**: Allow users to comment on blog posts
4. **Add Search**: Implement blog post search functionality
5. **Add Tags**: Add tagging system for better organization
6. **Add Analytics**: Track blog post views and engagement

## 🐛 Troubleshooting

### "Module not found: @supabase/supabase-js"
Run: `npm install @supabase/supabase-js`

### "Table 'blog_posts' does not exist"
Make sure you ran the SQL script in Supabase SQL Editor

### "Storage bucket 'blog-media' not found"
Check that the SQL script created the bucket, or create it manually in Supabase Storage

### Images not uploading
1. Check that the `blog-media` bucket exists
2. Verify it's set to public
3. Check storage policies are correctly set

### Blog page is empty
1. Make sure you created at least one blog post
2. Check that the post is marked as "published"
3. Open browser console to check for errors

## 📞 Support

If you encounter any issues, check:
1. Browser console for JavaScript errors
2. Supabase dashboard for database errors
3. Network tab for API request failures

---

**Happy Blogging! 🎉**
