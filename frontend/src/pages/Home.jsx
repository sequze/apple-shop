import React from 'react';
import Intro from "../components/home/Intro.jsx";
import Cards from "../components/home/Cards.jsx";
import PopularProducts from "../components/home/PopularProducts.jsx";

const Home = ({products, categories}) => {
    return (
        <div>
            <Intro />
            <Cards categories={categories}/>
            <PopularProducts products={products} />
        </div>
    );
};

export default Home;