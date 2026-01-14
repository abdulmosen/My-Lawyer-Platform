# Deployment & Setup Guide - My Lawyer Platform

A secure, bilingual legal platform built with Next.js 14 (frontend) and Laravel 11 (backend).

## 1. Environment Variables

### Backend (.env)
Located in `backend/.env`:
- **APP_NAME**: Platform name
- **APP_ENV**: Environment mode (local/production)
- **DB_CONNECTION**: MySQL database connection
- **SANCTUM_STATEFUL_DOMAINS**: Frontend domain for CORS
- **APP_LOCALE**: Primary locale (Arabic)
- **APP_FALLBACK_LOCALE**: Fallback locale (English)

**⚠️ Important**: Run `php artisan key:generate` to generate APP_KEY

### Frontend (.env.local)
Located in `frontend/.env.local`:
- **NEXT_PUBLIC_APP_NAME**: Application name
- **NEXT_PUBLIC_API_URL**: Backend API endpoint

## 2. Startup Instructions

### Prerequisites
- PHP 8.2+
- Node.js 18+
- MySQL 8.0+
- Composer

### Backend Setup (Terminal 1)
```bash
cd backend

# 1. Install Dependencies
composer install

# 2. Generate Application Key
php artisan key:generate

# 3. Setup Database
# Ensure MySQL is running and create database:
# CREATE DATABASE my_lawyer_platform;

php artisan migrate --seed

# 4. Create Storage Link
php artisan storage:link

# 5. Start Development Server
php artisan serve
# Server runs on: http://localhost:8000
```

### Frontend Setup (Terminal 2)
```bash
cd frontend

# 1. Install Dependencies
npm install

# 2. Run Development Server
npm run dev
# Application runs on: http://localhost:3000
```

## 3. Final Verification Checklist

### ✓ Bilingual Toggle
- [ ] Click "English" / "العربية" button
- [ ] Verify text direction flips (ltr ↔ rtl)
- [ ] Verify font changes (Montserrat ↔ Tajawal)
- [ ] Verify API sends correct `Accept-Language` header

### ✓ Role-Based Access
**Lawyer Account:**
- [ ] Sidebar displays "Manage Cases"
- [ ] Sidebar displays "Appointments"

**Client Account:**
- [ ] Sidebar displays "My Dashboard"
- [ ] Sidebar displays "Bookings"

**Security:**
- [ ] Unauthorized areas redirect to Login

### ✓ Secure Booking
- [ ] Client can book a consultation
- [ ] Success message appears in correct language
  - English: "Consultation booked successfully"
  - Arabic: "تم طلب الموعد بنجاح"

### ✓ Visual Identity
- [ ] Primary Navy Blue (#0a192f) is dominant
- [ ] Gold (#d4af37) accents on active links and buttons
- [ ] Professional, premium appearance maintained

## 4. Database Schema

The platform uses a relational database with the following key entities:
- **Users** (Lawyers & Clients)
- **Cases** (Legal cases managed by lawyers)
- **Appointments** (Consultations booked by clients)
- **Roles** (Role-based access control)
- **Translations** (Bilingual content)

Seeders provide demo data for testing.

## 5. Security Features

- **Sanctum Authentication**: Cookie/token-based auth
- **CORS**: Restricted to frontend domain
- **Role-Based Access Control**: Lawyer vs Client permissions
- **HTTPS Ready**: Configure for production deployment
- **Secure Storage**: Protected file uploads

## 6. Deployment to Production

### Backend (Laravel)
```bash
# 1. Set environment
APP_ENV=production
APP_DEBUG=false

# 2. Run migrations
php artisan migrate --force

# 3. Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 4. Deploy via your hosting provider
```

### Frontend (Next.js)
```bash
# 1. Build production bundle
npm run build

# 2. Start production server
npm start

# Or deploy to Vercel, Netlify, etc.
```

## 7. Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Database Connection Error
- Verify MySQL is running
- Check `DB_HOST`, `DB_USERNAME`, `DB_PASSWORD` in .env
- Ensure database exists

### CORS Errors
- Verify `SANCTUM_STATEFUL_DOMAINS` matches frontend URL
- Check `SESSION_DOMAIN` configuration

### Bilingual Issues
- Clear Next.js cache: `rm -rf .next`
- Verify `Accept-Language` header in requests
- Check locale files in `/locales` directory

## Support
For issues or questions, refer to:
- Laravel Docs: https://laravel.com/docs
- Next.js Docs: https://nextjs.org/docs
