import { motion } from 'framer-motion';


export default function DepartmentCard({ department, index }) {
  return (
    <motion.article
      className="department-card card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="department-icon">
        {department.icon}
      </div>
      <h3>{department.name}</h3>
      <p>{department.description}</p>
      <a href={`/departments#${department.slug}`} className="btn-link">
        Learn more
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </motion.article>
  );
}
