import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import CategoryProductsPage from "../components/products/CategoryProductsPage.jsx";
import ProductsService from "../components/api/service/ProductsService.js";
import Loader from "../components/Loader.jsx";
import {CategoriesContext} from "../context/CategoriesContext.jsx";

const Products = () => {
    const { categoryId } = useParams();
    const numericId = Number(categoryId);

    const {categories} = useContext(CategoriesContext);
    const currentCategory = categories.find(category => category.id === numericId);


    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const getProducts = async () => {
            try {
                const productsData = await ProductsService.getProducts(numericId);
                console.log(productsData)
                setProducts(productsData);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false)
            }
        }
        getProducts();
    }, [numericId, currentCategory]);

    if (isLoading) return (
        <div className="absolute top-0 left-0 w-full min-h-screen flex justify-center items-center bg-[#fff]">
            <div className="w-[200px] h-[200px] flex justify-center">
                <Loader />
            </div>
        </div>
    )

    return (
        <CategoryProductsPage currentCategory={currentCategory} currentProducts={products}/>
    );
};

export default Products;