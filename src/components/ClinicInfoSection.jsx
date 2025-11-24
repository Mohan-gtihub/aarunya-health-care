import React from 'react';
import { motion } from 'framer-motion';

const ClinicInfoSection = () => {
  const specialtyClinics = [
    { label: 'Internal Medicine', icon: '🏥' },
    { label: 'Diabetology', icon: '🩺' },
    { label: 'Oncology', icon: '🦠' },
    { label: 'Psychiatry', icon: '🧠' },
    { label: 'Physiotherapy', icon: '💪' },
    { label: 'Daycare', icon: '👶' }
  ];

  const diagnostics = [
    'Lab Tests', 'Ultrasound', 'X-Ray', 'ECG', 'MRI', 'CT Scan', 'Mammography', 'Endoscopy'
  ];

  return (
    <section id="clinic-info" style={{
      background: 'linear-gradient(to bottom, #0a0a1a 0%, #1a1a2e 100%)',
      padding: '80px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="clinic-services" style={{
        position: 'relative',
        marginTop: '60px',
        padding: '40px 0'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '2px',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent, rgba(124, 77, 255, 0.2), transparent)'
        }}></div>

        <div style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '60px'
          }}>
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                textAlign: 'center',
                marginBottom: '20px'
              }}
            >
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: 'var(--neutral-50)',
                marginBottom: '15px',
                background: 'linear-gradient(90deg, var(--brand-purple), var(--brand-gold))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Comprehensive Healthcare Services
              </h2>
              <p style={{
                color: 'var(--neutral-300)',
                maxWidth: '700px',
                margin: '0 auto',
                fontSize: '1.1rem',
                lineHeight: 1.7
              }}>
                Expert medical care tailored to your unique health needs with state-of-the-art facilities and compassionate professionals
              </p>
            </motion.div>

            {/* Specialties Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
              position: 'relative',
              zIndex: 2
            }}>
              {specialtyClinics.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    padding: '30px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(124, 77, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    ':hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                      borderColor: 'rgba(124, 77, 255, 0.3)',
                      '&:before': {
                        opacity: 1
                      }
                    },
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, var(--brand-purple), var(--brand-gold))',
                      opacity: 0.7,
                      transition: 'opacity 0.3s ease'
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '12px',
                      background: 'rgba(124, 77, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </div>
                    <h3 style={{
                      margin: 0,
                      color: 'var(--neutral-50)',
                      fontSize: '1.3rem',
                      fontWeight: 600
                    }}>
                      {item.label}
                    </h3>
                  </div>
                  <p style={{
                    color: 'var(--neutral-300)',
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    marginTop: '15px',
                    marginBottom: 0
                  }}>
                    Expert care and comprehensive treatment plans for all your {item.label.toLowerCase()} needs.
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Diagnostics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                marginTop: '80px',
                position: 'relative',
                padding: '60px 0',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '20px',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 30% 50%, rgba(124, 77, 255, 0.05) 0%, transparent 50%)',
                zIndex: 1
              }}></div>

              <div style={{
                position: 'relative',
                zIndex: 2,
                maxWidth: '800px',
                margin: '0 auto',
                textAlign: 'center',
                padding: '0 20px'
              }}>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--neutral-50)',
                  marginBottom: '15px',
                  background: 'linear-gradient(90deg, var(--brand-gold), var(--brand-purple))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Advanced Diagnostic Services
                </h3>
                <p style={{
                  color: 'var(--neutral-300)',
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  marginBottom: '30px'
                }}>
                  State-of-the-art diagnostic services for accurate and timely results
                </p>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '15px',
                  marginTop: '30px'
                }}>
                  {diagnostics.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        type: 'spring',
                        stiffness: 100
                      }}
                      whileHover={{
                        y: -3,
                        boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                      }}
                      style={{
                        padding: '12px 24px',
                        borderRadius: '30px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'var(--neutral-50)',
                        fontSize: '1rem',
                        fontWeight: 500,
                        transition: 'all 0.3s ease',
                        backdropFilter: 'blur(5px)',
                        cursor: 'default'
                      }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicInfoSection;