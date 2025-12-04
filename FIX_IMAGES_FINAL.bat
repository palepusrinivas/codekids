@echo off
cls
color 0A
echo.
echo ============================================================
echo   FINAL IMAGE FIX - This will copy ALL images
echo ============================================================
echo.

REM Step 1: Create folder structure
echo [1/3] Creating folder structure...
if not exist "public" (
    mkdir "public"
    echo    Created: public\
)
if not exist "public\assest" (
    mkdir "public\assest"
    echo    Created: public\assest\
)
echo    Done!
echo.

REM Step 2: Check source
echo [2/3] Checking source folder...
if not exist "..\codekids_tech-main\public\assest" (
    echo.
    echo    ERROR: Source folder not found!
    echo    Expected: ..\codekids_tech-main\public\assest
    echo.
    echo    Please ensure the original project folder exists.
    echo.
    pause
    exit /b 1
)
echo    Source folder found: ..\codekids_tech-main\public\assest
echo.

REM Step 3: Copy all files
echo [3/3] Copying ALL images (this may take a moment)...
echo.
robocopy "..\codekids_tech-main\public\assest" "public\assest" /E /NFL /NDL /NJH /NJS /NP /R:3 /W:1
echo.

REM Verification
echo ============================================================
echo   VERIFICATION
echo ============================================================
echo.

set OK_COUNT=0
set FAIL_COUNT=0

if exist "public\assest\kids robotics.jpg" (
    echo [OK] kids robotics.jpg
    set /a OK_COUNT+=1
) else (
    echo [FAIL] kids robotics.jpg
    set /a FAIL_COUNT+=1
)

if exist "public\assest\home page slide1.png" (
    echo [OK] home page slide1.png
    set /a OK_COUNT+=1
) else (
    echo [FAIL] home page slide1.png
    set /a FAIL_COUNT+=1
)

if exist "public\assest\codekids_finallogo.jpg" (
    echo [OK] codekids_finallogo.jpg
    set /a OK_COUNT+=1
) else (
    echo [FAIL] codekids_finallogo.jpg
    set /a FAIL_COUNT+=1
)

if exist "public\assest\codekids jr learning.jpg" (
    echo [OK] codekids jr learning.jpg
    set /a OK_COUNT+=1
) else (
    echo [FAIL] codekids jr learning.jpg
    set /a FAIL_COUNT+=1
)

echo.
for /f %%i in ('dir /b "public\assest\*.jpg" 2^>nul ^| find /c /v ""') do set JPG=%%i
for /f %%i in ('dir /b "public\assest\*.png" 2^>nul ^| find /c /v ""') do set PNG=%%i
echo Total JPG files: %JPG%
echo Total PNG files: %PNG%
echo.

echo ============================================================
if %FAIL_COUNT% EQU 0 (
    echo   SUCCESS! All images are in place.
    echo ============================================================
    echo.
    echo   NEXT STEPS:
    echo   1. Stop your dev server (Ctrl+C in the terminal)
    echo   2. Restart: npm run dev
    echo   3. Hard refresh browser: Ctrl+Shift+R
    echo.
    echo   Images should now load correctly!
    echo.
) else (
    echo   WARNING: Some images are missing!
    echo ============================================================
    echo.
    echo   Please check:
    echo   - Source folder: ..\codekids_tech-main\public\assest
    echo   - File permissions
    echo   - Disk space
    echo.
)
pause

