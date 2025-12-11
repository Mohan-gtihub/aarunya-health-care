import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaYoutube } from 'react-icons/fa';
import { supabase } from '../lib/supabase';

const VideoGallery = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [settings, setSettings] = useState({
        section_title: 'Watch Our Stories',
        section_subtitle: 'Video Gallery',
        section_description: 'Discover more about our healthcare services, facilities, and patient experiences'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVideos();
        fetchSettings();
    }, []);

    const fetchVideos = async () => {
        try {
            const { data, error } = await supabase
                .from('videos')
                .select('*')
                .eq('published', true)
                .order('display_order', { ascending: true });

            if (error) throw error;
            setVideos(data || []);
        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('video_settings')
                .select('*')
                .single();

            if (error) throw error;
            if (data) setSettings(data);
        } catch (error) {
            console.error('Error fetching video settings:', error);
        }
    };

    // Extract YouTube video ID from various URL formats
    const getYouTubeVideoId = (url) => {
        if (!url) return null;

        // Already just an ID
        if (url.length === 11 && !url.includes('/') && !url.includes('?')) {
            return url;
        }

        // YouTube patterns
        const patterns = [
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
            /^([a-zA-Z0-9_-]{11})$/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }

        return null;
    };

    const getThumbnailUrl = (video) => {
        if (video.thumbnail_url) return video.thumbnail_url;

        const videoId = getYouTubeVideoId(video.video_url);
        if (videoId) {
            // Use hqdefault which is more reliable than maxresdefault
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }

        return 'https://via.placeholder.com/1280x720?text=Video+Thumbnail';
    };

    const openVideoModal = (video) => {
        setSelectedVideo(video);
        document.body.style.overflow = 'hidden';
    };

    const closeVideoModal = () => {
        setSelectedVideo(null);
        document.body.style.overflow = 'auto';
    };

    if (loading) {
        return (
            <section className="video-gallery-section">
                <div className="container">
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Loading videos...</p>
                    </div>
                </div>
            </section>
        );
    }

    // Don't show section if disabled or no videos
    if (!settings.section_visible || videos.length === 0) {
        return null;
    }

    return (
        <section className="video-gallery-section">
            <div className="container">
                {/* Section Header */}
                <div className="section-header">
                    <motion.span
                        className="section-badge"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <FaYoutube className="badge-icon" /> {settings.section_subtitle}
                    </motion.span>
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {settings.section_title}
                    </motion.h2>
                    <motion.p
                        className="section-description"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {settings.section_description}
                    </motion.p>
                </div>

                {/* Video Grid */}
                <div className="video-grid">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            className="video-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => openVideoModal(video)}
                        >
                            <div className="video-thumbnail">
                                <img
                                    src={getThumbnailUrl(video)}
                                    alt={video.title}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/1280x720?text=Video+Thumbnail';
                                    }}
                                />
                                <div className="play-overlay">
                                    <div className="play-button">
                                        <FaPlay />
                                    </div>
                                </div>
                                {video.category && (
                                    <span className="video-category">{video.category}</span>
                                )}
                            </div>
                            <div className="video-info">
                                <h3 className="video-title">{video.title}</h3>
                                {video.description && (
                                    <p className="video-description">{video.description}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div className="video-modal" onClick={closeVideoModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeVideoModal}>
                            ✕
                        </button>
                        <div className="video-wrapper">
                            <iframe
                                src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedVideo.video_url)}?autoplay=1`}
                                title={selectedVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="modal-info">
                            <h3>{selectedVideo.title}</h3>
                            {selectedVideo.description && (
                                <p>{selectedVideo.description}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default VideoGallery;
