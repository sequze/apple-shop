import api from "../api.js";


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
            const access_token = response.data.access_token;
            if (!access_token) {
                throw new Error("No access token returned");
            }

            return { access_token };
        } catch (error) {
            throw error.response?.data || error;
        }
    }

    static async checkAuth() {
        const token = localStorage.getItem("access");
        if (!token) return false;

        try {
            await this.getCurrentUser();
            return true;
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
        console.log("REFRESH");
        const response = await api.post("/api/auth/refresh", {}, {withCredentials: true});
        const newAccess = response.data.access_token;
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


    static async changePassword(old_password, new_password) {
        try {
            const response = api.post("api/auth/change_password", {
                old_password,
                new_password
            });

            console.log(response);
        } catch (err) {
            console.error(err);
        }
    }
}

