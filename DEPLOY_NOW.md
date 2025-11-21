# 🚀 FINAL DEPLOYMENT STEPS

## ✅ What's Done:
- ✅ Code committed to Git
- ✅ Server.js updated for production
- ✅ Frontend deployed to Vercel

## 📝 NEXT: Push to GitHub and Deploy Backend

### Step 1: Create GitHub Repository
1. Open browser and go to: **https://github.com/new**
2. Repository name: `aarunya-health-care`
3. Description: `Aarunya Health Care - Multispeciality Clinic Website`
4. Keep it **Public**
5. **DON'T** check "Initialize with README"
6. Click **"Create repository"**

### Step 2: Push to GitHub
Copy your GitHub username from the page, then run these commands:

**Replace `YOUR_USERNAME` with your actual GitHub username:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/aarunya-health-care.git
git branch -M main  
git push -u origin main
```

### Step 3: Deploy Backend to Render.com

1. **Go to:** https://render.com
2. **Sign up** with GitHub (or login if you have account)
3. Click **"New +"** → **"Web Service"**
4. Click **"Connect account"** to link GitHub
5. Find and select **`aarunya-health-care`** repository
6. Click **"Connect"**

7. **Configure the service:**
   - **Name:** `aarunya-health-care-api`
   - **Environment:** `Node`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** `Free`

8. **Click "Advanced"** and add Environment Variables:
   - Click **"Add Environment Variable"**
   - Add these 3 variables:
     
     | Key | Value |
     |-----|-------|
     | `EMAIL_USER` | `mohankilarisai@gmail.com` |
     | `EMAIL_PASS` | `your-gmail-app-password` |
     | `NODE_ENV` | `production` |

9. Click **"Create Web Service"**

10. **Wait 2-5 minutes** for deployment

### Step 4: Get Your Backend URL

After deployment completes, you'll see:
```
Your service is live at https://aarunya-health-care-api.onrender.com
```

**Copy this URL!** You'll need it for the next step.

### Step 5: Update Frontend with Backend URL

Tell me your Render URL and I'll update the frontend code to use it, then we'll redeploy.

---

## 📧 Gmail App Password (If you don't have it)

1. Go to: https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)
3. Go to: https://myaccount.google.com/apppasswords
4. Create app password for "Mail"
5. Copy the 16-character password
6. Use this in Render's `EMAIL_PASS` variable

---

## 🎯 Current Status:
- ✅ Frontend: https://aarunya-health-care-oew3j56z3-mohan-gtihubs-projects.vercel.app
- ⏳ Backend: Waiting for you to deploy to Render

**Start with Step 1 above!** Let me know when you've pushed to GitHub. 🚀
