const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://aarunya-health-care-oew3j56z3-mohan-gtihubs-projects.vercel.app',
    'https://aarunya-health-care.vercel.app',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));
app.use(express.json());

// Data storage (in production, use a proper database)
let appointments = [];
let appointmentIdCounter = 1;

// Doctors and departments data
const departments = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    doctors: [
      { id: 1, name: 'Dr. Ramesh Kumar', email: 'ramesh.kumar@aarunyahealthcare.com', specialization: 'Interventional Cardiology' },
      { id: 2, name: 'Dr. Priya Sharma', email: 'priya.sharma@aarunyahealthcare.com', specialization: 'Clinical Cardiology' }
    ]
  },
  {
    id: 'neurology',
    name: 'Neurology',
    doctors: [
      { id: 3, name: 'Dr. Amit Patel', email: 'amit.patel@aarunyahealthcare.com', specialization: 'Neurophysiology' },
      { id: 4, name: 'Dr. Sunita Reddy', email: 'sunita.reddy@aarunyahealthcare.com', specialization: 'Stroke Medicine' }
    ]
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    doctors: [
      { id: 5, name: 'Dr. Vikram Singh', email: 'vikram.singh@aarunyahealthcare.com', specialization: 'Joint Replacement' },
      { id: 6, name: 'Dr. Anjali Gupta', email: 'anjali.gupta@aarunyahealthcare.com', specialization: 'Spine Surgery' }
    ]
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    doctors: [
      { id: 7, name: 'Dr. Meera Joshi', email: 'meera.joshi@aarunyahealthcare.com', specialization: 'Pediatric Cardiology' },
      { id: 8, name: 'Dr. Rohan Verma', email: 'rohan.verma@aarunyahealthcare.com', specialization: 'Neonatology' }
    ]
  },
  {
    id: 'general',
    name: 'General Medicine',
    doctors: [
      { id: 9, name: 'Dr. Ashok Rao', email: 'ashok.rao@aarunyahealthcare.com', specialization: 'Internal Medicine' },
      { id: 10, name: 'Dr. Lakshmi Nair', email: 'lakshmi.nair@aarunyahealthcare.com', specialization: 'Family Medicine' }
    ]
  }
];

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// API Routes

// Get all departments
app.get('/api/departments', (req, res) => {
  res.json(departments);
});

// Get doctors by department
app.get('/api/departments/:departmentId/doctors', (req, res) => {
  const department = departments.find(d => d.id === req.params.departmentId);
  if (!department) {
    return res.status(404).json({ error: 'Department not found' });
  }
  res.json(department.doctors);
});

// Get available time slots for a specific date
app.get('/api/time-slots/:date', (req, res) => {
  const date = req.params.date;
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  // Filter out already booked slots for the date
  const bookedSlots = appointments
    .filter(apt => apt.date === date)
    .map(apt => apt.time);

  const availableSlots = timeSlots.filter(slot => !bookedSlots.includes(slot));
  res.json(availableSlots);
});

// Test email endpoint
app.post('/api/test-email', async (req, res) => {
  try {
    console.log('Sending test email to admin...');

    const testEmailOptions = {
      from: 'Aarunya Health Care <noreply@aarunyahealthcare.com>',
      to: 'kilarimohansai@gmail.com',
      subject: 'Test Email - Aarunya Health Care System',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #4B0082, #D4AF37); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Test Email Successful</h1>
              <p>Aarunya Health Care System</p>
            </div>
            <div class="content">
              <h2>Admin Notification</h2>
              <p>This is a test email to confirm that the email system is working correctly.</p>
              <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Status:</strong> Email system is operational and ready to receive appointment bookings.</p>
              <p>You will receive booking details at this email address whenever a new appointment is scheduled.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(testEmailOptions);
    console.log('Test email sent successfully to admin');

    res.json({ message: 'Test email sent successfully' });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ error: 'Failed to send test email' });
  }
});

// Helper function to get doctor details by ID
function getDoctorById(doctorId) {
  for (const department of departments) {
    const doctor = department.doctors.find(d => d.id === parseInt(doctorId));
    if (doctor) return doctor;
  }
  return null;
}

// Helper function to get department name by ID
function getDepartmentById(deptId) {
  const dept = departments.find(d => d.id === deptId);
  return dept ? dept.name : deptId;
}

