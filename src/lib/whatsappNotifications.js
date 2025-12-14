/**
 * WhatsApp Notification Utility
 * Uses wa.me links to send WhatsApp messages
 */

/**
 * Format phone number for WhatsApp (remove spaces, dashes, and add country code if needed)
 * @param {string} phone - Phone number
 * @returns {string} - Formatted phone number
 */
export function formatWhatsAppNumber(phone) {
    if (!phone) return '';

    // Remove all non-numeric characters
    let cleaned = phone.replace(/\D/g, '');

    // If doesn't start with country code, assume India (+91)
    if (!cleaned.startsWith('91') && cleaned.length === 10) {
        cleaned = '91' + cleaned;
    }

    return cleaned;
}

/**
 * Send WhatsApp message using wa.me link
 * @param {string} phoneNumber - Recipient's phone number
 * @param {string} message - Message to send
 */
export function sendWhatsAppMessage(phoneNumber, message) {
    const formattedNumber = formatWhatsAppNumber(phoneNumber);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

    // Open in new window
    window.open(whatsappUrl, '_blank');
}

/**
 * Send appointment confirmation to patient
 * @param {object} appointment - Appointment details
 */
export function sendPatientAppointmentConfirmation(appointment) {
    const message = `
🏥 *Aarunya Health Care - Appointment Confirmation*

Dear ${appointment.name},

Your appointment has been confirmed!

📅 *Date:* ${new Date(appointment.date).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}
⏰ *Time:* ${appointment.time}
👨‍⚕️ *Doctor:* ${appointment.doctor}
📝 *Reason:* ${appointment.reason || 'General Consultation'}

📍 *Location:*
Aarunya Health Care
C93/+261 Shaikpet Main Rd
Shivaji Nagar, Sri Ram Nagar Colony
Hyderabad, Telangana 500008

For any changes or queries, please contact us.

Thank you for choosing Aarunya Health Care!
    `.trim();

    sendWhatsAppMessage(appointment.phone, message);
}

/**
 * Send appointment notification to doctor
 * @param {object} appointment - Appointment details
 * @param {string} doctorWhatsApp - Doctor's WhatsApp number
 */
export function sendDoctorAppointmentNotification(appointment, doctorWhatsApp) {
    const message = `
🏥 *New Appointment Notification*

You have a new appointment scheduled:

👤 *Patient:* ${appointment.name}
📞 *Phone:* ${appointment.phone}
📧 *Email:* ${appointment.email || 'Not provided'}

📅 *Date:* ${new Date(appointment.date).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}
⏰ *Time:* ${appointment.time}
📝 *Reason:* ${appointment.reason || 'General Consultation'}
💬 *Message:* ${appointment.message || 'None'}

Please prepare for this consultation.
    `.trim();

    sendWhatsAppMessage(doctorWhatsApp, message);
}

/**
 * Send appointment notification to admin
 * @param {object} appointment - Appointment details
 * @param {string} adminWhatsApp - Admin's WhatsApp number
 */
export function sendAdminAppointmentNotification(appointment, adminWhatsApp) {
    const message = `
🏥 *Aarunya Health Care - New Appointment*

📋 *APPOINTMENT DETAILS*

👤 *Patient Information:*
Name: ${appointment.name}
Phone: ${appointment.phone}
Email: ${appointment.email || 'Not provided'}

👨‍⚕️ *Appointment Details:*
Doctor: ${appointment.doctor}
Date: ${new Date(appointment.date).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}
Time: ${appointment.time}
Reason: ${appointment.reason || 'General Consultation'}

💬 *Patient Message:*
${appointment.message || 'None'}

🔔 *Status:* ${appointment.status || 'Pending'}

Please review and confirm this appointment.
    `.trim();

    sendWhatsAppMessage(adminWhatsApp, message);
}

/**
 * Send all WhatsApp notifications for a new appointment
 * @param {object} appointment - Appointment details
 * @param {string} doctorWhatsApp - Doctor's WhatsApp number
 * @param {string} adminWhatsApp - Admin's WhatsApp number
 */
