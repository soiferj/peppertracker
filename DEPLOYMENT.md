# 🚀 Deploying PepperTracker to Render

## Step-by-Step Deployment Guide

### 1. Push Your Code to GitHub

First, make sure your code is committed and pushed to GitHub:

```bash
git add .
git commit -m "Initial PepperTracker app setup"
git push origin main
```

### 2. Create a Render Account

1. Go to [render.com](https://render.com)
2. Sign up or sign in with your GitHub account
3. Connect your GitHub account to Render

### 3. Create a New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your `peppertracker` repository
3. Configure the service:

#### Basic Settings:
- **Name**: `peppertracker` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`

#### Build & Deploy Settings:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Node Version**: `18` (or latest stable)

### 4. Environment Variables

In the Render dashboard, go to **Environment** tab and add:

```env
# NextAuth Configuration
NEXTAUTH_URL=https://your-app-name.onrender.com
NEXTAUTH_SECRET=your_generated_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important**: Replace `your-app-name` with your actual Render app name!

### 5. Google OAuth Setup for Production

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **Credentials** → **OAuth 2.0 Client IDs**
4. Edit your OAuth client
5. Add your Render URL to **Authorized redirect URIs**:
   ```
   https://your-app-name.onrender.com/api/auth/callback/google
   ```

### 6. Deploy!

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Build your app
   - Deploy it

### 7. Verify Deployment

Once deployed, your app will be available at:
```
https://your-app-name.onrender.com
```

## 🔧 Render Configuration File (Optional)

You can also create a `render.yaml` file for infrastructure as code:

```yaml
services:
  - type: web
    name: peppertracker
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NEXTAUTH_URL
        value: https://peppertracker.onrender.com
      - key: NODE_ENV
        value: production
```

## 🚨 Important Notes

### Free Tier Limitations:
- **Cold starts**: Free services sleep after 15 minutes of inactivity
- **Build time**: 90-second build timeout on free tier
- **Bandwidth**: 100GB/month on free tier

### Performance Tips:
1. **Upgrade to paid plan** for better performance and no cold starts
2. **Custom domain**: Add your own domain in Render dashboard
3. **CDN**: Render includes built-in CDN for static assets

## 🐛 Troubleshooting

### Common Issues:

1. **Build fails**: Check build logs in Render dashboard
2. **Environment variables**: Make sure all required vars are set
3. **OAuth redirect**: Ensure Google OAuth URLs match your Render domain
4. **Database connection**: Verify Supabase credentials

### Debugging Steps:
1. Check **Logs** tab in Render dashboard
2. Verify **Environment** variables
3. Test locally with production build:
   ```bash
   npm run build
   npm start
   ```

## 🔄 Automatic Deployments

Render automatically deploys when you push to your main branch! 🎉

Just commit and push changes:
```bash
git add .
git commit -m "Update medication tracker"
git push origin main
```

## 💰 Pricing

- **Free**: $0/month (with limitations)
- **Starter**: $7/month (no cold starts, better performance)
- **Pro**: $25/month (advanced features)

## 🎯 Next Steps After Deployment

1. **Test your live app** thoroughly
2. **Add authorized users** to your Supabase database
3. **Set up monitoring** (Render provides basic metrics)
4. **Consider upgrading** for production use
5. **Add a custom domain** if desired

Your PepperTracker app will be live and ready to help you track your dog's medications! 🐕
