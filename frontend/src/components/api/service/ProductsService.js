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

}