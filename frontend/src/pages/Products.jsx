import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import CategoryProductsPage from "../components/products/CategoryProductsPage.jsx";
import ProductsService from "../components/api/service/ProductsService.js";
import {bigProducts} from "../mock/bigProducts.js";
import Loader from "../components/Loader.jsx";
import {CategoriesContext} from "../context/CategoriesContext.jsx";

const Products = () => {
    const {type} = useParams();
    const normalizedType = type.toLowerCase();

    const {categories} = useContext(CategoriesContext);
    const currentCategory = categories.find(category => category.type === normalizedType);

    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const getProducts = async () => {
            try {
                const productsData = await ProductsService.getProducts(normalizedType);
                if (productsData && productsData.length !== 0) {
                    setProducts(productsData);
                } else {
                    const currentProducts = bigProducts.filter(product => product.type === normalizedType);
                    setProducts(currentProducts);
                }
            } catch (err) {
                const currentProducts = bigProducts.filter(product => product.type === normalizedType);
                setProducts(currentProducts);
            } finally {
                setIsLoading(false)
            }
        }
        getProducts();
    }, [normalizedType, currentCategory]);

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