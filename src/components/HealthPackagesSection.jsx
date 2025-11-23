import { useState } from 'react';
import { motion } from 'framer-motion';
import './HealthPackagesSection.css';

const healthPackages = [
    {
        id: 1,
        name: 'Vital Wellness Package',
        idealFor: 'Adults 25+',
        price: '₹2,999',
        includes: ['CBC', 'BP Monitoring', 'ECG', 'Blood Sugar', 'Lipid Profile', 'BMI Assessment'],
        color: '#7c4dff',
        icon: '💓'
    },
    {
        id: 2,
        name: 'Metabolic Master Check',
        idealFor: 'Diabetes / Obesity / PCOD',
        price: '₹4,999',
        includes: ['HbA1c', 'Insulin Levels', 'Thyroid Profile', 'Liver Function', 'Renal Function', 'Nutrition Consult'],
        color: '#ff8c00',
        icon: '🔬',
        popular: true
    },
    {
        id: 3,
        name: 'Heart & Vascular Risk Panel',
        idealFor: 'Cardiac Risk Assessment',
        price: '₹5,999',
        includes: ['ECG', 'Lipid Profile', 'CRP', 'Echo Referral', 'Cardiac Markers', 'Physician Consult'],
        color: '#e91e63',
        icon: '❤️'
    },
    {
        id: 4,
        name: 'Cancer Shield Screening',
        idealFor: 'Age 35+ or Family History',
        price: '₹6,999',
        includes: ['Basic Tumor Markers', 'Ultrasound Abdomen', 'CBC', 'Oncology Consult', 'Risk Assessment'],
        color: '#00bcd4',
        icon: '🛡️'
    },
    {
        id: 5,
        name: 'Senior Life & Longevity Package',
        idealFor: 'Age 50+',
        price: '₹7,999',
        includes: ['Bone Health', 'Dementia Screening', 'Kidney Function', 'Diabetes Check', 'Vitamin Profile', 'Geriatric Consult'],
        color: '#4caf50',
        icon: '🌟'
    },
    {
        id: 6,
        name: 'Corporate Stress & Lifestyle Check',
        idealFor: 'Working Professionals',
        price: '₹3,999',
        includes: ['BP Monitoring', 'Stress Evaluation', 'Sleep Assessment', 'Vitamin D', 'Basic Metabolic', 'Lifestyle Coaching'],
        color: '#9c27b0',
        icon: '💼'
    },
    {
        id: 7,
        name: 'Post-treatment Recovery Package',
        idealFor: 'Post-Surgery/Cancer',
        price: '₹8,999',
        includes: ['Physician Consult', 'Physiotherapy Sessions', 'Nutrition Planning', 'Recovery Monitoring', 'Lab Tests'],
        color: '#ff5722',
        icon: '🏥'
    }
];

export default function HealthPackagesSection() {
    const [selectedPackage, setSelectedPackage] = useState(null);

    return (
        <section className="health-packages-section">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-badge">Health Check-ups</span>
                    <h2 className="section-title">
                        Comprehensive Health Packages
                    </h2>
                    <p className="section-subtitle">
                        Preventive health screenings designed to detect issues early and keep you in optimal health
                    </p>
                </motion.div>

                {/* Packages Grid */}
                <div className="packages-grid">
                    {healthPackages.map((pkg, index) => (
                        <motion.div
                            key={pkg.id}
                            className={`package-card ${pkg.popular ? 'popular' : ''} ${selectedPackage === pkg.id ? 'selected' : ''}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            onClick={() => setSelectedPackage(pkg.id)}
                            style={{ '--package-color': pkg.color }}
                        >
                            {pkg.popular && (
                                <div className="popular-badge">
                                    <span>Most Popular</span>
                                </div>
                            )}

                            <div className="package-header">
                                <div className="package-icon">{pkg.icon}</div>
                                <h3 className="package-name">{pkg.name}</h3>
                                <p className="package-ideal-for">{pkg.idealFor}</p>
                            </div>

                            <div className="package-price">
                                <span className="price-amount">{pkg.price}</span>
                                <span className="price-label">onwards</span>
                            </div>

                            <div className="package-includes">
                                <h4>Includes:</h4>
                                <ul className="includes-list">
                                    {pkg.includes.map((item, idx) => (
                                        <li key={idx}>
                                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <motion.button
                                className="package-btn"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Book Now
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    className="packages-cta"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="cta-content">
                        <h3>Need a customized health package?</h3>
                        <p>Our healthcare team can design a personalized screening plan based on your age, medical history, and health goals.</p>
                        <div className="cta-actions">
                            <button className="btn-primary">
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Call 7893231999
                            </button>
                            <button className="btn-secondary">
                                View All Services
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
