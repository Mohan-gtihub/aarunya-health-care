import React from 'react';
import HealthPackagesSection from '../components/HealthPackagesSection';
import PreventiveCareSection from '../components/PreventiveCareSection';
import VideoBackground from '../components/VideoBackground';


import Head from 'next/head';

export default function Services() {
    return (
        <div className="services-page page-with-video-bg">
            <VideoBackground videoSrc="/vid1.mp4" opacity={0.3} />
            <Head>
                <title>Medical Services & Health Packages | Aarunya Health Care</title>
                <meta name="description" content="Explore our comprehensive medical services including Cardiac Care, Diabetes Management, and Preventive Health Packages. Personalized longevity plans available." />
            </Head>
            <div className="services-header">
                <h1>Our Services & Longevity Plans</h1>
                <p>Comprehensive care designed for your long-term wellness.</p>
            </div>
            <PreventiveCareSection />
            <HealthPackagesSection />
        </div>
    );
}
