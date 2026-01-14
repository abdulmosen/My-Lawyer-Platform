# Quick Start Checklist - 'My Lawyer' Platform

## ⚡ 5-Minute Quick Start

### Prerequisites Check
- [ ] Node.js v18+ installed (`node --version`)
- [ ] PHP 8.2+ installed (`php --version`)
- [ ] Composer installed (`composer --version`)
- [ ] MySQL 8.0+ running (`mysql -u root -p`)

### Database Setup (2 minutes)
```bash
mysql -u root -p
CREATE DATABASE my_lawyer_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;
```

### Backend Setup (3 minutes)
```bash
# Terminal 1
composer create-project laravel/laravel backend
cd backend
php artisan install:api
# Update .env with database credentials
php artisan migrate --seed
php artisan serve
# ✅ Running on http://localhost:8000
```

### Frontend Setup (3 minutes)
```bash
# Terminal 2 (NEW window)
npx create-next-app@latest frontend
# Use all defaults for setup
cd frontend
npm install axios tailwindcss-rtl
npm run dev
# ✅ Running on http://localhost:3000
```

### Test the Platform
1. Open http://localhost:3000
2. Click language toggle (English/العربية)
3. Go to `/register` and create account
4. Verify dashboard loads with correct role

---

## 📋 Complete Setup Checklist

### Phase 1: Installation
- [ ] Node.js v18+ installed
- [ ] PHP 8.2+ installed
- [ ] Composer installed
- [ ] MySQL Server running
- [ ] All prerequisites verified

### Phase 2: Database
- [ ] Database `my_lawyer_platform` created
- [ ] Collation set to `utf8mb4_unicode_ci`
- [ ] Connection tested successfully

### Phase 3: Backend
- [ ] Laravel project created
- [ ] Sanctum installed
- [ ] `.env` configured with:
  - [ ] `DB_HOST=127.0.0.1`
  - [ ] `DB_DATABASE=my_lawyer_platform`
  - [ ] `DB_USERNAME=root`
  - [ ] `DB_PASSWORD=` (if needed)
  - [ ] `SANCTUM_STATEFUL_DOMAINS=localhost:3000`
  - [ ] `SESSION_DOMAIN=localhost`
- [ ] Application key generated
- [ ] Source files copied
- [ ] Migrations ran successfully
- [ ] Seeders executed
- [ ] Storage link created
- [ ] Backend running on port 8000
- [ ] No error messages in console

### Phase 4: Frontend
- [ ] Next.js project created
- [ ] Dependencies installed
- [ ] `.env.local` created with:
  - [ ] `NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1`
- [ ] Source files copied
- [ ] Tailwind config updated
- [ ] Global CSS updated
- [ ] Frontend running on port 3000
- [ ] No error messages in console

### Phase 5: Verification
- [ ] Home page loads at http://localhost:3000
- [ ] Hero section displays correctly
- [ ] Language toggle present and working
- [ ] Button navigation works
- [ ] `/login` page accessible
- [ ] `/register` page accessible
- [ ] API calls include `Accept-Language` header
- [ ] Console has no CORS errors
- [ ] Console has no 404 errors

### Phase 6: Authentication
- [ ] Registration form submits
- [ ] Email validation works
- [ ] Password confirmation works
- [ ] Role selection works
- [ ] Registration success creates account
- [ ] Login with new account works
- [ ] Token saved in localStorage
- [ ] User info saved in localStorage
- [ ] Dashboard loads after login
- [ ] Logout clears session

### Phase 7: Role-Based Features
- [ ] Client dashboard displays 3 widgets
- [ ] Lawyer dashboard displays 4 widgets
- [ ] Client sidebar has correct menu items
- [ ] Lawyer sidebar has correct menu items
- [ ] Cannot access lawyer routes as client
- [ ] Cannot access client routes as lawyer

### Phase 8: Bilingual Features
- [ ] Switch to English - page direction is LTR
- [ ] Switch to Arabic - page direction is RTL
- [ ] Font changes when switching languages
- [ ] All text translates correctly
- [ ] Sidebar items translate
- [ ] Dashboard title translates
- [ ] Buttons translate
- [ ] Error messages translate

### Phase 9: Visual Design
- [ ] Navy Blue (#0a192f) is primary color
- [ ] Gold (#d4af37) appears on accents
- [ ] Logo text is in gold color
- [ ] Buttons have correct styling
- [ ] Hover effects work
- [ ] Responsive design works on mobile
- [ ] Responsive design works on tablet
- [ ] Responsive design works on desktop

---

## 🔧 Environment Files

### backend/.env
```env
APP_NAME="My Lawyer"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=my_lawyer_platform
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
SESSION_DOMAIN=localhost

APP_LOCALE=ar
APP_FALLBACK_LOCALE=en

API_PREFIX=api/v1
```

### frontend/.env.local
```env
NEXT_PUBLIC_APP_NAME="My Lawyer"
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

## ⚡ Common Commands

### Backend
```bash
cd backend

# Start server
php artisan serve

# Create migration
php artisan make:migration create_table_name

# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# View all routes
php artisan route:list | grep api

# Clear cache
php artisan cache:clear
php artisan config:clear
```

### Frontend
```bash
cd frontend

# Start dev server
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Run linter
npm run lint

# Format code
npm run format
```

### Database
```bash
# Login
mysql -u root -p

# Show databases
SHOW DATABASES;

# Use database
USE my_lawyer_platform;

# Show tables
SHOW TABLES;

# View table structure
DESCRIBE users;

# Run query
SELECT * FROM users;
```

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 8000 in use | `netstat -ano \| findstr :8000` then `taskkill /PID <PID> /F` |
| Port 3000 in use | `netstat -ano \| findstr :3000` then `taskkill /PID <PID> /F` |
| Cannot connect to DB | Check MySQL running, verify `.env` settings |
| CORS error | Update `SANCTUM_STATEFUL_DOMAINS` in `.env` |
| Token not saving | Check `localStorage` enabled, verify API response |
| Language not switching | Clear cache, verify `LocaleContext` wrapper |
| API 404 error | Verify route exists, check middleware registration |

---

## 📞 Support Files

- Full setup guide: `FULL_SETUP_GUIDE.md`
- Implementation plan: `IMPLEMENTATION_PLAN.md`
- Setup guide: `SETUP_GUIDE.md`
- Project config: `project.json`

---

## 🎯 Next Milestones

1. ✅ Initial Setup
2. ✅ Database & Schema
3. ✅ Authentication
4. ✅ Bilingual Support
5. ⬜ Case Management Features
6. ⬜ Booking System
7. ⬜ Payment Integration
8. ⬜ Notifications
9. ⬜ Production Deployment

---

**Status:** Ready to Launch  
**Last Updated:** January 14, 2026
