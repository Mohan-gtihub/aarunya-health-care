import { motion, AnimatePresence } from 'framer-motion';
import './DoctorModal.css';

export default function DoctorModal({ doctor, isOpen, onClose }) {
  if (!isOpen || !doctor) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <div className="modal-body">
            <div className="modal-header">
              <div className="modal-image">
                <img src={doctor.image} alt={doctor.name} />
                {doctor.available && (
                  <span className="modal-status">Available</span>
                )}
              </div>
              <div className="modal-header-info">
                <h2>{doctor.name}</h2>
                <p className="modal-title">{doctor.title}</p>
                <span className="modal-specialty">{doctor.specialty}</span>
              </div>
            </div>

            <div className="modal-details">
              <div className="details-grid">
                <div className="detail-item">
                  <div className="detail-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div className="detail-content">
                    <h4>Experience</h4>
                    <p>{doctor.experience}</p>
                  </div>
                </div>

                {doctor.location && (
                  <div className="detail-item">
                    <div className="detail-icon">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                    <div className="detail-content">
                      <h4>Location</h4>
                      <p>{doctor.location}</p>
                    </div>
                  </div>
                )}
              </div>

              {doctor.bio && (
                <div className="bio-section">
                  <div className="bio-header">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <h3>About Doctor</h3>
                  </div>
                  <p>{doctor.bio}</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <a href="/contact" className="btn btn-primary">
                Contact Us
              </a>
              <a href="/doctors" className="btn btn-secondary">
                View All Doctors
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
