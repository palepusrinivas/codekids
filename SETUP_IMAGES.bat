@echo off
cls
echo.
echo ========================================
echo   SETTING UP IMAGES FOR CODEKIDS REACT
echo ========================================
echo.

REM Step 1: Create folders
echo [STEP 1] Creating folder structure...
if not exist "public" (
    mkdir "public"
    echo    Created: public
)
if not exist "public\assest" (
    mkdir "public\assest"
    echo    Created: public\assest
)
echo.

REM Step 2: Verify source
echo [STEP 2] Checking source folder...
if not exist "..\codekids_tech-main\public\assest" (
    echo    ERROR: Source folder not found!
    echo    Expected: ..\codekids_tech-main\public\assest
    echo.
    echo    Please ensure the original project is in the parent directory.
    pause
    exit /b 1
)
echo    Source folder found.
echo.

REM Step 3: Copy images
echo [STEP 3] Copying images...
echo    This may take a moment...
robocopy "..\codekids_tech-main\public\assest" "public\assest" /E /NFL /NDL /NJH /NJS /NP /R:3 /W:1
echo.

REM Step 4: Verify
echo [STEP 4] Verifying images...
echo.

set VERIFIED=0
set MISSING=0

if exist "public\assest\kids robotics.jpg" (
    echo    [OK] kids robotics.jpg
    set /a VERIFIED+=1
) else (
    echo    [MISSING] kids robotics.jpg
    set /a MISSING+=1
)

if exist "public\assest\home page slide1.png" (
    echo    [OK] home page slide1.png
    set /a VERIFIED+=1
) else (
    echo    [MISSING] home page slide1.png
    set /a MISSING+=1
)

if exist "public\assest\codekids_finallogo.jpg" (
    echo    [OK] codekids_finallogo.jpg
    set /a VERIFIED+=1
) else (
    echo    [MISSING] codekids_finallogo.jpg
    set /a MISSING+=1
)

if exist "public\assest\codekids jr learning.jpg" (
    echo    [OK] codekids jr learning.jpg
    set /a VERIFIED+=1
) else (
    echo    [MISSING] codekids jr learning.jpg
    set /a MISSING+=1
)

echo.
echo ========================================
echo   SUMMARY
echo ========================================
echo    Verified: %VERIFIED% files
echo    Missing: %MISSING% files
echo.

for /f %%i in ('dir /b "public\assest\*.jpg" 2^>nul ^| find /c /v ""') do set JPG=%%i
for /f %%i in ('dir /b "public\assest\*.png" 2^>nul ^| find /c /v ""') do set PNG=%%i
echo    Total JPG files: %JPG%
echo    Total PNG files: %PNG%
echo.

if %MISSING% EQU 0 (
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
    echo   Please check:
    echo   - Source folder exists: ..\codekids_tech-main\public\assest
    echo   - Files have correct names (case-sensitive)
    echo   - No permission issues
    echo.
)

pause

