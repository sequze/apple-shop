import api from "../api.js";

export class CategoriesService {
    static async getAllCategories(){
        try {
            const { data } = await api.get("/api/categories/");
            return data;
        } catch (err) {
            console.error(err);
        }
    }

    static async createCategory(name) {
        try {
            const { data } = await api.post("/api/categories/", {
                name,
            })

            return data;
        } catch (err) {
            console.error(err);
        }
    }

    static async updateCategoryImage(id, formData) {
        try {
            const { data } = await api.post(`/api/categories/${id}/image`, formData);
            return data;
        } catch (err) {
            console.error(err);
        }
    }

    static async createCategoryDiscount(id, percent, start_date, end_date, description, is_active=true) {
        try {
            const { data } = await api.post(`/api/categories/${id}/discount`, {
                    percent,
                    start_date,
                    end_date,
                    description,
                    is_active
            });

            return data;
        } catch (err) {
            console.error(err);
        }
    }
}