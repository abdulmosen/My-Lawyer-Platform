# Final Implementation Plan - Verification & Testing Guide

## ✅ Completed Components

### Backend (Laravel)
- [x] **CorporateCaseController** - API endpoints for case management
  - `index()` - List cases by role
  - `store()` - Create new case
  - `show()` - View case details
  - `update()` - Modify case
  - `destroy()` - Delete case

### Frontend (Next.js)

#### Core Infrastructure
- [x] **axios.ts** - HTTP client with interceptors
  - Request: Bearer token + Accept-Language headers
  - Response: Auto token refresh on 401
  - Error handling for all status codes

- [x] **authService.ts** - Authentication API service
  - login, register, logout
  - getUser, refreshToken
  - Profile & password management
  - TypeScript types

- [x] **AuthContext.tsx** - Authentication state management
  - User persistence in localStorage
  - Loading skeleton
  - Session validation on app load
  - Role-based redirects

- [x] **LocaleContext.tsx** - Bilingual language management
  - Toggle between English/العربية
  - Updates document direction (ltr/rtl)
  - Persists locale preference

#### Pages & Layout
- [x] **DashboardLayout.tsx** - Main application layout
  - Responsive sidebar with collapse
  - Role-based navigation menu
  - Language switcher in header
  - Navy Blue (#0a192f) + Gold (#d4af37) theme

- [x] **login/page.tsx** - Login page
  - Email/password authentication
  - Bilingual UI
  - Demo credentials display
  - Error handling

- [x] **register/page.tsx** - Registration page
  - User registration (Client/Lawyer)
  - Bilingual form labels
  - Password confirmation validation
  - Role selection

- [x] **dashboard/client/page.tsx** - Client dashboard
  - Quick stats (cases, consultations, spending)
  - Recent activity feed
  - Call-to-action for booking

- [x] **dashboard/lawyer/page.tsx** - Lawyer dashboard
  - KPIs (cases, appointments, clients, revenue)
  - Cases needing attention
  - Upcoming appointments
  - Performance metrics

---

## 🧪 Manual Verification Checklist

### Phase 1: Authentication Flow

#### Test Login
- [ ] Navigate to `/login`
- [ ] Enter test credentials:
  - **Client**: `client@example.com` / `password123`
  - **Lawyer**: `lawyer@example.com` / `password123`
- [ ] Verify token is stored in localStorage
- [ ] Verify redirect to appropriate dashboard
- [ ] Verify user name appears in sidebar

#### Test Registration
- [ ] Navigate to `/register`
- [ ] Select "Client" role
- [ ] Fill all fields with valid data
- [ ] Verify password confirmation validation
- [ ] Submit form
- [ ] Verify automatic login and redirect

#### Test Logout
- [ ] Click logout button in sidebar
- [ ] Verify token removed from localStorage
- [ ] Verify redirect to `/login`
- [ ] Try accessing `/dashboard` → Should redirect to login

---

### Phase 2: Bilingual Support

#### Test Language Toggle
- [ ] In dashboard header, click language button
- [ ] Toggle between "English" and "العربية"
- [ ] Verify:
  - Text direction changes (ltr ↔ rtl)
  - Sidebar items change language
  - Header updates language
  - Dashboard title translates
  
#### Test API Language Header
- [ ] Open browser DevTools → Network tab
- [ ] Click any API request
- [ ] Check request headers
- [ ] Verify `Accept-Language: ar` or `Accept-Language: en`
- [ ] Change language and make new request
- [ ] Verify header updates

#### Test Persistence
- [ ] Set language to English
- [ ] Refresh page
- [ ] Verify English is still selected

---

### Phase 3: Role-Based Access

#### Test Client Dashboard
- [ ] Login as client@example.com
- [ ] Verify sidebar shows:
  - "My Dashboard"
  - "Corporate Cases"
  - "Bookings"
- [ ] Verify dashboard displays:
  - Active cases counter (3)
  - Upcoming consultations (2)
  - Total invested ($5,200)
  - Recent activity

#### Test Lawyer Dashboard
- [ ] Login as lawyer@example.com
- [ ] Verify sidebar shows:
  - "Overview"
  - "Manage Cases"
  - "Appointments"
- [ ] Verify dashboard displays:
  - Active cases (8)
  - Today's appointments (3)
  - Active clients (15)
  - Monthly revenue ($12,500)
  - Performance metrics

#### Test Unauthorized Access
- [ ] As client, try accessing `/dashboard/lawyer/cases`
- [ ] Should show error or redirect
- [ ] As lawyer, try accessing `/dashboard/client/bookings`
- [ ] Should show error or redirect

---

### Phase 4: UI/Theme Verification

#### Color Scheme
- [ ] Primary color is Navy Blue (#0a192f) on sidebar
- [ ] Gold accents (#d4af37) on:
  - Active sidebar items
  - Button hover states
  - "My Lawyer" logo text
- [ ] Logo text appears in Gold

#### Responsive Design
- [ ] View on mobile (< 640px)
  - Sidebar collapses to icons only
  - Toggle button works smoothly
  - Header remains accessible
  
- [ ] View on tablet (640px - 1024px)
  - Layout adapts properly
  - No overflow issues
  
- [ ] View on desktop (> 1024px)
  - Full sidebar visible
  - Dashboard stats in grid layout

#### RTL Support
- [ ] Switch to Arabic
- [ ] Verify layout properly mirrors:
  - Sidebar on right side
  - Text alignment right-to-left
  - Icon positions adjust

---

### Phase 5: Integration Testing

#### Complete Login Flow
1. [ ] Clear localStorage
2. [ ] Navigate to `/login`
3. [ ] Enter credentials
4. [ ] Verify POST request to `/auth/login`
5. [ ] Verify response contains token + user data
6. [ ] Verify redirect to dashboard
7. [ ] Verify user info in sidebar

#### Complete Case Management Flow
1. [ ] As lawyer, navigate to "Manage Cases"
2. [ ] Verify cases load via GET `/cases`
3. [ ] Verify Accept-Language header set
4. [ ] Switch language and reload
5. [ ] Verify cases still load with new language header

#### Complete Booking Flow
1. [ ] As client, click "Book Now"
2. [ ] Fill booking form
3. [ ] Verify POST request to `/bookings`
4. [ ] Verify bilingual success message
5. [ ] Verify booking appears in recent activity

---

## 🔍 Expected API Endpoints

| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| POST | `/auth/login` | No | Returns token + user |
| POST | `/auth/register` | No | Role-based registration |
| POST | `/auth/logout` | Yes | Clears session |
| GET | `/auth/user` | Yes | Current user info |
| POST | `/auth/refresh-token` | Yes | Refresh expired token |
| GET | `/cases` | Yes | List user's cases |
| GET | `/cases/{id}` | Yes | Case details |
| POST | `/cases` | Yes | Create new case |
| PUT | `/cases/{id}` | Yes | Update case |
| DELETE | `/cases/{id}` | Yes | Delete case |
| POST | `/bookings` | Yes | Book consultation |
| GET | `/appointments` | Yes | List appointments |

---

## 🛠️ Troubleshooting

### Issue: "CORS error" on API requests
**Solution:**
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure backend `.env` has `SANCTUM_STATEFUL_DOMAINS=localhost:3000`
- Check backend CORS configuration

### Issue: "404 Not Found" on `/auth/login`
**Solution:**
- Verify backend routes are registered
- Check `routes/api.php` includes auth routes
- Ensure controller exists at correct path

### Issue: Token not persisting after login
**Solution:**
- Check browser console for localStorage errors
- Verify `localStorage` is enabled in browser
- Check Network tab that response includes token

### Issue: Language toggle not updating UI
**Solution:**
- Verify `LocaleContext` is wrapped around app
- Check document.documentElement.dir is updating
- Clear browser cache and reload

### Issue: Sidebar shows incorrect menu items
**Solution:**
- Verify `user?.role` is set correctly
- Check localStorage contains user_data
- Verify `useAuth()` hook is in AuthProvider

---

## 📝 Demo Test Accounts

### Client Account
```
Email: client@example.com
Password: password123
Role: Client
Expected Redirect: /dashboard/client
```

### Lawyer Account
```
Email: lawyer@example.com
Password: password123
Role: Lawyer
Expected Redirect: /dashboard/lawyer
```

### Admin Account
```
Email: admin@example.com
Password: password123
Role: Admin
Expected Redirect: /dashboard/admin (if implemented)
```

---

## ✨ Next Steps (Future Enhancement)

- [ ] Implement case management pages (`/dashboard/lawyer/cases`, `/dashboard/client/cases`)
- [ ] Implement appointment booking (`/dashboard/client/bookings`)
- [ ] Implement appointment management (`/dashboard/lawyer/appointments`)
- [ ] Add notification system
- [ ] Implement file upload for documents
- [ ] Add messaging system between clients and lawyers
- [ ] Add payment integration
- [ ] Add analytics dashboard
- [ ] Implement email notifications
- [ ] Add two-factor authentication

---

**Status**: ✅ Ready for Testing
**Last Updated**: January 14, 2026
