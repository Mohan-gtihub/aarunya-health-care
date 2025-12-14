import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import SpecialtyDetailsModal from './SpecialtyDetailsModal';

const specialties = [
  {
    id: 1,
    title: 'Oncology',
    description: 'Comprehensive cancer care utilizing advanced therapies and a multidisciplinary approach for diagnosis, treatment, and survivorship.',
    longDescription: 'Our Oncology department provides state-of-the-art cancer care with a focus on personalized treatment plans. We utilize the latest technology in chemotherapy, immunotherapy, and targeted therapy to ensure the best possible outcomes for our patients.',
    features: ['Chemotherapy & Immunotherapy', 'Advanced Cancer Screening', 'Palliative & Supportive Care', 'Multidisciplinary Tumor Board', 'Genetic Counseling'],
    icon: '🎗️',
    category: 'Cancer Care',
    color: '#FF4500' // Orange-red
  },
  {
    id: 2,
    title: 'Internal Medicine',
    description: 'Primary care focusing on prevention, diagnosis, and treatment of common and complex diseases to promote long-term health.',
    longDescription: 'Our Internal Medicine specialists are dedicated to the comprehensive management of adult diseases. From chronic condition management like diabetes and hypertension to preventive health screenings, we ensure your long-term well-being.',
    features: ['Diabetes Management', 'Hypertension & Cardiac Care', 'Thyroid Disorder Treatment', 'Infectious Disease Management', 'Geriatric Health Services'],
    icon: '🩺',
    category: 'Adult Health',
    color: '#1E90FF' // Dodger Blue
  },
  {
    id: 3,
    title: 'Psychiatry',
    description: 'Specialized mental health care offering therapy, medication management, and support for emotional and behavioral well-being.',
    longDescription: 'We offer compassionate mental health services tailored to individual needs. Our team treats a wide range of conditions including depression, anxiety, and bipolar disorder through evidence-based therapies and medication management.',
    features: ['CBT & Psychotherapy', 'Depression & Anxiety Care', 'Stress Management', 'Bipolar & Mood Disorders', 'De-addiction Services'],
    icon: '🧠',
    category: 'Mental Health',
    color: '#8A2BE2' // Blue Violet
  },
  {
    id: 4,
    title: 'Physiotherapy',
    description: 'Rehabilitation services to restore movement, reduce pain, and prevent disability through manual therapy and education.',
    longDescription: 'Our rehabilitation center helps you regain mobility and strength. Whether recovering from surgery, a sports injury, or managing chronic pain, our expert physiotherapists design personalized recovery programs to get you back to your best.',
    features: ['Sports Injury Rehabilitation', 'Post-Surgical Recovery', 'Chronic Pain Management', 'Manual Therapy Techniques', 'Ergonomic Consulting'],
    icon: '🚶',
    category: 'Rehabilitation',
    color: '#32CD32' // Lime Green
  }
];

const SpecialtiesSection = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (specialty) => {
    setSelectedSpecialty(specialty);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedSpecialty(null), 300); // Wait for animation
  };

  return (
    <section className="specialties-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Departments</span>
          <h2>Centers of Excellence</h2>
          <p className="section-desc">World-class specialized care tailored to your needs</p>
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
                  onClick={() => openModal(specialty)}
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

      <SpecialtyDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        specialty={selectedSpecialty}
      />
    </section>
  );
};

export default SpecialtiesSection;
