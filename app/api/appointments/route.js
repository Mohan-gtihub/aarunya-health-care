import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Email transporter configuration using Gmail
const transporter = process.env.EMAIL_USER && process.env.EMAIL_PASS
  ? nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
  : null

// In-memory storage (in production, use a database)
let appointments = []
let appointmentIdCounter = 1

// Doctors and departments data
const departments = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    doctors: [
      { id: 1, name: 'Dr. Ramesh Kumar', email: 'mohankilarisai@gmail.com', specialization: 'Interventional Cardiology' },
      { id: 2, name: 'Dr. Priya Sharma', email: 'mohankilarisai@gmail.com', specialization: 'Clinical Cardiology' }
    ]
  },
  {
    id: 'neurology',
    name: 'Neurology',
    doctors: [
      { id: 3, name: 'Dr. Amit Patel', email: 'mohankilarisai@gmail.com', specialization: 'Neurophysiology' },
      { id: 4, name: 'Dr. Sunita Reddy', email: 'mohankilarisai@gmail.com', specialization: 'Stroke Medicine' }
    ]
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    doctors: [
      { id: 5, name: 'Dr. Vikram Singh', email: 'mohankilarisai@gmail.com', specialization: 'Joint Replacement' },
      { id: 6, name: 'Dr. Anjali Gupta', email: 'mohankilarisai@gmail.com', specialization: 'Spine Surgery' }
    ]
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    doctors: [
      { id: 7, name: 'Dr. Meera Joshi', email: 'mohankilarisai@gmail.com', specialization: 'Pediatric Cardiology' },
      { id: 8, name: 'Dr. Rohan Verma', email: 'mohankilarisai@gmail.com', specialization: 'Neonatology' }
    ]
  },
  {
    id: 'general',
    name: 'General Medicine',
    doctors: [
      { id: 9, name: 'Dr. Ashok Rao', email: 'mohankilarisai@gmail.com', specialization: 'Internal Medicine' },
      { id: 10, name: 'Dr. Lakshmi Nair', email: 'mohankilarisai@gmail.com', specialization: 'Family Medicine' }
    ]
  }
]

// Helper functions
function getDoctorById(doctorId) {
  for (const department of departments) {
    const doctor = department.doctors.find(d => d.id === parseInt(doctorId))
    if (doctor) return doctor
  }
  return null
}

function getDepartmentById(deptId) {
  const dept = departments.find(d => d.id === deptId)
  return dept ? dept.name : deptId
}

// Email template functions
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
  `
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
          <h2>Dear ${appointment.doctor},</h2>
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
  `
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
  `
}

// GET all appointments
export async function GET() {
  return NextResponse.json(appointments)
}

// POST create new appointment
export async function POST(request) {
  try {
    const body = await request.json()
    const {
      department,
      doctor,
      date,
      time,
      patientName,
      patientEmail,
      patientPhone,
      reason
    } = body

    // Validate required fields
    if (!department || !doctor || !date || !time || !patientName || !patientEmail || !patientPhone) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      )
    }

    // Get doctor details
    const doctorDetails = getDoctorById(doctor)
    if (!doctorDetails) {
      return NextResponse.json(
        { error: 'Invalid doctor selected' },
        { status: 400 }
      )
    }

    // Get department name
    const departmentName = getDepartmentById(department)

    // Check if time slot is still available for this specific doctor
    const isSlotAvailable = !appointments.some(apt =>
      apt.date === date && apt.time === time && apt.doctorId === parseInt(doctor)
    )

    if (!isSlotAvailable) {
      return NextResponse.json(
        { error: 'This time slot is already booked for the selected doctor' },
        { status: 409 }
      )
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
    }

    appointments.push(appointment)

    // Send confirmation emails using Nodemailer
    try {
      if (!transporter) {
        console.warn('Email credentials not configured. Skipping email notifications.')
      } else {
        console.log('Sending confirmation emails for appointment:', appointment.id)

        // Email to patient
        console.log('Sending patient email to:', appointment.patientEmail)
        await transporter.sendMail({
          from: 'Aarunya Health Care <noreply@aarunyahealthcare.com>',
          to: appointment.patientEmail,
          subject: 'Appointment Confirmation - Aarunya Health Care',
          html: generatePatientEmailTemplate(appointment)
        })
        console.log('Patient email sent successfully')

        // Email to doctor
        console.log('Sending doctor email to:', appointment.doctorEmail)
        await transporter.sendMail({
          from: 'Aarunya Health Care <noreply@aarunyahealthcare.com>',
          to: appointment.doctorEmail,
          subject: 'New Appointment Scheduled - Aarunya Health Care',
          html: generateDoctorEmailTemplate(appointment)
        })
        console.log('Doctor email sent successfully')

        // Email to admin
        console.log('Sending admin email to: kilarimohansai@gmail.com')
        await transporter.sendMail({
          from: 'Aarunya Health Care <noreply@aarunyahealthcare.com>',
          to: 'kilarimohansai@gmail.com',
          subject: 'New Appointment Booking - Aarunya Health Care',
          html: generateAdminEmailTemplate(appointment)
        })
        console.log('Admin email sent successfully')
      }
    } catch (emailError) {
      console.error('Error sending emails:', emailError)
      // Don't fail the appointment creation if email fails
    }

    return NextResponse.json(
      {
        message: 'Appointment booked successfully',
        appointment: {
          id: appointment.id,
          date: appointment.date,
          time: appointment.time,
          doctor: appointment.doctor,
          department: appointment.department
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
