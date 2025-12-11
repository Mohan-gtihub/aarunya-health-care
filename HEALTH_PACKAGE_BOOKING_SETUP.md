# Health Package Booking System - Setup Guide

## Overview
This system allows customers to book health check packages and wellness packages through a modal form. All bookings are stored in Supabase and can be managed through the admin panel.

## Features
- ✅ Booking modal for health check packages
- ✅ Booking modal for wellness packages
- ✅ Customer information collection (name, email, phone, age, address)
- ✅ Medical information (optional): medical history, current medications, special requirements
- ✅ Preferred date and time selection
- ✅ Admin panel to view and manage all bookings
- ✅ Status management (pending, confirmed, completed, cancelled)
- ✅ Delete bookings functionality

## Setup Instructions

### 1. Database Setup

Run the SQL script in your Supabase SQL editor:

```bash
# Navigate to your Supabase project dashboard
# Go to SQL Editor
# Copy and paste the contents of: supabase-health-packages-bookings.sql
# Click "Run" to execute
```

The script will create:
- `health_package_bookings` table
- Necessary indexes for performance
- Row Level Security (RLS) policies
- Auto-update timestamp trigger

### 2. Verify Installation

1. **Check Database Table**
   - Go to Supabase Dashboard → Table Editor
   - Verify `health_package_bookings` table exists
   - Check that all columns are present

2. **Test Booking Flow**
   - Navigate to the Health Check Offers section
   - Click "Book Now" on any package
   - Fill out the form and submit
   - Check Supabase table for the new entry

3. **Test Admin Panel**
   - Navigate to `/admin`
   - Click on "📦 Package Bookings" tab
   - Verify bookings are displayed
   - Test status updates and delete functionality

## Components Created

### 1. HealthPackageBookingModal.jsx
Modal component for collecting booking information with:
- Personal information fields
- Preferred schedule selection
- Medical information (optional)
- Form validation
- Supabase integration

### 2. HealthPackageBookingModal.css
Styling for the booking modal with:
- Responsive design
- Smooth animations
- Modern UI elements
- Mobile-friendly layout

### 3. Updated Components
- **HealthCheckOffers.jsx**: Added booking modal integration
- **HealthPackagesSection.jsx**: Added booking modal integration
- **admin.jsx**: Added package bookings management section

## Database Schema

### health_package_bookings Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| package_name | TEXT | Name of the booked package |
| package_type | TEXT | 'health_check' or 'wellness_package' |
| package_price | TEXT | Price of the package |
| customer_name | TEXT | Customer's full name |
| customer_email | TEXT | Customer's email address |
| customer_phone | TEXT | Customer's phone number |
| customer_age | INTEGER | Customer's age (optional) |
| customer_address | TEXT | Customer's address (optional) |
| preferred_date | DATE | Preferred appointment date (optional) |
| preferred_time | TEXT | Preferred appointment time (optional) |
| medical_history | TEXT | Medical history (optional) |
| current_medications | TEXT | Current medications (optional) |
| special_requirements | TEXT | Special requirements (optional) |
| status | TEXT | Booking status (default: 'pending') |
| notes | TEXT | Admin notes (optional) |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## Admin Panel Features

### Package Bookings Tab
- View all health package bookings in a table format
- Filter by package type (Health Check / Wellness)
- Update booking status via dropdown
- View detailed booking information
- Delete bookings
- See creation and update timestamps

### Status Options
- **Pending**: Initial status when booking is created
- **Confirmed**: Booking has been confirmed by admin
- **Completed**: Service has been completed
- **Cancelled**: Booking has been cancelled

## Usage

### For Customers
1. Browse health check packages or wellness packages
2. Click "Book Now" on desired package
3. Fill out the booking form:
   - Required: Name, Email, Phone
   - Optional: Age, Address, Preferred Date/Time, Medical Information
4. Submit the form
5. Receive confirmation message

### For Admins
1. Navigate to `/admin`
2. Click "📦 Package Bookings" tab
3. View all bookings in table format
4. Update status by selecting from dropdown
5. Click "👁️ View" to see full booking details
6. Click "🗑️ Delete" to remove a booking

## Customization

### Adding New Package Types
To add new package types, update the `package_type` field validation in:
- `HealthPackageBookingModal.jsx`
- Admin panel status badge styling in `admin.css`

### Modifying Form Fields
Edit `HealthPackageBookingModal.jsx` to:
- Add new form fields
- Change validation rules
- Modify required/optional fields

### Styling Changes
- Modal styling: `HealthPackageBookingModal.css`
- Admin panel styling: `admin.css`

## Troubleshooting

### Bookings not appearing in admin panel
1. Check Supabase connection in browser console
2. Verify RLS policies are set correctly
3. Check that the table name matches: `health_package_bookings`

### Form submission fails
1. Check browser console for errors
2. Verify Supabase credentials in `.env` file
3. Ensure all required fields are filled

### Status updates not working
1. Check RLS policies allow updates
2. Verify admin has proper permissions
3. Check browser console for errors

## Security Notes

- RLS policies allow public inserts (for customer bookings)
- RLS policies allow public reads and updates (consider restricting to authenticated users in production)
- Sensitive medical information is stored - ensure proper data protection compliance
- Consider adding authentication for admin panel in production

## Future Enhancements

Potential improvements:
- Email notifications to customers on booking/status changes
- SMS notifications
- Calendar integration
- Payment gateway integration
- Customer portal to view their bookings
- Export bookings to CSV/Excel
- Advanced filtering and search
- Booking analytics dashboard

## Support

For issues or questions:
1. Check Supabase logs for database errors
2. Check browser console for frontend errors
3. Verify all files are properly imported
4. Ensure database table is created correctly
