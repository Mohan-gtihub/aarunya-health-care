# Production Deployment Guide - Aarunya Health Care

## 🚀 Pre-Deployment Checklist

### 1. Database Setup (Supabase)
- [ ] Run all SQL scripts in Supabase SQL Editor
- [ ] Verify all tables are created:
  - `appointments`
  - `doctors`
  - `blog_posts`
  - `videos`
  - `video_settings`
  - `health_package_bookings`
- [ ] Check Row Level Security (RLS) policies are enabled
- [ ] Test database connections

### 2. Environment Variables
- [ ] Set admin credentials in production
- [ ] Configure Supabase keys
- [ ] Set up email service (if using)

### 3. Code Quality
- [ ] Remove console.logs (optional)
- [ ] Check for any hardcoded values
- [ ] Test all features locally
- [ ] Verify responsive design

### 4. Security
- [ ] Change default admin password
- [ ] Enable HTTPS (Vercel does this automatically)
- [ ] Review RLS policies
- [ ] Check API endpoints security

---

## 📋 Step-by-Step Deployment

### Step 1: Prepare Environment Variables

Create `.env.local` file (already in .gitignore):
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin Credentials
NEXT_PUBLIC_ADMIN_USERNAME=your_secure_username
NEXT_PUBLIC_ADMIN_PASSWORD=your_very_secure_password
```

### Step 2: Git Setup

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Production ready: Complete health care management system"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/aarunya-health-care.git

# Push to GitHub
git push -u origin main
```

### Step 3: Vercel Deployment

#### Option A: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: Via Vercel Dashboard
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. Add Environment Variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_ADMIN_USERNAME`
   - `NEXT_PUBLIC_ADMIN_PASSWORD`

6. Click "Deploy"

### Step 4: Post-Deployment

1. **Test Production Site:**
   - Visit your Vercel URL
   - Test appointment booking
   - Test admin login
   - Test all CRUD operations
   - Check mobile responsiveness

2. **Configure Custom Domain (Optional):**
   - Go to Vercel project settings
   - Add custom domain
   - Update DNS records

3. **Monitor:**
   - Check Vercel Analytics
   - Monitor Supabase usage
   - Check error logs

---

## 🗄️ Database Setup Scripts

Run these in order in Supabase SQL Editor:

### 1. Doctors Table
```sql
-- Already exists, verify structure
SELECT * FROM doctors LIMIT 1;
```

### 2. Appointments Table
```sql
-- Verify structure
SELECT * FROM appointments LIMIT 1;
```

### 3. Health Package Bookings Table
```sql
-- Run the script from: supabase-health-packages-bookings.sql
-- This creates the health_package_bookings table
```

### 4. Blog Posts Table
```sql
-- Verify structure
SELECT * FROM blog_posts LIMIT 1;
```

### 5. Videos Tables
```sql
-- Verify both tables exist
SELECT * FROM videos LIMIT 1;
SELECT * FROM video_settings LIMIT 1;
```

---

## 🔒 Security Checklist

### Before Going Live:

1. **Admin Credentials:**
   ```bash
   # Set strong password in Vercel environment variables
   NEXT_PUBLIC_ADMIN_USERNAME=admin_secure_2024
   NEXT_PUBLIC_ADMIN_PASSWORD=YourVeryStrongPassword123!@#
   ```

2. **Supabase RLS:**
   - Verify all tables have RLS enabled
   - Test policies with different user roles
   - Ensure public can only read, not write (except bookings)

3. **API Security:**
   - All Supabase operations use RLS
   - No exposed API keys in client code
   - Session-based admin authentication

4. **HTTPS:**
   - Vercel provides automatic HTTPS
   - Ensure all external resources use HTTPS

---

## 📊 Features Checklist

Verify all features work in production:

### Frontend Features:
- [ ] Homepage loads correctly
- [ ] Appointment booking works
- [ ] Doctor list loads from database
- [ ] Slot availability checking works
- [ ] Health package booking modal works
- [ ] Blog posts display
- [ ] Video gallery works
- [ ] All navigation links work
- [ ] Mobile responsive design

### Admin Panel Features:
- [ ] Admin login works
- [ ] Dashboard loads
- [ ] View appointments
- [ ] Update appointment status
- [ ] Reschedule appointments
- [ ] Email notifications (if configured)
- [ ] Manage doctors (add/edit/delete)
- [ ] Manage blog posts
- [ ] Manage videos
- [ ] View health package bookings
- [ ] Logout works

---

## 🐛 Troubleshooting

### Common Issues:

**1. "Module not found" errors:**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

**2. Environment variables not working:**
- Ensure they start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new env vars in Vercel

**3. Supabase connection errors:**
- Verify URL and anon key are correct
- Check Supabase project is not paused
- Verify RLS policies allow the operation

**4. Admin login not working:**
- Check environment variables in Vercel
- Clear browser cache
- Verify credentials match exactly

**5. Build fails:**
```bash
# Test build locally first
npm run build

# Check for TypeScript errors
# Check for missing dependencies
```

---

## 📈 Performance Optimization

### Already Implemented:
- ✅ Next.js automatic code splitting
- ✅ Image optimization (if using next/image)
- ✅ CSS minification
- ✅ Lazy loading components

### Recommended:
- [ ] Enable Vercel Analytics
- [ ] Add loading states for all async operations
- [ ] Implement error boundaries
- [ ] Add service worker for offline support (optional)

---

## 🔄 Continuous Deployment

Once set up, Vercel will automatically:
1. Deploy on every push to `main` branch
2. Create preview deployments for pull requests
3. Run build checks
4. Update production site

To deploy updates:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically deploy within 1-2 minutes.

---

## 📞 Support & Maintenance

### Regular Maintenance:
- Monitor Supabase database size
- Check error logs in Vercel
- Update dependencies monthly
- Backup database regularly
- Review and rotate admin credentials

### Scaling Considerations:
- Supabase free tier: 500MB database, 2GB bandwidth
- Vercel free tier: 100GB bandwidth
- Upgrade plans as needed

---

## ✅ Final Checklist

Before announcing to users:

- [ ] All features tested in production
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Admin credentials changed from defaults
- [ ] Database backed up
- [ ] Error monitoring set up
- [ ] Analytics configured
- [ ] Mobile testing complete
- [ ] Cross-browser testing done
- [ ] Performance tested
- [ ] SEO meta tags verified
- [ ] Contact information updated
- [ ] Privacy policy added (if collecting user data)
- [ ] Terms of service added (if applicable)

---

## 🎉 You're Ready!

Your Aarunya Health Care application is now production-ready with:
- ✅ Complete appointment booking system
- ✅ Admin panel with full management capabilities
- ✅ Health package bookings
- ✅ Blog management
- ✅ Video gallery
- ✅ Doctor management
- ✅ Secure authentication
- ✅ Responsive design
- ✅ Professional UI/UX

**Production URL:** Your Vercel deployment URL
**Admin Panel:** `your-domain.com/admin-login`
**Default Credentials:** (Change these immediately!)

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)

---

**Last Updated:** December 2024
**Version:** 1.0.0
**Status:** Production Ready ✅
