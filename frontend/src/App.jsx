import React, { useState } from 'react'
import './App.css'
import 'swiper/css';
import IntroPhoto from './assets/intro__photo.png'
import SiteLogo from './assets/logo.png'
import card1 from "./assets/categories/card-1.jpeg"
import card2 from "./assets/categories/card-2.jpeg"
import card3 from "./assets/categories/card-3.jpeg"
import card4 from "./assets/categories/card-4.jpeg"
import card5 from "./assets/categories/card-5.jpeg"
import product1 from './assets/products/product-1.jpeg';
import product2 from './assets/products/product-2.jpeg';
import product3 from './assets/products/product-3.jpeg';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";

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
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home products={products} cards={cards} labels={labels} intro={IntroPhoto} logo={SiteLogo} />} />
            <Route path="/category" element={<Category logo={SiteLogo} />} />
        </Routes>
      </BrowserRouter>
    )
}

export default App
