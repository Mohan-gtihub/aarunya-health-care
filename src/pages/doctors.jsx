import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import DoctorCard from '../components/DoctorCard';
import { supabase } from '../lib/supabase';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Load doctors from Supabase
  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('available', true)
        .order('name', { ascending: true });

      if (error) throw error;
      setDoctors(data || []);
    } catch (error) {
      console.error('Error loading doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique specialties and departments
  const specialties = ['All', ...new Set(doctors.map(d => d.specialization))];
  const departments = ['All', ...new Set(doctors.map(d => d.department))];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialization === selectedSpecialty;
    const matchesDepartment = selectedDepartment === 'All' || doctor.department === selectedDepartment;
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doctor.department && doctor.department.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSpecialty && matchesDepartment && matchesSearch;
  });

  return (
    <div className="doctors-page">
      <Head>
        <title>Our Doctors - Expert Medical Specialists | Aarunya Health Care</title>
        <meta name="description" content="Meet our team of board-certified physicians, diabetologists, and oncologists. Expert care with compassion at Aarunya Health Care." />
      </Head>
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
                  placeholder="Search by name, specialty, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search doctors"
                />
              </div>

              {/* Specialty and Department Filters */}
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
                  <label>Department</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {departments.map(department => (
                      <button
                        key={department}
                        className={`filter-btn ${selectedDepartment === department ? 'active' : ''}`}
                        onClick={() => setSelectedDepartment(department)}
                      >
                        {department}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Info */}
            <div className="results-info">
              <p>
                {loading ? 'Loading...' : `${filteredDoctors.length} ${filteredDoctors.length === 1 ? 'doctor' : 'doctors'} found`}
              </p>
            </div>

            {/* Doctors Grid or No Results */}
            {loading ? (
              <div className="loading-state" style={{ textAlign: 'center', padding: '3rem' }}>
                <div className="loading-spinner" style={{ margin: '0 auto 1rem' }}></div>
                <p>Loading doctors...</p>
              </div>
            ) : filteredDoctors.length > 0 ? (
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
