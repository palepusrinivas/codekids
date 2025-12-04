Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up Images for CodeKids React" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Create directories
$publicPath = "public\assest"
if (-not (Test-Path "public")) {
    New-Item -ItemType Directory -Path "public" -Force | Out-Null
    Write-Host "[CREATED] public folder" -ForegroundColor Green
}

if (-not (Test-Path $publicPath)) {
    New-Item -ItemType Directory -Path $publicPath -Force | Out-Null
    Write-Host "[CREATED] public\assest folder" -ForegroundColor Green
}

# Copy images
$sourcePath = "..\codekids_tech-main\public\assest"
if (Test-Path $sourcePath) {
    Write-Host "[COPYING] Images from original project..." -ForegroundColor Yellow
    Copy-Item -Path "$sourcePath\*" -Destination $publicPath -Recurse -Force
    Write-Host "[SUCCESS] Images copied!" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Source folder not found: $sourcePath" -ForegroundColor Red
    exit 1
}

# Verify key images
Write-Host ""
Write-Host "Verifying key images..." -ForegroundColor Cyan
$keyImages = @(
    "kids robotics.jpg",
    "coding.jpg",
    "codekids_jr testimonial.jpg",
    "home page slide1.png",
    "home page slide 2.png",
    "codekids jr learning.jpg",
    "online classes.jpg"
)

$allFound = $true
foreach ($img in $keyImages) {
    $imgPath = Join-Path $publicPath $img
    if (Test-Path $imgPath) {
        Write-Host "  [OK] $img" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] $img" -ForegroundColor Red
        $allFound = $false
    }
}

Write-Host ""
if ($allFound) {
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "All images are in place!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
} else {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Some images are missing!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
}

# Count total images
$totalImages = (Get-ChildItem $publicPath -Filter "*.jpg" -Recurse).Count + (Get-ChildItem $publicPath -Filter "*.png" -Recurse).Count
Write-Host "Total images copied: $totalImages" -ForegroundColor Cyan
Write-Host ""

