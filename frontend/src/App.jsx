import React, { useState } from 'react'
import './App.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import IntroPhoto from './assets/intro__photo.png'
import SiteLogo from './assets/logo.png'
import card1 from "./assets/categories/card-1.jpeg"
import card2 from "./assets/categories/card-2.jpeg"
import card3 from "./assets/categories/card-3.jpeg"
import card4 from "./assets/categories/card-4.jpeg"
import card5 from "./assets/categories/card-5.jpeg"
import Header from "./components/Header.jsx";
import Intro from "./components/Intro.jsx";
import Cards from "./components/Cards.jsx";
import product1 from './assets/products/product-1.jpeg';
import product2 from './assets/products/product-2.jpeg';
import product3 from './assets/products/product-3.jpeg';
import Products from "./components/Products.jsx";

function App() {

    const cards = [card1, card2, card3, card4, card5];
    const labels = ["iPhone", "Macbook", "Airpods", "Apple Watch", "Apple Mini"];

    const products = [
        {
            img: product1,
            description: "iPhone 16 PRO Max Silicone Case with MagSafe",
            price: "$49.00"
        },
        {
            img: product2,
            description: "iPhone 16 PRO Max Silicone Case with MagSafe",
            price: "$49.00"
        },
        {
            img: product3,
            description: "iPhone 16 PRO Max Silicone Case with MagSafe",
            price: "$49.00"
        },
        {
            img: product1,
            description: "iPhone 16 PRO Max Silicone Case with MagSafe",
            price: "$49.00"
        },
        {
            img: product2,
            description: "iPhone 16 PRO Max Silicone Case with MagSafe",
            price: "$49.00"
        },
        {
            img: product3,
            description: "iPhone 16 PRO Max Silicone Case with MagSafe",
            price: "$49.00"
        }
    ]

    return (
      <>
        <Header logo={SiteLogo} />
        <Intro photo={IntroPhoto} />
        <Cards cards={cards} labels={labels}/>
        <Products products={products} />
      </>
    )
}

export default App
