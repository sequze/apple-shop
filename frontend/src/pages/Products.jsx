import React from 'react';
import {useParams} from "react-router-dom";
import CategoryProductsPage from "../components/products/CategoryProductsPage.jsx";

const Products = ({categories, products}) => {
    const {type} = useParams();
    const normalizedType = type.toLowerCase();

    const currentCategory = categories.find(category => category.type === normalizedType);
    const currentProducts = products.filter(product => product.type === normalizedType);
    return (
        <CategoryProductsPage currentCategory={currentCategory} currentProducts={currentProducts}/>
    );
};

export default Products;