// Create new appointment
app.post('/api/appointments', async (req, res) => {
  try {
    const {
      department,
      doctor,
      date,
      time,
      patientName,
      patientEmail,
      patientPhone,
      reason
    } = req.body;

    // Validate required fields
    if (!department || !doctor || !date || !time || !patientName || !patientEmail || !patientPhone) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    // Get doctor details
    const doctorDetails = getDoctorById(doctor);
    if (!doctorDetails) {
      return res.status(400).json({ error: 'Invalid doctor selected' });
    }

    // Get department name
    const departmentName = getDepartmentById(department);

    // Check if time slot is still available for this specific doctor
    const isSlotAvailable = !appointments.some(apt =>
      apt.date === date && apt.time === time && apt.doctorId === parseInt(doctor)
    );

    if (!isSlotAvailable) {
      return res.status(409).json({ error: 'This time slot is already booked for the selected doctor' });
    }

    // Create appointment with full details
    const appointment = {
      id: appointmentIdCounter++,
      department: departmentName,
      departmentId: department,
      doctor: doctorDetails.name,
      doctorId: parseInt(doctor),
      doctorEmail: doctorDetails.email,
      date,
      time,
      patientName,
      patientEmail,
      patientPhone,
      reason: reason || 'General consultation',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    appointments.push(appointment);

    // Send confirmation emails
    await sendConfirmationEmails(appointment);

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment: {
        id: appointment.id,
        date: appointment.date,
        time: appointment.time,
        doctor: appointment.doctor,
        department: appointment.department
      }
    });

  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get appointment by ID
app.get('/api/appointments/:id', (req, res) => {
  const appointment = appointments.find(apt => apt.id === parseInt(req.params.id));
  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found' });
  }
  res.json(appointment);
});

// Get all appointments (admin only)
app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

// Cancel appointment
app.put('/api/appointments/:id/cancel', async (req, res) => {
  const appointmentIndex = appointments.findIndex(apt => apt.id === parseInt(req.params.id));
  if (appointmentIndex === -1) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  appointments[appointmentIndex].status = 'cancelled';
  appointments[appointmentIndex].cancelledAt = new Date().toISOString();

  // Send cancellation email
  await sendCancellationEmail(appointments[appointmentIndex]);

  res.json({ message: 'Appointment cancelled successfully' });
});

// Email functions
async function sendConfirmationEmails(appointment) {
  console.log('Attempting to send confirmation emails for appointment:', appointment.id);

  // Email to patient
  const patientEmailOptions = {
    from: 'Aarunya Health Care <noreply@aarunyahealthcare.com>',
    to: appointment.patientEmail,
    subject: 'Appointment Confirmation - Aarunya Health Care',
    html: generatePatientEmailTemplate(appointment)
  };

  // Email to doctor
  const doctorEmailOptions = {
    from: 'Aarunya Health Care <noreply@aarunyahealthcare.com>',
    to: getDoctorEmail(appointment.doctor),
    subject: 'New Appointment Scheduled',
    html: generateDoctorEmailTemplate(appointment)
  };

  // Send emails (in production, handle failures properly)
  try {
    console.log('Sending patient email to:', appointment.patientEmail);
    await transporter.sendMail(patientEmailOptions);
    console.log('Patient email sent successfully');

    console.log('Sending doctor email to:', getDoctorEmail(appointment.doctor));
    await transporter.sendMail(doctorEmailOptions);
    console.log('Doctor email sent successfully');

    // Also send email to admin
    const adminEmailOptions = {
      from: 'Aarunya Health Care <noreply@aarunyahealthcare.com>',
      to: 'kilarimohansai@gmail.com',
      subject: 'New Appointment Booking - Aarunya Health Care',
      html: generateAdminEmailTemplate(appointment)
    };
    console.log('Sending admin email to: kilarimohansai@gmail.com');
    await transporter.sendMail(adminEmailOptions);
    console.log('Admin email sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    console.error('Email configuration:', {
      user: process.env.EMAIL_USER,
      hasPassword: !!process.env.EMAIL_PASS
    });
  }
}

