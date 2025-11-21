# Backend Deployment Guide - Render.com

## Step 1: Prepare Your Code

### Update server.js for production
Your server.js needs to accept connections from your deployed frontend.

Update the CORS configuration in server.js:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://aarunya-health-care-oew3j56z3-mohan-gtihubs-projects.vercel.app',
    'https://aarunya-health-care.vercel.app'
  ],
  credentials: true
}));
```

## Step 2: Push to GitHub

1. **Add all files:**
   ```bash
   git add .
   ```

2. **Commit:**
   ```bash
   git commit -m "Prepare for deployment"
   ```

3. **Create GitHub repository:**
   - Go to https://github.com/new
   - Create a new repository named "aarunya-health-care"
   - Don't initialize with README

4. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/aarunya-health-care.git
   git branch -M main
   git push -u origin main
   ```

## Step 3: Deploy to Render.com

1. **Sign up at Render.com:**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select "aarunya-health-care"

3. **Configure Service:**
   - **Name:** aarunya-health-care-api
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free

4. **Add Environment Variables:**
   Click "Environment" tab and add:
   - `EMAIL_USER` = your Gmail address
   - `EMAIL_PASS` = your Gmail app password
   - `PORT` = 5000
   - `NODE_ENV` = production

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (takes 2-5 minutes)

## Step 4: Update Frontend API URLs

After backend is deployed, you'll get a URL like:
`https://aarunya-health-care-api.onrender.com`

Update all API calls in your frontend:
- AppointmentBooking.jsx
- Any other components making API calls

Replace `http://localhost:5000` with your Render URL.

Then redeploy frontend:
```bash
vercel --prod
```

## Troubleshooting

### If deployment fails:
1. Check Render logs
2. Ensure package.json has all dependencies
3. Verify environment variables are set

### If emails don't work:
1. Use Gmail App Password (not regular password)
2. Enable 2FA on Gmail
3. Generate App Password: https://myaccount.google.com/apppasswords

---

**Your backend will be live at:** `https://your-app-name.onrender.com` 🚀
