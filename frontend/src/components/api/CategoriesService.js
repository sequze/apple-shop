import api from "./api.js";


export class CategoriesService {
    static async getAllCategories(){
        try {
            const response = api.get("/api/categories/");
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    }
}