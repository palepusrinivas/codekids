# Hostinger Deployment Script for CodeKids React App
# Run this script to prepare files for Hostinger deployment

Write-Host "🚀 Preparing CodeKids React App for Hostinger Deployment..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Build the application
Write-Host "📦 Step 1: Building the application..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please fix errors and try again." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green
Write-Host ""

# Step 2: Copy .htaccess to dist
Write-Host "📋 Step 2: Copying .htaccess file..." -ForegroundColor Yellow
if (Test-Path ".htaccess") {
    Copy-Item -Path ".htaccess" -Destination "dist\.htaccess" -Force
    Write-Host "✅ .htaccess copied to dist folder" -ForegroundColor Green
} else {
    Write-Host "⚠️  .htaccess file not found. Creating one..." -ForegroundColor Yellow
    # Create .htaccess if it doesn't exist
    @"
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
"@ | Out-File -FilePath "dist\.htaccess" -Encoding UTF8
    Write-Host "✅ .htaccess created in dist folder" -ForegroundColor Green
}
Write-Host ""

# Step 3: Verify dist folder structure
Write-Host "🔍 Step 3: Verifying dist folder structure..." -ForegroundColor Yellow
$requiredFiles = @("index.html", ".htaccess", "robots.txt")
$requiredFolders = @("js", "assets", "assest")

$allPresent = $true
foreach ($file in $requiredFiles) {
    if (Test-Path "dist\$file") {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file - MISSING!" -ForegroundColor Red
        $allPresent = $false
    }
}

foreach ($folder in $requiredFolders) {
    if (Test-Path "dist\$folder") {
        $fileCount = (Get-ChildItem "dist\$folder" -Recurse -File).Count
        Write-Host "  ✅ $folder ($fileCount files)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $folder - MISSING!" -ForegroundColor Red
        $allPresent = $false
    }
}

Write-Host ""

if (-not $allPresent) {
    Write-Host "⚠️  Some required files/folders are missing!" -ForegroundColor Yellow
    Write-Host ""
}

# Step 4: Display deployment instructions
Write-Host "📝 Step 4: Deployment Instructions" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your files are ready in the 'dist' folder!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Login to Hostinger: https://hpanel.hostinger.com" -ForegroundColor White
Write-Host "2. Go to File Manager → public_html" -ForegroundColor White
Write-Host "3. Delete all existing files in public_html (if any)" -ForegroundColor White
Write-Host "4. Upload ALL files from the 'dist' folder to 'public_html'" -ForegroundColor White
Write-Host "5. Make sure .htaccess file is uploaded" -ForegroundColor White
Write-Host "6. Visit your website: https://yourdomain.com" -ForegroundColor White
Write-Host ""
Write-Host "📁 Files to upload from dist folder:" -ForegroundColor Cyan
Write-Host "   - index.html" -ForegroundColor White
Write-Host "   - .htaccess" -ForegroundColor White
Write-Host "   - robots.txt" -ForegroundColor White
Write-Host "   - js/ (entire folder)" -ForegroundColor White
Write-Host "   - assets/ (entire folder)" -ForegroundColor White
Write-Host "   - assest/ (entire folder with images)" -ForegroundColor White
Write-Host ""
Write-Host "✅ Deployment package ready!" -ForegroundColor Green
Write-Host ""

