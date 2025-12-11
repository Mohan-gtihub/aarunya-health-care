import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function AppointmentBookingEnhanced() {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [bookedSlots, setBookedSlots] = useState([]);
    const [patientName, setPatientName] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [reason, setReason] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Time slots (9 AM to 5 PM, 30-minute intervals)
    const allTimeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
    ];

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

    // Load doctors from Supabase
    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        try {
            const { data, error } = await supabase
                .from('doctors')
                .select('*')
                .eq('available', true)
                .order('name');

            if (error) throw error;
            setDoctors(data || []);
        } catch (error) {
            console.error('Error loading doctors:', error);
            setError('Failed to load doctors. Please refresh the page.');
        }
    };

    // Load booked slots when doctor and date are selected
    useEffect(() => {
        if (selectedDoctor && selectedDate) {
            loadBookedSlots();
        }
    }, [selectedDoctor, selectedDate]);

    const loadBookedSlots = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('appointments')
                .select('time')
                .eq('doctor', selectedDoctor)
                .eq('date', selectedDate)
                .in('status', ['confirmed', 'pending']); // Only count confirmed and pending appointments

            if (error) throw error;

            const slots = data.map(appointment => appointment.time);
            setBookedSlots(slots);
        } catch (error) {
            console.error('Error loading booked slots:', error);
            setError('Failed to load available slots. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const isSlotBooked = (slot) => {
        return bookedSlots.includes(slot);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            // Get doctor details
            const doctor = doctors.find(d => d.id === selectedDoctor);
            if (!doctor) throw new Error('Doctor not found');

            // IMPORTANT: Check one more time if slot is still available (prevent race conditions)
            const { data: existingAppointments, error: checkError } = await supabase
                .from('appointments')
                .select('id')
                .eq('doctor', doctor.name)
                .eq('date', selectedDate)
                .eq('time', selectedTime)
                .in('status', ['confirmed', 'pending']);

            if (checkError) throw checkError;

            if (existingAppointments && existingAppointments.length > 0) {
                throw new Error('Sorry, this time slot was just booked by someone else. Please select another time.');
            }

            const appointmentData = {
                department: doctor.department,
                doctor: doctor.name,
                date: selectedDate,
                time: selectedTime,
                patient_name: patientName,
                patient_email: patientEmail,
                patient_phone: patientPhone,
                reason: reason || 'General consultation',
                status: 'pending'
            };

            const { data, error } = await supabase
                .from('appointments')
                .insert([appointmentData])
                .select();

            if (error) throw error;

            setSuccess('🎉 Appointment booked successfully! We will contact you soon for confirmation.');

            // Reset form
            setSelectedDoctor('');
            setSelectedDate('');
            setSelectedTime('');
            setPatientName('');
            setPatientEmail('');
            setPatientPhone('');
            setReason('');
            setBookedSlots([]);

            setTimeout(() => setSuccess(''), 5000);
        } catch (err) {
            console.error('Error booking appointment:', err);
            setError(err.message || 'Failed to book appointment. Please try again.');

            // Reload booked slots to show updated availability
            if (selectedDoctor && selectedDate) {
                loadBookedSlots();
            }

            setTimeout(() => setError(''), 7000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getCompletedSteps = () => {
        let steps = 0;
        if (selectedDoctor) steps++;
        if (selectedDate) steps++;
        if (selectedTime) steps++;
        if (patientName && patientEmail && patientPhone) steps++;
        return steps;
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
                    <div className="message error">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="message success">
                        <span>✅</span>
                        <span>{success}</span>
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
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`step-dot ${i < getCompletedSteps() ? 'completed' : ''} ${i === getCompletedSteps() ? 'active' : ''}`}
                                />
                            ))}
                        </div>

                        {doctors.length === 0 && !error ? (
                            <div className="loading-state">
                                <div className="loading-spinner"></div>
                                <p>Loading doctors...</p>
                            </div>
                        ) : (
                            <div className="form-grid">
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
                                            onChange={(e) => {
                                                setSelectedDoctor(e.target.value);
                                                setSelectedDate('');
                                                setSelectedTime('');
                                                setBookedSlots([]);
                                            }}
                                            required
                                        >
                                            <option value="">Choose a doctor</option>
                                            {doctors.map(doctor => (
                                                <option key={doctor.id} value={doctor.id}>
                                                    {doctor.name} - {doctor.specialization}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {selectedDoctor && (
                                        <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
                                            {doctors.find(d => d.id === selectedDoctor)?.department}
                                        </p>
                                    )}
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
                                            ) : (
                                                allTimeSlots.map(slot => {
                                                    const isBooked = isSlotBooked(slot);
                                                    return (
                                                        <button
                                                            key={slot}
                                                            type="button"
                                                            className={`time-slot ${selectedTime === slot ? 'active' : ''} ${isBooked ? 'booked' : ''}`}
                                                            onClick={() => !isBooked && setSelectedTime(slot)}
                                                            disabled={isBooked}
                                                            title={isBooked ? 'This slot is already booked' : 'Click to select this slot'}
                                                        >
                                                            {slot}
                                                            {isBooked && <span className="booked-badge">Booked</span>}
                                                        </button>
                                                    );
                                                })
                                            )}
                                        </div>
                                    ) : (
                                        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                                            Please select a doctor and date to view available time slots
                                        </p>
                                    )}
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
                                disabled={isSubmitting || doctors.length === 0 || !selectedTime}
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
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
