import React from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {Link, useParams} from "react-router-dom";
import ListProducts from "../components/ListProducts.jsx";

const Products = ({logo, categories, products}) => {
    const {type} = useParams();

    const currentCategory = categories.find(category => category.type === type);
    const currentProducts = products.filter(product => product.type === type);
    return (
        <div>
            <Header logo={logo} />
            <ListProducts currentCategory={currentCategory} currentProducts={currentProducts}/>
            <Footer />
        </div>
    );
};

export default Products;