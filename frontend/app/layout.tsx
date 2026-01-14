import type { Metadata } from "next";
import { Montserrat, Tajawal } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LocaleProvider } from "@/context/LocaleContext";

// Load English Font (Montserrat)
const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});

// Load Arabic Font (Tajawal)
const tajawal = Tajawal({
    subsets: ["arabic"],
    variable: "--font-tajawal",
    weight: ["400", "500", "700", "800", "900"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "My Lawyer - Secure Legal Platform",
    description:
        "A secure, bilingual legal platform connecting clients with expert lawyers for corporate cases and consultations.",
    keywords: [
        "Legal Services",
        "Law Firm",
        "Corporate Cases",
        "Consultations",
        "Arabic",
        "English",
        "Bilingual",
    ],
    authors: [{ name: "My Lawyer Platform" }],
    creator: "My Lawyer",
    publisher: "My Lawyer",
    openGraph: {
        type: "website",
        locale: "ar_AE",
        url: "https://mylawyer.com",
        siteName: "My Lawyer",
        title: "My Lawyer - Secure Legal Platform",
        description:
            "A secure, bilingual legal platform for corporate legal services",
        images: [
            {
                url: "https://mylawyer.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "My Lawyer Platform",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "My Lawyer",
        description: "Secure Legal Platform",
        creator: "@mylawyer",
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ar" dir="rtl" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <link rel="canonical" href="https://mylawyer.com" />
            </head>
            <body
                className={`${montserrat.variable} ${tajawal.variable} font-arabic antialiased bg-surface`}
            >
                <LocaleProvider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </LocaleProvider>
            </body>
        </html>
    );
}
