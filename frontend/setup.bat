@echo off
REM My Lawyer Platform - Frontend Setup Script
REM Run this script in the frontend/ directory

echo.
echo ========================================
echo   My Lawyer Platform - Frontend Setup
echo ========================================
echo.

REM Check if package.json exists
if not exist package.json (
    echo ERROR: package.json not found. Run this script from frontend/ directory.
    pause
    exit /b 1
)

REM 1. Install Dependencies
echo [1/2] Installing Node.js dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed.
    pause
    exit /b 1
)

REM 2. Start Development Server
echo [2/2] Starting Next.js development server...
echo.
echo ========================================
echo   Server running on: http://localhost:3000
echo   Press Ctrl+C to stop
echo ========================================
echo.

call npm run dev

pause
