# 🎬 Video Gallery Setup Checklist

## ✅ Step-by-Step Setup

### Step 1: Run SQL Script in Supabase ⚠️ **REQUIRED**

1. Open **Supabase Dashboard**
2. Go to **SQL Editor**
3. Copy the entire content from `supabase-videos-setup.sql`
4. Paste and click **Run**
5. You should see: "Success. No rows returned"

### Step 2: Run the Update Script (for section visibility)

1. Still in **SQL Editor**
2. Copy content from `supabase-videos-update.sql`
3. Paste and click **Run**

### Step 3: Verify Tables Were Created

1. Go to **Table Editor** in Supabase
2. You should see two new tables:
   - `videos` (with 4 sample videos)
   - `video_settings` (with 1 row)

### Step 4: Check the Website

1. Go to your homepage
2. Scroll down - you should see "Watch Our Stories" section
3. You should see 4 video cards with thumbnails

### Step 5: Check Admin Panel

1. Go to `/admin`
2. Click **🎬 Videos** tab
3. You should see the 4 sample videos
4. Try adding a real YouTube video!

---

## 🔍 Troubleshooting

### "I don't see the video section on homepage"

**Possible causes:**
1. ❌ SQL script not run → **Run Step 1 above**
2. ❌ Section visibility is OFF → Go to Admin → Video Settings → Toggle ON
3. ❌ No published videos → Check database or add videos in admin

### "I see empty boxes instead of thumbnails"

**Possible causes:**
1. ❌ Video URLs are invalid → Use real YouTube URLs
2. ❌ Network issue → Check browser console for errors
3. ❌ CSS not loaded → Hard refresh (Ctrl+Shift+R)

### "Admin panel shows 'No videos yet'"

**Cause:** SQL script not run
**Fix:** Run Step 1 above

---

## 📝 How to Add Real Videos

### Option 1: Via Admin Panel (Recommended)

1. Go to `/admin`
2. Click **➕ Add Video** tab
3. Fill in:
   - **Title**: Your video title
   - **YouTube URL**: Paste any YouTube URL
     - Example: `https://www.youtube.com/watch?v=VIDEO_ID`
     - Or just the ID: `VIDEO_ID`
   - **Description**: Brief description
   - **Category**: e.g., "Services", "Testimonials"
   - **Display Order**: 0, 1, 2, etc.
   - **Publish immediately**: ✅ Check this
4. Click **✓ Add Video**

### Option 2: Via SQL

```sql
INSERT INTO videos (title, description, video_url, category, display_order, published)
VALUES (
    'Your Video Title',
    'Your description here',
    'YOUR_YOUTUBE_VIDEO_ID',  -- Just the 11-character ID
    'Category Name',
    0,  -- Display order
    true  -- Published
);
```

---

## 🎯 Quick Test

To test if everything is working, add this video:

**Title:** "Test Video"
**URL:** `dQw4w9WgXcQ`
**Category:** "Test"

If you see a thumbnail of Rick Astley, everything is working! 🎉

---

## ❓ Still Having Issues?

Please check:
1. [ ] SQL script was run successfully
2. [ ] Tables exist in Supabase
3. [ ] At least one video has `published = true`
4. [ ] Section visibility is ON (in Video Settings)
5. [ ] Browser console shows no errors

If all checked and still not working, please share:
- Screenshot of what you see
- Browser console errors (F12 → Console tab)
- Supabase table data (screenshot of `videos` table)