export async function sendAppointmentWhatsAppNotifications(appointment, doctorWhatsApp, adminWhatsApp) {
    try {
        // Send to patient
        if (appointment.phone) {
            setTimeout(() => {
                sendPatientAppointmentConfirmation(appointment);
            }, 500);
        }

        // Send to doctor
        if (doctorWhatsApp) {
            setTimeout(() => {
                sendDoctorAppointmentNotification(appointment, doctorWhatsApp);
            }, 1500);
        }

        // Send to admin
        if (adminWhatsApp) {
            setTimeout(() => {
                sendAdminAppointmentNotification(appointment, adminWhatsApp);
            }, 2500);
        }

        return true;
    } catch (error) {
        console.error('Error sending WhatsApp notifications:', error);
        return false;
    }
}

/**
 * Send package booking confirmation to customer
 * @param {object} booking - Package booking details
 */
export function sendCustomerPackageConfirmation(booking) {
    const message = `
🏥 *Aarunya Health Care - Package Booking Confirmed*

Dear ${booking.customer_name},

Thank you for booking our health package!

📦 *Package:* ${booking.package_name}
📅 *Booking Date:* ${new Date(booking.created_at).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}
${booking.preferred_date ? `\n🗓️ *Preferred Date:* ${new Date(booking.preferred_date).toLocaleDateString('en-IN')}` : ''}
${booking.preferred_time ? `\n⏰ *Preferred Time:* ${booking.preferred_time}` : ''}

📍 *Location:*
Aarunya Health Care
C93/+261 Shaikpet Main Rd
Shivaji Nagar, Sri Ram Nagar Colony
Hyderabad, Telangana 500008

Our team will contact you shortly to confirm the schedule.

Thank you for choosing Aarunya Health Care!
    `.trim();

    sendWhatsAppMessage(booking.customer_phone, message);
}

/**
 * Send package booking notification to admin
 * @param {object} booking - Package booking details
 * @param {string} adminWhatsApp - Admin's WhatsApp number
 */
export function sendAdminPackageNotification(booking, adminWhatsApp) {
    const message = `
🏥 *Aarunya Health Care - New Package Booking*

📋 *PACKAGE BOOKING DETAILS*

📦 *Package:* ${booking.package_name}

👤 *Customer Information:*
Name: ${booking.customer_name}
Phone: ${booking.customer_phone}
Email: ${booking.customer_email}
Age: ${booking.customer_age || 'Not provided'}
Address: ${booking.customer_address || 'Not provided'}

📅 *Booking Details:*
Booking Date: ${new Date(booking.created_at).toLocaleDateString('en-IN')}
${booking.preferred_date ? `Preferred Date: ${new Date(booking.preferred_date).toLocaleDateString('en-IN')}` : ''}
${booking.preferred_time ? `Preferred Time: ${booking.preferred_time}` : ''}

🏥 *Medical Information:*
${booking.medical_history ? `Medical History: ${booking.medical_history}` : 'No medical history provided'}
${booking.current_medications ? `\nCurrent Medications: ${booking.current_medications}` : ''}
${booking.special_requirements ? `\nSpecial Requirements: ${booking.special_requirements}` : ''}

🔔 *Status:* ${booking.status || 'Pending'}

Please review and schedule this package booking.
    `.trim();

    sendWhatsAppMessage(adminWhatsApp, message);
}

/**
 * Send all WhatsApp notifications for a new package booking
 * @param {object} booking - Package booking details
 * @param {string} adminWhatsApp - Admin's WhatsApp number
 */
export async function sendPackageBookingWhatsAppNotifications(booking, adminWhatsApp) {
    try {
        // Send to customer
        if (booking.customer_phone) {
            setTimeout(() => {
                sendCustomerPackageConfirmation(booking);
            }, 500);
        }

        // Send to admin
        if (adminWhatsApp) {
            setTimeout(() => {
                sendAdminPackageNotification(booking, adminWhatsApp);
            }, 1500);
        }

        return true;
    } catch (error) {
        console.error('Error sending package WhatsApp notifications:', error);
        return false;
    }
}
