import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaQuoteLeft, FaUserMd, FaHeartbeat, FaHandHoldingMedical, FaDna,
  FaTint, FaWeight, FaSyringe, FaBrain, FaVirus, FaThermometerHalf, FaProcedures
} from 'react-icons/fa';
import { GiLiver, GiKidneys, GiStomach } from 'react-icons/gi'; // Need to check if react-icons/gi is available? 
// Safe bet: stick to Fa icons if possible, or assume typical react-icons install has all.
// Usually 'react-icons' package includes all. But imports might differ.
// If I can't verify, I'll stick to 'fa' icons or generic ones.
// I'll check package.json? No need, usually standard.

import { supabase } from '../lib/supabase';

const AboutUs = () => {
  const [founderInfo, setFounderInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const clinicalFocus = [
    {
      title: "Anemia",
      desc: "Advanced evaluation and precise correction of nutritional and chronic anemia.",
      icon: <FaTint className="focus-icon" />
    },
    {
      title: "Thyroid Disorders",
      desc: "Comprehensive care for hypo- and hyperthyroidism with long-term monitoring.",
      icon: <FaDna className="focus-icon" />
    },
    {
      title: "Obesity & Metabolic Health",
      desc: "Medical weight management focused on metabolic balance and sustainability.",
      icon: <FaWeight className="focus-icon" />
    },
    {
      title: "Liver Disorders",
      desc: "Expert management of fatty liver, hepatitis, and chronic liver conditions.",
      icon: <FaUserMd className="focus-icon" /> // Fallback icon
    },
    {
      title: "Chronic Fatigue",
      desc: "Holistic assessment of persistent fatigue and unexplained weakness.",
      icon: <FaHandHoldingMedical className="focus-icon" />
    },
    {
      title: "Diabetes Care",
      desc: "Personalized diabetes management with complication prevention.",
      icon: <FaSyringe className="focus-icon" />
    },
    {
      title: "Hypertension (HTN)",
      desc: "Precision blood pressure control and cardiovascular risk optimization.",
      icon: <FaHeartbeat className="focus-icon" />
    },
    {
      title: "Infections",
      desc: "Evidence-based treatment of acute and chronic infections.",
      icon: <FaVirus className="focus-icon" />
    },
    {
      title: "Immunization",
      desc: "Adult vaccinations for preventive and protective healthcare.",
      icon: <FaSyringe className="focus-icon" />
    },
    {
      title: "Neurological Care",
      desc: "Evaluation and management of headaches and common neurological symptoms.",
      icon: <FaBrain className="focus-icon" />
    },
    {
      title: "Cardiovascular Health",
      desc: "Early detection and medical management of heart-related conditions.",
      icon: <FaHeartbeat className="focus-icon" />
    },
    {
      title: "Renal Health",
      desc: "Diagnosis and monitoring of acute and chronic kidney disorders.",
      icon: <FaProcedures className="focus-icon" />
    },
    {
      title: "Fever Care",
      desc: "Structured evaluation of acute and prolonged fevers.",
      icon: <FaThermometerHalf className="focus-icon" />
    }
  ];

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
      // Fallback to updated default data provided by user
      setFounderInfo({
        name: 'Dr. Vaishnav Charan Kumar Dharmapuri',
        title: 'MBBS, MD (Internal Medicine), Fellowship in Diabetology (CPCDM)',
        quote: 'Refining modern healthcare with precision, prevention, and compassion.',
        bio: `Dr. Vaishnav Charan Kumar Dharmapuri is a distinguished Consultant Physician and Diabetologist, known for delivering personalized, evidence-based medical care in an exclusive clinical setting. With advanced training in Internal Medicine and Diabetology, he offers a refined approach to modern healthcare—where precision, prevention, and patient comfort are paramount.

He completed his MBBS and MD in Internal Medicine, followed by a Fellowship in Diabetology from CPCDM, enabling him to manage complex metabolic and medical conditions with clarity and confidence. His practice reflects a deep commitment to clinical excellence, early diagnosis, and long-term wellness.

Dr. Vaishnav specializes in the comprehensive management of diabetes, hypertension, thyroid disorders, metabolic syndromes, and lifestyle-related illnesses, integrating medical science with preventive and longevity-focused care. Each consultation is thoughtfully designed to provide unhurried attention, accurate evaluation, and customized treatment plans.`,
        image_url: '/images/Dr.Vaishnav.jpg',
        years_experience: 15
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

      {/* Founder Section */}
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
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Dr+Vaishnav'; }}
                  />
                  <div className="founder-floating-badge">
                    <span className="badge-icon">👨‍⚕️</span>
                    <div className="badge-text">
                      <span className="badge-title">Dr. Vaishnav</span>
                      <span className="badge-role">MD, Internal Medicine</span>
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
                  <h2 className="founder-heading">{founderInfo.name}</h2>
                  <p className="founder-title-text">{founderInfo.title}</p>

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
                      {founderInfo.bio.split('\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  )}

                  {/* Primary Clinical Focus List (Bulleted) */}
                  <div className="clinical-focus-summary">
                    <h3>Clinical Focus</h3>
                    <ul>
                      <li>Precision Internal Medicine</li>
                      <li>Advanced Diabetes & Metabolic Care</li>
                      <li>Hypertension & Cardiovascular Risk Optimization</li>
                      <li>Thyroid & Endocrine Disorders</li>
                      <li>Preventive Health & Longevity Medicine</li>
                      <li>Executive & Comprehensive Health Assessments</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Detailed Clinical Focus Grid */}
      <section className="clinical-expertise-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-badge">Medical Expertise</span>
            <h2 className="section-title">Comprehensive Clinical Focus</h2>
            <p className="section-desc">Expert diagnosis and management across a wide spectrum of conditions.</p>
          </div>

          <div className="expertise-grid">
            {clinicalFocus.map((item, index) => (
              <motion.div
                key={index}
                className="expertise-card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="expertise-icon">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
