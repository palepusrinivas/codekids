@echo off
title CodeKids React - Development Server
color 0A
echo.
echo ========================================
echo   CodeKids React - Starting Server
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Checking dependencies...
if not exist "node_modules" (
    echo    Installing npm packages (this may take a minute)...
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: Failed to install dependencies!
        echo Please check your internet connection and try again.
        pause
        exit /b 1
    )
    echo    Dependencies installed successfully!
) else (
    echo    Dependencies found.
)
echo.

echo [2/3] Checking configuration...
if not exist "package.json" (
    echo    ERROR: package.json not found!
    pause
    exit /b 1
)
if not exist "src\main.tsx" (
    echo    ERROR: src\main.tsx not found!
    pause
    exit /b 1
)
echo    Configuration OK.
echo.

echo [3/3] Starting development server...
echo.
echo ========================================
echo   Server will start on http://localhost:3000
echo   Press Ctrl+C to stop the server
echo ========================================
echo.

call npm run dev

if errorlevel 1 (
    echo.
    echo ERROR: Server failed to start!
    echo.
    echo Common issues:
    echo - Port 3000 may be in use
    echo - Dependencies may be missing
    echo - Check error messages above
    echo.
    pause
)

