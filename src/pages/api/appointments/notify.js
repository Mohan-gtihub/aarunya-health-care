import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { appointment, action } = req.body;

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('Email credentials not configured');
        return res.status(200).json({ message: 'Email notification skipped (no credentials)' });
    }

    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });


        let subject, htmlContent;
        const patientName = appointment.patient_name || appointment.patientName;
        const patientEmail = appointment.patient_email || appointment.patientEmail;

        if (action === 'confirmed') {
            subject = '✅ Appointment Confirmed - Aarunya Health Care';
            htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                        .info-box { background: white; padding: 20px; border-left: 4px solid #10B981; margin: 20px 0; }
                        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>✅ Appointment Confirmed</h1>
                        </div>
                        <div class="content">
                            <p>Dear ${patientName},</p>
                            <p>Your appointment has been successfully confirmed! Here are the details:</p>
                            
                            <div class="info-box">
                                <p><strong>📅 Date:</strong> ${appointment.date}</p>
                                <p><strong>🕐 Time:</strong> ${appointment.time}</p>
                                <p><strong>👨‍⚕️ Doctor:</strong> ${appointment.doctor}</p>
                                <p><strong>🏥 Department:</strong> ${appointment.department}</p>
                                <p><strong>📝 Reason:</strong> ${appointment.reason}</p>
                            </div>

                            <p><strong>Important Information:</strong></p>
                            <ul>
                                <li>Please arrive 15 minutes before your scheduled time</li>
                                <li>Bring your ID proof and any previous medical records</li>
                                <li>If you need to cancel, please inform us at least 24 hours in advance</li>
                            </ul>
                            
                            <p>Thank you for choosing Aarunya Health Care!</p>
                        </div>
                        <div class="footer">
                            <p>Aarunya Health Care | Empathy · Expertise · Excellence</p>
                            <p>This is an automated message. Please do not reply to this email.</p>
                        </div>
                    </div>
                </body>
                </html>
            `;
        } else if (action === 'updated' || action === 'rescheduled') {
            subject = '🔄 Your Appointment Has Been Rescheduled - Aarunya Health Care';
            htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #4B0082, #8B5CF6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                        .info-box { background: white; padding: 20px; border-left: 4px solid #4B0082; margin: 20px 0; }
                        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                        .button { display: inline-block; padding: 12px 30px; background: #4B0082; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🔄 Appointment Rescheduled</h1>
                        </div>
                        <div class="content">
                            <p>Dear ${patientName},</p>
                            <p>Your appointment has been rescheduled. Here are the updated details:</p>
                            
                            <div class="info-box">
                                <p><strong>📅 New Date:</strong> ${appointment.date}</p>
                                <p><strong>🕐 New Time:</strong> ${appointment.time}</p>
                                <p><strong>👨‍⚕️ Doctor:</strong> ${appointment.doctor}</p>
                                <p><strong>🏥 Department:</strong> ${appointment.department}</p>
                                <p><strong>📝 Status:</strong> ${appointment.status}</p>
                            </div>

                            <p>If you have any questions or need to make further changes, please contact us.</p>
                            
                            <p>Thank you for choosing Aarunya Health Care!</p>
                        </div>
                        <div class="footer">
                            <p>Aarunya Health Care | Empathy · Expertise · Excellence</p>
                            <p>This is an automated message. Please do not reply to this email.</p>
                        </div>
                    </div>
                </body>
                </html>
            `;
        } else if (action === 'cancelled') {
            subject = '❌ Your Appointment Has Been Cancelled - Aarunya Health Care';
            htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #DC2626, #EF4444); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                        .info-box { background: white; padding: 20px; border-left: 4px solid #DC2626; margin: 20px 0; }
                        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                        .button { display: inline-block; padding: 12px 30px; background: #4B0082; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>❌ Appointment Cancelled</h1>
                        </div>
                        <div class="content">
                            <p>Dear ${patientName},</p>
                            <p>We regret to inform you that your appointment has been cancelled.</p>
                            
                            <div class="info-box">
                                <p>If you would like to reschedule or have any questions, please contact us at your earliest convenience.</p>
                            </div>

                            <p>We apologize for any inconvenience this may cause.</p>
                            
                            <p>Thank you for your understanding.</p>
                        </div>
                        <div class="footer">
                            <p>Aarunya Health Care | Empathy · Expertise · Excellence</p>
                            <p>This is an automated message. Please do not reply to this email.</p>
                        </div>
                    </div>
                </body>
                </html>
            `;
        }

        // Send email
        const info = await transporter.sendMail({
            from: `"Aarunya Health Care" <${process.env.EMAIL_USER}>`,
            to: [patientEmail, process.env.EMAIL_USER], // Send to patient and admin
            subject: subject,
            html: htmlContent
        });

        console.log('✅ Notification email sent:', info.messageId);
        res.status(200).json({ message: 'Notification sent successfully', messageId: info.messageId });

    } catch (error) {
        console.error('❌ Error sending notification email:', error);
        res.status(500).json({ error: 'Failed to send notification email' });
    }
}
