import { useState } from 'react';
import { motion } from 'framer-motion';
import './PatientPortal.css';

export default function PatientPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('appointments');
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login - in production, this would call an API
    if (loginData.email && loginData.password) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ email: '', password: '' });
  };

  // Mock patient data
  const patientData = {
    name: 'John Doe',
    id: 'P-12345',
    appointments: [
      { id: 1, doctor: 'Dr. Mohammed Sarfaraz Nawaz Ahmed', date: '2024-10-25', time: '10:00 AM', type: 'Pediatrics', location: 'SR Nagar' },
      { id: 2, doctor: 'Dr. Sruthi Reddy', date: '2024-11-05', time: '2:30 PM', type: 'Gynecology', location: 'Bachupally' }
    ],
    records: [
      { id: 1, date: '2024-09-15', type: 'Blood Test', doctor: 'Laboratory Services' },
      { id: 2, date: '2024-08-20', type: 'ECG Report', doctor: 'Cardiology Department' },
      { id: 3, date: '2024-07-10', type: 'Digital X-Ray', doctor: 'Radiology Department' }
    ],
    prescriptions: [
      { id: 1, medication: 'Calcium Supplements', doctor: 'Dr. C R Nagarjuna', date: '2024-09-15', refills: 2 },
      { id: 2, medication: 'Vitamin D3', doctor: 'Dr. Rajashekar Danda', date: '2024-08-10', refills: 3 }
    ]
  };

  if (!isLoggedIn) {
    return (
      <div className="portal-page">
        <div className="container">
          <motion.div 
            className="login-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Patient Portal - Aarunya Health Care</h1>
            <p className="portal-subtitle">Access your medical records and appointments at our hospital founded by Mr. Vaishnav</p>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  placeholder="Enter your password"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Login to Portal
              </button>

              <div className="portal-links">
                <a href="#forgot">Forgot Password?</a>
                <a href="#register">Register New Account</a>
              </div>
            </form>

            <div className="portal-info">
              <h3>New to Patient Portal?</h3>
              <ul>
                <li>View your appointments</li>
                <li>Access medical records</li>
                <li>Request prescription refills</li>
                <li>Message your doctor</li>
                <li>Pay bills online</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="portal-page">
      <div className="container">
        <motion.div 
          className="portal-dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="portal-header">
            <div>
              <h1>Welcome, {patientData.name}</h1>
              <p className="patient-id">Patient ID: {patientData.id}</p>
            </div>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>

          <div className="portal-tabs">
            <button 
              className={activeTab === 'appointments' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('appointments')}
            >
              Appointments
            </button>
            <button 
              className={activeTab === 'records' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('records')}
            >
              Medical Records
            </button>
            <button 
              className={activeTab === 'prescriptions' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('prescriptions')}
            >
              Prescriptions
            </button>
          </div>

          <div className="portal-content">
            {activeTab === 'appointments' && (
              <div className="appointments-section">
                <h2>Upcoming Appointments</h2>
                {patientData.appointments.map(apt => (
                  <div key={apt.id} className="portal-card">
                    <div className="card-header">
                      <h3>{apt.doctor}</h3>
                      <span className="badge">{apt.type}</span>
                    </div>
                    <p><strong>Date:</strong> {apt.date}</p>
                    <p><strong>Time:</strong> {apt.time}</p>
                    <p><strong>Location:</strong> {apt.location}</p>
                    <div className="card-actions">
                      <button className="btn btn-sm btn-secondary">Reschedule</button>
                      <button className="btn btn-sm btn-outline">Cancel</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'records' && (
              <div className="records-section">
                <h2>Medical Records</h2>
                {patientData.records.map(record => (
                  <div key={record.id} className="portal-card">
                    <h3>{record.type}</h3>
                    <p><strong>Date:</strong> {record.date}</p>
                    <p><strong>Doctor:</strong> {record.doctor}</p>
                    <button className="btn btn-sm btn-primary">View Details</button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'prescriptions' && (
              <div className="prescriptions-section">
                <h2>Active Prescriptions</h2>
                {patientData.prescriptions.map(rx => (
                  <div key={rx.id} className="portal-card">
                    <h3>{rx.medication}</h3>
                    <p><strong>Prescribed by:</strong> {rx.doctor}</p>
                    <p><strong>Date:</strong> {rx.date}</p>
                    <p><strong>Refills remaining:</strong> {rx.refills}</p>
                    <button className="btn btn-sm btn-primary">Request Refill</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
