# Video Gallery Setup Guide

## 🎬 Complete Video Gallery System with Admin Panel

This guide will help you set up a fully functional video gallery system with admin panel management.

---

## Step 1: Create Database Tables

Run this SQL in your Supabase SQL Editor:

```sql
-- Run the SQL from supabase-videos-setup.sql file
```

The file `supabase-videos-setup.sql` contains all the necessary table creation scripts.

---

## Step 2: Add Video Gallery to Home Page

Edit `src/pages/index.jsx`:

```jsx
import VideoGallery from '../components/VideoGallery';

export default function Home() {
    return (
        <>
            <Hero />
            <VideoGallery />  {/* Add right after Hero */}
            <AboutUs />
            {/* ... rest of your components */}
        </>
    );
}
```

---

## Step 3: Add Video Management to Admin Panel

### A. Add State Variables

In `src/pages/admin.jsx`, add these state variables after line 10:

```javascript
const [videos, setVideos] = useState([]);
const [videoSettings, setVideoSettings] = useState({
    section_title: '',
    section_subtitle: '',
    section_description: ''
});
const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    video_url: '',
    category: 'General',
    display_order: 0,
    published: true
});
const [editingVideo, setEditingVideo] = useState(null);
```

### B. Add to useEffect (around line 50)

```javascript
useEffect(() => {
    if (activeTab === 'bookings') {
        loadAppointments();
    } else if (activeTab === 'blogs') {
        loadBlogPosts();
    } else if (activeTab === 'doctors') {
        loadDoctors();
    } else if (activeTab === 'videos') {
        loadVideos();
        loadVideoSettings();
    }
}, [activeTab]);
```

### C. Add Video Management Functions

Add these functions before the `return` statement (around line 530):

```javascript
// Video Management Functions
const loadVideos = async () => {
    try {
        setLoading(true);
        const { data, error } = await supabase
            .from('videos')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) throw error;
        setVideos(data || []);
    } catch (error) {
        console.error('Error loading videos:', error);
        showMessage('error', 'Failed to load videos');
    } finally {
        setLoading(false);
    }
};

const loadVideoSettings = async () => {
    try {
        const { data, error } = await supabase
            .from('video_settings')
            .select('*')
            .single();

        if (error) throw error;
        if (data) setVideoSettings(data);
    } catch (error) {
        console.error('Error loading video settings:', error);
    }
};

const handleVideoSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const { data, error } = await supabase
            .from('videos')
            .insert([videoForm])
            .select();

        if (error) throw error;

        showMessage('success', 'Video added successfully!');
        setVideoForm({
            title: '',
            description: '',
            video_url: '',
            category: 'General',
            display_order: 0,
            published: true
        });
        loadVideos();
    } catch (error) {
        console.error('Error adding video:', error);
        showMessage('error', 'Failed to add video');
    } finally {
        setLoading(false);
    }
};

const deleteVideo = async (id) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
        const { error } = await supabase
            .from('videos')
            .delete()
            .eq('id', id);

        if (error) throw error;

        showMessage('success', 'Video deleted successfully!');
        loadVideos();
    } catch (error) {
        console.error('Error deleting video:', error);
        showMessage('error', 'Failed to delete video');
    }
};

const toggleVideoPublish = async (id, currentStatus) => {
    try {
        const { error } = await supabase
            .from('videos')
            .update({ published: !currentStatus })
            .eq('id', id);

        if (error) throw error;

        showMessage('success', 'Video status updated!');
        loadVideos();
    } catch (error) {
        console.error('Error updating video:', error);
        showMessage('error', 'Failed to update video');
    }
};

const updateVideoSettings = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const { error } = await supabase
            .from('video_settings')
            .update({
                section_title: videoSettings.section_title,
                section_subtitle: videoSettings.section_subtitle,
                section_description: videoSettings.section_description,
                updated_at: new Date().toISOString()
            })
            .eq('id', 1);

        if (error) throw error;

        showMessage('success', 'Video section settings updated!');
    } catch (error) {
        console.error('Error updating settings:', error);
        showMessage('error', 'Failed to update settings');
    } finally {
        setLoading(false);
    }
};
```

### D. Add Video Tab Button

In the tabs section (around line 583), add:

```jsx
<button
    className={`admin-tab ${activeTab === 'videos' ? 'active' : ''}`}
    onClick={() => setActiveTab('videos')}
>
    🎬 Videos
</button>
<button
    className={`admin-tab ${activeTab === 'add-video' ? 'active' : ''}`}
    onClick={() => setActiveTab('add-video')}
>
    ➕ Add Video
</button>
<button
    className={`admin-tab ${activeTab === 'video-settings' ? 'active' : ''}`}
    onClick={() => setActiveTab('video-settings')}
>
    ⚙️ Video Settings
</button>
```

### E. Add Video Management UI

Add these sections in the `admin-content` div (after the doctors section):

