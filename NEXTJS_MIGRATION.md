# Aarunya Health Care - Next.js Migration

## 🎉 Migration Complete!

Your application has been successfully migrated from **Vite + React** to **Next.js** with **Resend API** for email functionality. Everything can now be hosted on Vercel without needing a separate backend server!

## 📋 What Changed?

### ✅ Frontend
- **Migrated from Vite to Next.js 14** (App Router)
- All your existing components in `src/` remain unchanged
- Updated navigation from `react-router-dom` to Next.js `Link` and `useRouter`
- All pages now in `app/` directory with proper routing

### ✅ Backend
- **Replaced Express server** with Next.js API Routes (serverless functions)
- **Replaced Nodemailer** with Resend API for email
- All endpoints now under `app/api/`:
  - `/api/departments` - Get all departments
  - `/api/departments/[departmentId]/doctors` - Get doctors by department
  - `/api/appointments` - Create and get appointments
  - `/api/time-slots/[date]` - Get available time slots

### ✅ Deployment
- **Single deployment on Vercel** - no separate backend needed!
- Serverless functions handle all API requests
- Environment variables managed through Vercel dashboard

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Resend API

1. Go to [Resend.com](https://resend.com) and create a free account
2. Get your API key from the [API Keys page](https://resend.com/api-keys)
3. Create a `.env.local` file in the root directory:

```env
RESEND_API_KEY=re_your_api_key_here
ADMIN_EMAIL=kilarimohansai@gmail.com
FROM_EMAIL=onboarding@resend.dev
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Note:** With Resend's free tier, you can only send emails FROM `onboarding@resend.dev` unless you verify your own domain.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📧 Email Configuration

### Resend Setup

Resend is a modern email API that's perfect for Next.js applications:

- **Free Tier**: 100 emails/day, 3,000 emails/month
- **No SMTP configuration needed**
- **Works perfectly with Vercel**

### Sending from Your Own Domain (Optional)

To send emails from your own domain (e.g., `noreply@aarunyahealthcare.com`):

1. Add and verify your domain in Resend dashboard
2. Update `FROM_EMAIL` in your environment variables
3. Configure DNS records as instructed by Resend

## 🌐 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`
   - `FROM_EMAIL`
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables on Vercel

Add these in your Vercel project settings:

```
RESEND_API_KEY=re_your_actual_api_key
ADMIN_EMAIL=kilarimohansai@gmail.com
FROM_EMAIL=onboarding@resend.dev
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## 📁 Project Structure

```
aarunya-health-care/
├── app/                          # Next.js App Router
│   ├── layout.jsx               # Root layout with Header/Footer
│   ├── page.jsx                 # Home page
│   ├── about/page.jsx           # About page
│   ├── doctors/page.jsx         # Doctors page
│   ├── contact/page.jsx         # Contact page
│   ├── appointment/page.jsx     # Appointment page
│   └── api/                     # API Routes (serverless functions)
│       ├── departments/route.js
│       ├── appointments/route.js
│       └── time-slots/[date]/route.js
├── src/                         # Your existing components
│   ├── components/              # All your React components
│   ├── pages/                   # Page components (wrapped by app/)
│   ├── config/                  # Configuration files
│   └── index.css                # Global styles
├── public/                      # Static assets
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies
└── .env.local                   # Environment variables (create this)
```

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎯 Key Benefits

1. **Single Deployment**: No need to manage separate frontend and backend deployments
2. **Serverless**: API routes scale automatically with traffic
3. **Free Hosting**: Vercel's free tier is perfect for this application
4. **Better Performance**: Next.js optimizations and edge functions
5. **Simpler Email**: Resend API is easier than SMTP configuration
6. **Environment Variables**: Managed securely through Vercel

## 📝 Migration Notes

### What's Preserved
- ✅ All your UI components
- ✅ All styling (CSS files)
- ✅ All functionality
- ✅ Appointment booking system
- ✅ Email notifications

### What's Changed
- ❌ No more separate Express server (`server.js`)
- ❌ No more Nodemailer (replaced with Resend)
- ❌ No more react-router-dom (replaced with Next.js routing)
- ❌ No more Vite (replaced with Next.js)

## 🐛 Troubleshooting

### Emails not sending?
- Check your `RESEND_API_KEY` is correct
- Verify you're using `onboarding@resend.dev` as FROM_EMAIL (or a verified domain)
- Check Vercel logs for error messages

### API routes not working?
- Make sure you're using `/api/` prefix for all API calls
- Check that environment variables are set in Vercel
- Look at Vercel function logs

### Build errors?
- Run `npm install` to ensure all dependencies are installed
- Check that all imports are correct
- Verify no react-router-dom imports remain

## 📞 Support

For issues or questions:
- Check Vercel deployment logs
- Review Resend dashboard for email delivery status
- Ensure all environment variables are properly set

## 🎊 You're All Set!

Your application is now ready to be deployed as a single, unified Next.js application on Vercel. No backend server management needed!
