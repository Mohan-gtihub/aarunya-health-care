import { useState } from 'react';
import { motion } from 'framer-motion';


export default function AppointmentForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const locations = [
    'SR Nagar',
    'Bachupally'
  ];

  const departments = [
    'Laboratory Services',
    'Cardiology',
    'Radiology',
    'Pulmonology',
    'Orthopedics',
    'Pediatrics',
    'Gynecology',
    'Emergency Medicine',
    'Physiotherapy'
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.location) {
      newErrors.location = 'Please select a location';
    }

    if (!formData.department) {
      newErrors.department = 'Please select a department';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In production, replace with actual API call:
      // const response = await fetch('/api/appointments', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // if (!response.ok) throw new Error('Failed to book appointment');

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        department: '',
        doctor: '',
        date: '',
        time: '',
        message: ''
      });

      if (onSuccess) {
        onSuccess();
      }

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Appointment booking error:', error);
      setErrors({ submit: 'Failed to book appointment. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <motion.div
      className="appointment-form-wrapper"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="appointment-form" noValidate>
        {success && (
          <div className="form-success" role="alert">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Appointment request submitted successfully! We&apos;ll contact you shortly to confirm.</span>
          </div>
        )}

        {errors.submit && (
          <div className="form-error-box" role="alert">
            {errors.submit}
          </div>
        )}

        <div className="form-row">
          <label htmlFor="name">
            Full Name <span className="required">*</span>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span className="form-error" id="name-error" role="alert">
                {errors.name}
              </span>
            )}
          </label>

          <label htmlFor="email">
            Email <span className="required">*</span>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span className="form-error" id="email-error" role="alert">
                {errors.email}
              </span>
            )}
          </label>
        </div>

        <label htmlFor="phone">
          Phone Number <span className="required">*</span>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <span className="form-error" id="phone-error" role="alert">
              {errors.phone}
            </span>
          )}
        </label>

        <label htmlFor="location">
          Location <span className="required">*</span>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.location}
            aria-describedby={errors.location ? 'location-error' : undefined}
          >
            <option value="">Select a location</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          {errors.location && (
            <span className="form-error" id="location-error" role="alert">
              {errors.location}
            </span>
          )}
        </label>

        <label htmlFor="department">
          Department <span className="required">*</span>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.department}
            aria-describedby={errors.department ? 'department-error' : undefined}
          >
            <option value="">Select a department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && (
            <span className="form-error" id="department-error" role="alert">
              {errors.department}
            </span>
          )}
        </label>

        <div className="form-row">
          <label htmlFor="date">
            Preferred Date <span className="required">*</span>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={getMinDate()}
              aria-required="true"
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? 'date-error' : undefined}
            />
            {errors.date && (
              <span className="form-error" id="date-error" role="alert">
                {errors.date}
              </span>
            )}
          </label>

          <label htmlFor="time">
            Preferred Time <span className="required">*</span>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.time}
              aria-describedby={errors.time ? 'time-error' : undefined}
            >
              <option value="">Select time</option>
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {errors.time && (
              <span className="form-error" id="time-error" role="alert">
                {errors.time}
              </span>
            )}
          </label>
        </div>

        <label htmlFor="message">
          Additional Notes (Optional)
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Any specific concerns or requirements..."
            rows="4"
          />
        </label>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              <span>Submitting...</span>
            </>
          ) : (
            'Request Appointment'
          )}
        </button>

        <p className="form-note">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          We&apos;ll contact you within 24 hours to confirm your appointment.
        </p>
      </form>
    </motion.div>
  );
}
