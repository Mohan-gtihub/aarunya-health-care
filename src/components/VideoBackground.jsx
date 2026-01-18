import { useEffect, useRef } from 'react';

export default function VideoBackground({ videoSrc = '/vid1.mp4', opacity = 0.3, overlay = true }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.play().catch(err => console.log('Video autoplay failed:', err));
        }
    }, []);

    return (
        <div className="video-background">
            <video
                ref={videoRef}
                className="video-background__video"
                autoPlay
                loop
                muted
                playsInline
                style={{ opacity: opacity }}
            >
                <source src={videoSrc} type="video/mp4" />
            </video>
            {overlay && <div className="video-background__overlay" />}
        </div>
    );
}
