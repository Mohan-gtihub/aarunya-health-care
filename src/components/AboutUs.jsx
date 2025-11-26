import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaUserMd, FaHeartbeat, FaHandHoldingMedical, FaDna } from 'react-icons/fa';

const AboutUs = () => {
  const values = [
    {
      icon: <FaHeartbeat />,
      title: "Patient-Centric Care",
      description: "We place you at the center of everything we do, tailoring treatments to your unique needs."
    },
    {
      icon: <FaHandHoldingMedical />,
      title: "Holistic Approach",
      description: "Treating the whole person—mind, body, and spirit—not just the symptoms."
    },
    {
      icon: <FaDna />,
      title: "Evidence-Based Medicine",
      description: "Combining clinical expertise with the latest medical research for optimal outcomes."
    },
    {
      icon: <FaUserMd />,
      title: "Compassionate Experts",
      description: "A team of dedicated professionals who care deeply about your well-being."
    }
  ];

  return (
    <div className="about-us-wrapper">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="container">
          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-badge">Who We Are</span>
            <h1 className="hero-title">
              Redefining Healthcare with <span className="highlight">Compassion</span> & <span className="highlight">Excellence</span>
            </h1>
            <p className="hero-subtitle">
              Aarunya Health Care is more than a clinic; it's a sanctuary for healing and longevity. We are dedicated to providing comprehensive, multidimensional care that strengthens your health from within.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="founder-showcase-section">
        <div className="container">
          <div className="founder-card">
            <div className="founder-image-col">
              <div className="image-frame">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80"
                  alt="Dr. Vaishnav"
                  className="founder-img"
                />
                <div className="founder-floating-badge">
                  <span className="badge-icon">👨‍⚕️</span>
                  <div className="badge-text">
                    <span className="badge-title">Dr. Vaishnav</span>
                    <span className="badge-role">Founder & CEO</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="founder-content-col">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="section-tag">Visionary Leadership</div>
                <h2 className="founder-heading">Leading with Purpose</h2>

                <div className="founder-quote-box">
                  <FaQuoteLeft className="quote-icon" />
                  <p className="founder-quote">
                    "At Aarunya, we believe that true healthcare goes beyond treating symptoms. It's about understanding the whole person, their lifestyle, and their long-term goals. Our mission is to empower every patient with the knowledge and care they need to lead a healthier, more vibrant life."
                  </p>
                </div>

                <div className="founder-bio-text">
                  <p>
                    Dr. Vaishnav is a distinguished medical professional with over 15 years of experience in healthcare management and clinical practice. His vision for Aarunya Health Care stems from a deep commitment to making world-class healthcare accessible and patient-centric. Under his leadership, Aarunya has grown into a center of excellence known for its compassionate care and clinical precision.
                  </p>
                </div>

                <div className="signature-area">
                  <span className="signature-text">Dr. Vaishnav</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="core-values-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-badge">Our Philosophy</span>
            <h2 className="section-title">The Pillars of Our Care</h2>
            <p className="section-desc">Guided by principles that prioritize your health and happiness.</p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="value-icon-wrapper">
                  {value.icon}
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-desc">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