```jsx
{/* Videos List Section */}
{activeTab === 'videos' && (
    <div className="videos-section">
        <h2>Video Gallery ({videos.length})</h2>
        {loading ? (
            <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading videos...</p>
            </div>
        ) : videos.length === 0 ? (
            <p className="empty-state">No videos yet</p>
        ) : (
            <div className="videos-grid">
                {videos.map(video => (
                    <div key={video.id} className="video-admin-card">
                        <div className="video-admin-thumbnail">
                            <img 
                                src={`https://img.youtube.com/vi/${video.video_url}/maxresdefault.jpg`} 
                                alt={video.title}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/320x180?text=Video';
                                }}
                            />
                            <span className={`publish-badge ${video.published ? 'published' : 'draft'}`}>
                                {video.published ? '✓ Published' : '○ Draft'}
                            </span>
                        </div>
                        <div className="video-admin-content">
                            <div className="video-admin-header">
                                <h3>{video.title}</h3>
                                <span className="video-category-badge">{video.category}</span>
                            </div>
                            <p className="video-admin-desc">{video.description}</p>
                            <div className="video-admin-meta">
                                Order: {video.display_order} • Created: {formatDate(video.created_at)}
                            </div>
                            <div className="video-admin-actions">
                                <button
                                    className="btn-toggle"
                                    onClick={() => toggleVideoPublish(video.id, video.published)}
                                >
                                    {video.published ? 'Unpublish' : 'Publish'}
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={() => deleteVideo(video.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
)}

{/* Add Video Section */}
{activeTab === 'add-video' && (
    <div className="add-video-section">
        <h2>Add New Video</h2>
        <form onSubmit={handleVideoSubmit} className="video-form">
            <div className="form-group">
                <label>Video Title *</label>
                <input
                    type="text"
                    value={videoForm.title}
                    onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                    required
                    placeholder="Enter video title"
                />
            </div>

            <div className="form-group">
                <label>YouTube Video URL or ID *</label>
                <input
                    type="text"
                    value={videoForm.video_url}
                    onChange={(e) => setVideoForm({ ...videoForm, video_url: e.target.value })}
                    required
                    placeholder="https://www.youtube.com/watch?v=... or just the video ID"
                />
                <small style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block' }}>
                    💡 Paste any YouTube URL or just the 11-character video ID
                </small>
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea
                    value={videoForm.description}
                    onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                    placeholder="Brief description of the video"
                    rows="3"
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        value={videoForm.category}
                        onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                        placeholder="e.g., Introduction, Services, Testimonials"
                    />
                </div>

                <div className="form-group">
                    <label>Display Order</label>
                    <input
                        type="number"
                        value={videoForm.display_order}
                        onChange={(e) => setVideoForm({ ...videoForm, display_order: parseInt(e.target.value) })}
                        min="0"
                    />
                </div>
            </div>

            <div className="form-group checkbox-group">
                <label>
                    <input
                        type="checkbox"
                        checked={videoForm.published}
                        onChange={(e) => setVideoForm({ ...videoForm, published: e.target.checked })}
                    />
                    Publish immediately
                </label>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Adding...' : '✓ Add Video'}
            </button>
        </form>
    </div>
)}

{/* Video Settings Section */}
{activeTab === 'video-settings' && (
    <div className="video-settings-section">
        <h2>Video Gallery Section Settings</h2>
        <form onSubmit={updateVideoSettings} className="settings-form">
            <div className="form-group">
                <label>Section Title</label>
                <input
                    type="text"
                    value={videoSettings.section_title}
                    onChange={(e) => setVideoSettings({ ...videoSettings, section_title: e.target.value })}
                    placeholder="e.g., Watch Our Stories"
                />
            </div>

            <div className="form-group">
                <label>Section Subtitle (Badge)</label>
                <input
                    type="text"
                    value={videoSettings.section_subtitle}
                    onChange={(e) => setVideoSettings({ ...videoSettings, section_subtitle: e.target.value })}
                    placeholder="e.g., Video Gallery"
                />
            </div>

            <div className="form-group">
                <label>Section Description</label>
                <textarea
                    value={videoSettings.section_description}
                    onChange={(e) => setVideoSettings({ ...videoSettings, section_description: e.target.value })}
                    placeholder="Brief description of the video gallery section"
                    rows="3"
                />
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Updating...' : '✓ Update Settings'}
            </button>
        </form>
    </div>
)}
```

---

## Step 4: Add CSS Styles

Add this CSS to `src/pages/admin.css`:

```css
/* Video Admin Styles */
.videos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
}

.video-admin-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
}

.video-admin-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.video-admin-thumbnail {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
}

.video-admin-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.video-category-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: rgba(139, 92, 246, 0.1);
    color: var(--brand-purple);
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
}

.video-admin-content {
    padding: 1.25rem;
}

.video-admin-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 0.75rem;
}

.video-admin-header h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    flex: 1;
}

.video-admin-desc {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 0.75rem;
}

.video-admin-meta {
    font-size: 0.8rem;
    color: #999;
    margin-bottom: 1rem;
}

.video-admin-actions {
    display: flex;
    gap: 0.75rem;
}

.loading-state {
    text-align: center;
    padding: 3rem;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f4f6;
    border-top: 4px solid var(--brand-purple);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

---

## 🎯 How to Use

1. **Run the SQL script** in Supabase SQL Editor
2. **Add VideoGallery component** to your home page after Hero
3. **Add video management code** to admin.jsx following the guide above
4. **Go to Admin Panel** → Videos tab
5. **Add videos** using YouTube URLs
6. **Customize section** titles in Video Settings tab

---

## 📝 Notes

- YouTube URLs are automatically converted to embed format
- Videos are ordered by `display_order` field
- Only published videos appear on the website
- Thumbnails are automatically fetched from YouTube
- Section titles are fully customizable from admin panel

---

## ✅ Features

- ✅ Full CRUD operations for videos
- ✅ Publish/Unpublish toggle
- ✅ Custom display order
- ✅ Category management
- ✅ Dynamic section titles
- ✅ YouTube URL auto-conversion
- ✅ Responsive grid layout
- ✅ Modal video player
- ✅ Loading states

Enjoy your new video gallery system! 🎬
