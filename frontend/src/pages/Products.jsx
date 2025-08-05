import React from 'react';
import {useParams} from "react-router-dom";
import ListProducts from "../components/products/ListProducts.jsx";

const Products = ({categories, products}) => {
    const {type} = useParams();
    const normalizedType = type.toLowerCase();

    const currentCategory = categories.find(category => category.type === normalizedType);
    const currentProducts = products.filter(product => product.type === normalizedType);
    return (
        <ListProducts currentCategory={currentCategory} currentProducts={currentProducts}/>
    );
};

export default Products;