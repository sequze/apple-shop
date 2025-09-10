import api from "../api.js";


export default class OrdersService {

    static async createOrder(first_name, last_name, phone_number, email, city, address_line, region, payment_method, items) {
        try {
            const {data} = await api.post(`/api/orders/`, {
                first_name,
                last_name,
                phone_number,
                email,
                city,
                address_line,
                region,
                payment_method,
                items
            });
            return data;
        } catch (err) {
            console.error(err);
        }
    }
}