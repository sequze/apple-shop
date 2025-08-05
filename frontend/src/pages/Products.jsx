import React from 'react';
import {useParams} from "react-router-dom";
import ListProducts from "../components/products/ListProducts.jsx";

const Products = ({categories, products}) => {
    const {type} = useParams();

    const currentCategory = categories.find(category => category.type === type);
    const currentProducts = products.filter(product => product.type === type);
    return (
        <ListProducts currentCategory={currentCategory} currentProducts={currentProducts}/>
    );
};

export default Products;