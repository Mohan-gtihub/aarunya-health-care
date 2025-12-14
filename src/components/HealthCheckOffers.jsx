import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaRupeeSign, FaStar, FaClock } from 'react-icons/fa';
import HealthPackageBookingModal from './HealthPackageBookingModal';
import { supabase } from '../lib/supabase';

const HealthCheckOffers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sectionVisible, setSectionVisible] = useState(true);

    useEffect(() => {
        const checkVisibilityAndFetch = async () => {
            try {
                // Check visibility first
                const { data: settingsData } = await supabase
                    .from('admin_settings')
                    .select('setting_value')
                    .eq('setting_key', 'health_offers_visible')
                    .single();

                if (settingsData && (settingsData.setting_value === 'false' || settingsData.setting_value === false)) {
                    setSectionVisible(false);
                    setLoading(false);
                    return; // Don't fetch packages if hidden
                }

                // Fetch packages if visible
                const { data, error } = await supabase
                    .from('health_packages')
                    .select('*')
                    .order('created_at', { ascending: true });

                if (error) throw error;

                if (data && data.length > 0) {
                    setPackages(data);
                } else {
                    setPackages([]);
                }
            } catch (error) {
                console.error('Error fetching health data:', error);
            } finally {
                setLoading(false);
            }
        };

        checkVisibilityAndFetch();
    }, []);

    const handleBookNow = (pkg) => {
        if (pkg.status === 'coming_soon') return;

        setSelectedPackage({
            ...pkg,
            name: pkg.title,
            price: pkg.price ? (pkg.price.includes('onwards') ? `₹${pkg.price}` : `₹${pkg.price}`) : 'Custom',
            type: 'health_check'
        });
        setIsModalOpen(true);
    };

    if (!sectionVisible) return null;

    return (
        <section className="health-offers-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-badge">Wellness Packages</span>
                    <h2>Exclusive Health Check Offers</h2>
                    <p>Comprehensive health screening packages designed for your well-being.</p>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>Loading packages...</div>
                ) : (
                    <div className="offers-grid">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={pkg.id}
                                className={`offer-card ${pkg.popular ? 'popular' : ''} ${pkg.status === 'coming_soon' ? 'coming-soon' : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                style={{ '--accent-color': pkg.color }}
                            >
                                {pkg.popular && pkg.status !== 'coming_soon' && (
                                    <div className="popular-badge">
                                        <FaStar className="star-icon" /> Most Popular
                                    </div>
                                )}

                                {pkg.status === 'coming_soon' && (
                                    <div className="popular-badge" style={{ background: '#6c757d' }}>
                                        <FaClock className="star-icon" /> Coming Soon
                                    </div>
                                )}

                                <div className="offer-header">
                                    <h3 className="offer-title">
                                        {pkg.icon && <span style={{ marginRight: '0.5rem' }}>{pkg.icon}</span>}
                                        {pkg.title}
                                    </h3>
                                    {pkg.subtitle && <span className="offer-subtitle">{pkg.subtitle}</span>}

                                    <div className="offer-price">
                                        {pkg.status === 'coming_soon' ? (
                                            <span className="amount coming-soon-text">Stay Tuned</span>
                                        ) : (
                                            <>
                                                <FaRupeeSign className="rupee-icon" />
                                                <span className="amount">{pkg.price}</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="offer-features">
                                    <ul>
                                        {pkg.features && pkg.features.map((feature, idx) => (
                                            <li key={idx}>
                                                <div className="check-icon-wrapper" style={{ background: `${pkg.color}20` }}>
                                                    <FaCheck className="check-icon" style={{ color: pkg.color }} />
                                                </div>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    className="book-btn"
                                    onClick={() => handleBookNow(pkg)}
                                    disabled={pkg.status === 'coming_soon'}
                                    style={pkg.status === 'coming_soon' ? { opacity: 0.7, cursor: 'not-allowed', background: '#ccc' } : {}}
                                >
                                    {pkg.status === 'coming_soon' ? 'Coming Soon' : 'Book Now'}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}

                {!loading && packages.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>No health packages currently available. Please check back soon.</p>
                    </div>
                )}
            </div>

            {/* Booking Modal */}
            {selectedPackage && (
                <HealthPackageBookingModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    packageData={selectedPackage}
                />
            )}
        </section>
    );
};

export default HealthCheckOffers;
