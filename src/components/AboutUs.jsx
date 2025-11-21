import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className="about-us-section" id="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-highlight">About</span> Aarunya Health Care
          </h2>
          <p style={{
            color: 'var(--text-tertiary)',
            fontSize: '1.125rem',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Your trusted partner in comprehensive healthcare and wellness
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              At Aarunya Health Care Clinics, we provide comprehensive multidimensional care focused on strengthening health from within. Our team of specialists collaborate across medical, oncological, rehabilitative, and mental health domains to offer not just treatment, but ongoing wellness, recovery support, and longevity-driven care.
            </p>

            <div className="care-philosophy">
              <h3 className="philosophy-title">Our Care Philosophy</h3>
              <div className="philosophy-quotes">
                <blockquote className="philosophy-quote">
                  We don't just treat diseases — we protect health, promote recovery, and support lifelong wellness.
                </blockquote>
                <blockquote className="philosophy-quote">
                  Your path to healing, strength, and long-term vitality continues with us.
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
