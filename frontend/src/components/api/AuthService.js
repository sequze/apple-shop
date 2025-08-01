import axios from "axios";
import { jwtDecode } from "jwt-decode";

axios.defaults.baseURL = "http://localhost:8000";

export default class AuthService {

    static async register(email, password, fullName) {
        const response = await axios.post('/api/auth/register', {
            email,
            password,
            full_name: fullName
        });
        return response.data;
    }


    static async login(email, password) {
        const response = await axios.post("/api/auth/login", {
            email,
            password
        });
        return response.data;
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

}