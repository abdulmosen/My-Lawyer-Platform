@echo off
REM My Lawyer Platform - Backend Setup Script
REM Run this script in the backend/ directory

echo.
echo ========================================
echo   My Lawyer Platform - Backend Setup
echo ========================================
echo.

REM Check if composer.json exists
if not exist composer.json (
    echo ERROR: composer.json not found. Run this script from backend/ directory.
    pause
    exit /b 1
)

REM 1. Install Dependencies
echo [1/5] Installing PHP dependencies...
call composer install
if %errorlevel% neq 0 (
    echo ERROR: Composer install failed.
    pause
    exit /b 1
)

REM 2. Generate Application Key
echo [2/5] Generating application key...
call php artisan key:generate
if %errorlevel% neq 0 (
    echo ERROR: Key generation failed.
    pause
    exit /b 1
)

REM 3. Run Migrations
echo [3/5] Running database migrations...
call php artisan migrate --seed
if %errorlevel% neq 0 (
    echo ERROR: Migrations failed. Ensure MySQL is running and database exists.
    pause
    exit /b 1
)

REM 4. Create Storage Link
echo [4/5] Creating storage symbolic link...
call php artisan storage:link
if %errorlevel% neq 0 (
    echo WARNING: Storage link creation failed. You may need to run manually.
)

REM 5. Start Server
echo [5/5] Starting Laravel development server...
echo.
echo ========================================
echo   Server running on: http://localhost:8000
echo   Press Ctrl+C to stop
echo ========================================
echo.

call php artisan serve

pause
