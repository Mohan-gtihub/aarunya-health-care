import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import './Hero.css';

const bannerTaglines = [
  "Where medical excellence meets compassionate care.",
  "From prevention to rehabilitation – complete care under one roof.",
  "Advanced treatment. Personal attention. Lifelong wellness.",
  "Your recovery is our responsibility.",
  "Transforming health into healing."
];

const stats = [
  {
    label: 'Advanced Diagnostics',
    value: 'Comprehensive',
    helper: 'X-Ray with DR, Tricog Insta ECG, Advanced Laboratory Services',
    icon: '🔬'
  },
  {
    label: 'Specialty Clinics',
    value: '5 Departments',
    helper: 'Internal Medicine, Diabetology, Oncology, Psychiatry, Physiotherapy',
    icon: '🏥'
  },
  {
    label: 'Care Promise',
    value: '24/7 Support',
    helper: 'Lifestyle Disease Management · Daycare Medical Services · Emergency Care',
    icon: '💚'
  }
];

export default function Hero() {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTarget = (selector) => {
    const target = document.querySelector(selector);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % bannerTaglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section
      ref={heroRef}
      className="thrive-hero"
      style={{ opacity }}
    >
      {/* Advanced Background with Parallax */}
      <div className="thrive-hero__background">
        <motion.div
          className="thrive-hero__gradient"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        />
        <div className="thrive-hero__particles">
          {mounted && [...Array(30)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }} />
          ))}
        </div>
        <div className="thrive-hero__mesh-gradient" />
      </div>

      {/* Main Content */}
      <div className="thrive-hero__content">
        <div className="thrive-hero__main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="thrive-hero__badge"
          >
            <span className="badge-icon">✨</span>
            Complete Care Under One Roof
            <span className="badge-shine" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="thrive-hero__specialties"
          >
            <div className="specialties-scroll">
              <span>Internal Medicine</span>
              <span className="specialty-dot">•</span>
              <span>Diabetology</span>
              <span className="specialty-dot">•</span>
              <span>Oncology</span>
              <span className="specialty-dot">•</span>
              <span>Psychiatry</span>
              <span className="specialty-dot">•</span>
              <span>Physiotherapy</span>
              <span className="specialty-dot">•</span>
              <span>Daycare</span>
              <span className="specialty-dot">•</span>
              <span>Diagnostics</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="thrive-hero__title"
          >
            Aarunya Health Care Clinics
            <span className="thrive-hero__title-gradient">
              <span className="gradient-text">Best Multispeciality Clinic</span>
              <span className="title-underline" />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="thrive-hero__tagline-container"
          >
            {bannerTaglines.map((tagline, index) => (
              <p
                key={index}
                className={`thrive-hero__tagline ${index === currentTagline ? 'active' : ''}`}
              >
                {tagline}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="thrive-hero__ctas"
          >
            <Link
              href="/appointment"
              className="thrive-btn thrive-btn--primary"
            >
              <span className="btn-text">Start Your Health Journey</span>
              <span className="btn-icon">→</span>
              <span className="btn-glow" />
            </Link>
            <button
              className="thrive-btn thrive-btn--ghost"
              onClick={() => scrollToTarget('#clinic-info')}
            >
              <span className="btn-text">Explore Our Services</span>
              <span className="btn-icon">↓</span>
            </button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="thrive-hero__stats"
          >
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Advanced Biomarker Visualization */}
      <motion.div
        className="thrive-hero__biomarker"
        aria-hidden="true"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="biomarker-container">
          <div className="biomarker-header">
            <div className="biomarker-title">
              <span className="pulse-indicator" />
              VITAL SIGNS MONITOR
            </div>
            <div className="biomarker-time">
              {mounted ? new Date().toLocaleTimeString('en-US', { hour12: false }) : '00:00:00'}
            </div>
          </div>

          <div className="biomarker-grid">
            {[...Array(5)].map((_, i) => (
              <div key={`h-${i}`} className="grid-line horizontal" />
            ))}
            {[...Array(5)].map((_, i) => (
              <div key={`v-${i}`} className="grid-line vertical" />
            ))}
          </div>

          {/* ECG Wave */}
          <div className="biomarker-wave ecg-container">
            <svg viewBox="0 0 400 100" className="ecg-wave">
              <path
                d="M0,50 L50,50 L60,20 L70,80 L80,50 L130,50 L140,20 L150,80 L160,50 L210,50 L220,20 L230,80 L240,50 L290,50 L300,20 L310,80 L320,50 L370,50 L380,20 L390,80 L400,50"
                stroke="var(--brand-gold)"
                strokeWidth="2"
                fill="none"
                className="ecg-path"
              />
            </svg>
            <div className="ecg-label">ECG</div>
          </div>

          {/* Heart Rate Monitor */}
          <div className="biomarker-circle">
            <div className="pulse-ring" />
            <div className="pulse-ring" />
            <div className="pulse-center">
              <span className="pulse-value">72</span>
              <span className="pulse-label">BPM</span>
            </div>
          </div>

          {/* Activity Graph */}
          <div className="biomarker-graph">
            <div className="graph-bars">
              {[60, 80, 45, 90, 70, 85, 55, 75].map((height, i) => (
                <div
                  key={i}
                  className="bar"
                  style={{
                    height: `${height}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
            <div className="graph-label">ACTIVITY</div>
          </div>

          {/* DNA Strand */}
          <div className="biomarker-dna">
            <div className="dna-strand">
              <div className="dna-helix" />
              <div className="dna-base-pairs">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="base-pair" />
                ))}
              </div>
            </div>
            <div className="dna-label">GENETIC CODE</div>
          </div>

          {/* Floating Particles */}
          <div className="biomarker-dots">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="biomarker-dot" />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="scroll-text">Scroll to explore</div>
        <div className="scroll-arrow">↓</div>
      </motion.div>
    </motion.section>
  );
}
