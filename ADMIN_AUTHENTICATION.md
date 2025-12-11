# Admin Authentication System

## Overview
The admin panel is now protected with username/password authentication to prevent unauthorized access.

## Features
- ✅ Login page with username and password
- ✅ Session-based authentication (24-hour expiry)
- ✅ Automatic redirect to login if not authenticated
- ✅ Logout functionality
- ✅ Secure credential storage via environment variables

## Setup Instructions

### 1. Set Admin Credentials

Create or update your `.env.local` file with admin credentials:

```bash
NEXT_PUBLIC_ADMIN_USERNAME=your_admin_username
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
```

**Important:** Use strong, unique credentials for production!

### 2. Access the Admin Panel

1. Navigate to `/admin-login`
2. Enter your username and password
3. Click "Login"
4. You'll be redirected to the admin dashboard

### 3. Logout

Click the "🚪 Logout" button in the top-right corner of the admin dashboard.

## Default Credentials (Development Only)

**⚠️ WARNING: Change these immediately for production!**

- Username: `admin`
- Password: `admin123`

## Security Features

### Session Management
- Sessions expire after 24 hours
- Automatic logout on session expiry
- Session stored in browser's sessionStorage

### Authentication Flow
1. User visits `/admin`
2. System checks for valid session
3. If not authenticated → redirect to `/admin-login`
4. After successful login → redirect to `/admin`
5. Session validated on every page load

## File Structure

```
src/
├── pages/
│   ├── admin-login.jsx       # Login page component
│   ├── admin-login.css        # Login page styles
│   └── admin.jsx              # Admin dashboard (protected)
└── .env.local                 # Environment variables (create this)
```

## Customization

### Change Session Duration

Edit `admin.jsx` line ~105:

```javascript
if (hoursDiff > 24) {  // Change 24 to your desired hours
    handleLogout();
}
```

### Add More Security

Consider implementing:
- Two-factor authentication (2FA)
- IP whitelisting
- Rate limiting on login attempts
- Password encryption
- OAuth integration (Google, GitHub, etc.)
- Supabase Auth integration

## Production Deployment

### Before Deploying:

1. **Change Default Credentials**
   ```bash
   # In .env.local or your hosting platform's environment variables
   NEXT_PUBLIC_ADMIN_USERNAME=your_secure_username
   NEXT_PUBLIC_ADMIN_PASSWORD=your_very_strong_password_123!@#
   ```

2. **Use Strong Passwords**
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, and special characters
   - Avoid common words or patterns

3. **Consider Additional Security**
   - Implement Supabase Auth for better security
   - Add HTTPS (required for production)
   - Enable CORS protection
   - Add rate limiting

## Upgrading to Supabase Auth (Recommended)

For production, consider using Supabase Authentication:

1. Enable Supabase Auth in your project
2. Create admin user in Supabase
3. Update `admin.jsx` to use Supabase auth
4. Remove environment variable credentials

## Troubleshooting

### Can't Login
- Check `.env.local` file exists and has correct credentials
- Verify environment variables are loaded (restart dev server)
- Clear browser cache and sessionStorage

### Automatic Logout
- Session expires after 24 hours
- Clear sessionStorage manually if needed:
  ```javascript
  sessionStorage.clear()
  ```

### Redirect Loop
- Clear browser cache
- Check console for errors
- Verify `useRouter` is working correctly

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use different credentials** for development and production
3. **Rotate passwords regularly**
4. **Monitor login attempts** (add logging)
5. **Use HTTPS** in production
6. **Implement rate limiting** to prevent brute force attacks
7. **Consider using a proper auth service** (Supabase Auth, Auth0, etc.)

## Future Enhancements

- [ ] Add "Remember Me" functionality
- [ ] Implement password reset
- [ ] Add user management (multiple admin users)
- [ ] Login attempt logging
- [ ] Email notifications on login
- [ ] Two-factor authentication
- [ ] OAuth integration
- [ ] Role-based access control (RBAC)
