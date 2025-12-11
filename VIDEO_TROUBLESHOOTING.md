# Video Thumbnail Troubleshooting Guide

## Issue: Video thumbnails not displaying properly

### Quick Checks:

1. **Check if videos exist in database:**
   - Go to Supabase → Table Editor → `videos` table
   - Verify there are videos with `published = true`
   - Check the `video_url` column values

2. **Test YouTube URL extraction:**
   Open browser console on your site and run:
   ```javascript
   const testUrl = "YOUR_VIDEO_URL_HERE";
   const match = testUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
   console.log("Video ID:", match ? match[1] : "Not found");
   console.log("Thumbnail URL:", match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : "N/A");
   ```

3. **Common URL formats that should work:**
   - `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - `https://youtu.be/dQw4w9WgXcQ`
   - `https://www.youtube.com/embed/dQw4w9WgXcQ`
   - `dQw4w9WgXcQ` (just the ID)

4. **Check browser console for errors:**
   - Open DevTools (F12)
   - Look for 404 errors on image requests
   - Check if images are being blocked

### Manual Fix Steps:

#### Step 1: Verify Database Setup
Run this SQL in Supabase:
```sql
-- Check if video_settings table exists and has data
SELECT * FROM video_settings;

-- Check if videos table has data
SELECT id, title, video_url, published FROM videos;
```

#### Step 2: Test a Video Manually
Add a test video with a known working YouTube URL:
```sql
INSERT INTO videos (title, description, video_url, category, display_order, published)
VALUES (
    'Test Video',
    'This is a test video',
    'dQw4w9WgXcQ',  -- Just the video ID
    'Test',
    0,
    true
);
```

#### Step 3: Check Image Loading
Open this URL directly in browser:
```
https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg
```
If it loads, the YouTube API is working.

### CSS Improvements Applied:

Replace lines 98-115 in `VideoGallery.css` with the content from `VIDEO_THUMBNAIL_FIX.css`:

```css
/* Video Thumbnail */
.video-thumbnail {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
}

.video-thumbnail::before {
    content: '▶';
    position: absolute;
    font-size: 4rem;
    color: rgba(255, 255, 255, 0.3);
    z-index: 0;
}

.video-thumbnail img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
    z-index: 1;
    background: #000;
}

.video-card:hover .video-thumbnail img {
    transform: scale(1.1);
}
```

This adds:
- Purple gradient background
- Play icon (▶) as placeholder
- Black background for images
- Better z-index layering

### What to Look For:

1. **If you see purple boxes with play icons** → Images aren't loading (URL extraction issue)
2. **If you see gray/white boxes** → CSS not applied
3. **If you see nothing** → Videos not in database or section hidden
4. **If thumbnails load but look weird** → CSS styling issue

### Next Steps:

Please tell me what you see:
- [ ] Purple boxes with play icons
- [ ] Gray/white empty boxes  
- [ ] Nothing at all
- [ ] Thumbnails load but look wrong
- [ ] Other: _______________

This will help me pinpoint the exact issue!
