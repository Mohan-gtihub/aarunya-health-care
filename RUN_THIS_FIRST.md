# 🚨 IMPORTANT: Run This First!

## Why Bookings Don't Show

The appointments table doesn't exist in Supabase yet! You need to create it first.

---

## ⚡ Quick Fix (2 Minutes)

### Step 1: Open Supabase
1. Go to: https://app.supabase.com
2. Click on your project: **ribvkcrrgbidmhkiztjd**

### Step 2: Run the SQL Script
1. Click **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Open the file: `supabase-complete-setup.sql`
4. **Copy ALL the content** (Ctrl+A, Ctrl+C)
5. **Paste** into the SQL editor
6. Click **"Run"** (or press Ctrl+Enter)

### Step 3: Verify
You should see: ✅ **Success. No rows returned**

### Step 4: Test Booking
1. Go to: http://localhost:3000/appointment
2. Fill out the form completely:
   - Select Department
   - Select Doctor
   - Choose Date
   - Pick Time Slot
   - Enter Name, Email, Phone
3. Click **"Book Appointment"**
4. Wait for success message

### Step 5: Check Admin
1. Go to: http://localhost:3000/admin
2. Click **"📅 Bookings"** tab
3. You should see your booking! ✅

---

## 🔍 Troubleshooting

### "No bookings yet" in admin
→ Make sure you ran the SQL script (Step 2)
→ Try booking a NEW appointment after running the script

### SQL script fails
→ Copy the ENTIRE content of `supabase-complete-setup.sql`
→ Make sure you're in the correct project

### Booking form doesn't submit
→ Check browser console (F12) for errors
→ Make sure all fields are filled

---

## ✅ What the SQL Script Does

1. Creates `blog_posts` table
2. Creates `appointments` table ← **This is what you need!**
3. Creates `blog-media` storage bucket
4. Sets up security policies
5. Creates indexes for speed

---

**After running the SQL script, all bookings will be saved and visible in the admin panel!** 🎉
