@echo off
echo ========================================
echo Copying Images to React Public Folder
echo ========================================
echo.

if not exist "public" mkdir "public"
if not exist "public\assest" mkdir "public\assest"

echo Copying all images from original project...
xcopy /E /I /Y "..\codekids_tech-main\public\assest\*" "public\assest\" >nul 2>&1

echo.
echo Verifying images...
if exist "public\assest\kids robotics.jpg" (
    echo [OK] kids robotics.jpg
) else (
    echo [ERROR] kids robotics.jpg NOT FOUND
)

if exist "public\assest\coding.jpg" (
    echo [OK] coding.jpg
) else (
    echo [ERROR] coding.jpg NOT FOUND
)

if exist "public\assest\codekids_jr testimonial.jpg" (
    echo [OK] codekids_jr testimonial.jpg
) else (
    echo [ERROR] codekids_jr testimonial.jpg NOT FOUND
)

echo.
echo ========================================
echo Image copy process completed!
echo ========================================
pause

