# Full Setup & Launch Guide - 'My Lawyer' Platform

A secure, bilingual legal platform connecting clients with expert lawyers for corporate cases and consultations.

**Platform Stack:**
- **Frontend:** Next.js 14 (React + TypeScript)
- **Backend:** Laravel 11 (PHP)
- **Database:** MySQL 8.0+
- **Authentication:** Laravel Sanctum
- **Languages:** English & العربية (Arabic)

---

## ⚙️ Prerequisites

Before starting, ensure you have the following installed:

### 1. **Node.js** (v18 or later)
```bash
# Check version
node --version
npm --version

# Download: https://nodejs.org/
```

### 2. **PHP** (v8.2 or later)
```bash
# Check version
php --version

# Download: https://www.php.net/downloads
```

### 3. **Composer** (PHP Dependency Manager)
```bash
# Check version
composer --version

# Download: https://getcomposer.org/download/
```

### 4. **MySQL** (v8.0 or later)
```bash
# Check version
mysql --version

# Download: https://dev.mysql.com/downloads/mysql/
```

---

## 🗄️ Database Setup

### Step 1: Create Database

**Option A: Using MySQL CLI**
```bash
mysql -u root -p

# In MySQL console:
CREATE DATABASE my_lawyer_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Verify
SHOW DATABASES;

# Exit
exit;
```

**Option B: Using phpMyAdmin**
1. Open http://localhost/phpmyadmin
2. Click "New" in left sidebar
3. Database name: `my_lawyer_platform`
4. Collation: `utf8mb4_unicode_ci`
5. Click "Create"

### Step 2: Import Schema

After creating the database, run Laravel migrations:

```bash
cd backend
php artisan migrate --seed
```

This will create all required tables and seed demo data.

---

## 🔧 Backend Setup (Laravel)

### Step 1: Create Laravel Project

```bash
# Create new Laravel project
composer create-project laravel/laravel backend

# Navigate to project
cd backend
```

### Step 2: Install API Scaffolding

```bash
# Install Sanctum and create API boilerplate
php artisan install:api

# Accept defaults when prompted
```

### Step 3: Configure Environment (.env)

Open `backend/.env` and update:

```env
# Application
APP_NAME="My Lawyer"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=my_lawyer_platform
DB_USERNAME=root          # Your MySQL username
DB_PASSWORD=              # Your MySQL password (if any)

# Sanctum Configuration
SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
SESSION_DOMAIN=localhost

# Localization
APP_LOCALE=ar
APP_FALLBACK_LOCALE=en

# API
API_PREFIX=api/v1
```

### Step 4: Generate Application Key

```bash
php artisan key:generate
```

### Step 5: Copy Source Files

Copy all provided Laravel files to their correct locations:

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── CorporateCaseController.php
│   │   │   │   └── LocaleController.php
│   │   ├── Middleware/
│   │   │   └── Localization.php
│   │   ├── Requests/
│   │   │   ├── LoginRequest.php
│   │   │   └── RegisterRequest.php
│   │   └── Resources/
│   │       └── CaseResource.php
│   ├── Models/
│   │   ├── Case.php
│   │   ├── User.php
│   │   └── Service.php
│   └── Traits/
│       └── Bilingual.php
├── database/
│   └── migrations/
│       └── (migration files)
└── resources/
    └── lang/
        ├── en/
        │   └── messages.php
        └── ar/
            └── messages.php
```

### Step 6: Run Migrations & Seeders

```bash
# Create database tables
php artisan migrate

# Seed demo data
php artisan db:seed
```

### Step 7: Create Storage Link

```bash
php artisan storage:link
```

### Step 8: Start Backend Server

```bash
php artisan serve
```

**Output should show:**
```
Laravel development server started on http://127.0.0.1:8000
```

✅ **Backend running at:** http://localhost:8000

---

## 🚀 Frontend Setup (Next.js)

### Step 1: Create Next.js Project

**Open a NEW terminal window** (keep backend running in the first one)

```bash
npx create-next-app@latest frontend

