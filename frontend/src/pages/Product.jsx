import React from 'react';
import {useParams} from "react-router-dom";
import ProductContent from "../components/product/ProductContent.jsx";

const Product = ({products}) => {
    const {id} = useParams();

    const currentProduct = products.find(product => product.description
        .toLowerCase().replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") === id);

    return (
        <ProductContent product={currentProduct} />
    );
};

export default Product;