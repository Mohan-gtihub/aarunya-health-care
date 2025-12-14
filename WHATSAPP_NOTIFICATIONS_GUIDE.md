# WhatsApp Notifications Implementation Guide

## Overview
This system sends WhatsApp notifications using wa.me links when appointments are booked.

## Components

### 1. Database Setup
Run `whatsapp-notifications-setup.sql` in Supabase SQL Editor to:
- Add `whatsapp_number` field to doctors table
- Create `admin_settings` table for admin WhatsApp number
- Set up default admin WhatsApp number

### 2. Files Created
- `src/lib/whatsappNotifications.js` - WhatsApp notification utility functions
- `whatsapp-notifications-setup.sql` - Database migration

### 3. How It Works

When an appointment is submitted:

1. **Patient** receives WhatsApp with:
   - Appointment confirmation
   - Date, time, doctor name
   - Clinic location
   - Contact information

2. **Doctor** receives WhatsApp with:
   - Patient details (name, phone, email)
   - Appointment date and time
   - Reason for visit
   - Patient message

3. **Admin** receives WhatsApp with:
   - Complete appointment details
   - Patient information
   - Doctor assigned
   - Status

### 4. Admin Panel Features

#### Doctor Management
- Add WhatsApp number field to doctor form
- Edit WhatsApp numbers for existing doctors

#### Settings Tab (New)
- Manage admin WhatsApp number
- Update notification preferences

### 5. Integration Points

#### Appointment API (`src/pages/api/appointments/index.js`)
After creating appointment in Supabase:
```javascript
import { sendAppointmentWhatsAppNotifications } from '../../../lib/whatsappNotifications';

// After successful appointment creation
const { data: doctorData } = await supabase
    .from('doctors')
    .select('whatsapp_number')
    .eq('name', doctorDetails.name)
    .single();

const { data: adminSettings } = await supabase
    .from('admin_settings')
    .select('setting_value')
    .eq('setting_key', 'admin_whatsapp_number')
    .single();

// Send WhatsApp notifications
sendAppointmentWhatsAppNotifications(
    {
        name: patientName,
        phone: patientPhone,
        email: patientEmail,
        doctor: doctorDetails.name,
        date: date,
        time: time,
        reason: reason,
        message: req.body.message || '',
        status: 'pending'
    },
    doctorData?.whatsapp_number,
    adminSettings?.setting_value
);
```

### 6. User Experience

1. Patient books appointment
2. Form submits successfully
3. Three WhatsApp tabs open automatically (with delays):
   - Patient confirmation (0.5s delay)
   - Doctor notification (1.5s delay)
   - Admin notification (2.5s delay)
4. User can send or close each WhatsApp window

### 7. Phone Number Format

The system automatically:
- Removes spaces, dashes, and special characters
- Adds +91 country code if not present
- Validates 10-digit Indian mobile numbers

### 8. Message Templates

All messages include:
- Professional formatting
- Emojis for better readability
- Complete information
- Clinic branding

### 9. Admin Panel Updates Needed

1. Add WhatsApp field to doctor form
2. Create Settings tab for admin WhatsApp
3. Display WhatsApp numbers in doctor list
4. Add edit functionality

### 10. Testing

1. Run SQL migration in Supabase
2. Update admin WhatsApp number in admin_settings table
3. Add WhatsApp numbers to doctors
4. Book a test appointment
5. Verify three WhatsApp windows open

### 11. Benefits

- ✅ No server-side SMS gateway needed
- ✅ No additional costs
- ✅ Works on all devices
- ✅ Instant delivery
- ✅ Easy to implement
- ✅ User-friendly
- ✅ Editable from admin panel

### 12. Limitations

- Requires user to have WhatsApp installed
- Opens multiple browser tabs
- User must manually send each message
- Works best on mobile devices

### 13. Future Enhancements

- WhatsApp Business API integration for automated sending
- Message templates customization from admin panel
- Notification history tracking
- Delivery status tracking

## Next Steps

1. Run SQL migration
2. Update appointment API
3. Add WhatsApp fields to admin panel
4. Test the flow
5. Train admin on managing WhatsApp numbers
