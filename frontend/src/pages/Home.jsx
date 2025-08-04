import React from 'react';
import Header from "../components/Header.jsx";
import Intro from "../components/Intro.jsx";
import Cards from "../components/Cards.jsx";
import PopularProducts from "../components/PopularProducts.jsx";
import Footer from "../components/Footer.jsx";

const Home = ({products, categories, logo}) => {
    return (
        <div>
            <Header logo={logo} />
            <Intro />
            <Cards categories={categories}/>
            <PopularProducts products={products} />
            <Footer />
        </div>
    );
};

export default Home;