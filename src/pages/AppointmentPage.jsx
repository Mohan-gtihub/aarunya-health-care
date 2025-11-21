import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppointmentBooking from '../components/AppointmentBooking';
import './AppointmentPage.css';

export default function AppointmentPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/departments');
      if (!response.ok) {
        throw new Error('Failed to fetch departments');
      }
      const data = await response.json();
      setDepartments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Book Appointment</span>
          </nav>
          <h1 className="page-title">Book Your Appointment</h1>
          <p className="page-subtitle">
            Schedule your consultation with our expert doctors at Aarunya Health Care
          </p>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <AppointmentBooking />
    </div>
  );
}
