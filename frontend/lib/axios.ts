import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

/**
 * Axios Instance Configuration
 * Handles API requests to Laravel backend with Sanctum authentication
 */

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true, // Enable cookies for Sanctum (SPA mode)
    timeout: 15000, // 15 second timeout
});

/**
 * Request Interceptor
 * Attaches authentication token and locale to every request
 */
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 1. Attach Language Header
        if (typeof window !== "undefined") {
            const locale = localStorage.getItem("locale") || "ar";
            config.headers["Accept-Language"] = locale;

            // 2. Attach Bearer Token (if using Token auth)
            const token = localStorage.getItem("auth_token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * Handles global error responses and token refresh
 */
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        // Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh token
                const refreshResponse = await api.post("/auth/refresh-token");
                const { token } = refreshResponse.data;

                // Update stored token
                if (typeof window !== "undefined") {
                    localStorage.setItem("auth_token", token);
                }

                // Update authorization header
                if (originalRequest.headers) {
                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                }

                // Retry original request with new token
                return api(originalRequest);
            } catch (refreshError) {
                // Token refresh failed, redirect to login
                if (typeof window !== "undefined") {
                    localStorage.removeItem("auth_token");
                    localStorage.removeItem("user_data");
                    window.location.href = "/login";
                }
                return Promise.reject(refreshError);
            }
        }

        // Handle 403 Forbidden
        if (error.response?.status === 403) {
            console.error("Access forbidden:", error.response.data);
        }

        // Handle 404 Not Found
        if (error.response?.status === 404) {
            console.error("Resource not found:", error.response.data);
        }

        // Handle 422 Validation Error
        if (error.response?.status === 422) {
            console.error("Validation error:", error.response.data);
        }

        // Handle 500+ Server Error
        if (error.response?.status && error.response.status >= 500) {
            console.error("Server error:", error.response.data);
        }

        // Handle Network Error
        if (!error.response) {
            console.error("Network error:", error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