# When prompted, select:
# ✔ Would you like to use TypeScript? › Yes
# ✔ Would you like to use ESLint? › Yes
# ✔ Would you like to use Tailwind CSS? › Yes
# ✔ Would you like to use 'src/' directory? › No
# ✔ Would you like to use App Router? › Yes
# ✔ Would you like to use Turbopack? › No
# ✔ Would you like to customize the import alias? › No
```

### Step 2: Navigate & Install Dependencies

```bash
cd frontend

# Install additional packages
npm install axios tailwindcss-rtl next-intl
```

### Step 3: Configure Environment (.env.local)

Create `frontend/.env.local`:

```env
# API Configuration
NEXT_PUBLIC_APP_NAME="My Lawyer"
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### Step 4: Copy Source Files

Copy all provided Next.js files to their correct locations:

```
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── client/
│   │   │   └── page.tsx
│   │   └── lawyer/
│   │       └── page.tsx
│   ├── globals.css
│   └── favicon.ico
├── context/
│   ├── AuthContext.tsx
│   └── LocaleContext.tsx
├── services/
│   ├── authService.ts
│   └── caseService.ts
├── lib/
│   ├── axios.ts
│   └── utils.ts
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

### Step 5: Update Tailwind Config

Replace `frontend/tailwind.config.ts` with the provided configuration that includes:
- Navy Blue (#0a192f) primary color
- Gold (#d4af37) accent color
- Bilingual font support (Montserrat + Tajawal)
- RTL support via `tailwindcss-rtl`

### Step 6: Update Global Styles

Replace `frontend/app/globals.css` with the provided CSS that includes:
- Custom CSS variables
- Typography base styles
- RTL/LTR support
- Animations and utilities

### Step 7: Start Frontend Server

```bash
npm run dev
```

**Output should show:**
```
▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local
```

✅ **Frontend running at:** http://localhost:3000

---

## ✅ Final Verification

### 1. **Access the Application**

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the home page with:
- My Lawyer logo in Navy Blue
- Hero section with bilingual content
- "Book a Consultation" and "Our Services" buttons
- Language toggle (English/العربية)

### 2. **Test Language Toggle**

- Click the language toggle button in the header
- Verify:
  - Page direction flips (left-to-right ↔ right-to-left)
  - All text translates correctly
  - Font changes (Montserrat → Tajawal)
  - API requests include `Accept-Language` header

### 3. **Test Registration**

- Click "Book a Consultation" or navigate to `/register`
- Create an account as **Client**:
  - Name: `Test Client`
  - Email: `client@example.com`
  - Password: `SecurePass123!`
  - Role: `Client`
- Click "Register"
- Verify:
  - Token saved in localStorage
  - Redirect to `/dashboard/client`
  - Sidebar shows client menu items
  - Welcome message displays

### 4. **Test Lawyer Registration**

- Logout or open incognito window
- Navigate to `/register`
- Create account as **Lawyer**:
  - Name: `Test Lawyer`
  - Email: `lawyer@example.com`
  - Password: `SecurePass123!`
  - Role: `Lawyer`
  - Specialization: `Corporate Law`
  - Bar License: `BL-12345678`
  - Years of Experience: `5`
- Verify:
  - Redirect to `/dashboard/lawyer`
  - Sidebar shows lawyer-specific menu items

### 5. **Test API Communication**

- Open Browser DevTools (F12)
- Go to "Network" tab
- Register or login
- Verify:
  - POST request to `/api/v1/auth/register` or `/api/v1/auth/login`
  - Response includes `token` and `user` data
  - `Accept-Language` header is set (ar or en)
  - Status code: 200 or 201 (success)

### 6. **Check Console for Errors**

- Open Browser DevTools (F12)
- Go to "Console" tab
- Verify:
  - No red error messages
  - No CORS errors
  - No 404 errors on resources

---

## 🐛 Troubleshooting

### Port Already in Use

**Backend (8000):**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8000
kill -9 <PID>
```

