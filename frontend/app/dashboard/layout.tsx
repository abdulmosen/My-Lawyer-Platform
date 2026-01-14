"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { usePathname } from "next/navigation";
import { useLocale } from "../../context/LocaleContext";

// Demo Icons
const Icons = {
    Home: () => <span className="text-xl">🏠</span>,
    Case: () => <span className="text-xl">⚖️</span>,
    Calendar: () => <span className="text-xl">📅</span>,
    LogOut: () => <span className="text-xl">🚪</span>,
    Language: () => <span className="text-xl">🌐</span>,
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    const { locale, setLocale } = useLocale();
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    // Determine Sidebar Items based on Role
    const sidebarItems = user?.role === "lawyer"
        ? [
            {
                name_en: "Overview",
                name_ar: "نظرة عامة",
                href: "/dashboard/lawyer",
                icon: Icons.Home,
            },
            {
                name_en: "Manage Cases",
                name_ar: "إدارة القضايا",
                href: "/dashboard/lawyer/cases",
                icon: Icons.Case,
            },
            {
                name_en: "Appointments",
                name_ar: "المواعيد",
                href: "/dashboard/lawyer/appointments",
                icon: Icons.Calendar,
            },
        ]
        : [
            {
                name_en: "My Dashboard",
                name_ar: "لوحتي",
                href: "/dashboard/client",
                icon: Icons.Home,
            },
            {
                name_en: "Corporate Cases",
                name_ar: "قضايا الشركات",
                href: "/dashboard/client/cases",
                icon: Icons.Case,
            },
            {
                name_en: "Bookings",
                name_ar: "حجوزاتي",
                href: "/dashboard/client/bookings",
                icon: Icons.Calendar,
            },
        ];

    // Helper for active state
    const isActive = (href: string) => pathname === href;

    // Get display text based on locale
    const getText = (en: string, ar: string) => (locale === "ar" ? ar : en);

    return (
        <div className={`min-h-screen bg-gray-50 flex ${locale === "ar" ? "dir-rtl" : ""}`}>
            {/* Sidebar */}
            <aside
                className={`bg-[#0a192f] text-white transition-all duration-300 flex flex-col ${
                    isSidebarOpen ? "w-64" : "w-20"
                } relative z-20 shadow-lg`}
            >
                {/* Logo Section */}
                <div className={`p-6 flex items-center justify-between border-b border-white/10`}>
                    {isSidebarOpen && (
                        <h1 className="font-bold text-2xl text-[#d4af37] tracking-wider">
                            {getText("My Lawyer", "محاميي")}
                        </h1>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="text-white/70 hover:text-white transition-colors"
                        title={getText("Toggle sidebar", "تبديل الشريط الجانبي")}
                    >
                        {isSidebarOpen ? "◀" : "▶"}
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 py-6 px-3 space-y-2">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
                                isActive(item.href)
                                    ? "bg-white/10 text-[#d4af37] border-r-4 border-[#d4af37]"
                                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <div
                                className={`text-xl transition-colors ${
                                    isActive(item.href)
                                        ? "text-[#d4af37]"
                                        : "text-gray-400 group-hover:text-white"
                                }`}
                            >
                                <item.icon />
                            </div>
                            {isSidebarOpen && (
                                <span className="font-medium text-sm">
                                    {getText(item.name_en, item.name_ar)}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* User Profile & Logout */}
                <div className="p-4 border-t border-white/10 bg-[#051c2f]">
                    <div
                        className={`flex items-center gap-3 ${!isSidebarOpen && "justify-center"}`}
                    >
                        <div className="w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center text-[#0a192f] font-bold text-sm">
                            {user?.name.charAt(0).toUpperCase()}
                        </div>
                        {isSidebarOpen && (
                            <>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-medium text-white truncate">
                                        {user?.name}
                                    </p>
                                    <p className="text-xs text-gray-400 capitalize">
                                        {getText(user?.role || "", user?.role === "lawyer" ? "محامي" : "عميل")}
                                    </p>
                                </div>
                                <button
                                    onClick={logout}
                                    className="text-gray-400 hover:text-red-400 transition-colors"
                                    title={getText("Logout", "تسجيل الخروج")}
                                >
                                    <Icons.LogOut />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800">
                        {getText("Dashboard", "لوحة المعلومات")}
                    </h2>

                    {/* Language Switcher & Notifications */}
                    <div className="flex items-center gap-4">
                        {/* Language Switcher */}
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setLocale("en")}
                                className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                                    locale === "en"
                                        ? "bg-white text-[#0a192f] shadow-sm"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                English
                            </button>
                            <button
                                onClick={() => setLocale("ar")}
                                className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                                    locale === "ar"
                                        ? "bg-white text-[#0a192f] shadow-sm"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                العربية
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="w-px h-6 bg-gray-300"></div>

                        {/* Notification Bell */}
                        <button
                            className="relative p-2 text-gray-600 hover:text-[#0a192f] transition-colors"
                            title={getText("Notifications", "الإخطارات")}
                        >
                            <span className="text-xl">🔔</span>
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* User Avatar */}
                        <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center text-[#0a192f] font-bold text-xs">
                            {user?.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* Content View */}
                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
