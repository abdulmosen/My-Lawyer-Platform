import api from "../lib/axios";

// TypeScript Interfaces
interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: "client" | "lawyer";
    phone?: string;
    specialization?: string; // For lawyers
}

interface AuthResponse {
    data: {
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: "client" | "lawyer" | "admin";
            avatar_url?: string;
            phone?: string;
            specialization?: string;
        };
    };
    message: string;
}

interface UserResponse {
    id: number;
    name: string;
    email: string;
    role: "client" | "lawyer" | "admin";
    avatar_url?: string;
    phone?: string;
    specialization?: string;
}

/**
 * Authentication Service
 * Handles all auth-related API calls with Laravel Sanctum
 */
export const authService = {
    /**
     * Retrieve CSRF Cookie from Laravel
     * Required for Sanctum Cookie-based authentication
     */
    getCsrfCookie: async (): Promise<void> => {
        try {
            await api.get("/sanctum/csrf-cookie");
        } catch (error) {
            console.error("Failed to get CSRF cookie:", error);
            throw error;
        }
    },

    /**
     * Register new user (Client or Lawyer)
     */
    register: async (data: RegisterData): Promise<AuthResponse> => {
        try {
            // Uncomment for Cookie-based Sanctum auth
            // await authService.getCsrfCookie();

            const response = await api.post<AuthResponse>("/auth/register", data);
            
            // Store token if provided
            if (response.data?.data?.token) {
                localStorage.setItem("auth_token", response.data.data.token);
                // Set Authorization header
                api.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data.data.token}`;
            }

            return response.data;
        } catch (error: any) {
            console.error("Registration failed:", error.response?.data || error.message);
            throw {
                message: error.response?.data?.message || "Registration failed",
                errors: error.response?.data?.errors || {},
            };
        }
    },

    /**
     * Login with email and password
     */
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            // Uncomment for Cookie-based Sanctum auth
            // await authService.getCsrfCookie();

            const response = await api.post<AuthResponse>("/auth/login", credentials);

            // Store token if provided
            if (response.data?.data?.token) {
                localStorage.setItem("auth_token", response.data.data.token);
                // Set Authorization header
                api.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data.data.token}`;
            }

            return response.data;
        } catch (error: any) {
            console.error("Login failed:", error.response?.data || error.message);
            throw {
                message:
                    error.response?.data?.message ||
                    "Invalid credentials. Please try again.",
                errors: error.response?.data?.errors || {},
            };
        }
    },

    /**
     * Logout current user
     */
    logout: async (): Promise<{ message: string }> => {
        try {
            const response = await api.post<{ message: string }>(
                "/auth/logout"
            );

            // Clear token from storage and headers
            localStorage.removeItem("auth_token");
            delete api.defaults.headers.common["Authorization"];

            return response.data;
        } catch (error: any) {
            console.error("Logout failed:", error.response?.data || error.message);
            // Clear token even if logout request fails
            localStorage.removeItem("auth_token");
            delete api.defaults.headers.common["Authorization"];
            throw error;
        }
    },

    /**
     * Get current authenticated user
     */
    getUser: async (): Promise<UserResponse> => {
        try {
            const response = await api.get<UserResponse>("/auth/user");
            return response.data;
        } catch (error: any) {
            console.error("Failed to fetch user:", error.response?.data || error.message);
            throw {
                message: error.response?.data?.message || "Failed to fetch user",
            };
        }
    },

    /**
     * Refresh authentication token
     */
    refreshToken: async (): Promise<{ token: string }> => {
        try {
            const response = await api.post<{ token: string }>(
                "/auth/refresh-token"
            );

            // Update stored token
            if (response.data?.token) {
                localStorage.setItem("auth_token", response.data.token);
                api.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data.token}`;
            }

            return response.data;
        } catch (error: any) {
            console.error("Token refresh failed:", error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Verify if user is authenticated
     */
    isAuthenticated: (): boolean => {
        const token = localStorage.getItem("auth_token");
        return !!token;
    },

    /**
     * Get stored token
     */
    getToken: (): string | null => {
        return localStorage.getItem("auth_token");
    },

    /**
     * Update user profile
     */
    updateProfile: async (
        data: Partial<RegisterData>
    ): Promise<{ user: UserResponse; message: string }> => {
        try {
            const response = await api.put<{
                user: UserResponse;
                message: string;
            }>("/auth/profile", data);
            return response.data;
        } catch (error: any) {
            console.error("Profile update failed:", error.response?.data || error.message);
            throw {
                message: error.response?.data?.message || "Profile update failed",
                errors: error.response?.data?.errors || {},
            };
        }
    },

    /**
     * Change password
     */
    changePassword: async (data: {
        current_password: string;
        password: string;
        password_confirmation: string;
    }): Promise<{ message: string }> => {
        try {
            const response = await api.post<{ message: string }>(
                "/auth/change-password",
                data
            );
            return response.data;
        } catch (error: any) {
            console.error("Password change failed:", error.response?.data || error.message);
            throw {
                message:
                    error.response?.data?.message || "Password change failed",
                errors: error.response?.data?.errors || {},
            };
        }
    },

    /**
     * Request password reset
     */
    requestPasswordReset: async (email: string): Promise<{ message: string }> => {
        try {
            const response = await api.post<{ message: string }>(
                "/auth/forgot-password",
                { email }
            );
            return response.data;
        } catch (error: any) {
            console.error("Password reset request failed:", error.response?.data || error.message);
            throw {
                message:
                    error.response?.data?.message ||
                    "Failed to request password reset",
            };
        }
    },

    /**
     * Reset password with token
     */
    resetPassword: async (data: {
        token: string;
        email: string;
        password: string;
        password_confirmation: string;
    }): Promise<{ message: string }> => {
        try {
            const response = await api.post<{ message: string }>(
                "/auth/reset-password",
                data
            );
            return response.data;
        } catch (error: any) {
            console.error("Password reset failed:", error.response?.data || error.message);
            throw {
                message:
                    error.response?.data?.message || "Password reset failed",
                errors: error.response?.data?.errors || {},
            };
        }
    },
};
