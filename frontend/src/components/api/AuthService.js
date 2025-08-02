import { jwtDecode } from "jwt-decode";
import api from "./api";


export default class AuthService {

    static async register(email, password, fullName) {
        try {
            const response = await api.post('/api/auth/register', {
                email,
                password,
                full_name: fullName
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }


    static async login(email, password) {
        try {
            const response = await api.post("/api/auth/login", {
                email,
                password
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }

    static async checkAuth() {
        const access = localStorage.getItem("access");
        if (!access) return false;
        try {
            const { exp } = jwtDecode(access);
            if (!exp) return false;

            return exp * 1000 > Date.now();
        } catch {
            return false;
        }
    }

    static async logout(navigate) {
        try {
            await api.post("/api/auth/logout", {}, {
                withCredentials: true,
            });
        } catch (e) {

        } finally {
            localStorage.removeItem("access");
            if (navigate) navigate("/login");
            else window.location.href = "/login";
        }
    }

    static async refreshToken() {
        const response = await api.post("/api/auth/refresh", {}, {withCredentials: true});
        const newAccess = response.data.access;
        localStorage.setItem("access", newAccess);
        return newAccess;
    }

    static async getCurrentUser() {
        const token = localStorage.getItem('access');

        return api.get("/api/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

}

