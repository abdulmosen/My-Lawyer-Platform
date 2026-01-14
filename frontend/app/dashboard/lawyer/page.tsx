"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/context/LocaleContext";

export default function LawyerDashboard() {
    const { user } = useAuth();
    const { locale } = useLocale();

    const getText = (en: string, ar: string) => (locale === "ar" ? ar : en);

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-[#0a192f] to-[#051c2f] text-white rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-2">
                    {getText("Welcome Back", "أهلا وسهلا")}, {user?.name}! 👨‍⚖️
                </h1>
                <p className="text-gray-300">
                    {getText(
                        "Manage your cases and client appointments",
                        "إدارة قضاياك ومواعيد العملاء الخاصة بك"
                    )}
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Active Cases */}
                <div className="bg-white rounded-lg shadow p-6 border-t-4 border-[#d4af37]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">
                                {getText("Active Cases", "القضايا النشطة")}
                            </p>
                            <p className="text-3xl font-bold text-[#0a192f] mt-2">
                                8
                            </p>
                        </div>
                        <div className="text-4xl">⚖️</div>
                    </div>
                </div>

                {/* Today's Appointments */}
                <div className="bg-white rounded-lg shadow p-6 border-t-4 border-[#d4af37]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">
                                {getText(
                                    "Today's Appointments",
                                    "مواعيد اليوم"
                                )}
                            </p>
                            <p className="text-3xl font-bold text-[#0a192f] mt-2">
                                3
                            </p>
                        </div>
                        <div className="text-4xl">📅</div>
                    </div>
                </div>

                {/* Total Clients */}
                <div className="bg-white rounded-lg shadow p-6 border-t-4 border-[#d4af37]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">
                                {getText("Active Clients", "العملاء النشطون")}
                            </p>
                            <p className="text-3xl font-bold text-[#0a192f] mt-2">
                                15
                            </p>
                        </div>
                        <div className="text-4xl">👥</div>
                    </div>
                </div>

                {/* Monthly Revenue */}
                <div className="bg-white rounded-lg shadow p-6 border-t-4 border-[#d4af37]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">
                                {getText("Monthly Revenue", "الإيرادات الشهرية")}
                            </p>
                            <p className="text-3xl font-bold text-[#0a192f] mt-2">
                                $12,500
                            </p>
                        </div>
                        <div className="text-4xl">💵</div>
                    </div>
                </div>
            </div>

            {/* Pending Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Cases Needing Attention */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-[#0a192f] mb-4">
                        {getText(
                            "Cases Needing Attention",
                            "القضايا التي تحتاج إلى اهتمام"
                        )}
                    </h2>
                    <div className="space-y-3">
                        {[
                            { title: "Corporate Litigation", titleAr: "دعوى شركة" },
                            {
                                title: "Contract Review",
                                titleAr: "مراجعة العقد",
                            },
                            {
                                title: "Property Dispute",
                                titleAr: "نزاع عقاري",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <div className="w-3 h-3 bg-[#d4af37] rounded-full"></div>
                                <span className="ml-3 text-gray-700">
                                    {getText(item.title, item.titleAr)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Appointments */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-[#0a192f] mb-4">
                        {getText(
                            "Upcoming Appointments",
                            "المواعيد القادمة"
                        )}
                    </h2>
                    <div className="space-y-3">
                        {[
                            {
                                client: "Ahmed Al-Rashid",
                                clientAr: "أحمد الراشد",
                                time: "10:00 AM",
                                timeAr: "10:00 صباحًا",
                            },
                            {
                                client: "Fatima Al-Kaabi",
                                clientAr: "فاطمة القابي",
                                time: "2:00 PM",
                                timeAr: "2:00 مساءً",
                            },
                            {
                                client: "Mohammed Hassan",
                                clientAr: "محمد حسن",
                                time: "4:30 PM",
                                timeAr: "4:30 مساءً",
                            },
                        ].map((apt, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                            >
                                <div>
                                    <p className="font-medium text-gray-800">
                                        {getText(apt.client, apt.clientAr)}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {getText(apt.time, apt.timeAr)}
                                    </p>
                                </div>
                                <button className="text-[#d4af37] hover:text-[#0a192f] font-bold">
                                    →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-[#0a192f] mb-4">
                    {getText("Performance This Month", "الأداء هذا الشهر")}
                </h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-[#d4af37]">92%</p>
                        <p className="text-sm text-gray-600">
                            {getText("Case Success Rate", "معدل نجاح القضايا")}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-[#d4af37]">4.8/5</p>
                        <p className="text-sm text-gray-600">
                            {getText("Client Rating", "تقييم العميل")}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-[#d4af37]">42</p>
                        <p className="text-sm text-gray-600">
                            {getText("Hours Billed", "ساعات الفواتير")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