**Frontend (3000):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Database Connection Error

```
SQLSTATE[HY000] [2002] Connection refused
```

**Solutions:**
1. Verify MySQL is running:
   ```bash
   # Windows
   mysql -u root -p
   
   # macOS
   brew services start mysql
   ```

2. Check `.env` settings:
   ```env
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=
   ```

3. Verify database exists:
   ```bash
   mysql -u root -p
   SHOW DATABASES;
   ```

### CORS Error in Frontend

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:** Update `backend/.env`:
```env
SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
SESSION_DOMAIN=localhost
```

### Language Toggle Not Working

**Check:**
1. Verify `LocaleContext` is wrapping the app in `layout.tsx`
2. Open DevTools → Network → Check `Accept-Language` header
3. Clear cache: `Ctrl+Shift+Del` (browser cache)

### Token Not Saving

**Check:**
1. Open DevTools → Application → Local Storage
2. Verify `auth_token` and `user_data` are present
3. Check browser localStorage is enabled
4. Ensure response from backend includes `token` field

### 404 Error on API Calls

**Check:**
1. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
2. Verify backend routes in `routes/api.php`
3. Verify middleware is registered
4. Check Laravel logs: `storage/logs/laravel.log`

---

## 📁 Project Structure

```
My Lawyer Platform/
├── backend/ (Laravel)
│   ├── app/
│   ├── database/
│   ├── routes/
│   ├── .env
│   └── setup.bat / setup.sh
│
├── frontend/ (Next.js)
│   ├── app/
│   ├── context/
│   ├── services/
│   ├── lib/
│   ├── .env.local
│   └── tailwind.config.ts
│
├── README.md
├── SETUP_GUIDE.md
└── IMPLEMENTATION_PLAN.md
```

---

## 🚀 Development Workflow

### Daily Startup

```bash
# Terminal 1 - Backend
cd backend
php artisan serve

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Making Changes

- **Backend:** Restart server after file changes
- **Frontend:** Auto-refreshes on save (HMR)
- **Database:** Run migrations for schema changes
  ```bash
  php artisan migrate
  ```

---

## 📝 Demo Credentials

Use these accounts to test the platform:

### Client Account
```
Email: client@example.com
Password: password123
Role: Client
```

### Lawyer Account
```
Email: lawyer@example.com
Password: password123
Role: Lawyer
Specialization: Corporate Law
```

### Admin Account
```
Email: admin@example.com
Password: password123
Role: Admin
```

---

## ✨ Next Steps

After successful setup, consider implementing:

- [ ] Case management pages (`/dashboard/client/cases`)
- [ ] Appointment booking system
- [ ] Lawyer directory & search
- [ ] Messaging system
- [ ] Document upload & management
- [ ] Payment integration
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Analytics dashboard
- [ ] Mobile app

---

## 📚 Additional Resources

- **Laravel Docs:** https://laravel.com/docs/11.x
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Laravel Sanctum:** https://laravel.com/docs/11.x/sanctum

---

## ✅ Checklist

- [ ] Prerequisites installed (Node, PHP, Composer, MySQL)
- [ ] Database created: `my_lawyer_platform`
- [ ] Backend Laravel project created
- [ ] Backend `.env` configured
- [ ] Backend migrations run
- [ ] Backend server running on port 8000
- [ ] Frontend Next.js project created
- [ ] Frontend `.env.local` configured
- [ ] Frontend dependencies installed
- [ ] Frontend server running on port 3000
- [ ] Language toggle works
- [ ] Registration works
- [ ] Login works
- [ ] Dashboard displays correctly
- [ ] No console errors

---

## 🎉 Success!

Congratulations! You now have a professional, fully integrated bilingual legal platform ready for development.

For support and questions, refer to the code comments and documentation in the repository.

**Status:** ✅ Ready for Development
**Last Updated:** January 14, 2026
