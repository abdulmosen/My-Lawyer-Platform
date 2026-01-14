#!/bin/bash

# My Lawyer Platform - Frontend Setup Script
# Run this script in the frontend/ directory

echo ""
echo "========================================"
echo "  My Lawyer Platform - Frontend Setup"
echo "========================================"
echo ""

# Check if package.json exists
if [ ! -f package.json ]; then
    echo "ERROR: package.json not found. Run this script from frontend/ directory."
    exit 1
fi

# 1. Install Dependencies
echo "[1/2] Installing Node.js dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: npm install failed."
    exit 1
fi

# 2. Start Development Server
echo "[2/2] Starting Next.js development server..."
echo ""
echo "========================================"
echo "  Server running on: http://localhost:3000"
echo "  Press Ctrl+C to stop"
echo "========================================"
echo ""

npm run dev
