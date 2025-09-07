import api from "../api.js";

export default class CartService {
    static async addToCart(product_id, quantity, color_id) {
        try {
            const payload = { product_id, quantity };
            if (color_id !== undefined && color_id !== null) {
                payload.color_id = color_id;
            }

            console.log("Отправка запроса addToCart:", payload);

            const { data } = await api.post(`/api/cart_items/add_to_cart`, payload);
            console.log("Ответ addToCart:", data);

            // Обработка разных форматов ответа
            if (data.items && Array.isArray(data.items)) {
                return data.items.map(item => this.normalizeCartItem(item));
            } else if (Array.isArray(data)) {
                return data.map(item => this.normalizeCartItem(item));
            } else {
                console.error("Неожиданный формат ответа:", data);
                return [];
            }
        } catch (error) {
            console.error("Ошибка при добавлении в корзину:", error);
            throw error;
        }
    }

    static async getCartItems() {
        try {
            console.log("Запрос getCartItems");
            const { data } = await api.get(`/api/cart_items/`);
            console.log("Ответ getCartItems:", data);

            if (data.items && Array.isArray(data.items)) {
                return data.items.map(item => this.normalizeCartItem(item));
            } else if (Array.isArray(data)) {
                return data.map(item => this.normalizeCartItem(item));
            } else {
                console.error("Неожиданный формат ответа корзины:", data);
                return [];
            }
        } catch (error) {
            console.error("Ошибка при получении корзины:", error);
            throw error;
        }
    }

    static async getCartItemById(cartItemId) {
        try {
            console.log("Запрос getCartItemById:", cartItemId);
            const { data } = await api.get(`/api/cart_items/${cartItemId}`);
            console.log("Ответ getCartItemById:", data);
            return this.normalizeCartItem(data);
        } catch (error) {
            console.error("Ошибка при получении элемента корзины:", error);
            throw error;
        }
    }

    static async updateCartItems(cartItemId, quantity) {
        try {
            console.log("Запрос updateCartItems:", { cartItemId, quantity });

            const { data } = await api.patch(`/api/cart_items/${cartItemId}`, {
                quantity: quantity
            });

            console.log("Ответ updateCartItems:", data);
            return this.normalizeCartItem(data);

        } catch (error) {
            console.error("Ошибка при обновлении элемента корзины:", error);
            throw error;
        }
    }

    static async deleteCartItem(cartItemId) {
        try {
            console.log("Запрос deleteCartItem:", cartItemId);
            const { data } = await api.delete(`/api/cart_items/${cartItemId}`);
            console.log("Ответ deleteCartItem:", data);
            return data;
        } catch (error) {
            console.error("Ошибка при удалении элемента корзины:", error);
            throw error;
        }
    }

    static normalizeCartItem(item) {
        if (!item) return null;

        return {
            id: item.id || null,
            quantity: item.quantity || 0,
            user_id: item.user_id || null,
            product_id: item.product_id || item.product?.id || null,
            color_id: item.color_id || null,
            total_price: item.total_price ? parseFloat(item.total_price) : 0,
            discount: item.discount ? parseFloat(item.discount) : 0,
            discount_description: item.discount_description || "",
            price_with_discount: item.price_with_discount ? parseFloat(item.price_with_discount) : 0,
            color_name: item.color_name || "",
            product: {
                id: item.product?.id || null,
                name: item.product?.name || "",
                description: item.product?.description || "",
                price: item.product?.price ? parseFloat(item.product.price) : 0,
                category_id: item.product?.category_id || null,
                created_at: item.product?.created_at || "",
                discounts: item.product?.discounts || [],
                colors: item.product?.colors || [],
                characteristics: item.product?.characteristics || []
            }
        };
    }
}