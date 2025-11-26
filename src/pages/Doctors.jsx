import { useState } from 'react';
import { motion } from 'framer-motion';
import DoctorCard from '../components/DoctorCard';


const allDoctors = [
  // SR Nagar Clinic
  {
    id: 1,
    name: 'Dr. Mohammed Sarfaraz Nawaz Ahmed',
    title: 'MBBS, MD, MRCPCH',
    specialty: 'Pediatrics',
    experience: '10+ years',
    location: 'SR Nagar',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
    available: true,
    bio: 'Completed MBBS from Deccan College of Medical Sciences and MD in Paediatrics from Prathima Institute. Awarded MRCPCH from Royal College of Paediatrics and Child Health, UK. Completed post graduate programmes in paediatric nutrition and vaccination.',
    clinicalExpertise: [
      'Pediatric nutrition and growth monitoring',
      'Vaccination and immunization programs',
      'Childhood infectious diseases',
      'Developmental pediatrics'
    ],
    philosophy: 'I believe healthcare begins with listening, treating with precision, and guiding parents toward long-term health for their children.',
    languages: ['English', 'Hindi', 'Telugu', 'Urdu'],
    teleconsultation: true
  },
  {
    id: 2,
    name: 'Dr. C R Nagarjuna',
    title: 'MBBS, DNB, MNAMS, FIJR, CUVIS',
    specialty: 'Orthopedics',
    experience: '12+ years',
    location: 'SR Nagar',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
    available: true,
    bio: 'Associate Consultant specializing in Complex Orthopaedic Trauma, Joint Replacements, and Sports Medicine. Fellowship in Hip & Pelviacetabular Trauma (AO Trauma Austria). Certified in Robotic Knee Replacement and Advanced Knee and Shoulder Arthroscopy.',
    clinicalExpertise: [
      'Complex orthopedic trauma management',
      'Total joint replacements (Hip, Knee)',
      'Sports medicine and arthroscopy',
      'Robotic-assisted knee surgery'
    ],
    philosophy: 'Precision in surgery, compassion in care, and commitment to restoring mobility and quality of life.',
    languages: ['English', 'Hindi', 'Telugu'],
    teleconsultation: false
  },
  // Bachupally Clinic
  {
    id: 3,
    name: 'Dr. Sruthi Reddy',
    title: 'MBBS, MS (OBG & GYN), FMAS',
    specialty: 'Gynecology',
    experience: '10+ years',
    location: 'Bachupally',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    available: true,
    bio: 'Accomplished obstetrician and gynecologist with MS from Gandhi Medical College. Fellowship in Minimal Access Surgery (FMAS) from World Laparoscopy Hospital, New Delhi. Advanced Diploma in Assisted Reproductive Technology (ART) from Germany.',
    clinicalExpertise: [
      'High-risk pregnancy management',
      'Laparoscopic gynecological surgery',
      'Infertility treatment and ART',
      'Women\'s health and wellness'
    ],
    philosophy: 'Empowering women through comprehensive care, advanced treatments, and compassionate support at every life stage.',
    languages: ['English', 'Hindi', 'Telugu'],
    teleconsultation: true
  },
  {
    id: 4,
    name: 'Dr. Rajashekar Danda',
    title: 'MBBS, MS (Ortho)',
    specialty: 'Orthopedics',
    experience: '15+ years',
    location: 'Bachupally',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    available: true,
    bio: 'Distinguished consultant Orthopaedic surgeon specializing in Arthroscopy, Joint Replacement, and Trauma Surgeries. MS from Manipal University. Fellowship in Sports Medicine and Arthroplasty from Seoul, South Korea.',
    clinicalExpertise: [
      'Arthroscopic surgery (Knee, Shoulder)',
      'Primary and revision joint replacements',
      'Trauma and fracture management',
      'Sports injury rehabilitation'
    ],
    philosophy: 'Excellence in orthopedic care through advanced techniques, personalized treatment, and patient-centered recovery.',
    languages: ['English', 'Hindi', 'Telugu'],
    teleconsultation: false
  },
  {
    id: 5,
    name: 'Dr. Rajasekhar',
    title: 'MBBS, MS, DNB (Emergency Medicine)',
    specialty: 'Emergency Medicine',
    experience: '12+ years',
    location: 'Bachupally',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80',
    available: true,
    bio: 'Provides full range of services for critically ill patients with acute surgical emergencies, sepsis, shock, respiratory failure and multisystem organ failures. Expert in treating surgical emergencies, infections, and trauma cases.',
    clinicalExpertise: [
      'Critical care and emergency management',
      'Acute surgical emergencies',
      'Sepsis and shock management',
      'Trauma and multi-organ failure care'
    ],
    philosophy: 'Every second counts in emergency care - swift action, expert judgment, and compassionate treatment save lives.',
    languages: ['English', 'Hindi', 'Telugu'],
    teleconsultation: false
  },
  {
    id: 6,
    name: 'Dr. Pranitha',
    title: 'MPT (Neuro)',
    specialty: 'Physiotherapy',
    experience: '8+ years',
    location: 'Both Locations',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
    available: true,
    bio: 'Experienced physiotherapist specializing in pre and post surgery rehabilitation. Expert in Orthopaedic, Neurological Disorders, Sports Injuries, Chronic Pain Management, Pediatric and Geriatric Care, and Women\'s Health.',
    clinicalExpertise: [
      'Post-surgical rehabilitation',
      'Neurological disorder management',
      'Sports injury recovery',
      'Chronic pain management',
      'Geriatric and pediatric physiotherapy'
    ],
    philosophy: 'Movement is medicine - restoring function, reducing pain, and empowering patients to reclaim their active lives.',
    languages: ['English', 'Hindi', 'Telugu'],
    teleconsultation: true
  }
];

const specialties = ['All', 'Pediatrics', 'Orthopedics', 'Gynecology', 'Emergency Medicine', 'Physiotherapy'];
const locations = ['All', 'SR Nagar', 'Bachupally', 'Both Locations'];

export default function Doctors() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = allDoctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    const matchesLocation = selectedLocation === 'All' || doctor.location === selectedLocation;
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doctor.location && doctor.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSpecialty && matchesLocation && matchesSearch;
  });

  return (
    <div className="doctors-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <h1>Our Medical Experts</h1>
            <p>
              Meet our board-certified physicians at Aarunya Health Care, founded by Mr. Vaishnav,
              dedicated to providing exceptional care with compassion and expertise
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Doctors Section */}
      <section className="doctors-filter-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="filter-controls">
              {/* Search Box */}
              <div className="search-box">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, specialty, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search doctors"
                />
              </div>

              {/* Specialty and Location Filters */}
              <div className="specialty-filters">
                <div className="filter-group">
                  <label>Specialty</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {specialties.map(specialty => (
                      <button
                        key={specialty}
                        className={`filter-btn ${selectedSpecialty === specialty ? 'active' : ''}`}
                        onClick={() => setSelectedSpecialty(specialty)}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="filter-group">
                  <label>Location</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {locations.map(location => (
                      <button
                        key={location}
                        className={`filter-btn ${selectedLocation === location ? 'active' : ''}`}
                        onClick={() => setSelectedLocation(location)}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Info */}
            <div className="results-info">
              <p>
                {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'} found
              </p>
            </div>

            {/* Doctors Grid or No Results */}
            {filteredDoctors.length > 0 ? (
              <motion.div
                className="grid grid-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {filteredDoctors.map((doctor, index) => (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 * index,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    <DoctorCard doctor={doctor} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="no-results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <svg width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3>No doctors found</h3>
                <p>Try adjusting your search or filter criteria to find the right specialist</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
