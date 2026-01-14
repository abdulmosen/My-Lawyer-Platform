"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

// Translation content
const translations = {
    en: {
        brand: "My Lawyer",
        headline: "Justice You Can Trust, Expertise You Can Rely On",
        subheadline:
            "Top-tier legal representation for corporate and personal matters. Secure, confidential, and always by your side.",
        cta_primary: "Book a Consultation",
        cta_secondary: "Our Services",
        language: "العربية",
        support_text: "24/7 Support Available",
        features: {
            title: "Why Choose My Lawyer?",
            items: [
                {
                    title: "Expert Lawyers",
                    description:
                        "Highly qualified legal professionals with years of experience",
                },
                {
                    title: "Secure & Confidential",
                    description:
                        "Your information is protected with enterprise-grade encryption",
                },
                {
                    title: "Fast Response",
                    description: "Get legal advice within 24 hours of consultation request",
                },
                {
                    title: "Bilingual Support",
                    description: "Services available in English and Arabic",
                },
            ],
        },
    },
    ar: {
        brand: "محاميي",
        headline: "عدالة يمكنك الوثوق بها، وخبرة تعتمد عليها",
        subheadline:
            "تمثيل قانوني من الطراز الأول للشركات والأفراد. آمن، سري، ومعك دائماً.",
        cta_primary: "احجز استشارة",
        cta_secondary: "خدماتنا",
        language: "English",
        support_text: "الدعم متاح 24/7",
        features: {
            title: "لماذا تختار محاميي؟",
            items: [
                {
                    title: "محامون خبراء",
                    description: "متخصصون قانونيون مؤهلون مع سنوات من الخبرة",
                },
                {
                    title: "آمن وسري",
                    description:
                        "معلوماتك محمية بتشفير من الدرجة الأولى",
                },
                {
                    title: "استجابة سريعة",
                    description:
                        "احصل على استشارة قانونية في غضون 24 ساعة",
                },
                {
                    title: "دعم ثنائي اللغة",
                    description: "الخدمات متاحة باللغة الإنجليزية والعربية",
                },
            ],
        },
    },
};

export default function HeroSection() {
    const { locale, setLocale } = useLocale();
    const t = translations[locale];
    const isRTL = locale === "ar";

    return (
        <div className={`${isRTL ? "dir-rtl" : ""}`}>
            {/* Navbar */}
            <nav className="w-full py-4 px-8 flex justify-between items-center bg-white shadow-sm z-50 sticky top-0">
                <div className="font-bold text-2xl text-[#0a192f]">
                    {t.brand}
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() =>
                            setLocale(locale === "en" ? "ar" : "en")
                        }
                        className="text-sm font-medium text-[#0a192f] border border-[#0a192f] px-4 py-2 rounded-lg hover:bg-[#0a192f] hover:text-white transition-colors duration-200"
                    >
                        {t.language}
                    </button>
                    <Link
                        href="/login"
                        className="text-sm font-medium text-white bg-[#0a192f] px-4 py-2 rounded-lg hover:bg-[#051c2f] transition-colors duration-200"
                    >
                        {locale === "en" ? "Sign In" : "تسجيل الدخول"}
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a192f] via-[#051c2f] to-[#0a192f] overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

                {/* Content Container */}
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="flex flex-col justify-center">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fadeIn">
                                {t.headline}
                            </h1>
                            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                                {t.subheadline}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/register"
                                    className="px-8 py-3 bg-[#d4af37] text-[#0a192f] font-bold rounded-lg shadow-lg hover:bg-[#aa8c2c] transition-all duration-200 hover:scale-105 text-center"
                                >
                                    {t.cta_primary}
                                </Link>
                                <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-200">
                                    {t.cta_secondary}
                                </button>
                            </div>

                            {/* Social Proof */}
                            <div className="mt-12 flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full bg-[#d4af37] border-2 border-[#0a192f] flex items-center justify-center text-[#0a192f] font-bold"
                                        >
                                            {i}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p className="text-white font-semibold">
                                        {locale === "en"
                                            ? "500+ Happy Clients"
                                            : "500+ عميل راضٍ"}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        {locale === "en"
                                            ? "Trusted legal professionals"
                                            : "متخصصون قانونيون موثوقون"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Section */}
                        <div className="relative w-full h-[400px] md:h-[500px] hidden md:block">
                            <div className="relative w-full h-full bg-gradient-to-br from-[#112240] to-[#051c2f] border border-white/10 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden group">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\"><path d=\"M0 0h40v40H0z\" fill=\"none\" stroke=\"%23d4af37\" stroke-width=\"0.5\" opacity=\"0.1\"/><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"%23d4af37\" opacity=\"0.15\"/></svg>')] opacity-50"></div>

                                {/* Scale Badge */}
                                <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
                                    <p className="text-[#d4af37] font-bold text-sm">
                                        {locale === "en"
                                            ? "Legal Excellence"
                                            : "تميز قانوني"}
                                    </p>
                                </div>

                                {/* Center Icon */}
                                <div className="text-center">
                                    <div className="text-9xl opacity-30 transform group-hover:scale-110 transition-transform duration-300">
                                        ⚖️
                                    </div>
                                    <p className="text-white/40 mt-4 text-sm">
                                        {locale === "en"
                                            ? "Trusted & Verified"
                                            : "موثوق و معتمد"}
                                    </p>
                                </div>

                                {/* Support Badge */}
                                <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 max-w-xs hover:bg-white/20 transition-all duration-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-white text-sm font-medium">
                                            {t.support_text}
                                        </span>
                                    </div>
                                </div>

                                {/* Decorative Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-[#0a192f] mb-12">
                        {t.features.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {t.features.items.map((feature, idx) => (
                            <div
                                key={idx}
                                className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#d4af37] hover:shadow-lg transition-all duration-200 group"
                            >
                                <div className="w-12 h-12 bg-[#d4af37]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#d4af37] group-hover:scale-110 transition-all duration-200">
                                    <span className="text-2xl">
                                        {idx === 0
                                            ? "👨‍⚖️"
                                            : idx === 1
                                              ? "🔒"
                                              : idx === 2
                                                ? "⚡"
                                                : "🌐"}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-[#0a192f] mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-[#0a192f] to-[#051c2f]">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        {locale === "en"
                            ? "Ready to Get Started?"
                            : "هل أنت مستعد للبدء؟"}
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        {locale === "en"
                            ? "Contact our expert team today for a free consultation."
                            : "اتصل بفريقنا المتخصص اليوم للحصول على استشارة مجانية."}
                    </p>
                    <Link
                        href="/register"
                        className="inline-block px-8 py-3 bg-[#d4af37] text-[#0a192f] font-bold rounded-lg hover:bg-[#aa8c2c] transition-all duration-200 hover:scale-105"
                    >
                        {t.cta_primary}
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-[#020c1b] border-t border-white/10">
                <div className="container mx-auto px-6 text-center text-gray-400">
                    <p>
                        {locale === "en"
                            ? "© 2026 My Lawyer. All rights reserved."
                            : "© 2026 محاميي. جميع الحقوق محفوظة."}
                    </p>
                </div>
            </footer>
        </div>
    );
}
