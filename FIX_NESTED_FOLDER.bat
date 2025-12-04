@echo off
cls
echo ========================================
echo   FIXING NESTED FOLDER STRUCTURE
echo ========================================
echo.

if not exist "public\assest\assest" (
    echo Images are already in the correct location!
    echo.
    pause
    exit /b 0
)

echo Moving images from public\assest\assest to public\assest...
echo.

REM Copy all files from nested folder
xcopy /Y "public\assest\assest\*" "public\assest\"

echo.
echo Removing nested folder...
rmdir /S /Q "public\assest\assest"

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
echo ========================================
if exist "public\assest\kids robotics.jpg" (
    echo   SUCCESS! Images are now in place.
    echo ========================================
    echo.
    echo   NEXT STEP: Restart your dev server!
    echo   1. Stop server (Ctrl+C)
    echo   2. Run: npm run dev
    echo   3. Hard refresh browser (Ctrl+Shift+R)
    echo.
) else (
    echo   ERROR: Images still not in place!
    echo ========================================
    echo.
    echo   Please check the folder structure manually.
    echo.
)
pause

