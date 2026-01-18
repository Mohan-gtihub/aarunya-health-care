import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, phone, email, timestamp, source } = req.body;

    // Validate required fields
    if (!name || !phone || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // 1. Save to admin panel data file
        const dataDir = path.join(process.cwd(), 'data');
        const appointmentsFile = path.join(dataDir, 'appointments.json');

        // Ensure data directory exists
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Read existing appointments or create new array
        let appointments = [];
        if (fs.existsSync(appointmentsFile)) {
            const fileContent = fs.readFileSync(appointmentsFile, 'utf-8');
            appointments = JSON.parse(fileContent);
        }

        // Add new appointment
        const newAppointment = {
            id: Date.now().toString(),
            name,
            phone,
            email,
            timestamp: timestamp || new Date().toISOString(),
            source: source || 'popup',
            status: 'pending'
        };

        appointments.push(newAppointment);

        // Save updated appointments
        fs.writeFileSync(appointmentsFile, JSON.stringify(appointments, null, 2));

        // 2. Send email notification
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email to admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
            subject: `New Appointment Request from ${name}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4B0082;">New Appointment Request</h2>
          <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Source:</strong> ${source}</p>
            <p><strong>Time:</strong> ${new Date(timestamp).toLocaleString()}</p>
          </div>
          <p style="color: #666;">Please contact the patient as soon as possible.</p>
        </div>
      `,
        };

        // Email to customer
        const customerMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Appointment Request Received - Aarunya Health Care',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4B0082;">Thank You for Choosing Aarunya Health Care!</h2>
          <p>Dear ${name},</p>
          <p>We have received your appointment request. Our team will contact you shortly at <strong>${phone}</strong> to confirm your appointment.</p>
          <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4B0082; margin-top: 0;">Your Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          <p>If you have any urgent concerns, please call us directly at <strong>+91 XXX XXX XXXX</strong></p>
          <p style="color: #666; margin-top: 30px;">Best regards,<br>Aarunya Health Care Team</p>
        </div>
      `,
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(customerMailOptions),
        ]);

        return res.status(200).json({
            success: true,
            message: 'Appointment request submitted successfully',
            appointmentId: newAppointment.id
        });

    } catch (error) {
        console.error('Error processing appointment request:', error);
        return res.status(500).json({
            error: 'Failed to process appointment request',
            details: error.message
        });
    }
}
