import React from 'react';
import Header from "../components/Header.jsx";
import Intro from "../components/Intro.jsx";
import Cards from "../components/Cards.jsx";
import Products from "../components/Products.jsx";
import Footer from "../components/Footer.jsx";

const Home = ({products, cards, labels, logo, intro}) => {
    return (
        <div>
            <Header logo={logo} />
            <Intro photo={intro} />
            <Cards cards={cards} labels={labels}/>
            <Products products={products} />
            <Footer />
        </div>
    );
};

export default Home;