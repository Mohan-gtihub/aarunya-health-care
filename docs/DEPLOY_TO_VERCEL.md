# 🚀 Quick Deployment Guide - Vercel Only

## ✅ Migration Complete!

Your Aarunya Health Care application is now a **unified Next.js app** ready for **Vercel deployment only** - no separate backend needed!

## 📦 What You Have Now

- ✅ **Frontend + Backend in ONE app**
- ✅ **Next.js 14** with App Router
- ✅ **Resend API** for emails (no SMTP hassle)
- ✅ **Serverless API routes** (no Express server)
- ✅ **All your existing UI** preserved

## 🎯 Deploy to Vercel (3 Steps)

### Step 1: Get Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up (free)
3. Get your API key from dashboard
4. Copy it (starts with `re_...`)

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Migrated to Next.js with Resend API"
git push
```

### Step 3: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repo
4. Add Environment Variables:
   ```
   RESEND_API_KEY=re_your_key_here
   ADMIN_EMAIL=kilarimohansai@gmail.com
   FROM_EMAIL=onboarding@resend.dev
   ```
5. Click **Deploy**

## 🎉 Done!

Your app will be live at: `https://your-project.vercel.app`

## 📧 Email Notes

- **Free tier**: 100 emails/day
- **Default sender**: `onboarding@resend.dev`
- **To use your domain**: Verify it in Resend dashboard

## 🧪 Test Locally First

```bash
# 1. Create .env.local file with:
RESEND_API_KEY=re_your_key
ADMIN_EMAIL=kilarimohansai@gmail.com
FROM_EMAIL=onboarding@resend.dev

# 2. Run dev server
npm run dev

# 3. Open http://localhost:3000
```

## ❌ What You DON'T Need Anymore

- ❌ Render.com backend
- ❌ Separate server deployment
- ❌ SMTP configuration
- ❌ Managing two deployments

## 🆘 Troubleshooting

**Emails not working?**
- Check RESEND_API_KEY is set in Vercel
- Use `onboarding@resend.dev` as FROM_EMAIL
- Check Resend dashboard for delivery logs

**Build failing?**
- Run `npm install` locally
- Check all environment variables are set
- Review Vercel build logs

## 📞 Support

- Vercel Docs: [nextjs.org/docs](https://nextjs.org/docs)
- Resend Docs: [resend.com/docs](https://resend.com/docs)

---

**That's it! One deployment, one platform, zero backend hassle! 🎊**
