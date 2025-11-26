import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
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
            await transporter.sendMail({
                from: 'Aarunya Health Care <noreply@aarunyahealthcare.com>',
                to: 'kilarimohansai@gmail.com',
                subject: 'Test Email - Aarunya Health Care System',
                html: '<h1>Test Email Successful</h1><p>The email system is working correctly.</p>'
            });
            res.status(200).json({ message: 'Test email sent successfully' });
        } catch (error) {
            console.error('Test email error:', error);
            res.status(500).json({ error: 'Failed to send test email' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
