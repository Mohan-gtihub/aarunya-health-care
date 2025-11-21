// SpecialtiesSection.jsx
import React, { useState } from 'react';
import './SpecialtiesSection.css';

const specialties = [
  {
    id: 1,
    title: 'Cardiology',
    description: 'Expert heart care with advanced diagnostics and treatment plans for all cardiac conditions. Our team provides comprehensive care using the latest technology and evidence-based practices.',
    icon: '❤️',
    category: 'Heart Care',
    color: '#7A288A' // Purple accent
  },
  {
    id: 2,
    title: 'Neurology',
    description: 'Comprehensive care for nervous system disorders including stroke, epilepsy, and neurodegenerative diseases. Our specialists use cutting-edge diagnostic tools for accurate treatment.',
    icon: '🧠',
    category: 'Brain Health',
    color: '#5C176F' // Dark purple accent
  },
  {
    id: 3,
    title: 'Pediatrics',
    description: 'Specialized healthcare for infants, children, and adolescents. We provide compassionate care in a child-friendly environment with a focus on growth, development, and wellness.',
    icon: '👶',
    category: 'Child Care',
    color: '#A34DCC' // Light purple accent
  }
];

const SpecialtiesSection = () => {
  const [activeSpecialty, setActiveSpecialty] = useState(0);

  return (
    <section className="specialties-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Specialties</h2>
          <p>Comprehensive healthcare services across multiple specialties</p>
        </div>

        <div className="specialties-container">
          <div className="specialty-list">
            {specialties.map((specialty, index) => (
              <div
                key={specialty.id}
                className={`specialty-item ${activeSpecialty === index ? 'active' : ''}`}
                onClick={() => setActiveSpecialty(index)}
                style={{ '--accent': specialty.color }}
              >
                <div className="specialty-icon" style={{ background: `linear-gradient(135deg, ${specialty.color}, ${specialty.color}90)` }}>
                  {specialty.icon}
                </div>
                <div className="specialty-info">
                  <h3>{specialty.title}</h3>
                  <span className="specialty-category">{specialty.category}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="specialty-details">
            {specialties[activeSpecialty] && (
              <div className="detail-content">
                <div className="detail-header">
                  <div 
                    className="detail-icon" 
                    style={{ 
                      background: `linear-gradient(135deg, ${specialties[activeSpecialty].color}, ${specialties[activeSpecialty].color}90)`,
                      color: 'white',
                      boxShadow: `0 4px 15px ${specialties[activeSpecialty].color}40`
                    }}
                  >
                    {specialties[activeSpecialty].icon}
                  </div>
                  <div>
                    <h3>{specialties[activeSpecialty].title}</h3>
                    <p className="specialty-category">{specialties[activeSpecialty].category}</p>
                  </div>
                </div>
                <p className="specialty-description">
                  {specialties[activeSpecialty].description}
                </p>
                <div className="specialty-features">
                  <div className="feature">
                    <div className="feature-icon">🏥</div>
                    <div className="feature-content">
                      <h4>Advanced Diagnostics</h4>
                      <p>State-of-the-art equipment for accurate diagnosis</p>
                    </div>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">👨‍⚕️</div>
                    <div className="feature-content">
                      <h4>Expert Specialists</h4>
                      <p>Board-certified doctors with years of experience</p>
                    </div>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">💊</div>
                    <div className="feature-content">
                      <h4>Personalized Care</h4>
                      <p>Treatment plans tailored to your specific needs</p>
                    </div>
                  </div>
                </div>
                <button 
  className="cta-button" 
  style={{ 
    background: `linear-gradient(135deg, ${specialties[activeSpecialty].color}, ${specialties[activeSpecialty].color}90)`
  }}
>
                  Book an Appointment
                  <span className="arrow">→</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;