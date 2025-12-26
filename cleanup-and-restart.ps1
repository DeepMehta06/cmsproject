# Cleanup and Restart Script for CMS Project

Write-Host "Step 1: Stopping all Node.js processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*nodejs*" } | Stop-Process -Force
Start-Sleep -Seconds 2

Write-Host "Step 2: Cleaning .next build folder..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Path ".next" -Recurse -Force
    Write-Host ".next folder removed successfully" -ForegroundColor Green
}

Write-Host "Step 3: Cleaning Prisma client..." -ForegroundColor Yellow
if (Test-Path "node_modules\.prisma") {
    Remove-Item -Path "node_modules\.prisma" -Recurse -Force
    Write-Host "Prisma client folder removed successfully" -ForegroundColor Green
}

Write-Host "Step 4: Regenerating Prisma Client..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "Prisma client generated successfully!" -ForegroundColor Green
    
    Write-Host "Step 5: Starting dev server..." -ForegroundColor Yellow
    npm run dev
} else {
    Write-Host "Error generating Prisma client. Please check the error above." -ForegroundColor Red
}
