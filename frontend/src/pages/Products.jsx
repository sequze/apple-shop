import React from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {useParams} from "react-router-dom";

const Products = ({logo}) => {
    const {type} = useParams();
    console.log(type);

    return (
        <div>
            <Header logo={logo} />
            <div></div>
            <Footer />
        </div>
    );
};

export default Products;