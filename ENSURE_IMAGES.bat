@echo off
echo ========================================
echo ENSURING IMAGES ARE IN PLACE
echo ========================================
echo.

REM Force create directories
if not exist "public" (
    echo Creating public folder...
    mkdir "public"
)

if not exist "public\assest" (
    echo Creating public\assest folder...
    mkdir "public\assest"
)

echo.
echo Copying ALL images from original project...
echo Source: ..\codekids_tech-main\public\assest
echo Destination: public\assest
echo.

REM Use robocopy for reliable copying
robocopy "..\codekids_tech-main\public\assest" "public\assest" /E /NFL /NDL /NJH /NJS

echo.
echo ========================================
echo VERIFICATION
echo ========================================
echo.

if exist "public\assest\kids robotics.jpg" (
    echo [OK] kids robotics.jpg
) else (
    echo [MISSING] kids robotics.jpg
)

if exist "public\assest\home page slide1.png" (
    echo [OK] home page slide1.png
) else (
    echo [MISSING] home page slide1.png
)

if exist "public\assest\codekids_finallogo.jpg" (
    echo [OK] codekids_finallogo.jpg
) else (
    echo [MISSING] codekids_finallogo.jpg
)

if exist "public\assest\codekids jr learning.jpg" (
    echo [OK] codekids jr learning.jpg
) else (
    echo [MISSING] codekids jr learning.jpg
)

echo.
echo ========================================
echo File count in public\assest:
echo ========================================
dir "public\assest\*.jpg" /B 2>nul | find /C /V ""
echo JPG files

dir "public\assest\*.png" /B 2>nul | find /C /V ""
echo PNG files

echo.
echo ========================================
echo IMPORTANT: Restart dev server after this!
echo ========================================
pause

