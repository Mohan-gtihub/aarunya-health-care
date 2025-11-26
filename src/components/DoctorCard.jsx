import { motion } from 'framer-motion';


export default function DoctorCard({ doctor, index, onClick }) {
  return (
    <motion.article
      className="doctor-card card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="doctor-image">
        <img src={doctor.image} alt={doctor.name} loading="lazy" />
        {doctor.available && (
          <span className="doctor-status">Available</span>
        )}
      </div>
      <div className="doctor-info">
        <h3>{doctor.name}</h3>
        <p className="doctor-title">{doctor.title}</p>
        <p className="doctor-specialty">{doctor.specialty}</p>
        <div className="doctor-meta">
          <span>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {doctor.experience}
          </span>
          {doctor.location && (
            <span>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {doctor.location}
            </span>
          )}
        </div>
      </div>
      <button className="btn btn-primary btn-block view-details-btn">
        <span>View Details</span>
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </motion.article>
  );
}
