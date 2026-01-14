"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/context/LocaleContext";

export default function ClientDashboard() {
    const { user } = useAuth();
    const { locale } = useLocale();

    const getText = (en: string, ar: string) => (locale === "ar" ? ar : en);

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-[#0a192f] to-[#051c2f] text-white rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-2">
                    {getText("Welcome Back", "أهلا وسهلا")}, {user?.name}! 👋
                </h1>
                <p className="text-gray-300">
                    {getText(
                        "Manage your legal cases and consultations",
                        "إدارة قضاياك القانونية والاستشارات الخاصة بك"
                    )}
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Active Cases */}
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#d4af37]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">
                                {getText("Active Cases", "القضايا النشطة")}
                            </p>
                            <p className="text-3xl font-bold text-[#0a192f] mt-2">
                                3
                            </p>
                        </div>
                        <div className="text-4xl">⚖️</div>
                    </div>
                </div>

                {/* Upcoming Consultations */}
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#d4af37]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">
                                {getText(
                                    "Upcoming Consultations",
                                    "الاستشارات القادمة"
                                )}
                            </p>
                            <p className="text-3xl font-bold text-[#0a192f] mt-2">
                                2
                            </p>
                        </div>
                        <div className="text-4xl">📅</div>
                    </div>
                </div>

                {/* Total Spent */}
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#d4af37]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">
                                {getText("Total Invested", "إجمالي الاستثمار")}
                            </p>
                            <p className="text-3xl font-bold text-[#0a192f] mt-2">
                                $5,200
                            </p>
                        </div>
                        <div className="text-4xl">💰</div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-[#0a192f] mb-4">
                    {getText("Recent Activity", "النشاط الأخير")}
                </h2>
                <div className="space-y-4">
                    {[
                        {
                            en: "Corporate case opened",
                            ar: "تم فتح قضية شركة",
                            date: "2 days ago",
                            dateAr: "منذ يومين",
                        },
                        {
                            en: "Consultation scheduled",
                            ar: "تم جدولة الاستشارة",
                            date: "5 days ago",
                            dateAr: "منذ 5 أيام",
                        },
                        {
                            en: "Document uploaded",
                            ar: "تم تحميل المستند",
                            date: "1 week ago",
                            dateAr: "منذ أسبوع",
                        },
                    ].map((activity, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-0"
                        >
                            <span className="text-gray-700">
                                {getText(activity.en, activity.ar)}
                            </span>
                            <span className="text-sm text-gray-500">
                                {getText(activity.date, activity.dateAr)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-[#d4af37] rounded-lg p-6 text-[#0a192f]">
                <h3 className="text-xl font-bold mb-2">
                    {getText("Need Legal Help?", "هل تحتاج إلى مساعدة قانونية؟")}
                </h3>
                <p className="mb-4">
                    {getText(
                        "Book a consultation with our expert lawyers today.",
                        "احجز استشارة مع محامينا الخبراء اليوم."
                    )}
                </p>
                <button className="bg-[#0a192f] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#051c2f] transition-colors">
                    {getText("Book Now", "احجز الآن")}
                </button>
            </div>
        </div>
    );
}
