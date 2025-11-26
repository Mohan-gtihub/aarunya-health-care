import nodemailer from 'nodemailer';
import { addAppointment, getAppointments } from '../../../lib/storage';

// Departments data (duplicated from departments API for validation)
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

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
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

            // Check if time slot is still available
            const appointments = getAppointments();
            const isSlotAvailable = !appointments.some(apt =>
                apt.date === date && apt.time === time && apt.doctorId === parseInt(doctor) && apt.status !== 'cancelled'
            );

            if (!isSlotAvailable) {
                return res.status(409).json({ error: 'This time slot is already booked for the selected doctor' });
            }

            // Create appointment
            const appointmentData = {
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
                reason: reason || 'General consultation'
            };

            const newAppointment = addAppointment(appointmentData);

            // Send confirmation emails (non-blocking)
            sendConfirmationEmails(newAppointment).catch(console.error);

            res.status(201).json({
                message: 'Appointment booked successfully',
                appointment: newAppointment
            });

        } catch (error) {
            console.error('Error creating appointment:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function sendConfirmationEmails(appointment) {
    // Only send if credentials are provided
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('Email credentials missing, skipping email sending');
        return;
    }

    const patientEmailOptions = {
        from: 'Aarunya Health Care <noreply@aarunyahealthcare.com>',
        to: appointment.patientEmail,
        subject: 'Appointment Confirmation - Aarunya Health Care',
        html: `
      <h1>Appointment Confirmed</h1>
      <p>Dear ${appointment.patientName},</p>
      <p>Your appointment with ${appointment.doctor} on ${appointment.date} at ${appointment.time} is confirmed.</p>
    `
    };

    try {
        await transporter.sendMail(patientEmailOptions);
        console.log('Confirmation email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
