# 📋 Pre-Deployment Checklist for PepperTracker

## Before Deploying to Render

### ✅ Code Preparation
- [ ] All code committed to Git
- [ ] Repository pushed to GitHub
- [ ] `.env.local` is NOT committed (should be in .gitignore)
- [ ] Test app locally with `npm run build && npm start`

### ✅ Database Setup
- [ ] Supabase project created
- [ ] `users` table created with `id` and `email` columns
- [ ] `meds` table created with `id`, `date`, `had_morning_meds`, `had_evening_meds` columns
- [ ] Authorized user emails added to `users` table
- [ ] Supabase URL and API key ready

### ✅ Google OAuth Setup
- [ ] Google Cloud Console project created
- [ ] Google+ API enabled
- [ ] OAuth 2.0 credentials created
- [ ] Client ID and Client Secret ready
- [ ] Production redirect URI will be added after getting Render URL

### ✅ Environment Variables Ready
- [ ] `NEXTAUTH_SECRET` generated (use: `openssl rand -base64 32`)
- [ ] `GOOGLE_CLIENT_ID` from Google Console
- [ ] `GOOGLE_CLIENT_SECRET` from Google Console
- [ ] `NEXT_PUBLIC_SUPABASE_URL` from Supabase dashboard
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Supabase dashboard
- [ ] `NEXTAUTH_URL` will be set to Render domain

### ✅ Render Account
- [ ] Render account created
- [ ] GitHub account connected to Render

## After Deployment

### ✅ Configuration Updates
- [ ] Update Google OAuth redirect URI with Render domain
- [ ] Test Google sign-in on production
- [ ] Verify authorized users can access the app
- [ ] Test medication tracking functionality
- [ ] Check that unauthorized users are blocked

### ✅ Testing
- [ ] Sign in with authorized Google account
- [ ] Give morning medication and verify it saves
- [ ] Give evening medication and verify it saves
- [ ] Check progress bar updates correctly
- [ ] Test on mobile device
- [ ] Try signing in with unauthorized account (should fail)

## Quick Deploy Commands

```bash
# Commit and push to trigger deployment
git add .
git commit -m "Deploy PepperTracker to production"
git push origin main
```

## Environment Variables Template

Copy this template for Render environment variables:

```
NEXTAUTH_URL=https://your-app-name.onrender.com
NEXTAUTH_SECRET=your_generated_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🚨 Security Reminders

- Never commit secrets to Git
- Use strong, unique NEXTAUTH_SECRET
- Only add trusted email addresses to users table
- Keep Supabase and Google credentials secure
- Enable 2FA on all service accounts

## 🎉 You're Ready!

Once all checkboxes are complete, follow the deployment guide in `DEPLOYMENT.md`!
