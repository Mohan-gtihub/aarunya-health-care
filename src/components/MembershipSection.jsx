import React, { useState } from 'react';
import { FaHeartbeat, FaUserMd, FaRunning, FaAppleAlt, FaBrain, FaDna, FaPhoneAlt, FaEnvelope, FaTimes } from 'react-icons/fa';


const longevityPackages = [
  {
    id: 'package-a',
    name: 'Starter / Basic Longevity',
    duration: '3 months',
    price: '₹8,000 – ₹15,000',
    description: 'Essential foundation for your longevity journey.',
    features: [
      'Internal medicine consult',
      'Basic baseline tests (CBC, CMP, Lipid, HbA1c, Thyroid, Vitamin D/B12, ECG)',
      '1 Physiotherapy assessment + 3 PT sessions',
      'Dietician consult + plan',
      'Psychiatric screening',
      '3-month structured plan'
    ],
    highlighted: false,
    color: 'basic'
  },
  {
    id: 'package-b',
    name: 'Standard Longevity',
    duration: '3 months',
    price: '₹20,000 – ₹35,000',
    description: 'Comprehensive care with extended monitoring.',
    features: [
      'Everything in Basic',
      'Extended lab panel + DEXA/ECG',
      '6 Physiotherapy sessions',
      '6 Dietician reviews',
      '2 Psychiatry sessions if needed',
      'Digital monitoring & exercise plan'
    ],
    highlighted: true,
    color: 'premium'
  },
  {
    id: 'package-c',
    name: 'Premium Comprehensive',
    duration: '3 months',
    price: '₹50,000 – ₹90,000',
    description: 'Advanced testing and intensive support.',
    features: [
      'Everything in Standard',
      'Advanced tests (cardiac echo, advanced lipids, tumor markers if indicated)',
      '12 Physiotherapy sessions + supervised exercise',
      'Weekly dietician remote monitoring',
      '4 Psychiatry sessions',
      'Specialist consult (oncology/endocrine/cardiac)'
    ],
    highlighted: false,
    color: 'executive'
  },
  {
    id: 'package-d',
    name: 'Executive / Tailored Longevity',
    duration: '6–12 months',
    price: 'Custom ₹1,50,000+',
    description: 'Fully personalized, high-touch executive program.',
    features: [
      'Fully personalized program',
      'Genetic testing, continuous monitoring',
      'Quarterly specialist reviews',
      'Monthly follow-ups (Internal Med + Psych + Dietician)',
      'Physiotherapy maintenance program'
    ],
    highlighted: false,
    color: 'executive'
  }
];

const benefits = [
  {
    icon: <FaHeartbeat />,
    title: 'Early Disease Risk Detection',
    description: 'Proactive screening to identify and mitigate health risks early.'
  },
  {
    icon: <FaRunning />,
    title: 'Structured Optimization',
    description: 'Metabolic, physical, and mental health optimization plans.'
  },
  {
    icon: <FaAppleAlt />,
    title: 'Personalized Plans',
    description: 'Tailored nutrition and exercise strategies just for you.'
  },
  {
    icon: <FaUserMd />,
    title: 'Hybrid Support',
    description: 'Convenient in-clinic visits combined with remote monitoring.'
  }
];

