#!/bin/bash

# My Lawyer Platform - Backend Setup Script
# Run this script in the backend/ directory

echo ""
echo "========================================"
echo "  My Lawyer Platform - Backend Setup"
echo "========================================"
echo ""

# Check if composer.json exists
if [ ! -f composer.json ]; then
    echo "ERROR: composer.json not found. Run this script from backend/ directory."
    exit 1
fi

# 1. Install Dependencies
echo "[1/5] Installing PHP dependencies..."
composer install
if [ $? -ne 0 ]; then
    echo "ERROR: Composer install failed."
    exit 1
fi

# 2. Generate Application Key
echo "[2/5] Generating application key..."
php artisan key:generate
if [ $? -ne 0 ]; then
    echo "ERROR: Key generation failed."
    exit 1
fi

# 3. Run Migrations
echo "[3/5] Running database migrations..."
php artisan migrate --seed
if [ $? -ne 0 ]; then
    echo "ERROR: Migrations failed. Ensure MySQL is running and database exists."
    exit 1
fi

# 4. Create Storage Link
echo "[4/5] Creating storage symbolic link..."
php artisan storage:link
if [ $? -ne 0 ]; then
    echo "WARNING: Storage link creation failed. You may need to run manually."
fi

# 5. Start Server
echo "[5/5] Starting Laravel development server..."
echo ""
echo "========================================"
echo "  Server running on: http://localhost:8000"
echo "  Press Ctrl+C to stop"
echo "========================================"
echo ""

php artisan serve
