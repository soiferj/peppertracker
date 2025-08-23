# 🚀 Deploy PepperTracker to Vercel

## Quick Deployment Guide

### **Step 1: Deploy to Vercel**

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Sign in** with your GitHub account
3. **Click "New Project"**
4. **Import your repository**: Select `peppertracker` from your GitHub repos
5. **Configure project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

### **Step 2: Add Environment Variables**

In the Vercel deployment settings, add these environment variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your_generated_secret_from_env_local

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important**: Replace `your-app-name` with your actual Vercel app name!

### **Step 3: Deploy!**

Click **"Deploy"** - Vercel will:
- ✅ Clone your repository
- ✅ Install dependencies 
- ✅ Build your Next.js app
- ✅ Deploy globally on their CDN

### **Step 4: Update Google OAuth**

After deployment, you'll get a URL like `https://peppertracker.vercel.app`

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **Credentials** → **OAuth 2.0 Client IDs**
3. Edit your OAuth client
4. Add your Vercel URL to **Authorized redirect URIs**:
   ```
   https://your-app-name.vercel.app/api/auth/callback/google
   ```

## 🎯 Vercel Advantages for Next.js

### **Why Vercel is Perfect:**
- ✅ **Made by Next.js creators** - perfect integration
- ✅ **Zero configuration** - works out of the box
- ✅ **Automatic deployments** from GitHub
- ✅ **Free tier** with generous limits
- ✅ **Global CDN** - fast worldwide
- ✅ **Serverless functions** - your API routes work perfectly
- ✅ **Custom domains** - easy to add your own domain

### **Free Tier Includes:**
- ✅ **100GB bandwidth** per month
- ✅ **Unlimited static files**
- ✅ **100 serverless function executions** per day
- ✅ **Custom domains**
- ✅ **SSL certificates**

## 🔧 Automatic Deployments

Once set up, every time you push to GitHub:
```bash
git add .
git commit -m "Update medication tracker"
git push origin main
```

Vercel automatically deploys the new version! 🎉

## 🚨 Common Issues & Solutions

### **Issue: Environment Variables**
- Make sure all env vars are set in Vercel dashboard
- Don't forget to update `NEXTAUTH_URL` to your Vercel domain

### **Issue: Google OAuth**
- Add your Vercel domain to Google OAuth redirect URIs
- Format: `https://yourapp.vercel.app/api/auth/callback/google`

### **Issue: Supabase Connection**
- Verify your Supabase URL and API key
- Check that your database tables exist

## 📊 Deployment Checklist

### Before Deploying:
- [x] Code pushed to GitHub
- [x] `.env.local` configured locally (don't commit this!)
- [x] Supabase database tables created
- [x] Google OAuth client created

### During Deployment:
- [ ] Import repository on Vercel
- [ ] Set environment variables
- [ ] Deploy project
- [ ] Note your Vercel app URL

### After Deployment:
- [ ] Update Google OAuth redirect URIs
- [ ] Test Google sign-in on production
- [ ] Verify medication tracking works
- [ ] Add authorized users to Supabase
- [ ] Test that unauthorized users are blocked

## 🎉 Your App Will Be Live At:

```
https://your-app-name.vercel.app
```

## 💡 Pro Tips

1. **Custom Domain**: You can add your own domain in Vercel settings
2. **Analytics**: Vercel provides built-in analytics
3. **Preview Deployments**: Every PR gets its own preview URL
4. **Edge Functions**: Your API routes run on Vercel's edge network

## 🔄 Future Updates

To update your live app:
1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to GitHub
4. Vercel automatically deploys!

Your PepperTracker will be live globally in minutes! 🐕🌍
