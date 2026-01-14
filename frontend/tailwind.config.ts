import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./context/**/*.{js,ts,jsx,tsx,mdx}",
        "./services/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Brand Colors - Navy Blue & Gold Theme
                primary: {
                    DEFAULT: "#0a192f", // Deep Navy Blue
                    light: "#112240", // Lighter Navy
                    dark: "#020c1b", // Darker Navy
                    foreground: "#ffffff", // Text on primary
                },
                accent: {
                    DEFAULT: "#d4af37", // Soft Muted Gold
                    hover: "#aa8c2c", // Darker Gold (hover state)
                    light: "#e8d5a0", // Light Gold
                },
                // Functional Colors
                background: "#ffffff",
                surface: "#f8f9fa", // Light gray surface
                border: "#e2e8f0", // Light border color
                success: "#10b981",
                warning: "#f59e0b",
                error: "#ef4444",
                info: "#3b82f6",
            },
            fontFamily: {
                // Fonts for English (LTR) and Arabic (RTL)
                sans: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
                arabic: ["var(--font-tajawal)", "Tajawal", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
            fontSize: {
                xs: ["0.75rem", { lineHeight: "1rem" }],
                sm: ["0.875rem", { lineHeight: "1.25rem" }],
                base: ["1rem", { lineHeight: "1.5rem" }],
                lg: ["1.125rem", { lineHeight: "1.75rem" }],
                xl: ["1.25rem", { lineHeight: "1.75rem" }],
                "2xl": ["1.5rem", { lineHeight: "2rem" }],
                "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
            },
            spacing: {
                0: "0",
                1: "0.25rem",
                2: "0.5rem",
                3: "0.75rem",
                4: "1rem",
                6: "1.5rem",
                8: "2rem",
                12: "3rem",
                16: "4rem",
                20: "5rem",
                24: "6rem",
                32: "8rem",
            },
            borderRadius: {
                none: "0",
                sm: "0.125rem",
                DEFAULT: "0.375rem",
                md: "0.375rem",
                lg: "0.5rem",
                xl: "0.75rem",
                "2xl": "1rem",
                "3xl": "1.5rem",
                full: "9999px",
            },
            boxShadow: {
                none: "none",
                sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            },
            animation: {
                spin: "spin 1s linear infinite",
                pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                bounce: "bounce 1s infinite",
                fadeIn: "fadeIn 0.3s ease-in",
                slideIn: "slideIn 0.3s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideIn: {
                    "0%": { transform: "translateY(-10px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
            opacity: {
                0: "0",
                5: "0.05",
                10: "0.1",
                20: "0.2",
                25: "0.25",
                30: "0.3",
                40: "0.4",
                50: "0.5",
                60: "0.6",
                70: "0.7",
                75: "0.75",
                80: "0.8",
                90: "0.9",
                95: "0.95",
                100: "1",
            },
            transitionDuration: {
                0: "0ms",
                75: "75ms",
                100: "100ms",
                150: "150ms",
                200: "200ms",
                300: "300ms",
                500: "500ms",
                700: "700ms",
                1000: "1000ms",
            },
        },
    },
    plugins: [
        require("tailwindcss-rtl"), // Automatic RTL support for Arabic
        require("@tailwindcss/forms"), // Tailwind forms styling
        // Custom utility for better RTL support
        function ({ addComponents, theme }: any) {
            addComponents({
                ".btn-primary": {
                    "@apply px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200":
                        {},
                },
                ".btn-accent": {
                    "@apply px-4 py-2 bg-accent text-primary font-medium rounded-lg hover:bg-accent-hover transition-colors duration-200":
                        {},
                },
                ".btn-secondary": {
                    "@apply px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200":
                        {},
                },
                ".card": {
                    "@apply bg-white rounded-lg shadow p-6 border border-border": {},
                },
                ".card-hover": {
                    "@apply bg-white rounded-lg shadow p-6 border border-border hover:shadow-lg transition-shadow duration-200 cursor-pointer":
                        {},
                },
                ".input-primary": {
                    "@apply w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent":
                        {},
                },
                ".label-primary": {
                    "@apply block text-sm font-medium text-gray-700 mb-2": {},
                },
                ".badge-primary": {
                    "@apply inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-white":
                        {},
                },
                ".badge-accent": {
                    "@apply inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent text-primary":
                        {},
                },
                ".badge-success": {
                    "@apply inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800":
                        {},
                },
                ".badge-error": {
                    "@apply inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800":
                        {},
            });
        },
    ],
    safelist: [
        // SafeList for dynamic classes
        "rtl",
        "ltr",
        "dir-rtl",
        "dir-ltr",
        // Dynamic color classes
        "text-primary",
        "text-accent",
        "bg-primary",
        "bg-accent",
        "border-primary",
        "border-accent",
    ],
};

export default config;
