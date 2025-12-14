import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

export default function HealthPackageBookingModal({ isOpen, onClose, packageData }) {
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        customer_age: '',
        customer_address: '',
        preferred_date: '',
        preferred_time: '',
        medical_history: '',
        current_medications: '',
        special_requirements: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const bookingData = {
                package_name: packageData.name || packageData.title,
                package_type: packageData.type || 'health_check',
                package_price: packageData.price,
                ...formData,
                customer_age: formData.customer_age ? parseInt(formData.customer_age) : null,
                status: 'pending'
            };

            const { data, error } = await supabase
                .from('health_package_bookings')
                .insert([bookingData])
                .select();

            if (error) throw error;

            // Send confirmation email (non-blocking)
            fetch('/api/packages/notify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    booking: {
                        ...bookingData,
                        ...data[0]
                    }
                })
            }).catch(err => {
                console.error('Email notification failed:', err);
                // Don't fail the booking if email fails
            });

            setMessage({
                type: 'success',
                text: 'Booking submitted successfully! We will contact you soon.'
            });

            // Reset form after 2 seconds and close modal
            setTimeout(() => {
                setFormData({
                    customer_name: '',
                    customer_email: '',
                    customer_phone: '',
                    customer_age: '',
                    customer_address: '',
                    preferred_date: '',
                    preferred_time: '',
                    medical_history: '',
                    current_medications: '',
                    special_requirements: ''
                });
                onClose();
            }, 2000);

        } catch (error) {
            console.error('Error submitting booking:', error);
            setMessage({
                type: 'error',
                text: 'Failed to submit booking. Please try again.'
            });
        } finally {

            // Send WhatsApp Notification to Admin
            try {
                const { data: adminSettings } = await supabase
                    .from('admin_settings')
                    .select('setting_value')
                    .eq('setting_key', 'admin_whatsapp_number')
                    .single();

                if (adminSettings?.setting_value) {
                    const { sendAdminPackageNotification } = await import('../lib/whatsappNotifications');

                    const bookingDetails = {
                        package_name: packageData.name || packageData.title,
                        customer_name: formData.customer_name,
                        customer_phone: formData.customer_phone,
                        customer_email: formData.customer_email,
                        customer_age: formData.customer_age,
                        customer_address: formData.customer_address,
                        preferred_date: formData.preferred_date,
                        preferred_time: formData.preferred_time,
                        medical_history: formData.medical_history,
                        current_medications: formData.current_medications,
                        special_requirements: formData.special_requirements,
                        created_at: new Date().toISOString(),
                        status: 'pending'
                    };

                    sendAdminPackageNotification(bookingDetails, adminSettings.setting_value);
                }
            } catch (waError) {
                console.error('WhatsApp notification failed:', waError);
            }

            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="booking-modal-overlay" onClick={onClose}>
                    <motion.div
                        className="booking-modal-content"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="booking-modal-close" onClick={onClose}>
                            ✕
                        </button>

                        <div className="booking-modal-header">
                            <h2>Book {packageData.name || packageData.title}</h2>
                            <div className="booking-package-info">
                                <span className="booking-package-price">{packageData.price}</span>
                                {packageData.subtitle && (
                                    <span className="booking-package-subtitle">{packageData.subtitle}</span>
                                )}
                            </div>
                        </div>

                        {message.text && (
                            <div className={`booking-message ${message.type}`}>
                                {message.type === 'success' ? '✅' : '❌'} {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="booking-form">
                            <div className="booking-form-section">
                                <h3>Personal Information</h3>
                                <div className="booking-form-row">
                                    <div className="booking-form-group">
                                        <label htmlFor="customer_name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="customer_name"
                                            name="customer_name"
                                            value={formData.customer_name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="booking-form-group">
                                        <label htmlFor="customer_age">Age</label>
                                        <input
                                            type="number"
                                            id="customer_age"
                                            name="customer_age"
                                            value={formData.customer_age}
                                            onChange={handleChange}
                                            min="1"
                                            max="120"
                                            placeholder="Your age"
                                        />
                                    </div>
                                </div>

                                <div className="booking-form-row">
                                    <div className="booking-form-group">
                                        <label htmlFor="customer_email">Email *</label>
                                        <input
                                            type="email"
                                            id="customer_email"
                                            name="customer_email"
                                            value={formData.customer_email}
                                            onChange={handleChange}
                                            required
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                    <div className="booking-form-group">
                                        <label htmlFor="customer_phone">Phone Number *</label>
                                        <input
                                            type="tel"
                                            id="customer_phone"
                                            name="customer_phone"
                                            value={formData.customer_phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>
                                </div>

                                <div className="booking-form-group">
                                    <label htmlFor="customer_address">Address</label>
                                    <textarea
                                        id="customer_address"
                                        name="customer_address"
                                        value={formData.customer_address}
                                        onChange={handleChange}
                                        rows="2"
                                        placeholder="Your complete address"
                                    />
                                </div>
                            </div>

                            <div className="booking-form-section">
                                <h3>Preferred Schedule</h3>
                                <div className="booking-form-row">
                                    <div className="booking-form-group">
                                        <label htmlFor="preferred_date">Preferred Date</label>
                                        <input
                                            type="date"
                                            id="preferred_date"
                                            name="preferred_date"
                                            value={formData.preferred_date}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                    <div className="booking-form-group">
                                        <label htmlFor="preferred_time">Preferred Time</label>
                                        <input
                                            type="time"
                                            id="preferred_time"
                                            name="preferred_time"
                                            value={formData.preferred_time}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="booking-form-section">
                                <h3>Medical Information (Optional)</h3>
                                <div className="booking-form-group">
                                    <label htmlFor="medical_history">Medical History</label>
                                    <textarea
                                        id="medical_history"
                                        name="medical_history"
                                        value={formData.medical_history}
                                        onChange={handleChange}
                                        rows="3"
                                        placeholder="Any relevant medical history, conditions, or allergies"
                                    />
                                </div>

                                <div className="booking-form-group">
                                    <label htmlFor="current_medications">Current Medications</label>
                                    <textarea
                                        id="current_medications"
                                        name="current_medications"
                                        value={formData.current_medications}
                                        onChange={handleChange}
                                        rows="2"
                                        placeholder="List any medications you are currently taking"
                                    />
                                </div>

                                <div className="booking-form-group">
                                    <label htmlFor="special_requirements">Special Requirements</label>
                                    <textarea
                                        id="special_requirements"
                                        name="special_requirements"
                                        value={formData.special_requirements}
                                        onChange={handleChange}
                                        rows="2"
                                        placeholder="Any special requirements or requests"
                                    />
                                </div>
                            </div>

                            <div className="booking-form-actions">
                                <button
                                    type="button"
                                    className="btn-cancel"
                                    onClick={onClose}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Submitting...' : 'Submit Booking'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
