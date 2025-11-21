# Deploying Aarunya Health Care to Vercel

## Prerequisites
- A Vercel account (sign up at https://vercel.com)
- Git installed on your computer
- Your project built successfully (✅ Already done!)

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy your project:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Select your scope (personal or team)
   - Confirm the project settings
   - Your site will be deployed!

4. **Deploy to production:**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Initialize Git repository (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub:**
   - Create a new repository on GitHub
   - Follow GitHub's instructions to push your code

3. **Import to Vercel:**
   - Go to https://vercel.com/new
   - Click "Import Project"
   - Select your GitHub repository
   - Configure build settings:
     - **Framework Preset:** Vite
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Click "Deploy"

## Important Notes

### Backend Server
⚠️ **Note:** Your backend server (server.js) needs to be deployed separately!

Options for backend:
1. **Deploy to Vercel Serverless Functions** (requires refactoring)
2. **Deploy to Render/Railway/Heroku** (easier for Express apps)
3. **Keep running locally** (for development only)

### Environment Variables
If you have environment variables, add them in Vercel:
- Go to Project Settings → Environment Variables
- Add your variables (e.g., EMAIL_USER, EMAIL_PASS)

### Custom Domain
After deployment, you can add a custom domain:
- Go to Project Settings → Domains
- Add your domain and follow DNS configuration

## Post-Deployment

Your site will be available at:
- **Preview URL:** `https://your-project-name.vercel.app`
- **Production URL:** After running `vercel --prod`

## Troubleshooting

If you encounter issues:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in package.json
3. Verify build command works locally: `npm run build`
4. Check vercel.json configuration

---

**Your project is ready to deploy! 🚀**
