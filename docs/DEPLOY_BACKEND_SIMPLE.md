# 🚀 DEPLOY BACKEND SERVER NOW

## Quick Steps to Deploy server.js to Render.com

### Step 1: Push to GitHub (if not done yet)

**First, check if you have a remote:**
```bash
git remote -v
```

**If you don't see a GitHub URL, create a GitHub repo:**
1. Go to: https://github.com/new
2. Name: `aarunya-health-care`
3. Click "Create repository"

**Then add the remote (replace YOUR_USERNAME):**
```bash
git remote add origin https://github.com/YOUR_USERNAME/aarunya-health-care.git
git branch -M main
git push -u origin main
```

**If you already have a remote, just push:**
```bash
git push
```

---

### Step 2: Deploy to Render.com

#### A. Sign Up / Login
1. Go to: **https://render.com**
2. Click **"Get Started"** or **"Sign In"**
3. Choose **"Sign in with GitHub"**
4. Authorize Render to access your repositories

#### B. Create Web Service
1. Click **"New +"** (top right)
2. Select **"Web Service"**
3. Click **"Connect account"** if needed
4. Find **`aarunya-health-care`** in the list
5. Click **"Connect"**

#### C. Configure Service
Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `aarunya-health-care-api` |
| **Environment** | `Node` |
| **Region** | `Singapore` (or closest to you) |
| **Branch** | `main` |
| **Root Directory** | Leave blank |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | `Free` |

#### D. Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add these 3 variables:

1. **EMAIL_USER**
   - Value: `mohankilarisai@gmail.com`

2. **EMAIL_PASS**
   - Value: Your Gmail App Password (16 characters)
   - Get it from: https://myaccount.google.com/apppasswords

3. **NODE_ENV**
   - Value: `production`

#### E. Deploy!
1. Click **"Create Web Service"**
2. Wait 2-5 minutes for deployment
3. You'll see: **"Your service is live at https://aarunya-health-care-api.onrender.com"**

---

### Step 3: Update Frontend with Backend URL

After deployment, copy your Render URL (something like):
```
https://aarunya-health-care-api.onrender.com
```

Then tell me the URL and I'll update your frontend code to use it!

---

## 📧 Gmail App Password Setup

If you don't have a Gmail App Password:

1. Go to: https://myaccount.google.com/security
2. Enable **"2-Step Verification"** (if not enabled)
3. Go to: https://myaccount.google.com/apppasswords
4. Select **"Mail"** and **"Other (Custom name)"**
5. Name it: `Aarunya Healthcare`
6. Click **"Generate"**
7. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)
8. Use this in Render's `EMAIL_PASS` variable

---

## ✅ Checklist

- [ ] Code pushed to GitHub
- [ ] Render.com account created
- [ ] Web Service created and configured
- [ ] Environment variables added
- [ ] Service deployed successfully
- [ ] Backend URL copied
- [ ] Frontend updated with backend URL

**Start with Step 1!** 🚀
