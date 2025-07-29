import Home from "../pages/Home.jsx";
import IntroPhoto from "../assets/intro__photo.png";
import SiteLogo from "../assets/logo.png";
import Products from "../pages/Products.jsx";
import React from "react";
import card1 from "../assets/categories/card-1.jpeg";
import card2 from "../assets/categories/card-2.jpeg";
import card3 from "../assets/categories/card-3.jpeg";
import card4 from "../assets/categories/card-4.jpeg";
import card5 from "../assets/categories/card-5.jpeg";
import product1 from "../assets/products/product-1.jpeg";
import product2 from "../assets/products/product-2.jpeg";
import product3 from "../assets/products/product-3.jpeg";
import product4 from "../assets/products/product-4.png";
import product5 from "../assets/products/product-5.png";
import product6 from "../assets/products/product-6.jpeg";
import product7 from "../assets/products/product-7.png";
import Product from "../pages/Product.jsx";
import {bigProducts} from "./bigProducts.js";

const categories = [
    {
        img: card1,
        title: "iPhone",
        type: "iphone"
    },
    {
        img: card2,
        title: "Macbook",
        type: "macbook"
    },
    {
        img: card3,
        title: "Airpods",
        type: "airpods"
    },
    {
        img: card4,
        title: "Apple Watch",
        type: "watch"
    },
    {
        img: card5,
        title: "Apple Mini",
        type: "mini"
    }
]

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
];



export const routes = [
    {
        path: "/",
        element: <Home products={products} categories={categories} intro={IntroPhoto} logo={SiteLogo} />
    },
    {
        path: "/products/:type",
        element: <Products categories={categories} products={bigProducts} logo={SiteLogo} />
    },
    {
        path: "/products/:type/:id",
        element: <Product products={bigProducts} logo={SiteLogo}/>
    }
]
