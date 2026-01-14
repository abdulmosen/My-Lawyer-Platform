"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/context/LocaleContext";
import { useState } from "react";

export default function RegisterPage() {
    const { register, isLoading } = useAuth();
    const { locale } = useLocale();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "client" as "client" | "lawyer",
    });
    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.password_confirmation) {
            setError(getText("Passwords do not match", "كلمات المرور غير متطابقة"));
            return;
        }

        try {
            await register(formData);
        } catch (err: any) {
            setError(err.message || "Registration failed");
        }
    };

    const getText = (en: string, ar: string) => (locale === "ar" ? ar : en);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a192f] to-[#051c2f] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#0a192f] mb-2">
                        {getText("Create Account", "إنشاء حساب")}
                    </h1>
                    <p className="text-gray-600">
                        {getText("Join My Lawyer Platform", "انضم إلى منصة محاميي")}
                    </p>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {getText("Full Name", "الاسم الكامل")}
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                            placeholder={getText("John Doe", "أحمد محمد")}
                        />
                    </div>

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
                            placeholder="user@example.com"
                        />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {getText("Account Type", "نوع الحساب")}
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                        >
                            <option value="client">
                                {getText("Client", "عميل")}
                            </option>
                            <option value="lawyer">
                                {getText("Lawyer", "محامي")}
                            </option>
                        </select>
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

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {getText("Confirm Password", "تأكيد كلمة المرور")}
                        </label>
                        <input
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
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
                        {isLoading
                            ? getText("Creating Account...", "جاري إنشاء الحساب...")
                            : getText("Register", "التسجيل")}
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

                {/* Login Link */}
                <p className="text-center text-gray-600 text-sm">
                    {getText("Already have an account?", "هل لديك حساب بالفعل؟")}{" "}
                    <Link
                        href="/login"
                        className="text-[#d4af37] font-bold hover:text-[#0a192f]"
                    >
                        {getText("Login here", "تسجيل الدخول هنا")}
                    </Link>
                </p>
            </div>
        </div>
    );
}
