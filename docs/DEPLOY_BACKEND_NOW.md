# Quick Backend Deployment Steps

## ✅ What I've Done:
- Updated server.js CORS to accept requests from your deployed frontend
- Created deployment configuration

## 🚀 Follow These Steps:

### Step 1: Commit Your Changes
```bash
git add .
git commit -m "Update CORS for production deployment"
```

### Step 2: Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `aarunya-health-care`
3. Keep it Public
4. **Don't** check "Initialize with README"
5. Click "Create repository"

### Step 3: Push to GitHub
Replace `YOUR_USERNAME` with your GitHub username:
```bash
git remote add origin https://github.com/YOUR_USERNAME/aarunya-health-care.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Render
1. Go to: https://render.com
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Click "Connect account" if needed
5. Find and select your `aarunya-health-care` repository
6. Configure:
   - **Name:** `aarunya-health-care-api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** `Free`

7. Click "Advanced" and add Environment Variables:
   - `EMAIL_USER` = `mohankilarisai@gmail.com`
   - `EMAIL_PASS` = `your-gmail-app-password`
   - `NODE_ENV` = `production`

8. Click "Create Web Service"
9. Wait 2-5 minutes for deployment

### Step 5: Get Your Backend URL
After deployment, you'll get a URL like:
```
https://aarunya-health-care-api.onrender.com
```

### Step 6: Update Frontend API Calls
You need to update the API URL in your frontend code.

I can help you do this automatically, or you can manually replace:
- `http://localhost:5000` 
with:
- `https://your-render-url.onrender.com`

in these files:
- `src/components/AppointmentBooking.jsx`

Then redeploy frontend:
```bash
vercel --prod
```

---

## 📧 Gmail App Password Setup
If you haven't already:
1. Go to: https://myaccount.google.com/apppasswords
2. Enable 2-Factor Authentication first
3. Generate an App Password
4. Use this password (not your regular Gmail password)

---

**Need help with any step? Let me know!** 🎯
