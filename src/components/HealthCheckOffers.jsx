import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaRupeeSign, FaStar } from 'react-icons/fa';

const packages = [
    {
        id: 1,
        title: "Aarunya Health Check",
        subtitle: "Premium",
        price: "3,999",
        color: "#7c4dff", // Brand Purple
        popular: true,
        features: [
            "CBP (Complete Blood Picture)",
            "Sr. Iron",
            "Lipid Profile",
            "Thyroid Profile",
            "BUN (Blood Urea Nitrogen)",
            "Sr. Creatinine",
            "Sr. Electrolytes",
            "Uric Acid",
            "HbA1c",
            "Liver Function Test"
        ]
    },
    {
        id: 2,
        title: "Aarunya Health Check",
        subtitle: "Standard",
        price: "2,499",
        color: "#ff8c00", // Brand Orange
        popular: false,
        features: [
            "CBP (Complete Blood Picture)",
            "Lipid Profile",
            "Thyroid Profile",
            "Kidney Function Test",
            "FBS (Fasting Blood Sugar)",
            "PBS (Post Prandial Blood Sugar)",
            "LFT (Liver Function Test)",
            "Sr. Uric Acid"
        ]
    },
    {
        id: 3,
        title: "Diabetic Screen",
        subtitle: "Essential",
        price: "1,250",
        color: "#32CD32", // Lime Green
        popular: false,
        features: [
            "FBS (Fasting Blood Sugar)",
            "PBS (Post Prandial Blood Sugar)",
            "HbA1c",
            "Micro Albumin Acid"
        ]
    },
    {
        id: 4,
        title: "Kidney Basic Screen",
        subtitle: "Essential",
        price: "1,299",
        color: "#1E90FF", // Dodger Blue
        popular: false,
        features: [
            "Urea",
            "BUN",
            "Sr. Creatinine",
            "Sr. Sodium & Potassium",
            "Sr. Chloride",
            "Sr. Calcium"
        ]
    }
];

const HealthCheckOffers = () => {
    return (
        <section className="health-offers-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-badge">Wellness Packages</span>
                    <h2>Exclusive Health Check Offers</h2>
                    <p>Comprehensive health screening packages designed for your well-being.</p>
                </div>

                <div className="offers-grid">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={pkg.id}
                            className={`offer-card ${pkg.popular ? 'popular' : ''}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            style={{ '--accent-color': pkg.color }}
                        >
                            {pkg.popular && (
                                <div className="popular-badge">
                                    <FaStar className="star-icon" /> Most Popular
                                </div>
                            )}

                            <div className="offer-header">
                                <h3 className="offer-title">{pkg.title}</h3>
                                {pkg.subtitle && <span className="offer-subtitle">{pkg.subtitle}</span>}
                                <div className="offer-price">
                                    <FaRupeeSign className="rupee-icon" />
                                    <span className="amount">{pkg.price}</span>
                                </div>
                            </div>

                            <div className="offer-features">
                                <ul>
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <div className="check-icon-wrapper" style={{ background: `${pkg.color}20` }}>
                                                <FaCheck className="check-icon" style={{ color: pkg.color }} />
                                            </div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className="book-btn" style={{ background: pkg.color }}>
                                Book Now
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HealthCheckOffers;
