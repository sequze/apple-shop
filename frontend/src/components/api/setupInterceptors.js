import AuthService from "./service/AuthService.js";
import api from "./api";


export function setupInterceptors(navigate) {
    api.interceptors.request.use(config => {
        const access = localStorage.getItem("access");
        if (access) {
            config.headers.Authorization = `Bearer ${access}`;
        }
        return config;
    })


    api.interceptors.response.use(
        res => res,
        async error => {
            const originalRequest = error.config;

            if (error.response?.status === 401 &&
                !originalRequest._retry &&
                !originalRequest.url.includes("/api/auth/refresh")
            ) {
                originalRequest._retry = true;

                try {
                    const newAccess = await AuthService.refreshToken();
                    originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    localStorage.removeItem("access");
                    navigate("/login");
                    return Promise.reject(refreshError);
                }
            }

            if (
                error.response?.status === 401 &&
                !originalRequest.url.includes("/api/auth/refresh")
            ) {
                localStorage.removeItem("access");
                navigate("/login");
            }

            return Promise.reject(error);
        }
    )
}

