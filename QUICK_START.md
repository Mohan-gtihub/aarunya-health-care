# 🚀 Quick Start: Blog & Admin System

## What's Been Added?

### 1. **Public Blog** - `/blog`
A beautiful blog page where visitors can read health and wellness articles.

### 2. **Admin Dashboard** - `/admin` 
A hidden admin panel (not in navigation) where you can:
- View all appointment bookings
- Create, edit, and manage blog posts
- Upload images and embed videos

---

## ⚡ Quick Setup (5 minutes)

### Step 1: Run the SQL Script in Supabase

1. Open your Supabase dashboard: https://app.supabase.com
2. Select your project: `ribvkcrrgbidmhkiztjd`
3. Go to **SQL Editor** (left sidebar)
4. Click **"New Query"**
5. Copy ALL the content from `supabase-setup.sql` file
6. Paste it into the SQL editor
7. Click **"Run"** (or press Ctrl+Enter)

You should see: ✅ Success. No rows returned

### Step 2: Verify Storage Bucket

1. In Supabase dashboard, go to **Storage** (left sidebar)
2. You should see a bucket named `blog-media`
3. Click on it - it should show as **Public**

### Step 3: Test It!

1. **Visit the blog**: http://localhost:3000/blog
   - Should show empty state (no posts yet)

2. **Visit admin panel**: http://localhost:3000/admin
   - Should show the admin dashboard

3. **Create your first blog post**:
   - In admin, click "➕ Create Blog" tab
   - Fill in:
     - Title: "Welcome to Our Blog"
     - Category: Health
     - Content: 
       ```html
       <h2>Hello!</h2>
       <p>This is our first blog post.</p>
       ```
   - Click "✓ Create Blog Post"

4. **See it live**: Go to `/blog` - your post should appear!

---

## 📍 Important URLs

- **Blog (Public)**: http://localhost:3000/blog
- **Admin (Hidden)**: http://localhost:3000/admin

⚠️ **Note**: The admin link is NOT in the navigation menu. Only people who know the URL can access it.

---

## 🎨 Creating Blog Posts

### Basic Example
```
Title: 5 Tips for Heart Health
Category: Cardiology
Author: Dr. Ramesh Kumar
Content:
<h2>Introduction</h2>
<p>Taking care of your heart is essential...</p>

<h3>1. Regular Exercise</h3>
<p>Aim for 30 minutes of exercise daily.</p>

<h3>2. Healthy Diet</h3>
<p>Include fruits, vegetables, and whole grains.</p>
```

### With Image
1. Click "Choose File" under "Featured Image"
2. Select an image from your computer
3. Wait for "Image uploaded successfully!" message
4. The image URL will auto-fill

### With Video
1. Go to YouTube video
2. Click Share → Embed
3. Copy the URL from iframe (e.g., `https://www.youtube.com/embed/abc123`)
4. Paste in "Video URL" field

---

## 🔧 Troubleshooting

### "blog_posts table does not exist"
→ Run the SQL script in Supabase (Step 1 above)

### "Cannot upload image"
→ Check that `blog-media` bucket exists in Supabase Storage

### Blog page shows error
→ Open browser console (F12) and check for errors

---

## ✅ Checklist

- [ ] Ran SQL script in Supabase
- [ ] Verified `blog-media` bucket exists
- [ ] Visited `/blog` page successfully
- [ ] Visited `/admin` page successfully
- [ ] Created a test blog post
- [ ] Saw the blog post on `/blog` page

---

**Need help?** Check `BLOG_ADMIN_SETUP.md` for detailed documentation.
