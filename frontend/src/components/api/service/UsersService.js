import api from "../api.js";


export default class UsersService {

    static async getUsers(page= 0, size = 20) {
        try {
            const { data } = await api.get(`/api/users/?page=${page}&size=${size}`);
            return data;
        } catch (err) {
            console.error(err);
        }
    }

    static async updateUserData({ email = "", full_name = "", is_verified = "", is_superuser = "", is_active = "" }) {
        const {id, email: old_email, full_name: old_full_name, is_verified: old_is_verified, is_superuser: old_is_superuser, is_active: old_is_active} = await this.getCurrentUser()
            .then(res => res.data)
            .catch(err => console.error(err));

        return await api.patch(`/api/users/${id}`, {
            email: email.trim() || old_email,
            full_name: full_name.trim() || old_full_name,
            is_verified: is_verified.trim() || old_is_verified,
            is_superuser: is_superuser.trim() || old_is_superuser,
            is_active: is_active.trim() || old_is_active
        });
    }

    static async uploadUserImage(formData) {
        return await api.post("/api/users/image", formData, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })
    }

    static async getUserOrders(page= 0, size= 100) {
        try {
            const {data} = await api.get(`/api/users/orders/?page=${page}&size=${size}`);
            return data;
        } catch (err) {
            console.error(err);
        }
    }

}
