import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppointmentPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // Show popup after 2 seconds on page load
    useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem('hasSeenAppointmentPopup');

        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('hasSeenAppointmentPopup', 'true');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/appointment-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    timestamp: new Date().toISOString(),
                    source: 'popup'
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', phone: '', email: '' });

                // Close popup after 2 seconds
                setTimeout(() => {
                    handleClose();
                }, 2000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting appointment request:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="appointment-popup-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    />

                    {/* Popup Modal */}
                    <motion.div
                        className="appointment-popup"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                    >
                        <button
                            className="appointment-popup__close"
                            onClick={handleClose}
                            aria-label="Close popup"
                        >
                            ✕
                        </button>

                        <div className="appointment-popup__container">
                            {/* Left Panel - Hospital Info */}
                            <div className="appointment-popup__left">
                                <img src="/aarunya-logo.png" alt="Aarunya Health Care" className="popup-logo" />
                                <h2 className="popup-hospital-name">Aarunya Health Care</h2>
                                <p className="popup-tagline">Empathy · Expertise · Excellence</p>
                                <p className="popup-description">
                                    Get expert healthcare consultation. Fill in your details and we'll get back to you shortly!
                                </p>
                            </div>

                            {/* Right Panel - Form */}
                            <div className="appointment-popup__right">
                                <h3 className="popup-form-title">Book Your Appointment</h3>

                                <form className="appointment-popup__form" onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <label htmlFor="popup-name">Full Name</label>
                                        <input
                                            type="text"
                                            id="popup-name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div className="form-row">
                                        <label htmlFor="popup-phone">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="popup-phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter your phone number"
                                            pattern="[0-9]{10}"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div className="form-row">
                                        <label htmlFor="popup-email">Email Address</label>
                                        <input
                                            type="email"
                                            id="popup-email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email address"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    {submitStatus === 'success' && (
                                        <div className="submit-message success">
                                            ✅ Thank you! We'll contact you soon.
                                        </div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <div className="submit-message error">
                                            ❌ Something went wrong. Please try again.
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="appointment-popup__submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner"></span>
                                                Submitting...
                                            </>
                                        ) : (
                                            'Book Appointment'
                                        )}
                                    </button>
                                </form>

                                <p className="appointment-popup__footer">
                                    Or call us directly at <strong>+91 XXX XXX XXXX</strong>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
