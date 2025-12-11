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
        <img
          src={doctor.image_url || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80'}
          alt={doctor.name}
          loading="lazy"
        />
        {doctor.available && (
          <span className="doctor-status">Available</span>
        )}
      </div>
      <div className="doctor-info">
        <h3>{doctor.name}</h3>
        {doctor.qualification && <p className="doctor-title">{doctor.qualification}</p>}
        <p className="doctor-specialty">{doctor.specialization}</p>
        <div className="doctor-meta">
          {doctor.experience && (
            <span>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {doctor.experience}
            </span>
          )}
          {doctor.department && (
            <span>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {doctor.department}
            </span>
          )}
        </div>
        {doctor.consultation_fee && (
          <p className="doctor-fee">₹{doctor.consultation_fee} consultation</p>
        )}
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
