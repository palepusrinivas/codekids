@echo off
echo Starting CodeKids React Development Server...
echo.
cd /d "%~dp0"
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)
echo Starting Vite dev server...
echo.
call npm run dev
pause

