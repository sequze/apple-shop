import axios from "axios";

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

}