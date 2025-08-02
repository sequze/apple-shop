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

import Product from "../pages/Product.jsx";
import {bigProducts} from "./bigProducts.js";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Bucket from "../pages/Bucket.jsx";
import Profile from "../pages/Profile.jsx";
import Order from "../pages/Order.jsx";

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


export const routes = [
    {
        path: "/",
        element: <Home products={bigProducts} categories={categories} intro={IntroPhoto} logo={SiteLogo} />
    },
    {
        path: "/register",
        element: <Register  logo={SiteLogo} />
    },
    {
        path: "/login",
        element: <Login  logo={SiteLogo} />
    },
    {
        path: "/bucket",
        element: <Bucket  logo={SiteLogo} />
    },
    {
        path: "/order",
        element: <Order  logo={SiteLogo} />
    },
    {
        path: "/profile",
        element: <Profile  logo={SiteLogo} />
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
