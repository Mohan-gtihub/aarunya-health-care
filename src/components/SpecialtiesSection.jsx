import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const specialties = [
  {
    id: 1,
    title: 'Oncology',
    description: 'Comprehensive cancer care utilizing advanced therapies and a multidisciplinary approach for diagnosis, treatment, and survivorship.',
    icon: '🎗️',
    category: 'Cancer Care',
    color: '#FF4500' // Orange-red
  },
  {
    id: 2,
    title: 'Internal Medicine',
    description: 'Primary care focusing on prevention, diagnosis, and treatment of common and complex diseases to promote long-term health.',
    icon: '🩺',
    category: 'Adult Health',
    color: '#1E90FF' // Dodger Blue
  },
  {
    id: 3,
    title: 'Psychiatry',
    description: 'Specialized mental health care offering therapy, medication management, and support for emotional and behavioral well-being.',
    icon: '🧠',
    category: 'Mental Health',
    color: '#8A2BE2' // Blue Violet
  },
  {
    id: 4,
    title: 'Physiotherapy',
    description: 'Rehabilitation services to restore movement, reduce pain, and prevent disability through manual therapy and education.',
    icon: '🚶',
    category: 'Rehabilitation',
    color: '#32CD32' // Lime Green
  }
];

const SpecialtiesSection = () => {
  return (
    <section className="specialties-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Departments</span>
          <h2>Centers of Excellence</h2>
          <p>World-class specialized care tailored to your needs</p>
        </div>

        <div className="specialties-list">
          {specialties.map((specialty, index) => (
            <motion.div
              key={specialty.id}
              className="specialty-row"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="specialty-visual">
                <div
                  className="icon-box"
                  style={{
                    background: `linear-gradient(135deg, ${specialty.color}10, ${specialty.color}20)`,
                    color: specialty.color,
                    borderColor: `${specialty.color}30`
                  }}
                >
                  {specialty.icon}
                </div>
              </div>

              <div className="specialty-content">
                <span className="category-tag" style={{ color: specialty.color }}>
                  {specialty.category}
                </span>
                <h3 className="specialty-title">{specialty.title}</h3>
                <p className="specialty-desc">{specialty.description}</p>

                <div className="specialty-meta">
                  <div className="meta-item">
                    <span className="dot" style={{ background: specialty.color }}></span>
                    Advanced Care
                  </div>
                  <div className="meta-item">
                    <span className="dot" style={{ background: specialty.color }}></span>
                    Expert Team
                  </div>
                </div>
              </div>

              <div className="specialty-action">
                <button
                  className="action-btn"
                  style={{ color: specialty.color }}
                >
                  <span className="btn-text">Explore</span>
                  <span className="btn-icon" style={{ background: `${specialty.color}15` }}>
                    <FaArrowRight />
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;