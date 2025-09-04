class CartService {
    static async addToCart(product_id, quantity) {
        try {
            const {data} = await api.post(`/api/cart_items/add_to_cart`, {
                product_id,
                quantity
            });
            return data;
        } catch (err) {
            console.error(err);
        }
    }
}