import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMember, setActiveMember] = useState(null);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (err) {
      console.error('Error loading team members:', err);
      setError(err.message);
      // Fallback to sample data
      setTeamMembers([
        {
          id: 1,
          name: 'Dr. Mohammed Sarfaraz Nawaz Ahmed',
          role: 'MBBS, MD, MRCPCH',
          department: 'Pediatrics',
          bio: 'Completed MBBS from Deccan College of Medical Sciences and MD in Paediatrics from Prathima Institute.',
          image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
          email: null,
          linkedin_url: null
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="team-section loading">
        <div className="team-container">
          <div className="loading-spinner"></div>
          <p>Loading team members...</p>
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <section className="team-section">
        <div className="team-container">
          <p>No team members found.</p>
        </div>
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
          <h2 className="team-heading">Meet Our Expert Team</h2>
          <p className="team-subheading">
            Dedicated healthcare professionals committed to your well-being
          </p>
        </motion.div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="team-card"
              onClick={() => setActiveMember(member)}
            >
              <div className="team-image-container">
                <img
                  src={member.image_url || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80'}
                  alt={member.name}
                  className="team-image"
                  loading="lazy"
                />
                {member.department && (
                  <div className="team-specialty-badge">
                    {member.department}
                  </div>
                )}
              </div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                {member.email && (
                  <p className="team-email">
                    <span>📧</span> {member.email}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="team-modal-overlay"
            onClick={() => setActiveMember(null)}
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
                onClick={() => setActiveMember(null)}
                aria-label="Close"
              >
                &times;
              </button>

              <div className="team-modal-grid">
                <div className="team-modal-image-container">
                  <img
                    src={activeMember.image_url || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80'}
                    alt={activeMember.name}
                    className="team-modal-image"
                  />
                </div>

                <div className="team-modal-info">
                  <h3 className="team-modal-name">{activeMember.name}</h3>
                  <p className="team-modal-role">{activeMember.role}</p>
                  {activeMember.department && (
                    <p className="team-modal-specialty">{activeMember.department}</p>
                  )}

                  {activeMember.bio && (
                    <div className="team-modal-section">
                      <h4 className="team-section-title">About</h4>
                      <p>{activeMember.bio}</p>
                    </div>
                  )}

                  {activeMember.email && (
                    <div className="team-modal-section">
                      <h4 className="team-section-title">Contact</h4>
                      <p>📧 {activeMember.email}</p>
                      {activeMember.linkedin_url && (
                        <p>
                          <a href={activeMember.linkedin_url} target="_blank" rel="noopener noreferrer">
                            LinkedIn Profile
                          </a>
                        </p>
                      )}
                    </div>
                  )}
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