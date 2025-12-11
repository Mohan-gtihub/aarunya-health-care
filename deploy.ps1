# Quick Deployment Script for Aarunya Health Care
# Run this script to deploy to production

Write-Host "🚀 Aarunya Health Care - Production Deployment" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Current Git Status:" -ForegroundColor Yellow
git status --short

Write-Host ""
$continue = Read-Host "Do you want to commit and push all changes? (y/n)"

if ($continue -eq "y" -or $continue -eq "Y") {
    Write-Host ""
    Write-Host "📝 Adding all files..." -ForegroundColor Yellow
    git add .
    
    Write-Host ""
    $commitMessage = Read-Host "Enter commit message (or press Enter for default)"
    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        $commitMessage = "Production deployment - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    }
    
    Write-Host ""
    Write-Host "💾 Committing changes..." -ForegroundColor Yellow
    git commit -m "$commitMessage"
    
    Write-Host ""
    Write-Host "🔗 Checking remote repository..." -ForegroundColor Yellow
    $remotes = git remote
    
    if ($remotes -notcontains "origin") {
        Write-Host ""
        Write-Host "⚠️  No remote repository found" -ForegroundColor Red
        $repoUrl = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/username/repo.git)"
        
        if (-not [string]::IsNullOrWhiteSpace($repoUrl)) {
            git remote add origin $repoUrl
            Write-Host "✅ Remote repository added" -ForegroundColor Green
        } else {
            Write-Host "❌ No repository URL provided. Skipping push." -ForegroundColor Red
            exit
        }
    } else {
        Write-Host "✅ Remote repository found" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
    
    # Try to push
    try {
        git push -u origin main 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
        } else {
            # Try master branch if main fails
            git push -u origin master 2>&1 | Out-Null
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Successfully pushed to GitHub (master branch)!" -ForegroundColor Green
            } else {
                Write-Host "⚠️  Push failed. You may need to pull first or check your credentials." -ForegroundColor Yellow
                Write-Host "Run: git pull origin main --rebase" -ForegroundColor Cyan
            }
        }
    } catch {
        Write-Host "❌ Error pushing to GitHub: $_" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "=============================================" -ForegroundColor Cyan
    Write-Host "📊 Next Steps:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Go to https://vercel.com" -ForegroundColor White
    Write-Host "2. Click 'Add New Project'" -ForegroundColor White
    Write-Host "3. Import your GitHub repository" -ForegroundColor White
    Write-Host "4. Add environment variables:" -ForegroundColor White
    Write-Host "   - NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor Cyan
    Write-Host "   - NEXT_PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor Cyan
    Write-Host "   - NEXT_PUBLIC_ADMIN_USERNAME" -ForegroundColor Cyan
    Write-Host "   - NEXT_PUBLIC_ADMIN_PASSWORD" -ForegroundColor Cyan
    Write-Host "5. Click 'Deploy'" -ForegroundColor White
    Write-Host ""
    Write-Host "📚 See PRODUCTION_DEPLOYMENT.md for detailed instructions" -ForegroundColor Yellow
    Write-Host "=============================================" -ForegroundColor Cyan
    
} else {
    Write-Host ""
    Write-Host "❌ Deployment cancelled" -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
