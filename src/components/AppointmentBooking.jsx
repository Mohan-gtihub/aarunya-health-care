import { useState, useEffect } from 'react';

import API_URL from '../config/api';

export default function AppointmentBooking() {
  const [departments, setDepartments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailTestLoading, setEmailTestLoading] = useState(false);
  const [emailTestResult, setEmailTestResult] = useState('');

  // Calculate form completion steps
  const getCompletedSteps = () => {
    let steps = 0;
    if (selectedDepartment) steps++;
    if (selectedDoctor) steps++;
    if (selectedDate) steps++;
    if (selectedTime) steps++;
    if (patientName && patientEmail && patientPhone) steps++;
    return steps;
  };

  // Generate available dates (next 14 days, excluding Sundays)
  const availableDates = Array.from({ length: 21 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date;
  })
    .filter(date => date.getDay() !== 0) // Exclude Sundays
    .slice(0, 14)
    .map(date => date.toISOString().split('T')[0]);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    fetch(`${API_URL}/api/departments`, { signal: controller.signal })
      .then(res => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`Failed to fetch departments (${res.status})`);
        return res.json();
      })
      .then(data => setDepartments(data))
      .catch(err => {
        clearTimeout(timeoutId);
        if (err.name !== 'AbortError') {
          console.error('Error fetching departments:', err);
          setError('Failed to load departments. Please refresh the page.');
        }
      });
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setIsLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      fetch(`${API_URL}/api/time-slots/${selectedDate}`, { signal: controller.signal })
        .then(res => {
          clearTimeout(timeoutId);
          if (!res.ok) throw new Error(`Failed to fetch time slots (${res.status})`);
          return res.json();
        })
        .then(data => {
          setTimeSlots(data);
          setIsLoading(false);
        })
        .catch(err => {
          clearTimeout(timeoutId);
          setIsLoading(false);
          if (err.name !== 'AbortError') {
            console.error('Error fetching time slots:', err);
            setError('Failed to load time slots. Please try again.');
          }
        });
    }
  }, [selectedDate]);

  const handleEmailTest = async () => {
    setEmailTestLoading(true);
    setEmailTestResult('');

    try {
      const response = await fetch(`${API_URL}/api/test-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to send test email');
      }

      const result = await response.json();
      setEmailTestResult('📧 Test email sent successfully to mohankilarisai@gmail.com!');
    } catch (err) {
      setEmailTestResult('❌ Failed to send test email: ' + err.message);
    } finally {
      setEmailTestLoading(false);
      setTimeout(() => setEmailTestResult(''), 3000);
    }
  };

  const getDoctorsForDepartment = (deptId) => {
    const dept = departments.find(d => d.id === deptId);
    return dept ? dept.doctors : [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const appointmentData = {
        department: selectedDepartment,
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        patientName,
        patientEmail,
        patientPhone,
        reason: reason || 'General consultation'
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // Increased to 30 seconds

      const response = await fetch(`${API_URL}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to book appointment (${response.status})`);
      }

      const result = await response.json();
      setSuccess('🎉 Appointment booked successfully! Check your email for confirmation.');

      // Reset form
      setSelectedDepartment('');
      setSelectedDoctor('');
      setSelectedDate('');
      setSelectedTime('');
      setPatientName('');
      setPatientEmail('');
      setPatientPhone('');
      setReason('');

      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request is taking longer than expected. Your appointment may still be processing. Please check your email.');
      } else {
        setError(err.message || 'Failed to book appointment. Please try again.');
      }
      setTimeout(() => setError(''), 7000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="appointment-booking" id="appointment-booking">
      <div className="container">
        <div className="booking-header">
          <h2 className="booking-title">Book Your Appointment</h2>
          <p className="booking-subtitle">
            Experience world-class healthcare with our expert doctors. Schedule your consultation in just a few clicks.
          </p>
        </div>

        {error && (
          <div className="error-message">
            <div className="error-content">
              <div className="error-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="success-message">
            <div className="success-content">
              <span className="success-icon">✅</span>
              <span>{success}</span>
            </div>
          </div>
        )}

        {emailTestResult && (
          <div className={`message ${emailTestResult.includes('successfully') ? 'success' : 'error'}`}>
            <div className="message-content">
              <span>{emailTestResult}</span>
            </div>
          </div>
        )}

        <div className="booking-container">
          <form className="booking-form" onSubmit={handleSubmit}>
            {isSubmitting && (
              <div className="loading-overlay">
                <div className="loading-spinner"></div>
                <span>Booking your appointment...</span>
              </div>
            )}

            {/* Progress Indicator */}
            <div className="form-step-indicator">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`step-dot ${i < getCompletedSteps() ? 'completed' : ''} ${i === getCompletedSteps() ? 'active' : ''
                    }`}
                />
              ))}
            </div>

            {departments.length === 0 && !error ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading departments...</p>
              </div>
            ) : (
              <div className="form-grid">
                {/* Department Selection */}
                <div className="form-group">
                  <label className="form-label">
                    <span>🏥</span>
                    <span>Select Department</span>
                  </label>
                  <div className="select-wrapper">
                    <select
                      className="form-select"
                      value={selectedDepartment}
                      onChange={(e) => {
                        setSelectedDepartment(e.target.value);
                        setSelectedDoctor('');
                      }}
                      required
                    >
                      <option value="">Choose a department</option>
                      {departments.map(dept => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Doctor Selection */}
                <div className="form-group">
                  <label className="form-label">
                    <span>👨‍⚕️</span>
                    <span>Select Doctor</span>
                  </label>
                  <div className="select-wrapper">
                    <select
                      className="form-select"
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      required
                      disabled={!selectedDepartment}
                    >
                      <option value="">Choose a doctor</option>
                      {getDoctorsForDepartment(selectedDepartment).map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialization}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="form-group">
                  <label className="form-label">
                    <span>📅</span>
                    <span>Select Date</span>
                  </label>
                  <div className="select-wrapper">
                    <select
                      className="form-select"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSelectedTime('');
                      }}
                      required
                      disabled={!selectedDoctor}
                    >
                      <option value="">Choose a date</option>
                      {availableDates.map(date => (
                        <option key={date} value={date}>
                          {formatDate(date)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Patient Name */}
                <div className="form-group">
                  <label className="form-label">
                    <span>👤</span>
                    <span>Patient Name</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Time Selection */}
                <div className="form-group full-width">
                  <label className="form-label">
                    <span>🕐</span>
                    <span>Select Time Slot</span>
                  </label>
                  {selectedDate ? (
                    <div className="time-slots">
                      {isLoading ? (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                          <div className="loading-spinner" style={{ margin: '0 auto' }}></div>
                        </div>
                      ) : timeSlots.length > 0 ? (
                        timeSlots.map(slot => (
                          <button
                            key={slot}
                            type="button"
                            className={`time-slot ${selectedTime === slot ? 'active' : ''}`}
                            onClick={() => setSelectedTime(slot)}
                          >
                            {slot}
                          </button>
                        ))
                      ) : (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)', padding: '1rem' }}>
                          No time slots available for this date
                        </p>
                      )}
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                      Please select a date to view available time slots
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="form-group">
                  <label className="form-label">
                    <span>📧</span>
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone Number */}
                <div className="form-group">
                  <label className="form-label">
                    <span>📱</span>
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    className="form-input"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    required
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                {/* Reason for Visit */}
                <div className="form-group full-width">
                  <label className="form-label">
                    <span>📝</span>
                    <span>Reason for Visit (Optional)</span>
                  </label>
                  <textarea
                    className="form-textarea"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Please describe your symptoms or reason for visit..."
                  />
                </div>
              </div>
            )}

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={isSubmitting || departments.length === 0 || !selectedTime}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner" style={{ width: '20px', height: '20px', borderWidth: '3px' }}></div>
                    <span>Booking...</span>
                  </>
                ) : (
                  <>
                    <span>📅</span>
                    <span>Book Appointment</span>
                  </>
                )}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-large"
                onClick={handleEmailTest}
                disabled={emailTestLoading}
              >
                {emailTestLoading ? (
                  <>
                    <div className="loading-spinner" style={{ width: '20px', height: '20px', borderWidth: '3px' }}></div>
                    <span>Testing...</span>
                  </>
                ) : (
                  <>
                    <span>📧</span>
                    <span>Test Email</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
