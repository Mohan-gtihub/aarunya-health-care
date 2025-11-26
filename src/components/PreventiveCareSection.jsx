import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaUserMd, FaNotesMedical, FaVial } from 'react-icons/fa';

const PreventiveCareSection = () => {
  const services = [
    {
      icon: <FaHeartbeat />,
      title: 'Cardiac Health',
      description: 'Comprehensive heart health assessments including ECG, Echo, and stress tests.'
    },
    {
      icon: <FaUserMd />,
      title: 'Full Body Checkup',
      description: 'Complete physical examination and screening for common health conditions.'
    },
    {
      icon: <FaNotesMedical />,
      title: 'Lifestyle Management',
      description: 'Personalized plans for diet, exercise, and stress management.'
    },
    {
      icon: <FaVial />,
      title: 'Advanced Diagnostics',
      description: 'State-of-the-art laboratory testing for accurate health monitoring.'
    }
  ];

  return (
    <section className="preventive-care-section" id="preventive-care">
      <div className="preventive-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="preventive-header"
        >
          <span className="preventive-eyebrow">Preventive Care</span>
          <h2 className="preventive-title">Invest in Your Future Health</h2>
          <p className="preventive-subtitle">
            Proactive healthcare solutions designed to keep you healthy and thriving.
          </p>
        </motion.div>

        <div className="preventive-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="preventive-card"
            >
              <div className="preventive-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="preventive-card-title">{service.title}</h3>
              <p className="preventive-card-description">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreventiveCareSection;
