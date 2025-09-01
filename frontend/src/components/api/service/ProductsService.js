import api from "../api.js";


export default class ProductsService {

    static async getProducts (category, min_price, max_price, order_by, in_stock, page = 0, size = 20)  {
        const params = new URLSearchParams();

        if (category) params.append('category', category);
        if (min_price !== undefined && min_price !== null) params.append('min_price', min_price);
        if (max_price !== undefined && max_price !== null) params.append('max_price', max_price);
        if (order_by) params.append('order_by', order_by);
        if (in_stock !== undefined && in_stock !== null) params.append('in_stock', in_stock);
        params.append('page', page);
        params.append('size', size);

        const { data } = await api.get(`/api/products/?${params.toString()}`);

        return data;
    }

    static async getProduct(id) {
        try {
            const { data } = await api.get(`/api/products/${id}`);
            return data;
        } catch (err) {
            console.error(err);
        }
    }


    static async createProducts(name, description, price, category_id) {
        try {
            const {data} = await api.post("/api/products/", {
                name,
                description,
                price,
                category_id
            })

            return data;
        } catch (err) {
            console.error(err);
        }
    }

    static async createProductColor(id, name, stock) {
        try {
            const {data} = await api.post(`/api/products/${id}/colors`, {
                name,
                stock
            });

            return data;
        } catch (err) {
            console.error(err);
        }
    }

    static async createProductDiscount(id, percent, start_date, end_date, description) {
        try {
            const {data} = await api.post(`/api/products/${id}/discount`, {
                percent,
                start_date,
                end_date,
                description,
                is_active: true
            });

            return data;
        } catch (err) {
            console.error(err);
        }
    }

    static async createProductImage(file, alt_text, is_main, color_id){
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("alt_text", alt_text);
            formData.append("is_main", is_main);
            formData.append("color_id", color_id);
            const {data} = await api.post("/api/product_images/", formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            });

            return data;
        } catch (err) {
            console.error(err);
        }
    }

    static async deleteProduct(id) {
        try {
            await api.delete(`/api/products/${id}`);
        } catch (err) {
            console.error(err);
        }
    }

    static async updateProduct(id, name, description, price, category_id) {
        try {
            await api.patch(`/api/products/${id}`, {
                name,
                description,
                price,
                category_id
            })
        } catch (err) {
            console.error(err);
        }
    }

    static async updateDiscount(discount_id, percent, start_date, end_date, description, is_active) {
        try {
            await api.patch(`/api/discounts/${discount_id}`, {
                percent,
                start_date,
                end_date,
                description,
                is_active
            })
        } catch (err) {
            console.error(err);
        }
    }

    static async updateProductColor(color_id, name, stock) {
        try {
            const { data } = await api.patch(`/api/product_colors/${color_id}`, {
                name,
                stock,
            });
            return data;
        } catch (err) {
            console.error(err);
        }
    }



}