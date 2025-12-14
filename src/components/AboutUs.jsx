import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaUserMd, FaHeartbeat, FaHandHoldingMedical, FaDna } from 'react-icons/fa';
import { supabase } from '../lib/supabase';

const AboutUs = () => {
  const [founderInfo, setFounderInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const values = [
    {
      icon: <FaHeartbeat />,
      title: "Patient-Centric Care",
      description: "We place you at the center of everything we do, tailoring treatments to your unique needs."
    },
    {
      icon: <FaHandHoldingMedical />,
      title: "Holistic Approach",
      description: "Treating the whole person—mind, body, and spirit—not just the symptoms."
    },
    {
      icon: <FaDna />,
      title: "Evidence-Based Medicine",
      description: "Combining clinical expertise with the latest medical research for optimal outcomes."
    },
    {
      icon: <FaUserMd />,
      title: "Compassionate Experts",
      description: "A team of dedicated professionals who care deeply about your well-being."
    }
  ];

  useEffect(() => {
    loadFounderInfo();
  }, []);

  const loadFounderInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('founder_info')
        .select('*')
        .single();

      if (error) throw error;
      setFounderInfo(data);
    } catch (error) {
      console.error('Error loading founder info:', error);
      // Fallback to default data
      setFounderInfo({
        name: 'Mr. Vaishnav',
        title: 'Founder & Director',
        quote: 'At Aarunya, we believe that true healthcare goes beyond treating symptoms. It\'s about understanding the whole person, their lifestyle, and their long-term goals.',
        bio: 'With over two decades of experience in healthcare management and a vision to transform medical services in the region.',
        image_url: '/images/Dr.Vaishnav.jpg',
        years_experience: 20
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="about-us-wrapper loading">Loading...</div>;
  }

  return (
    <div className="about-us-wrapper">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="container">
          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-badge">Who We Are</span>
            <h1 className="hero-title">
              Redefining Healthcare with <span className="highlight">Compassion</span> & <span className="highlight">Excellence</span>
            </h1>
            <p className="hero-subtitle">
              Aarunya Health Care is more than a clinic; it&apos;s a sanctuary for healing and longevity. We are dedicated to providing comprehensive, multidimensional care that strengthens your health from within.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Section - Now Dynamic */}
      {founderInfo && (
        <section className="founder-showcase-section">
          <div className="container">
            <div className="founder-card">
              <div className="founder-image-col">
                <div className="image-frame">
                  <img
                    src={founderInfo.image_url || '/images/Dr.Vaishnav.jpg'}
                    alt={founderInfo.name}
                    className="founder-img"
                  />
                  <div className="founder-floating-badge">
                    <span className="badge-icon">👨‍⚕️</span>
                    <div className="badge-text">
                      <span className="badge-title">{founderInfo.name}</span>
                      <span className="badge-role">{founderInfo.title}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="founder-content-col">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="section-tag">Visionary Leadership</div>
                  <h2 className="founder-heading">Leading with Purpose</h2>

                  {founderInfo.quote && (
                    <div className="founder-quote-box">
                      <FaQuoteLeft className="quote-icon" />
                      <p className="founder-quote">
                        &quot;{founderInfo.quote}&quot;
                      </p>
                    </div>
                  )}

                  {founderInfo.bio && (
                    <div className="founder-bio-text">
                      <p>{founderInfo.bio}</p>
                    </div>
                  )}

                  <div className="signature-area">
                    <span className="signature-text">{founderInfo.name}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Core Values Section */}
      <section className="core-values-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-badge">Our Philosophy</span>
            <h2 className="section-title">The Pillars of Our Care</h2>
            <p className="section-desc">Guided by principles that prioritize your health and happiness.</p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="value-icon-wrapper">
                  {value.icon}
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-desc">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
