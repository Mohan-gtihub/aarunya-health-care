import React from 'react';
import AboutUs from '../components/AboutUs';
import TeamSection from '../components/TeamSection';
import VideoBackground from '../components/VideoBackground';


import Head from 'next/head';

export default function About() {
  return (
    <div className="about-page page-with-video-bg">
      <VideoBackground videoSrc="/vid2.mp4" opacity={0.3} />
      <Head>
        <title>About Us - Aarunya Health Care | Our Philosophy & Team</title>
        <meta name="description" content="Learn about Aarunya Health Care's mission to provide compassionate, expert medical care. Meet our experienced team of doctors and specialists." />
      </Head>
      <AboutUs />
      <TeamSection />
    </div>
  );
}
