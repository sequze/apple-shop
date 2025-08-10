import {createContext, useEffect, useState} from "react";
import {CategoriesService} from "../components/api/CategoriesService.js";

export const CategoriesContext = createContext(null);

export const CategoriesProvider = ({children}) => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        CategoriesService.getAllCategories()
            .then(data => setCategories(data))
            .finally(setLoading(false));

    }, [])


    return (
        <CategoriesContext.Provider value={{categories, isLoading}}>
            {children}
        </CategoriesContext.Provider>
    )
}