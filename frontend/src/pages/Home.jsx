import React from 'react';
import Header from "../components/Header.jsx";
import Intro from "../components/Intro.jsx";
import Cards from "../components/Cards.jsx";
import Products from "../components/Products.jsx";
import Footer from "../components/Footer.jsx";

const Home = ({products, categories, logo, intro}) => {
    return (
        <div>
            <Header logo={logo} />
            <Intro photo={intro} />
            <Cards categories={categories}/>
            <Products products={products} />
            <Footer />
        </div>
    );
};

export default Home;