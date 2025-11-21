import { motion } from 'framer-motion';
import './Departments.css';

const departments = [
  {
    id: 1,
    name: 'Laboratory Services',
    description: 'Advanced diagnostic laboratory equipped with state-of-the-art automated analyzers for accurate and timely test results.',
    services: [
      'Nano Lab 200 - Fully Automated Clinical Chemistry Analyser',
      'BIOSYSTEMS BTS Semi-Automatic Analyzer with LED Technology',
      'Sensa Cores ST-200aQua Electrolyte Analyzer (Na, K, Ca, pH, Cl)',
      'Mispa-i2 Semi-Automated Specific Protein Analyzer',
      'Cellenium 5D Retic - 5 Part Differential Hematology Analyser',
      'BC-3000Plus Mindray Hematology Analyzer',
      'Siemens CLINITEK Status+ Urine Analyzer with AI aided analysis'
    ],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80'
  },
  {
    id: 2,
    name: 'Cardiology',
    description: 'Comprehensive cardiac care with AI-powered ECG analysis and advanced diagnostic equipment for accurate heart health assessment.',
    services: [
      'Tricog InstaECG™ - AI-aided 12 Lead ECG with specialist verification',
      'Treadmill Stress Testing for cardiovascular assessment',
      '2D Echo (Two-Dimensional Echocardiography) for detailed heart imaging',
      'Real-time ECG data transmission to cloud',
      '24×7 cardiac specialist verification and reporting'
    ],
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&q=80'
  },
  {
    id: 3,
    name: 'Radiology',
    description: 'State-of-the-art imaging services with advanced Philips ultrasound systems and digital X-ray technology for superior diagnostic clarity.',
    services: [
      'Philips Ultrasound System with Next Gen AutoSCAN',
      'Flow Viewer for 3D-like vascular visualization',
      'MicroFlow Imaging (MFI) for small vessel detection',
      'Digital X-Ray with real-time enhancement and reduced radiation',
      'Digital OPG (Orthopantomogram) for panoramic dental imaging'
    ],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80'
  },
  {
    id: 4,
    name: 'Pulmonology',
    description: 'Comprehensive pulmonary function testing to assess lung health and diagnose respiratory conditions.',
    services: [
      'Spirometry for air volume measurement',
      'Lung volumes or body plethysmography',
      'Gas diffusion study for oxygen transfer assessment',
      'Cardiopulmonary exercise test (CPET)',
      'Complete respiratory function evaluation'
    ],
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80'
  },
  {
    id: 5,
    name: 'Orthopedics',
    description: 'Expert orthopedic care including joint replacement, sports medicine, and trauma surgeries with advanced arthroscopy techniques.',
    services: [
      'Complex Orthopaedic Trauma',
      'Joint Replacements (Hip, Knee, Shoulder)',
      'Sports Medicine & Arthroscopy',
      'Robotic Knee Replacement',
      'Minimal Access Surgery (FMAS)'
    ],
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&q=80'
  },
  {
    id: 6,
    name: 'Pediatrics',
    description: 'Compassionate pediatric care from MRCPCH certified specialists with expertise in child health and development.',
    services: [
      'Well-Child Visits & Developmental Screening',
      'Immunizations & Vaccination Programs',
      'Pediatric Nutrition Counseling',
      'Neonatal & Infant Care',
      'Adolescent Health Management'
    ],
    image: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=600&q=80'
  },
  {
    id: 7,
    name: 'Gynecology',
    description: 'Comprehensive women\'s health services including obstetrics, gynecology, and advanced reproductive medicine.',
    services: [
      'Obstetrics & Gynecology',
      'Minimal Access Surgery (Laparoscopy & Hysteroscopy)',
      'Assisted Reproductive Technology (ART)',
      'Fertility Treatments',
      'Prenatal & Postnatal Care'
    ],
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80'
  },
  {
    id: 8,
    name: 'Emergency Medicine',
    description: '24/7 emergency care with expertise in acute surgical emergencies, trauma, and critical care management.',
    services: [
      'Acute Surgical Emergencies',
      'Trauma & Critical Care',
      'Sepsis & Shock Management',
      'Respiratory Failure Treatment',
      'Multi-organ Failure Management'
    ],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80'
  },
  {
    id: 9,
    name: 'Physiotherapy',
    description: 'Comprehensive physiotherapy services for rehabilitation, pain management, and functional restoration.',
    services: [
      'Orthopaedic Rehabilitation',
      'Neurological Disorder Treatment',
      'Sports Injury Management',
      'Chronic Pain Management',
      'Pediatric & Geriatric Physiotherapy',
      'Women\'s Health & Pelvic Floor Rehabilitation'
    ],
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80'
  }
];

export default function Departments() {
  return (
    <div className="departments-page">
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Our Departments</h1>
            <p>Under the leadership of our founder Mr. Vaishnav, we offer advanced diagnostic and treatment facilities with state-of-the-art equipment across multiple specialties</p>
          </motion.div>
        </div>
      </section>

      <section className="departments-list">
        <div className="container">
          {departments.map((dept, index) => (
            <motion.article
              key={dept.id}
              id={dept.name.toLowerCase().replace(/\s+/g, '-')}
              className="department-detail card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="department-detail-image">
                <img src={dept.image} alt={dept.name} loading="lazy" />
              </div>
              <div className="department-detail-content">
                <h2>{dept.name}</h2>
                <p className="department-description">{dept.description}</p>
                <div className="services-list">
                  <h3>Services Offered:</h3>
                  <ul>
                    {dept.services.map((service, idx) => (
                      <li key={idx}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
