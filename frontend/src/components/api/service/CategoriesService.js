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
}