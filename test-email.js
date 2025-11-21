require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('Testing email configuration...');
  console.log('Email user:', process.env.EMAIL_USER);
  console.log('Has password:', !!process.env.EMAIL_PASS);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Verify the connection
  try {
    await transporter.verify();
    console.log('Email server connection verified successfully');
  } catch (error) {
    console.error('Email server connection failed:', error);
    return;
  }

  // Send test email
  const mailOptions = {
    from: 'Aarunya Health Care <noreply@aarunyahealthcare.com>',
    to: 'kilarimohansai@gmail.com',
    subject: 'Test Email - Aarunya Health Care',
    html: `
      <h2>Test Email</h2>
      <p>This is a test email to verify the email configuration is working.</p>
      <p>Sent at: ${new Date().toLocaleString()}</p>
    `
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Test email sent successfully!');
    console.log('Message ID:', result.messageId);
  } catch (error) {
    console.error('Failed to send test email:', error);
  }
}

testEmail();
