Write-Host "🐕 PepperTracker Setup Script" -ForegroundColor Yellow
Write-Host "=============================" -ForegroundColor Yellow

# Check if .env.local exists
if (!(Test-Path .env.local)) {
    Write-Host "📝 Creating .env.local from example..." -ForegroundColor Blue
    Copy-Item .env.example .env.local
    Write-Host "✅ .env.local created! Please fill in your actual values." -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 You need to set up:" -ForegroundColor Cyan
    Write-Host "   - Supabase URL and API key" -ForegroundColor White
    Write-Host "   - Google OAuth credentials" -ForegroundColor White
    Write-Host "   - NextAuth secret" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "✅ .env.local already exists" -ForegroundColor Green
}

# Install dependencies if node_modules doesn't exist
if (!(Test-Path node_modules)) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
    npm install
    Write-Host "✅ Dependencies installed!" -ForegroundColor Green
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Ready to start development!" -ForegroundColor Green
Write-Host "Run: npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "📚 Don't forget to:" -ForegroundColor Cyan
Write-Host "   1. Set up your Supabase tables (see README.md)" -ForegroundColor White
Write-Host "   2. Configure Google OAuth" -ForegroundColor White
Write-Host "   3. Add authorized users to your database" -ForegroundColor White
