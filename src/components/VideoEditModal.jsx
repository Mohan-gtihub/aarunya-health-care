import { useState } from 'react';

export default function VideoEditModal({ video, onClose, onUpdate, supabase }) {
    const [formData, setFormData] = useState({
        title: video?.title || '',
        description: video?.description || '',
        video_url: video?.video_url || '',
        category: video?.category || 'General',
        display_order: video?.display_order || 0,
        published: video?.published || false
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { error } = await supabase
                .from('videos')
                .update(formData)
                .eq('id', video.id);

            if (error) throw error;

            onUpdate();
            onClose();
        } catch (error) {
            console.error('Error updating video:', error);
            alert('Failed to update video');
        } finally {
            setLoading(false);
        }
    };

    if (!video) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container video-edit-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>✏️ Edit Video</h2>
                    <button className="modal-close-btn" onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Video Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            placeholder="Enter video title"
                        />
                    </div>

                    <div className="form-group">
                        <label>YouTube Video URL or ID *</label>
                        <input
                            type="text"
                            value={formData.video_url}
                            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                            required
                            placeholder="https://www.youtube.com/watch?v=... or just the ID"
                        />
                        <small style={{ color: '#64748b', marginTop: '0.5rem', display: 'block' }}>
                            Paste full YouTube URL or just the video ID
                        </small>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows="4"
                            placeholder="Brief description of the video"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Category</label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                placeholder="e.g., Services, Testimonials"
                            />
                        </div>

                        <div className="form-group">
                            <label>Display Order</label>
                            <input
                                type="number"
                                value={formData.display_order}
                                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                                min="0"
                                placeholder="0"
                            />
                            <small style={{ color: '#64748b', marginTop: '0.5rem', display: 'block' }}>
                                Lower numbers appear first
                            </small>
                        </div>
                    </div>

                    <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={formData.published}
                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                            />
                            <span>Published (visible on website)</span>
                        </label>
                    </div>

                    <div className="modal-actions">
                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? '⏳ Updating...' : '✓ Update Video'}
                        </button>
                        <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
