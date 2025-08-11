import {createContext, useEffect, useState} from "react";
import {CategoriesService} from "../components/api/service/CategoriesService.js";
import card1 from "../assets/categories/card-1.jpeg";
import card2 from "../assets/categories/card-2.jpeg";
import card3 from "../assets/categories/card-3.jpeg";
import card4 from "../assets/categories/card-4.jpeg";
import card5 from "../assets/categories/card-5.jpeg";

export const CategoriesContext = createContext(null);

export const CategoriesProvider = ({children}) => {

    const mockCategories = [
        { img: card1, title: "iPhone", type: "iphone" },
        { img: card2, title: "Macbook", type: "macbook" },
        { img: card3, title: "Airpods", type: "airpods" },
        { img: card4, title: "Apple Watch", type: "watch" },
        { img: card5, title: "Apple Mini", type: "mini" }
    ];

    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        CategoriesService.getAllCategories()
            .then(data => {
                if (data && data.length > 0) setCategories(data);
                else setCategories(mockCategories);
            })
            .catch(() => {
                setCategories(mockCategories)
            })
            .finally(() => setLoading(false));

    }, [])


    return (
        <CategoriesContext.Provider value={{categories, isLoading}}>
            {children}
        </CategoriesContext.Provider>
    )
}