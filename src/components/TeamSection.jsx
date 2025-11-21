import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TeamSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDoctor, setActiveDoctor] = useState(null);

  // Sample data matching your Doctors.jsx
  const sampleDoctors = [
    {
      id: 1,
      name: 'Dr. Mohammed Sarfaraz Nawaz Ahmed',
      role: 'MBBS, MD, MRCPCH',
      specialty: 'Pediatrics',
      experience: '10+ years',
      location: 'SR Nagar',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
      bio: 'Completed MBBS from Deccan College of Medical Sciences and MD in Paediatrics from Prathima Institute. Awarded MRCPCH from Royal College of Paediatrics and Child Health, UK.'
    },
    {
      id: 2,
      name: 'Dr. C R Nagarjuna',
      role: 'MBBS, DNB, MNAMS, FIJR, CUVIS',
      specialty: 'Orthopedics',
      experience: '12+ years',
      location: 'SR Nagar',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
      bio: 'Associate Consultant specializing in Complex Orthopaedic Trauma, Joint Replacements, and Sports Medicine.'
    },
    {
      id: 3,
      name: 'Dr. Sruthi Reddy',
      role: 'MBBS, MS (OBG & GYN), FMAS',
      specialty: 'Gynecology',
      experience: '10+ years',
      location: 'Bachupally',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
      bio: 'Accomplished obstetrician and gynecologist with MS from Gandhi Medical College.'
    }
  ];

  useEffect(() => {
    // In a real app, you would fetch from your API:
    // const fetchDoctors = async () => {
    //   try {
    //     const response = await fetch('/api/doctors');
    //     const data = await response.json();
    //     setDoctors(data);
    //   } catch (err) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchDoctors();

    // For now, use the sample data
    setDoctors(sampleDoctors);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section style={{ 
        padding: '80px 20px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 100%)'
      }}>
        <div>Loading doctors...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section style={{ 
        padding: '80px 20px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 100%)',
        color: '#ff6b6b'
      }}>
        <div>Error loading doctors: {error}</div>
      </section>
    );
  }

  return (
    <section style={{ 
      padding: '80px 0',
      background: 'linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 100%)'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 20px' 
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <span style={styles.eyebrow}>Our Team</span>
          <h2 style={styles.heading}>Meet Our Expert Doctors</h2>
          <p style={styles.subHeading}>
            Dedicated healthcare professionals committed to your well-being
          </p>
        </motion.div>

        <div style={styles.grid}>
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={styles.card}
              onClick={() => setActiveDoctor(doctor)}
            >
              <div style={styles.imageContainer}>
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  style={styles.image}
                  loading="lazy"
                />
                <div style={styles.specialtyBadge}>
                  {doctor.specialty}
                </div>
              </div>
              <div style={styles.info}>
                <h3 style={styles.name}>{doctor.name}</h3>
                <p style={styles.role}>{doctor.role}</p>
                <p style={styles.experience}>{doctor.experience} experience</p>
                <p style={styles.location}><span>📍</span> {doctor.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeDoctor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay}
            onClick={() => setActiveDoctor(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={styles.modalContent}
              onClick={e => e.stopPropagation()}
            >
              <button 
                style={styles.closeButton}
                onClick={() => setActiveDoctor(null)}
                aria-label="Close"
              >
                &times;
              </button>
              
              <div style={styles.modalGrid}>
                <div style={styles.modalImageContainer}>
                  <img 
                    src={activeDoctor.image} 
                    alt={activeDoctor.name}
                    style={styles.modalImage}
                  />
                </div>
                
                <div style={styles.modalInfo}>
                  <h3 style={styles.modalName}>{activeDoctor.name}</h3>
                  <p style={styles.modalRole}>{activeDoctor.role}</p>
                  <p style={styles.modalSpecialty}>{activeDoctor.specialty} • {activeDoctor.location}</p>
                  
                  <div style={styles.modalSection}>
                    <h4 style={styles.sectionTitle}>About</h4>
                    <p>{activeDoctor.bio}</p>
                  </div>
                  
                  <div style={styles.modalSection}>
                    <h4 style={styles.sectionTitle}>Experience</h4>
                    <p>{activeDoctor.experience} of experience</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Styles
const styles = {
  eyebrow: {
    display: 'inline-block',
    color: 'var(--brand-purple-light)',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '15px',
    position: 'relative',
    paddingLeft: '15px',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: 'var(--neutral-50)',
    margin: '15px 0 20px',
    background: 'linear-gradient(90deg, var(--brand-purple), var(--brand-gold))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subHeading: {
    color: 'var(--neutral-300)',
    fontSize: '1.1rem',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: 1.7
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '40px'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      borderColor: 'rgba(124, 77, 255, 0.3)'
    }
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    paddingTop: '100%',
    overflow: 'hidden'
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease'
  },
  specialtyBadge: {
    position: 'absolute',
    bottom: '15px',
    left: '15px',
    background: 'rgba(124, 77, 255, 0.9)',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 600
  },
  info: {
    padding: '20px'
  },
  name: {
    fontSize: '1.3rem',
    fontWeight: 600,
    color: 'var(--neutral-50)',
    margin: '0 0 5px'
  },
  role: {
    color: 'var(--brand-gold)',
    fontSize: '0.9rem',
    margin: '0 0 10px'
  },
  experience: {
    color: 'var(--neutral-300)',
    fontSize: '0.9rem',
    margin: '0 0 5px'
  },
  location: {
    color: 'var(--neutral-400)',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    margin: 0
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
    backdropFilter: 'blur(5px)'
  },
  modalContent: {
    background: '#0f0f1a',
    borderRadius: '16px',
    maxWidth: '900px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    color: 'white',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1.5rem',
    zIndex: 10,
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)'
    }
  },
  modalGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: '30px',
    padding: '40px'
  },
  modalImageContainer: {
    borderRadius: '12px',
    overflow: 'hidden',
    aspectRatio: '1/1'
  },
  modalImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  modalInfo: {
    color: 'var(--neutral-50)'
  },
  modalName: {
    fontSize: '2rem',
    fontWeight: 700,
    margin: '0 0 5px',
    color: 'white'
  },
  modalRole: {
    color: 'var(--brand-gold)',
    fontSize: '1.1rem',
    margin: '0 0 10px'
  },
  modalSpecialty: {
    color: 'var(--brand-purple-light)',
    fontSize: '1rem',
    margin: '0 0 20px'
  },
  modalSection: {
    marginBottom: '25px'
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'white',
    margin: '0 0 10px',
    position: 'relative',
    paddingLeft: '15px',
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '5px',
      height: '18px',
      background: 'var(--brand-gold)',
      borderRadius: '3px'
    }
  }
};

export default TeamSection;