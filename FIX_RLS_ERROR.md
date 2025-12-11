# 🔧 Fix RLS Policy Error

## Problem
You're getting this error:
```
"new row violates row-level security policy for table \"blog_posts\""
```

This happens because Supabase's Row Level Security (RLS) is blocking anonymous users from creating blog posts.

## ✅ Quick Fix (2 minutes)

### Step 1: Go to Supabase SQL Editor
1. Open https://app.supabase.com
2. Select your project: `ribvkcrrgbidmhkiztjd`
3. Click **SQL Editor** in the left sidebar
4. Click **"New Query"**

### Step 2: Run the Fix Script
1. Copy ALL the content from `supabase-fix-rls.sql`
2. Paste it into the SQL editor
3. Click **"Run"** (or press Ctrl+Enter)

You should see: ✅ Success

### Step 3: Test Again
1. Go to http://localhost:3000/admin
2. Click "➕ Create Blog" tab
3. Try creating a blog post again
4. It should work now! ✅

---

## 🔒 What Changed?

**Before:** Only authenticated users could create/edit/delete posts
**After:** Anyone can create/edit/delete posts (for development)

⚠️ **Important**: This is fine for development, but for production you should add authentication!

---

## 🚀 Alternative: Disable RLS Completely (Not Recommended)

If the fix script doesn't work, you can disable RLS entirely:

```sql
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
```

But this is **NOT recommended** for production!

---

## 📝 For Production: Add Authentication

When you're ready to deploy, you should:

1. Enable Supabase Auth
2. Add login/signup pages
3. Use the authenticated policies (see `supabase-setup.sql` comments)

---

**After running the fix script, your blog and admin should work perfectly!** 🎉
