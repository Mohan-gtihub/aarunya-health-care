import { useState } from 'react';
import Hero from '../components/Hero';
import DepartmentCard from '../components/DepartmentCard';
import DoctorCard from '../components/DoctorCard';
import DoctorModal from '../components/DoctorModal';
import AwardsCarousel from '../components/AwardsCarousel';
import './Home.css';

const departments = [
  {
    id: 1,
    name: 'Cardiology Clinic',
    slug: 'cardiology',
    description: 'Advanced cardiac care including ECG, echocardiography, and stress testing under the guidance of our founder Mr. Vaishnav.',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    )
  },
  {
    id: 2,
    name: 'Pediatric Clinic',
    slug: 'pediatrics',
    description: 'Comprehensive healthcare for children including vaccinations, growth monitoring, and pediatric emergencies.',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>
    )
  },
  {
    id: 3,
    name: 'Orthopedic Clinic',
    slug: 'orthopedics',
    description: 'Bone and joint care including fracture management, arthritis treatment, and joint replacement surgeries.',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    )
  },
  {
    id: 4,
    name: 'Dental Clinic',
    slug: 'dental',
    description: 'Complete dental care including routine check-ups, fillings, root canals, and cosmetic dentistry.',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      </svg>
    )
  },
  {
    id: 5,
    name: 'Gynecology Clinic',
    slug: 'gynecology',
    description: 'Women's health services including routine check-ups, prenatal care, and gynecological surgeries.',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
        <path d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2a1 1 0 100-2 2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"/>
      </svg>
    )
  },
  {
    id: 6,
    name: 'Neurology Clinic',
    slug: 'neurology',
    description: 'Diagnosis and treatment of neurological disorders including epilepsy, stroke, and neurodegenerative diseases.',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    )
  },
  {
    id: 7,
    name: 'Diagnostic Services',
    slug: 'diagnostics',
    description: 'State-of-the-art imaging services including digital X-ray, ultrasound, and advanced laboratory diagnostics.',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    )
  },
  {
    id: 8,
    name: 'General Medicine',
    slug: 'general-medicine',
    description: 'Primary healthcare services including routine check-ups, chronic disease management, and preventive care.',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    )
  }
];

const allDoctors = [
  {
    id: 1,
    name: 'Dr. Mohammed Sarfaraz Nawaz Ahmed',
    title: 'MBBS, MD, MRCPCH',
    specialty: 'Pediatrics',
    experience: '10+ years',
    location: 'SR Nagar',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
    available: true,
    bio: 'Completed MBBS from Deccan College of Medical Sciences and MD in Paediatrics from Prathima Institute. Awarded MRCPCH from Royal College of Paediatrics and Child Health, UK. Completed post graduate programmes in paediatric nutrition and vaccination.'
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
    bio: 'Associate Consultant specializing in Complex Orthopaedic Trauma, Joint Replacements, and Sports Medicine. Fellowship in Hip & Pelviacetabular Trauma (AO Trauma Austria). Certified in Robotic Knee Replacement and Advanced Knee and Shoulder Arthroscopy.'
  },
  {
    id: 3,
    name: 'Dr. Sruthi Reddy',
    title: 'MBBS, MS (OBG & GYN), FMAS',
    specialty: 'Gynecology',
    experience: '10+ years',
    location: 'Bachupally',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    available: true,
    bio: 'Specialist in Obstetrics and Gynecology with expertise in high-risk pregnancies, minimally invasive surgeries, and reproductive health. Fellow of Minimal Access Surgery.'
  },
  {
    id: 4,
    name: 'Dr. Vaishnav',
    title: 'MBBS, MD (Cardiology)',
    specialty: 'Cardiology',
    experience: '15+ years',
    location: 'SR Nagar',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5d16d?w=400&q=80',
    available: true,
    bio: 'Founder of Aarunya Healthcare with extensive experience in interventional cardiology, complex coronary interventions, and cardiac electrophysiology.'
  },
  {
    id: 5,
    name: 'Dr. Anjali Sharma',
    title: 'MBBS, MD (Dermatology)',
    specialty: 'Dermatology',
    experience: '8+ years',
    location: 'Bachupally',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea5bc57d?w=400&q=80',
    available: false,
    bio: 'Expert in cosmetic dermatology, laser treatments, and advanced skin care procedures. Specialized in treating complex skin conditions.'
  },
  {
    id: 6,
    name: 'Dr. Rajesh Kumar',
    title: 'MBBS, MS (General Surgery)',
    specialty: 'General Surgery',
    experience: '12+ years',
    location: 'SR Nagar',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80',
    available: true,
    bio: 'Senior surgeon with expertise in laparoscopic procedures, trauma care, and emergency surgeries. Experienced in complex abdominal surgeries.'
  }
];

function Home() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctors] = useState(allDoctors);

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDoctor(null), 300);
  };

  return (
    <>
      <Hero />

      {/* Departments Section */}
      <section id="departments" className="departments-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Our Departments</h2>
            <div className="gold-divider"></div>
            <p className="section-subtitle">
              Comprehensive medical services across multiple specialties
            </p>
          </div>
          <div className="departments-grid">
            {departments.map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="doctors-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Our Expert Doctors</h2>
            <div className="gold-divider"></div>
            <p className="section-subtitle">
              Meet our team of experienced medical professionals
            </p>
          </div>
          <div className="doctors-grid">
            {doctors.map((doctor) => (
              <DoctorCard 
                key={doctor.id} 
                doctor={doctor} 
                onCardClick={() => handleDoctorClick(doctor)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="awards-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Achievements & Awards</h2>
            <div className="gold-divider"></div>
            <p className="section-subtitle">
              Recognized excellence in healthcare services
            </p>
          </div>
          <AwardsCarousel />
        </div>
      </section>

      {/* Doctor Modal */}
      {selectedDoctor && (
        <DoctorModal 
          doctor={selectedDoctor} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default Home;
