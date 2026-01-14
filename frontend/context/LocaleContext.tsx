"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface LocaleContextType {
    locale: "en" | "ar";
    setLocale: (locale: "en" | "ar") => void;
    dir: "ltr" | "rtl";
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocaleState] = useState<"en" | "ar">("ar");

    const setLocale = useCallback((newLocale: "en" | "ar") => {
        setLocaleState(newLocale);
        localStorage.setItem("locale", newLocale);

        // Update document direction
        if (typeof document !== "undefined") {
            document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
            document.documentElement.lang = newLocale;
        }
    }, []);

    const dir = locale === "ar" ? "rtl" : "ltr";

    return (
        <LocaleContext.Provider value={{ locale, setLocale, dir }}>
            {children}
        </LocaleContext.Provider>
    );
};

export const useLocale = () => {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error("useLocale must be used within a LocaleProvider");
    }
    return context;
};
