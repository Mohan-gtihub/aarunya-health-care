import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log('📧 Test email request received');
        console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
        console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set (hidden)' : 'Not set');

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('❌ Email credentials not configured');
            return res.status(500).json({ error: 'Email credentials not configured' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        try {
            console.log('Sending test email to:', process.env.EMAIL_USER);
            const info = await transporter.sendMail({
                from: `"Aarunya Health Care" <${process.env.EMAIL_USER}>`,
                to: process.env.EMAIL_USER, // Send to the same email for testing
                subject: 'Test Email - Aarunya Health Care System',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1 style="color: #2c5282;">✅ Test Email Successful</h1>
                        <p>The email system is working correctly!</p>
                        <p>This test was sent from your Aarunya Health Care appointment booking system.</p>
                        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
                        <p style="color: #718096; font-size: 14px;">
                            <strong>Aarunya Health Care</strong><br>
                            Excellence in Healthcare, Compassion in Service
                        </p>
                    </div>
                `
            });
            console.log('✅ Test email sent successfully!');
            console.log('Message ID:', info.messageId);
            console.log('Response:', info.response);
            res.status(200).json({ message: 'Test email sent successfully', messageId: info.messageId });
        } catch (error) {
            console.error('❌ Test email error:');
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            console.error('Full error:', error);
            res.status(500).json({
                error: 'Failed to send test email',
                details: error.message,
                code: error.code
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

