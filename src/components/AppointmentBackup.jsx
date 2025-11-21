import { useState, useEffect } from 'react';
import './AppointmentBooking.css';

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

  useEffect(() => {
    // Fetch departments
    fetch('/api/departments')
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(err => console.error('Error fetching departments:', err));
  }, []);

  useEffect(() => {
    // Fetch time slots when date is selected
    if (selectedDate) {
      setIsLoading(true);
      fetch(`/api/time-slots/${selectedDate}`)
        .then(res => res.json())
        .then(data => {
          setTimeSlots(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error fetching time slots:', err);
          setIsLoading(false);
        });
    }
  }, [selectedDate]);

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

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to book appointment');
      }

      const result = await response.json();
      setSuccess('Appointment booked successfully! Check your email for confirmation.');
      
      // Reset form
      setSelectedDepartment('');
      setSelectedDoctor('');
      setSelectedDate('');
      setSelectedTime('');
      setPatientName('');
      setPatientEmail('');
      setPatientPhone('');
      setReason('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="appointment-booking" id="appointment-booking">
      <div className="container">
        <div className="booking-header">
          <h2 className="booking-title">Book Your Appointment</h2>
          <p className="booking-subtitle">Schedule your consultation with our expert doctors</p>
        </div>

        {error && (
          <div className="error-message">
            <div className="error-content">
              <div className="error-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span>{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="success-message">
            <div className="success-content">
              <div className="success-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span>{success}</span>
            </div>
          </div>
        )}

        <div className="booking-container">
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Department Selection */}
              <div className="form-group">
                <label className="form-label">Select Department *</label>
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
                <label className="form-label">Select Doctor *</label>
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
                <label className="form-label">Preferred Date *</label>
                <input
                  type="date"
                  className="form-input"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Time Selection */}
              <div className="form-group">
                <label className="form-label">Preferred Time *</label>
                <div className="time-slots">
                  {isLoading ? (
                    <div className="loading-slots">Loading available times...</div>
                  ) : (
                    timeSlots.map(time => (
                      <button
                        key={time}
                        type="button"
                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => setSelectedTime(time)}
                        disabled={!selectedDate}
                      >
                        {time}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Patient Information */}
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  className="form-input"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  required
                  placeholder="+91 (555) 123-4567"
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label">Reason for Visit (Optional)</label>
                <textarea
                  className="form-textarea"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  placeholder="Please describe your symptoms or reason for appointment..."
                ></textarea>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
