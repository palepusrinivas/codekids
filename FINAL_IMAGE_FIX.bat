@echo off
cls
echo.
echo ========================================
echo   FINAL IMAGE SETUP - PLEASE WAIT
echo ========================================
echo.

REM Step 1: Create folders
echo [1/3] Creating folders...
if not exist "public" mkdir "public"
if not exist "public\assest" mkdir "public\assest"
echo    Folders created.
echo.

REM Step 2: Copy images
echo [2/3] Copying images from original project...
if exist "..\codekids_tech-main\public\assest" (
    robocopy "..\codekids_tech-main\public\assest" "public\assest" /E /NFL /NDL /NJH /NJS /NP
    echo    Copy complete.
) else (
    echo    ERROR: Source folder not found!
    echo    Expected: ..\codekids_tech-main\public\assest
    pause
    exit /b 1
)
echo.

REM Step 3: Verify
echo [3/3] Verifying key images...
set OK_COUNT=0
set FAIL_COUNT=0

if exist "public\assest\kids robotics.jpg" (
    echo    [OK] kids robotics.jpg
    set /a OK_COUNT+=1
) else (
    echo    [FAIL] kids robotics.jpg
    set /a FAIL_COUNT+=1
)

if exist "public\assest\home page slide1.png" (
    echo    [OK] home page slide1.png
    set /a OK_COUNT+=1
) else (
    echo    [FAIL] home page slide1.png
    set /a FAIL_COUNT+=1
)

if exist "public\assest\codekids_finallogo.jpg" (
    echo    [OK] codekids_finallogo.jpg
    set /a OK_COUNT+=1
) else (
    echo    [FAIL] codekids_finallogo.jpg
    set /a FAIL_COUNT+=1
)

if exist "public\assest\codekids jr learning.jpg" (
    echo    [OK] codekids jr learning.jpg
    set /a OK_COUNT+=1
) else (
    echo    [FAIL] codekids jr learning.jpg
    set /a FAIL_COUNT+=1
)

echo.
echo ========================================
echo   SUMMARY
echo ========================================
echo    Verified: %OK_COUNT% files
echo    Missing: %FAIL_COUNT% files
echo.

for /f %%i in ('dir /b "public\assest\*.jpg" 2^>nul ^| find /c /v ""') do set JPG=%%i
for /f %%i in ('dir /b "public\assest\*.png" 2^>nul ^| find /c /v ""') do set PNG=%%i
echo    Total JPG files: %JPG%
echo    Total PNG files: %PNG%
echo.

if %FAIL_COUNT% EQU 0 (
    echo ========================================
    echo   SUCCESS! All images are in place.
    echo ========================================
    echo.
    echo   NEXT STEPS:
    echo   1. Stop your dev server (Ctrl+C)
    echo   2. Restart: npm run dev
    echo   3. Hard refresh browser: Ctrl+Shift+R
    echo.
) else (
    echo ========================================
    echo   WARNING: Some images are missing!
    echo ========================================
    echo.
    echo   Please check the source folder:
    echo   ..\codekids_tech-main\public\assest
    echo.
)

pause

