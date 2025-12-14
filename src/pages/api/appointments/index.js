import nodemailer from 'nodemailer';
import { addAppointment, getAppointments } from '../../../lib/storage';
import { supabase } from '../../../lib/supabase';

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

            // Check if time slot is still available (check both in-memory and Supabase)
            const appointments = getAppointments();
            const isSlotAvailable = !appointments.some(apt =>
                apt.date === date && apt.time === time && apt.doctorId === parseInt(doctor) && apt.status !== 'cancelled'
            );

            if (!isSlotAvailable) {
                return res.status(409).json({ error: 'This time slot is already booked for the selected doctor' });
            }

            // Create appointment data
            const appointmentData = {
                patient_name: patientName,
                patient_email: patientEmail,
                patient_phone: patientPhone,
                department: departmentName,
                department_id: department,
                doctor: doctorDetails.name,
                doctor_id: parseInt(doctor),
                doctor_email: doctorDetails.email,
                date,
                time,
                reason: reason || 'General consultation',
                status: 'confirmed'
            };

            // Save to in-memory storage (for backward compatibility)
            const newAppointment = addAppointment({
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
            });

            // Save to Supabase for persistence
            const { data: supabaseAppointment, error: supabaseError } = await supabase
                .from('appointments')
                .insert([appointmentData])
                .select()
                .single();

            if (supabaseError) {
                console.error('Supabase save error:', supabaseError);
                // Continue anyway - at least we have in-memory storage
            } else {
                console.log('✅ Appointment saved to Supabase:', supabaseAppointment.id);
            }

            // Send confirmation emails (non-blocking)
            sendConfirmationEmails(newAppointment).catch(err => {
                console.error('Email sending failed:', err);
            });

            // Get doctor WhatsApp number from database
            let doctorWhatsApp = null;
            try {
                const { data: doctorData } = await supabase
                    .from('doctors')
                    .select('whatsapp_number')
                    .eq('name', doctorDetails.name)
                    .single();
                doctorWhatsApp = doctorData?.whatsapp_number;
            } catch (err) {
                console.log('Could not fetch doctor WhatsApp:', err.message);
            }

            // Get admin WhatsApp number from settings
            let adminWhatsApp = null;
            try {
                const { data: adminSettings } = await supabase
                    .from('admin_settings')
                    .select('setting_value')
                    .eq('setting_key', 'admin_whatsapp_number')
                    .single();
                adminWhatsApp = adminSettings?.setting_value;
            } catch (err) {
                console.log('Could not fetch admin WhatsApp:', err.message);
            }

            res.status(201).json({
                message: 'Appointment booked successfully',
                appointment: newAppointment,
                whatsappData: {
                    patientPhone: patientPhone,
                    doctorWhatsApp: doctorWhatsApp,
                    adminWhatsApp: adminWhatsApp,
                    appointmentDetails: {
                        name: patientName,
                        phone: patientPhone,
                        email: patientEmail,
                        doctor: doctorDetails.name,
                        date: date,
                        time: time,
                        reason: reason || 'General consultation',
                        message: req.body.message || '',
                        status: 'confirmed'
                    }
                }
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
    // Check if credentials are provided
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('❌ EMAIL CONFIGURATION ERROR: EMAIL_USER or EMAIL_PASS not found in environment variables');
        console.log('Current EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
        console.log('Current EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
        return;
    }

    console.log('📧 Attempting to send email to:', appointment.patientEmail);
    console.log('Using email account:', process.env.EMAIL_USER);

    // Create transporter inside the function to ensure env vars are loaded
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // IMPORTANT: Gmail requires the 'from' address to match the authenticated account
    const patientEmailOptions = {
        from: `"Aarunya Health Care" <${process.env.EMAIL_USER}>`,
        to: [appointment.patientEmail, process.env.EMAIL_USER], // Send to patient and admin
        subject: 'Appointment Confirmation - Aarunya Health Care',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2c5282;">Appointment Confirmed ✅</h1>
        <p>Dear ${appointment.patientName},</p>
        <p>Your appointment has been successfully booked!</p>
        
        <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #2d3748; margin-top: 0;">Appointment Details:</h2>
          <p><strong>Doctor:</strong> ${appointment.doctor}</p>
          <p><strong>Department:</strong> ${appointment.department}</p>
          <p><strong>Date:</strong> ${appointment.date}</p>
          <p><strong>Time:</strong> ${appointment.time}</p>
          <p><strong>Reason:</strong> ${appointment.reason}</p>
        </div>
        
        <p>Please arrive 15 minutes before your scheduled time.</p>
        <p>If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        
        <p style="color: #718096; font-size: 14px;">
          <strong>Aarunya Health Care</strong><br>
          Excellence in Healthcare, Compassion in Service<br>
          📞 +91 (555) 123-4567<br>
          📧 info@aarunyahealthcare.com
        </p>
      </div>
    `
    };

    try {
        const info = await transporter.sendMail(patientEmailOptions);
        console.log('✅ Confirmation email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);
    } catch (error) {
        console.error('❌ ERROR SENDING EMAIL:');
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Full error:', error);
        throw error; // Re-throw to be caught by the .catch() in the handler
    }
}
