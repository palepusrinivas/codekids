@echo off
echo Clearing all caches...
cd /d "%~dp0"

REM Kill any running Node processes (optional - be careful)
REM taskkill /F /IM node.exe 2>nul

REM Clear all caches
if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite"
if exist ".vite" rmdir /s /q ".vite"
if exist "dist" rmdir /s /q "dist"
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache"

echo.
echo All caches cleared!
echo.
echo Please:
echo 1. Stop the current dev server (press Ctrl+C in the terminal where it's running)
echo 2. Wait 2-3 seconds
echo 3. Run: npm run dev
echo.
pause

