import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { booking } = req.body;

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

        const subject = '✅ Health Package Booking Confirmation - Aarunya Health Care';
        const htmlContent = `
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
                    .highlight { color: #4B0082; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>✅ Health Package Booking Confirmed</h1>
                    </div>
                    <div class="content">
                        <p>Dear ${booking.customer_name},</p>
                        <p>Thank you for booking a health package with Aarunya Health Care! Your booking has been successfully received.</p>
                        
                        <div class="info-box">
                            <h3 style="margin-top: 0; color: #4B0082;">Package Details:</h3>
                            <p><strong>📦 Package:</strong> ${booking.package_name}</p>
                            <p><strong>💰 Price:</strong> ${booking.package_price}</p>
                            ${booking.preferred_date ? `<p><strong>📅 Preferred Date:</strong> ${booking.preferred_date}</p>` : ''}
                            ${booking.preferred_time ? `<p><strong>🕐 Preferred Time:</strong> ${booking.preferred_time}</p>` : ''}
                        </div>

                        <div class="info-box">
                            <h3 style="margin-top: 0; color: #4B0082;">Contact Information:</h3>
                            <p><strong>📧 Email:</strong> ${booking.customer_email}</p>
                            <p><strong>📱 Phone:</strong> ${booking.customer_phone}</p>
                            ${booking.customer_address ? `<p><strong>📍 Address:</strong> ${booking.customer_address}</p>` : ''}
                        </div>

                        ${booking.medical_history || booking.current_medications || booking.special_requirements ? `
                        <div class="info-box">
                            <h3 style="margin-top: 0; color: #4B0082;">Additional Information:</h3>
                            ${booking.medical_history ? `<p><strong>Medical History:</strong> ${booking.medical_history}</p>` : ''}
                            ${booking.current_medications ? `<p><strong>Current Medications:</strong> ${booking.current_medications}</p>` : ''}
                            ${booking.special_requirements ? `<p><strong>Special Requirements:</strong> ${booking.special_requirements}</p>` : ''}
                        </div>
                        ` : ''}

                        <p>Our team will contact you shortly to confirm the schedule and provide further instructions.</p>
                        
                        <p>If you have any questions, please feel free to contact us.</p>
                        
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

        // Send email to customer with admin as recipient
        const info = await transporter.sendMail({
            from: `"Aarunya Health Care" <${process.env.EMAIL_USER}>`,
            to: [booking.customer_email, process.env.EMAIL_USER], // Send to customer and admin
            subject: subject,
            html: htmlContent
        });

        console.log('✅ Package booking notification email sent:', info.messageId);
        res.status(200).json({ message: 'Notification sent successfully', messageId: info.messageId });

    } catch (error) {
        console.error('❌ Error sending package notification email:', error);
        res.status(500).json({ error: 'Failed to send notification email' });
    }
}
