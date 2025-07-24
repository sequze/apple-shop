import React from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Category = ({logo}) => {
    return (
        <div>
            <Header logo={logo} />
            <Footer />
        </div>
    );
};

export default Category;