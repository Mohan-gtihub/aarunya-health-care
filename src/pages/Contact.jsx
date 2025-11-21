import { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Display contact information instead of sending email
    alert(`Thank you for your interest!\n\nPlease contact us directly:\n\n📧 Email: info@aarunyahealthcare.com\n📞 Phone: +91 (555) 123-4567\n📍 Locations: SR Nagar & Bachupally, Hyderabad\n\nWe'll be happy to assist you!`);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Contact Aarunya Health Care</h1>
            <p>Get in touch with our team at Aarunya Health Care, founded by Mr. Vaishnav, for any questions or concerns</p>
          </motion.div>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2>Get in Touch</h2>
              <p>We're here to help and answer any question you might have. We look forward to hearing from you. Fill out the form and we'll respond within 24 hours.</p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Phone</h3>
                    <p>+91 (555) 123-4567</p>
                    <p className="text-muted">24/7 Available</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Email</h3>
                    <p>info@aarunyahealthcare.com</p>
                    <p className="text-muted">24/7 support</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Locations</h3>
                    <p><strong>SR Nagar Clinic</strong></p>
                    <p className="text-muted">Hyderabad, Telangana</p>
                    <p style={{marginTop: '0.5rem'}}><strong>Bachupally Clinic</strong></p>
                    <p className="text-muted">Hyderabad, Telangana</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Home Services</h3>
                    <p>Move to Save</p>
                    <p className="text-muted">X-Ray, ECG & Lab at doorstep</p>
                  </div>
                </div>
              </div>

              <div className="map-placeholder">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2996255274898!2d78.44670909999999!3d17.4453675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb910051fb55e5%3A0xa077409655f1c40d!2sHEALTH%20FIRST%20HOSPITALS!5e0!3m2!1sen!2sin!4v1761045323176!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  style={{ border: 0, borderRadius: 'var(--radius)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Health First Hospitals Location"
                ></iframe>
              </div>
            </motion.div>

            <motion.div
              className="contact-form-wrapper"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit} className="contact-form card">
                <h2>Send us a Message</h2>
                <p style={{ marginBottom: '2rem', color: 'var(--text-light)' }}>
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <label htmlFor="name">
                  Name <span className="required">*</span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label htmlFor="email">
                  Email <span className="required">*</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label htmlFor="phone">
                  Phone
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </label>

                <label htmlFor="subject">
                  Subject <span className="required">*</span>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label htmlFor="message">
                  Message <span className="required">*</span>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                >
                  Get Contact Information
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
