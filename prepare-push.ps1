# Git Push Preparation Script
# This script helps prepare your changes for pushing

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Git Push Preparation" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check current status
Write-Host "Current Git Status:" -ForegroundColor Yellow
git status --short
Write-Host ""

# Count files
$modified = (git status --short | Select-String "^ M" | Measure-Object).Count
$added = (git status --short | Select-String "^A " | Measure-Object).Count
$untracked = (git status --short | Select-String "^??" | Measure-Object).Count

Write-Host "Files to commit:" -ForegroundColor Yellow
Write-Host "  Modified: $modified" -ForegroundColor White
Write-Host "  Added: $added" -ForegroundColor White
Write-Host "  Untracked: $untracked" -ForegroundColor White
Write-Host ""

# Show .gitignore status
if (Test-Path ".gitignore") {
    Write-Host ".gitignore exists" -ForegroundColor Green
} else {
    Write-Host ".gitignore missing!" -ForegroundColor Red
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Review changes:" -ForegroundColor Yellow
Write-Host "   git status" -ForegroundColor White
Write-Host ""
Write-Host "2. Stage all changes:" -ForegroundColor Yellow
Write-Host "   git add ." -ForegroundColor White
Write-Host ""
Write-Host "3. Commit changes:" -ForegroundColor Yellow
Write-Host "   git commit -m 'feat: Complete Next.js migration'" -ForegroundColor White
Write-Host ""
Write-Host "4. Push to remote:" -ForegroundColor Yellow
Write-Host "   git push -u origin migrate-to-nextjs" -ForegroundColor White
Write-Host ""

$proceed = Read-Host "Would you like to stage all changes now? (Y/N)"
if ($proceed -eq 'Y' -or $proceed -eq 'y') {
    Write-Host ""
    Write-Host "Staging all changes..." -ForegroundColor Yellow
    git add .
    
    Write-Host ""
    Write-Host "Staged files:" -ForegroundColor Green
    git status --short
    
    Write-Host ""
    Write-Host "Ready to commit! Run:" -ForegroundColor Green
    Write-Host "   git commit -m 'feat: Complete Next.js migration'" -ForegroundColor White
}