const BookingModal = ({ isOpen, onClose, packageDetails }) => {
  const [formData, setFormData] = useState({
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to send to doctor
    try {
      // In a real app, this would be an API call
      console.log('Sending to doctor:', { ...formData, package: packageDetails.name });
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({ phone: '', email: '' });
      }, 2000);
    } catch (error) {
      console.error('Error sending booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pmx-modal-overlay">
      <div className="pmx-modal-content">
        <button
          onClick={onClose}
          className="pmx-modal-close"
        >
          <FaTimes size={24} />
        </button>

        <div className="pmx-modal-body">
          <div className="pmx-modal-header">
            <h3 className="pmx-modal-title">Book {packageDetails?.name}</h3>
            <p className="pmx-modal-subtitle">Enter your details to request this package.</p>
          </div>

          {isSuccess ? (
            <div className="pmx-success-message">
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>Request Sent Successfully!</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Our team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="pmx-form-group">
                <label className="pmx-form-label">Phone Number</label>
                <div className="pmx-input-wrapper">
                  <div className="pmx-input-icon">
                    <FaPhoneAlt />
                  </div>
                  <input
                    type="tel"
                    required
                    className="pmx-form-input"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="pmx-form-group">
                <label className="pmx-form-label">Email Address</label>
                <div className="pmx-input-wrapper">
                  <div className="pmx-input-icon">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    required
                    className="pmx-form-input"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="pmx-submit-btn"
              >
                {isSubmitting ? 'Sending...' : 'Send Request to Doctor'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default function MembershipSection() {
  const [selectedPlan, setSelectedPlan] = useState('package-b');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPackage, setModalPackage] = useState(null);

  const handleBookClick = (pkg) => {
    setModalPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <section className="pmx-membership-section" id="longevity-packages">
      <div className="pmx-container">
        {/* Section Header */}
        <div className="pmx-section-header text-center">
          <div className="pmx-badge">
            <span>Longevity & Comprehensive Health</span>
          </div>
          <h2 className="pmx-section-title">
            Your Journey to Better Health Starts Here
          </h2>
          <p className="pmx-section-subtitle">
            Personalized, evidence-led longevity programs integrating Internal Medicine, Psychiatry, Oncology, and Physiotherapy.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="pmx-benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="pmx-benefit-card">
              <div className="pmx-benefit-icon">
                {benefit.icon}
              </div>
              <h3 className="pmx-benefit-title">{benefit.title}</h3>
              <p className="pmx-benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="pmx-pricing-grid">
          {longevityPackages.map((plan) => (
            <div
              key={plan.id}
              className={`pmx-pricing-card ${plan.highlighted ? 'highlighted' : ''} ${plan.color}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.highlighted && (
                <div className="pmx-popular-badge">
                  <span>Recommended</span>
                </div>
              )}

              <div className="pmx-card-header">
                <h3 className="pmx-plan-name">{plan.name}</h3>
                <div className="pmx-plan-price">
                  <span className="pmx-price-amount pmx-text-2xl">{plan.price}</span>
                </div>
                <span className="pmx-price-period pmx-block-mb-2">{plan.duration}</span>
                <p className="pmx-plan-description">{plan.description}</p>
              </div>

              <div className="pmx-plan-features">
                <ul className="pmx-features-list">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="pmx-feature-item">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pmx-card-footer">
                <button
                  className={`pmx-btn pmx-btn-${plan.highlighted ? 'primary' : 'outline'} w-full`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookClick(plan);
                  }}
                >
                  Book / Enquire Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Clinic Info & CTA */}
        <div className="pmx-membership-cta">
          <div className="pmx-cta-content">
            <h3>Aarunya Health Care Clinics</h3>
            <p className="pmx-cta-focus-areas">Clinic Focus Areas: Internal Medicine • Psychiatry • Oncology • Physiotherapy</p>
            <p className="pmx-cta-targeting">Targeting: IT professionals, Affluent families, Middle/older adults, Cancer survivors</p>

            <div className="pmx-contact-grid">
              <div>
                <h4 className="pmx-contact-title">Contact Us</h4>
                <p className="pmx-contact-item"><FaPhoneAlt /> +91 7893231999</p>
                <p className="pmx-contact-item"><FaPhoneAlt /> +91 8186028641</p>
              </div>
              <div>
                <h4 className="pmx-contact-title">Location</h4>
                <p>Manikonda, Hyderabad</p>
              </div>
            </div>

            <div className="pmx-cta-actions">
              <button
                className="pmx-btn pmx-btn-primary"
                onClick={() => handleBookClick({ name: 'General Inquiry' })}
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageDetails={modalPackage}
      />
    </section>
  );
}
