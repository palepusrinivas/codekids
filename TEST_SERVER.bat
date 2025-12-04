@echo off
echo ============================================
echo   Testing Server Startup
echo ============================================
echo.

cd /d "%~dp0"

echo Checking Node.js...
node --version
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)
echo.

echo Checking npm...
npm --version
if errorlevel 1 (
    echo ERROR: npm is not found!
    pause
    exit /b 1
)
echo.

echo Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
)
echo.

echo Starting server...
echo.
echo ============================================
echo   Server should start on http://localhost:3000
echo   Keep this window open!
echo   Press Ctrl+C to stop
echo ============================================
echo.

call npm run dev

pause

