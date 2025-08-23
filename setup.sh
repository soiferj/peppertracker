#!/bin/bash

echo "🐕 PepperTracker Setup Script"
echo "============================="

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from example..."
    cp .env.example .env.local
    echo "✅ .env.local created! Please fill in your actual values."
    echo ""
    echo "📋 You need to set up:"
    echo "   - Supabase URL and API key"
    echo "   - Google OAuth credentials"
    echo "   - NextAuth secret"
    echo ""
else
    echo "✅ .env.local already exists"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed!"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🚀 Ready to start development!"
echo "Run: npm run dev"
echo ""
echo "📚 Don't forget to:"
echo "   1. Set up your Supabase tables (see README.md)"
echo "   2. Configure Google OAuth"
echo "   3. Add authorized users to your database"
