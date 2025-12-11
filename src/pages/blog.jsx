import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const filteredPosts = filter === 'all'
        ? posts
        : posts.filter(post => post.category === filter);

    const categories = ['all', ...new Set(posts.map(post => post.category))];

    if (selectedPost) {
        return (
            <div className="blog-container">
                <div className="blog-post-detail">
                    <button
                        className="back-button"
                        onClick={() => setSelectedPost(null)}
                    >
                        ← Back to Blog
                    </button>

                    {selectedPost.image_url && (
                        <div className="post-detail-image">
                            <img src={selectedPost.image_url} alt={selectedPost.title} />
                        </div>
                    )}

                    <div className="post-detail-content">
                        <div className="post-meta">
                            <span className="post-category">{selectedPost.category}</span>
                            <span className="post-date">{formatDate(selectedPost.created_at)}</span>
                        </div>

                        <h1 className="post-detail-title">{selectedPost.title}</h1>

                        {selectedPost.author && (
                            <div className="post-author">
                                <span>By {selectedPost.author}</span>
                            </div>
                        )}

                        <div
                            className="post-detail-body"
                            dangerouslySetInnerHTML={{
                                __html: selectedPost.content
                                    .split('\n\n')
                                    .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
                                    .join('')
                            }}
                        />

                        {selectedPost.video_url && (
                            <div className="post-video">
                                <h3>Related Video</h3>
                                <div className="video-wrapper">
                                    <iframe
                                        src={selectedPost.video_url}
                                        title={selectedPost.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="blog-container">
            <div className="blog-hero">
                <h1 className="blog-hero-title">Health & Wellness Blog</h1>
                <p className="blog-hero-subtitle">
                    Expert insights, health tips, and the latest medical advancements
                </p>
            </div>

            <div className="blog-filters">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`filter-btn ${filter === category ? 'active' : ''}`}
                        onClick={() => setFilter(category)}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="blog-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading posts...</p>
                </div>
            ) : filteredPosts.length === 0 ? (
                <div className="blog-empty">
                    <p>No blog posts available yet. Check back soon!</p>
                </div>
            ) : (
                <div className="blog-grid">
                    {filteredPosts.map(post => (
                        <article
                            key={post.id}
                            className="blog-card"
                            onClick={() => setSelectedPost(post)}
                        >
                            {post.image_url && (
                                <div className="blog-card-image">
                                    <img src={post.image_url} alt={post.title} />
                                    <div className="blog-card-overlay">
                                        <span>Read More →</span>
                                    </div>
                                </div>
                            )}

                            <div className="blog-card-content">
                                <div className="blog-card-meta">
                                    <span className="blog-card-category">{post.category}</span>
                                    <span className="blog-card-date">{formatDate(post.created_at)}</span>
                                </div>

                                <h2 className="blog-card-title">{post.title}</h2>

                                <p className="blog-card-excerpt">
                                    {post.excerpt || post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...'}
                                </p>

                                {post.author && (
                                    <div className="blog-card-author">
                                        <span>By {post.author}</span>
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
