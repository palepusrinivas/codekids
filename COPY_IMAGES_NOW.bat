@echo off
echo ========================================
echo   COPYING IMAGES - PLEASE WAIT
echo ========================================
echo.

REM Create folders
if not exist "public" mkdir "public"
if not exist "public\assest" mkdir "public\assest"

echo Copying images from source...
echo.

REM Copy all files
xcopy /E /I /Y /Q "..\codekids_tech-main\public\assest\*" "public\assest\"

echo.
echo ========================================
echo   VERIFICATION
echo ========================================
echo.

if exist "public\assest\kids robotics.jpg" (
    echo [OK] kids robotics.jpg
) else (
    echo [FAIL] kids robotics.jpg
)

if exist "public\assest\home page slide1.png" (
    echo [OK] home page slide1.png
) else (
    echo [FAIL] home page slide1.png
)

if exist "public\assest\codekids_finallogo.jpg" (
    echo [OK] codekids_finallogo.jpg
) else (
    echo [FAIL] codekids_finallogo.jpg
)

echo.
echo Total files:
dir "public\assest" /B 2>nul | find /C /V ""

echo.
echo ========================================
if exist "public\assest\kids robotics.jpg" (
    echo   SUCCESS! Images copied.
    echo   Please restart your dev server.
    echo ========================================
) else (
    echo   ERROR: Images not copied!
    echo   Please check source folder exists.
    echo ========================================
)
echo.
pause
