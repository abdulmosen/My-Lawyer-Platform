"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/context/LocaleContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const { login, isLoading } = useAuth();
    const { locale } = useLocale();
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await login(formData);
        } catch (err: any) {
            setError(err.message || "Login failed");
        }
    };

    const getText = (en: string, ar: string) => (locale === "ar" ? ar : en);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a192f] to-[#051c2f] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#0a192f] mb-2">
                        {getText("My Lawyer", "محاميي")}
                    </h1>
                    <p className="text-gray-600">
                        {getText("Secure Legal Platform", "منصة قانونية آمنة")}
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {getText("Email Address", "عنوان البريد الإلكتروني")}
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                            placeholder={getText("user@example.com", "user@example.com")}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {getText("Password", "كلمة المرور")}
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#0a192f] text-white font-bold py-2 rounded-lg hover:bg-[#051c2f] transition-colors disabled:opacity-50"
                    >
                        {isLoading ? getText("Signing in...", "جاري التسجيل...") : getText("Sign In", "تسجيل الدخول")}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-gray-500 text-sm">
                        {getText("or", "أو")}
                    </span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Register Link */}
                <p className="text-center text-gray-600 text-sm">
                    {getText("Don't have an account?", "ليس لديك حساب؟")}{" "}
                    <Link
                        href="/register"
                        className="text-[#d4af37] font-bold hover:text-[#0a192f]"
                    >
                        {getText("Register here", "سجل هنا")}
                    </Link>
                </p>

                {/* Demo Credentials */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs font-bold text-blue-900 mb-2">
                        {getText("Demo Credentials", "بيانات العرض التوضيحي")}
                    </p>
                    <p className="text-xs text-blue-800 mb-1">
                        <strong>Client:</strong> client@example.com / password123
                    </p>
                    <p className="text-xs text-blue-800">
                        <strong>Lawyer:</strong> lawyer@example.com / password123
                    </p>
                </div>
            </div>
        </div>
    );
}