async function sendCancellationEmail(appointment) {
  const emailOptions = {
    from: 'Aarunya Health Care <noreply@aarunyahealthcare.com>',
    to: appointment.patientEmail,
    subject: 'Appointment Cancelled - Aarunya Health Care',
    html: generateCancellationEmailTemplate(appointment)
  };

  try {
    await transporter.sendMail(emailOptions);
  } catch (error) {
    console.error('Error sending cancellation email:', error);
  }
}

// Helper functions
function getDoctorEmail(doctorName) {
  for (const department of departments) {
    const doctor = department.doctors.find(d => d.name === doctorName);
    if (doctor) return doctor.email;
  }
  return 'admin@aarunyahealthcare.com';
}

function generatePatientEmailTemplate(appointment) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4B0082, #D4AF37); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4B0082; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Appointment Confirmed</h1>
          <p>Aarunya Health Care</p>
        </div>
        <div class="content">
          <h2>Dear ${appointment.patientName},</h2>
          <p>Your appointment has been successfully confirmed. Here are the details:</p>
          
          <div class="appointment-details">
            <h3>Appointment Details</h3>
            <p><strong>Date:</strong> ${appointment.date}</p>
            <p><strong>Time:</strong> ${appointment.time}</p>
            <p><strong>Department:</strong> ${appointment.department}</p>
            <p><strong>Doctor:</strong> ${appointment.doctor}</p>
            <p><strong>Appointment ID:</strong> #${appointment.id}</p>
          </div>
          
          <p><strong>Important Information:</strong></p>
          <ul>
            <li>Please arrive 15 minutes before your scheduled time</li>
            <li>Bring your ID proof and any previous medical records</li>
            <li>If you need to cancel, please inform us at least 24 hours in advance</li>
          </ul>
          
          <p>For any queries, please call us at +91 (555) 123-4567</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 Aarunya Health Care. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateDoctorEmailTemplate(appointment) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4B0082, #D4AF37); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D4AF37; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Appointment Scheduled</h1>
          <p>Aarunya Health Care</p>
        </div>
        <div class="content">
          <h2>Dr. ${appointment.doctor},</h2>
          <p>You have a new appointment scheduled:</p>
          
          <div class="appointment-details">
            <h3>Patient Information</h3>
            <p><strong>Patient Name:</strong> ${appointment.patientName}</p>
            <p><strong>Date:</strong> ${appointment.date}</p>
            <p><strong>Time:</strong> ${appointment.time}</p>
            <p><strong>Department:</strong> ${appointment.department}</p>
            <p><strong>Contact:</strong> ${appointment.patientPhone}</p>
            <p><strong>Email:</strong> ${appointment.patientEmail}</p>
            <p><strong>Reason:</strong> ${appointment.reason}</p>
            <p><strong>Appointment ID:</strong> #${appointment.id}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateAdminEmailTemplate(appointment) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4B0082, #D4AF37); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D4AF37; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Appointment Booking</h1>
          <p>Aarunya Health Care - Admin Notification</p>
        </div>
        <div class="content">
          <h2>Admin Notification,</h2>
          <p>A new appointment has been booked:</p>
          
          <div class="appointment-details">
            <h3>Patient Information</h3>
            <p><strong>Patient Name:</strong> ${appointment.patientName}</p>
            <p><strong>Date:</strong> ${appointment.date}</p>
            <p><strong>Time:</strong> ${appointment.time}</p>
            <p><strong>Department:</strong> ${appointment.department}</p>
            <p><strong>Doctor:</strong> ${appointment.doctor}</p>
            <p><strong>Contact:</strong> ${appointment.patientPhone}</p>
            <p><strong>Email:</strong> ${appointment.patientEmail}</p>
            <p><strong>Reason:</strong> ${appointment.reason}</p>
            <p><strong>Appointment ID:</strong> #${appointment.id}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateCancellationEmailTemplate(appointment) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dc3545, #6c757d); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Appointment Cancelled</h1>
          <p>Aarunya Health Care</p>
        </div>
        <div class="content">
          <h2>Dear ${appointment.patientName},</h2>
          <p>Your appointment has been cancelled as per your request.</p>
          <p><strong>Cancelled Appointment Details:</strong></p>
          <p>Appointment ID: #${appointment.id}</p>
          <p>Date: ${appointment.date}</p>
          <p>Time: ${appointment.time}</p>
          <p>Doctor: ${appointment.doctor}</p>
          
          <p>If you did not request this cancellation, please contact us immediately.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
