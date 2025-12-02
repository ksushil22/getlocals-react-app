# Quick Local Testing Helper Script
# Run this script to test your local setup

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "GetLocals - Local Testing Helper" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if dev server is running
$port = 3000
$connection = Test-NetConnection -ComputerName localhost -Port $port -InformationLevel Quiet -WarningAction SilentlyContinue

if ($connection) {
    Write-Host "✓ Dev server is running on port $port" -ForegroundColor Green
} else {
    Write-Host "✗ Dev server is NOT running on port $port" -ForegroundColor Red
    Write-Host "  Please start it with: npm run dev" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host ""
Write-Host "Test URLs:" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Home Page:" -ForegroundColor Yellow
Write-Host "  http://localhost:$port" -ForegroundColor White
Write-Host ""
Write-Host "Login/Registration:" -ForegroundColor Yellow
Write-Host "  http://localhost:$port/authenticate" -ForegroundColor White
Write-Host "  http://localhost:$port/authenticate/registration" -ForegroundColor White
Write-Host ""
Write-Host "Business Routes (replace 'restaurant-name' with actual business username):" -ForegroundColor Yellow
Write-Host "  http://restaurant-name.localhost:$port" -ForegroundColor White
Write-Host "  http://myrestaurant.localhost:$port" -ForegroundColor White
Write-Host ""
Write-Host "Template Routes (replace 'template-id' with actual UUID):" -ForegroundColor Yellow
Write-Host "  http://template-id.localhost:$port/home" -ForegroundColor White
Write-Host "  http://template-id.localhost:$port/menu" -ForegroundColor White
Write-Host ""
Write-Host "Business Admin (requires login):" -ForegroundColor Yellow
Write-Host "  http://localhost:$port/business-admin/home" -ForegroundColor White
Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tip: .localhost domains work automatically on Windows 10/11!" -ForegroundColor Green
Write-Host "   No hosts file editing needed." -ForegroundColor Green
Write-Host ""

# Open default browser to home page
$response = Read-Host "Open http://localhost:$port in browser? (Y/N)"
if ($response -eq 'Y' -or $response -eq 'y') {
    Start-Process "http://localhost:$port"
}

