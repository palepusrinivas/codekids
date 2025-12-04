@echo off
cls
echo.
echo ========================================
echo   COPYING IMAGES - PLEASE WAIT...
echo ========================================
echo.

REM Create folders
if not exist "public" mkdir "public"
if not exist "public\assest" mkdir "public\assest"

REM Copy all files
echo Copying images from original project...
xcopy /E /I /Y "..\codekids_tech-main\public\assest\*" "public\assest\"

echo.
echo ========================================
echo   VERIFICATION
echo ========================================
echo.

if exist "public\assest\kids robotics.jpg" (
    echo [OK] kids robotics.jpg
) else (
    echo [ERROR] kids robotics.jpg
)

if exist "public\assest\home page slide1.png" (
    echo [OK] home page slide1.png
) else (
    echo [ERROR] home page slide1.png
)

if exist "public\assest\codekids_finallogo.jpg" (
    echo [OK] codekids_finallogo.jpg
) else (
    echo [ERROR] codekids_finallogo.jpg
)

echo.
echo ========================================
echo   NEXT STEPS
echo ========================================
echo.
echo 1. Stop your dev server (Ctrl+C)
echo 2. Restart: npm run dev
echo 3. Hard refresh browser: Ctrl+Shift+R
echo.
echo ========================================
pause

