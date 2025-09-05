import api from "../api.js";

export default class CartService {
    static async addToCart(product_id, quantity, color_id) {
        try {
            const payload = { product_id, quantity };
            if (color_id !== undefined) payload.color_id = color_id;

            const { data } = await api.post(`/api/cart_items/add_to_cart`, payload);
            return data;
        } catch (err) {
            console.error(err.response?.data || err.message);
            throw err; // чтобы компонент знал о проблеме
        }
    }

    static async getCartItems() {
        try {
            const { data } = await api.get(`/api/cart_items/`);
            return data;
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    }
}
