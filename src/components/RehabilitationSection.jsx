import React from 'react';
import './RehabilitationSection.css';

const RehabilitationSection = () => {
  const recoveryServices = [
    {
      icon: '🏥',
      title: 'Post-surgical and post-oncology recovery',
      description: 'Comprehensive rehabilitation programs designed to restore strength and function after surgical procedures or cancer treatments.'
    },
    {
      icon: '💪',
      title: 'Functional mobility and strength training',
      description: 'Targeted exercises and therapies to improve movement, balance, and overall physical capabilities.'
    },
    {
      icon: '🌿',
      title: 'Chronic pain management and therapy',
      description: 'Multidisciplinary approaches to alleviate persistent pain and improve quality of life.'
    },
    {
      icon: '🚶',
      title: 'Support for lifestyle and age-related conditions',
      description: 'Specialized care programs addressing age-related mobility issues and lifestyle-induced physical limitations.'
    }
  ];

  return (
    <section className="rehabilitation-section" id="rehabilitation">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-highlight">Rehabilitation</span> & Recovery Care
          </h2>
        </div>

        <div className="rehab-intro">
          <p className="rehab-description">
            We believe recovery doesn't end with treatment. Our physiotherapy and rehabilitative care focus on:
          </p>
        </div>

        <div className="rehab-grid">
          {recoveryServices.map((service, index) => (
            <div key={index} className="rehab-card">
              <div className="rehab-icon-wrapper">
                <span className="rehab-icon">{service.icon}</span>
                <div className="icon-check">✔</div>
              </div>
              <h3 className="rehab-title">{service.title}</h3>
              <p className="rehab-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RehabilitationSection;
