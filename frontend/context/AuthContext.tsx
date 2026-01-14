"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authService } from "../services/authService";
import { useRouter } from "next/navigation";

// Define User Type
interface User {
    id: number;
    name: string;
    email: string;
    role: "client" | "lawyer" | "admin";
    avatar_url?: string;
    phone?: string;
    specialization?: string; // For lawyers
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    register: (data: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
        role: "client" | "lawyer";
    }) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Loading Skeleton Component
const AuthSkeleton = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 z-50">
        <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-[#0a192f] border-t-[#d4af37] rounded-full animate-spin"></div>
            <p className="text-[#0a192f] font-medium animate-pulse">
                Checking Secure Session...
            </p>
        </div>
    </div>
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Load User on Mount
    useEffect(() => {
        const initAuth = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem("auth_token");
                const storedUser = localStorage.getItem("user_data");

                if (token && storedUser) {
                    // Validate token by attempting to fetch user
                    try {
                        const userData = await authService.getUser();
                        setUser(userData);
                        localStorage.setItem("user_data", JSON.stringify(userData));
                    } catch (error) {
                        // Token invalid, clear storage
                        localStorage.removeItem("auth_token");
                        localStorage.removeItem("user_data");
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Auth initialization error:", error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    // Refresh user data
    const refreshUser = useCallback(async () => {
        try {
            const userData = await authService.getUser();
            setUser(userData);
            localStorage.setItem("user_data", JSON.stringify(userData));
        } catch (error) {
            console.error("Failed to refresh user:", error);
            // If refresh fails, logout user
            await logout();
        }
    }, []);

    const login = async (credentials: { email: string; password: string }) => {
        setIsLoading(true);
        try {
            const response = await authService.login(credentials);
            const { token, user: userData } = response.data;

            // Store Securely
            localStorage.setItem("auth_token", token);
            localStorage.setItem("user_data", JSON.stringify(userData));
            setUser(userData);

            // Redirect based on role
            const redirectPath =
                userData.role === "lawyer"
                    ? "/dashboard/lawyer"
                    : "/dashboard/client";

            router.push(redirectPath);
        } catch (error: any) {
            console.error("Login failed:", error.message);
            throw new Error(
                error.response?.data?.message || "Login failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (formData: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
        role: "client" | "lawyer";
    }) => {
        setIsLoading(true);
        try {
            const response = await authService.register(formData);
            const { token, user: userData } = response.data;

            // Store Securely
            localStorage.setItem("auth_token", token);
            localStorage.setItem("user_data", JSON.stringify(userData));
            setUser(userData);

            // Redirect based on role
            const redirectPath =
                userData.role === "lawyer"
                    ? "/dashboard/lawyer"
                    : "/dashboard/client";

            router.push(redirectPath);
        } catch (error: any) {
            console.error("Registration failed:", error.message);
            throw new Error(
                error.response?.data?.message ||
                    "Registration failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            // Attempt to notify backend
            await authService.logout();
        } catch (error) {
            // Ignore errors on logout
            console.error("Logout API error:", error);
        } finally {
            // Clear local state regardless
            localStorage.removeItem("auth_token");
            localStorage.removeItem("user_data");
            setUser(null);
            setIsLoading(false);
            router.push("/login");
        }
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: user !== null,
        login,
        register,
        logout,
        refreshUser,
    };

    if (isLoading) {
        return <AuthSkeleton />;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
