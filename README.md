# PepperTracker - Dog Medication Tracker 🐕

A simple, clean, and fun web application to track your dog's morning and evening medications.

## Features

- **Google Authentication**: Secure login with Google OAuth
- **Daily Medication Tracking**: Track morning and evening medications
- **Clean UI**: Simple, fun, and responsive design with dog-themed elements
- **Authorized Access**: Only authorized users can access the app
- **Real-time Updates**: Instant feedback when medications are given
- **Progress Tracking**: Visual progress bar showing daily completion

## Tech Stack

- **Frontend**: Next.js 14 with React and TypeScript
- **Styling**: Tailwind CSS with custom dog-themed design
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: Supabase
- **Icons**: Heroicons

## Setup Instructions

### 1. Environment Variables

Copy the `.env.example` file to `.env.local` and fill in your actual values:

```bash
cp .env.example .env.local
```

Fill in the following variables in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### 2. Supabase Setup

Your Supabase database should have two tables:

#### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL
);
```

#### Meds Table
```sql
CREATE TABLE meds (
  id SERIAL PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  had_morning_meds BOOLEAN DEFAULT FALSE,
  had_evening_meds BOOLEAN DEFAULT FALSE
);
```

Add authorized user emails to the `users` table:
```sql
INSERT INTO users (email) VALUES ('your-email@gmail.com');
```

### 3. Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create a new OAuth 2.0 Client ID
5. Add your authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
6. Copy the Client ID and Client Secret to your `.env.local` file

### 4. NextAuth Secret

Generate a secret for NextAuth.js:
```bash
openssl rand -base64 32
```

Add this to your `.env.local` file as `NEXTAUTH_SECRET`.

### 5. Install Dependencies

```bash
npm install
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. **Sign In**: Click "Sign in with Google" and authenticate with your Google account
2. **Authorization**: Only users whose email addresses are in the Supabase `users` table can access the app
3. **Track Medications**: 
   - Click "Give Morning Meds" when you give morning medications
   - Click "Give Evening Meds" when you give evening medications
4. **Daily Progress**: See your progress with the visual progress bar
5. **Daily Reset**: The app automatically tracks medications per day

## Database Schema

### Users Table
- `id`: Primary key
- `email`: User's email address (must match Google account)

### Meds Table
- `id`: Primary key
- `date`: Date of medication (YYYY-MM-DD format)
- `had_morning_meds`: Boolean indicating if morning meds were given
- `had_evening_meds`: Boolean indicating if evening meds were given

## Deployment

This app can be deployed to Vercel, Netlify, or any platform that supports Next.js.

For Vercel deployment:
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Set your environment variables in Vercel's dashboard
4. Update `NEXTAUTH_URL` to your production domain

## Contributing

This is a personal project for tracking dog medications. Feel free to fork and customize for your own needs!

## License

MIT License - feel free to use this for your own pet medication tracking needs!
