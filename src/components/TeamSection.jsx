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
  }, []); // Empty dependency array - only run once on mount

  if (loading) {
    return (
      <section className="team-section loading">
        <div>Loading doctors...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="team-section error">
        <div>Error loading doctors: {error}</div>
      </section>
    );
  }

  return (
    <section
      id="team"
      className="team-section"
    >
      <div className="team-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="team-header"
        >
          <span className="team-eyebrow">Our Team</span>
          <h2 className="team-heading">Meet Our Expert Doctors</h2>
          <p className="team-subheading">
            Dedicated healthcare professionals committed to your well-being
          </p>
        </motion.div>

        <div className="team-grid">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="team-card"
              onClick={() => setActiveDoctor(doctor)}
            >
              <div className="team-image-container">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="team-image"
                  loading="lazy"
                />
                <div className="team-specialty-badge">
                  {doctor.specialty}
                </div>
              </div>
              <div className="team-info">
                <h3 className="team-name">{doctor.name}</h3>
                <p className="team-role">{doctor.role}</p>
                <p className="team-experience">{doctor.experience} experience</p>
                <p className="team-location"><span>📍</span> {doctor.location}</p>
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
            className="team-modal-overlay"
            onClick={() => setActiveDoctor(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="team-modal-content"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="team-close-button"
                onClick={() => setActiveDoctor(null)}
                aria-label="Close"
              >
                &times;
              </button>

              <div className="team-modal-grid">
                <div className="team-modal-image-container">
                  <img
                    src={activeDoctor.image}
                    alt={activeDoctor.name}
                    className="team-modal-image"
                  />
                </div>

                <div className="team-modal-info">
                  <h3 className="team-modal-name">{activeDoctor.name}</h3>
                  <p className="team-modal-role">{activeDoctor.role}</p>
                  <p className="team-modal-specialty">{activeDoctor.specialty} • {activeDoctor.location}</p>

                  <div className="team-modal-section">
                    <h4 className="team-section-title">About</h4>
                    <p>{activeDoctor.bio}</p>
                  </div>

                  <div className="team-modal-section">
                    <h4 className="team-section-title">Experience</h4>
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

export default TeamSection;