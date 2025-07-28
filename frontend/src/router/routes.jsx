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

const bigProducts = [
    { img: product1, description: "MagSafe iPhone 16 Case #1", price: "$49.00", type: "iphone" },
    { img: product2, description: "Macbook Pro 14 Sleeve #2", price: "$79.00", type: "macbook" },
    { img: product3, description: "Apple Watch Strap Leather #3", price: "$59.00", type: "watch" },
    { img: product1, description: "AirPods Pro Silicone Case #4", price: "$39.00", type: "airpods" },
    { img: product2, description: "Mac Mini Stand Aluminum #5", price: "$29.00", type: "mini" },
    { img: product3, description: "MagSafe iPhone 16 Case #6", price: "$49.00", type: "iphone" },
    { img: product1, description: "USB-C Adapter for Macbook #7", price: "$69.00", type: "macbook" },
    { img: product2, description: "Watch Magnetic Charger 1m #8", price: "$49.00", type: "watch" },
    { img: product3, description: "AirPods Max Smart Case #9", price: "$89.00", type: "airpods" },
    { img: product1, description: "Mac Mini Dock Station #10", price: "$59.00", type: "mini" },
    { img: product2, description: "iPhone Wallet with MagSafe #11", price: "$59.00", type: "iphone" },
    { img: product3, description: "Macbook Air Clear Case #12", price: "$39.00", type: "macbook" },
    { img: product1, description: "Apple Watch Leather Loop #13", price: "$69.00", type: "watch" },
    { img: product2, description: "AirPods Pro Charging Dock #14", price: "$49.00", type: "airpods" },
    { img: product3, description: "Mini Display Cable Adapter #15", price: "$19.00", type: "mini" },
    { img: product1, description: "iPhone Clear Case Ultra Thin #16", price: "$29.00", type: "iphone" },
    { img: product2, description: "Macbook Vertical Stand #17", price: "$89.00", type: "macbook" },
    { img: product3, description: "Apple Watch Dock Stand #18", price: "$39.00", type: "watch" },
    { img: product1, description: "AirPods Case Keychain #19", price: "$25.00", type: "airpods" },
    { img: product2, description: "Mac Mini Fan Cooling Pad #20", price: "$35.00", type: "mini" },
    { img: product3, description: "Silicone iPhone Case with Strap #21", price: "$55.00", type: "iphone" },
    { img: product1, description: "Macbook Sleeve Organizer #22", price: "$45.00", type: "macbook" },
    { img: product2, description: "Watch Band Nylon Sport #23", price: "$34.00", type: "watch" },
    { img: product3, description: "AirPods Pro Shockproof Case #24", price: "$44.00", type: "airpods" },
    { img: product1, description: "Mac Mini Cable Holder #25", price: "$18.00", type: "mini" },
    { img: product2, description: "iPhone MagSafe Ring Holder #26", price: "$22.00", type: "iphone" },
    { img: product3, description: "Macbook Hub USB-C 7-in-1 #27", price: "$99.00", type: "macbook" },
    { img: product1, description: "Watch Bumper Case Pack #28", price: "$27.00", type: "watch" },
    { img: product2, description: "AirPods Magnetic Clip #29", price: "$19.00", type: "airpods" },
    { img: product3, description: "Mac Mini Power Adapter #30", price: "$49.00", type: "mini" },
    { img: product1, description: "MagSafe Transparent iPhone Case #31", price: "$32.00", type: "iphone" },
    { img: product2, description: "Macbook Air Travel Pouch #32", price: "$58.00", type: "macbook" },
    { img: product3, description: "Apple Watch Travel Case #33", price: "$31.00", type: "watch" },
    { img: product1, description: "AirPods Silicone Ear Tips #34", price: "$12.00", type: "airpods" },
    { img: product2, description: "Mini Dock with HDMI #35", price: "$59.00", type: "mini" },
    { img: product3, description: "iPhone Wallet Stand MagSafe #36", price: "$49.00", type: "iphone" },
    { img: product1, description: "Macbook Touch Bar Protector #37", price: "$16.00", type: "macbook" },
    { img: product2, description: "Watch Milanese Loop Gold #38", price: "$79.00", type: "watch" },
    { img: product3, description: "AirPods Wireless Charging Mat #39", price: "$69.00", type: "airpods" },
    { img: product1, description: "Mac Mini SSD Case USB 3.0 #40", price: "$54.00", type: "mini" },
    { img: product1, description: "MagSafe iPhone 16 Case #1", price: "$49.00", type: "iphone" },
    { img: product2, description: "Macbook Pro 14 Sleeve #2", price: "$79.00", type: "macbook" },
    { img: product3, description: "Apple Watch Strap Leather #3", price: "$59.00", type: "watch" },
    { img: product1, description: "AirPods Pro Silicone Case #4", price: "$39.00", type: "airpods" },
    { img: product2, description: "Mac Mini Stand Aluminum #5", price: "$29.00", type: "mini" },
    { img: product3, description: "MagSafe iPhone 16 Case #6", price: "$49.00", type: "iphone" },
    { img: product1, description: "USB-C Adapter for Macbook #7", price: "$69.00", type: "macbook" },
    { img: product2, description: "Watch Magnetic Charger 1m #8", price: "$49.00", type: "watch" },
    { img: product3, description: "AirPods Max Smart Case #9", price: "$89.00", type: "airpods" },
    { img: product1, description: "Mac Mini Dock Station #10", price: "$59.00", type: "mini" },
    { img: product2, description: "iPhone Wallet with MagSafe #11", price: "$59.00", type: "iphone" },
    { img: product3, description: "Macbook Air Clear Case #12", price: "$39.00", type: "macbook" },
    { img: product1, description: "Apple Watch Leather Loop #13", price: "$69.00", type: "watch" },
    { img: product2, description: "AirPods Pro Charging Dock #14", price: "$49.00", type: "airpods" },
    { img: product3, description: "Mini Display Cable Adapter #15", price: "$19.00", type: "mini" },
    { img: product1, description: "iPhone Clear Case Ultra Thin #16", price: "$29.00", type: "iphone" },
    { img: product2, description: "Macbook Vertical Stand #17", price: "$89.00", type: "macbook" },
    { img: product3, description: "Apple Watch Dock Stand #18", price: "$39.00", type: "watch" },
    { img: product1, description: "AirPods Case Keychain #19", price: "$25.00", type: "airpods" },
    { img: product2, description: "Mac Mini Fan Cooling Pad #20", price: "$35.00", type: "mini" },
    { img: product3, description: "Silicone iPhone Case with Strap #21", price: "$55.00", type: "iphone" },
    { img: product1, description: "Macbook Sleeve Organizer #22", price: "$45.00", type: "macbook" },
    { img: product2, description: "Watch Band Nylon Sport #23", price: "$34.00", type: "watch" },
    { img: product3, description: "AirPods Pro Shockproof Case #24", price: "$44.00", type: "airpods" },
    { img: product1, description: "Mac Mini Cable Holder #25", price: "$18.00", type: "mini" },
    { img: product2, description: "iPhone MagSafe Ring Holder #26", price: "$22.00", type: "iphone" },
    { img: product3, description: "Macbook Hub USB-C 7-in-1 #27", price: "$99.00", type: "macbook" },
    { img: product1, description: "Watch Bumper Case Pack #28", price: "$27.00", type: "watch" },
    { img: product2, description: "AirPods Magnetic Clip #29", price: "$19.00", type: "airpods" },
    { img: product3, description: "Mac Mini Power Adapter #30", price: "$49.00", type: "mini" },
    { img: product1, description: "MagSafe Transparent iPhone Case #31", price: "$32.00", type: "iphone" },
    { img: product2, description: "Macbook Air Travel Pouch #32", price: "$58.00", type: "macbook" },
    { img: product3, description: "Apple Watch Travel Case #33", price: "$31.00", type: "watch" },
    { img: product1, description: "AirPods Silicone Ear Tips #34", price: "$12.00", type: "airpods" },
    { img: product2, description: "Mini Dock with HDMI #35", price: "$59.00", type: "mini" },
    { img: product3, description: "iPhone Wallet Stand MagSafe #36", price: "$49.00", type: "iphone" },
    { img: product1, description: "Macbook Touch Bar Protector #37", price: "$16.00", type: "macbook" },
    { img: product2, description: "Watch Milanese Loop Gold #38", price: "$79.00", type: "watch" },
    { img: product3, description: "AirPods Wireless Charging Mat #39", price: "$69.00", type: "airpods" },
    { img: product1, description: "Mac Mini SSD Case USB 3.0 #40", price: "$54.00", type: "mini" },
    { img: product1, description: "MagSafe iPhone 16 Case #1", price: "$49.00", type: "iphone" },
    { img: product2, description: "Macbook Pro 14 Sleeve #2", price: "$79.00", type: "macbook" },
    { img: product3, description: "Apple Watch Strap Leather #3", price: "$59.00", type: "watch" },
    { img: product1, description: "AirPods Pro Silicone Case #4", price: "$39.00", type: "airpods" },
    { img: product2, description: "Mac Mini Stand Aluminum #5", price: "$29.00", type: "mini" },
    { img: product3, description: "MagSafe iPhone 16 Case #6", price: "$49.00", type: "iphone" },
    { img: product1, description: "USB-C Adapter for Macbook #7", price: "$69.00", type: "macbook" },
    { img: product2, description: "Watch Magnetic Charger 1m #8", price: "$49.00", type: "watch" },
    { img: product3, description: "AirPods Max Smart Case #9", price: "$89.00", type: "airpods" },
    { img: product1, description: "Mac Mini Dock Station #10", price: "$59.00", type: "mini" },
    { img: product2, description: "iPhone Wallet with MagSafe #11", price: "$59.00", type: "iphone" },
    { img: product3, description: "Macbook Air Clear Case #12", price: "$39.00", type: "macbook" },
    { img: product1, description: "Apple Watch Leather Loop #13", price: "$69.00", type: "watch" },
    { img: product2, description: "AirPods Pro Charging Dock #14", price: "$49.00", type: "airpods" },
    { img: product3, description: "Mini Display Cable Adapter #15", price: "$19.00", type: "mini" },
    { img: product1, description: "iPhone Clear Case Ultra Thin #16", price: "$29.00", type: "iphone" },
    { img: product2, description: "Macbook Vertical Stand #17", price: "$89.00", type: "macbook" },
    { img: product3, description: "Apple Watch Dock Stand #18", price: "$39.00", type: "watch" },
    { img: product1, description: "AirPods Case Keychain #19", price: "$25.00", type: "airpods" },
    { img: product2, description: "Mac Mini Fan Cooling Pad #20", price: "$35.00", type: "mini" },
    { img: product3, description: "Silicone iPhone Case with Strap #21", price: "$55.00", type: "iphone" },
    { img: product1, description: "Macbook Sleeve Organizer #22", price: "$45.00", type: "macbook" },
    { img: product2, description: "Watch Band Nylon Sport #23", price: "$34.00", type: "watch" },
    { img: product3, description: "AirPods Pro Shockproof Case #24", price: "$44.00", type: "airpods" },
    { img: product1, description: "Mac Mini Cable Holder #25", price: "$18.00", type: "mini" },
    { img: product2, description: "iPhone MagSafe Ring Holder #26", price: "$22.00", type: "iphone" },
    { img: product3, description: "Macbook Hub USB-C 7-in-1 #27", price: "$99.00", type: "macbook" },
    { img: product1, description: "Watch Bumper Case Pack #28", price: "$27.00", type: "watch" },
    { img: product2, description: "AirPods Magnetic Clip #29", price: "$19.00", type: "airpods" },
    { img: product3, description: "Mac Mini Power Adapter #30", price: "$49.00", type: "mini" },
    { img: product1, description: "MagSafe Transparent iPhone Case #31", price: "$32.00", type: "iphone" },
    { img: product2, description: "Macbook Air Travel Pouch #32", price: "$58.00", type: "macbook" },
    { img: product3, description: "Apple Watch Travel Case #33", price: "$31.00", type: "watch" },
    { img: product1, description: "AirPods Silicone Ear Tips #34", price: "$12.00", type: "airpods" },
    { img: product2, description: "Mini Dock with HDMI #35", price: "$59.00", type: "mini" },
    { img: product3, description: "iPhone Wallet Stand MagSafe #36", price: "$49.00", type: "iphone" },
    { img: product1, description: "Macbook Touch Bar Protector #37", price: "$16.00", type: "macbook" },
    { img: product2, description: "Watch Milanese Loop Gold #38", price: "$79.00", type: "watch" },
    { img: product3, description: "AirPods Wireless Charging Mat #39", price: "$69.00", type: "airpods" },
    { img: product1, description: "Mac Mini SSD Case USB 3.0 #40", price: "$54.00", type: "mini" },
    { img: product1, description: "MagSafe iPhone 16 Case #1", price: "$49.00", type: "iphone" },
    { img: product2, description: "Macbook Pro 14 Sleeve #2", price: "$79.00", type: "macbook" },
    { img: product3, description: "Apple Watch Strap Leather #3", price: "$59.00", type: "watch" },
    { img: product1, description: "AirPods Pro Silicone Case #4", price: "$39.00", type: "airpods" },
    { img: product2, description: "Mac Mini Stand Aluminum #5", price: "$29.00", type: "mini" },
    { img: product3, description: "MagSafe iPhone 16 Case #6", price: "$49.00", type: "iphone" },
    { img: product1, description: "USB-C Adapter for Macbook #7", price: "$69.00", type: "macbook" },
    { img: product2, description: "Watch Magnetic Charger 1m #8", price: "$49.00", type: "watch" },
    { img: product3, description: "AirPods Max Smart Case #9", price: "$89.00", type: "airpods" },
    { img: product1, description: "Mac Mini Dock Station #10", price: "$59.00", type: "mini" },
    { img: product2, description: "iPhone Wallet with MagSafe #11", price: "$59.00", type: "iphone" },
    { img: product3, description: "Macbook Air Clear Case #12", price: "$39.00", type: "macbook" },
    { img: product1, description: "Apple Watch Leather Loop #13", price: "$69.00", type: "watch" },
    { img: product2, description: "AirPods Pro Charging Dock #14", price: "$49.00", type: "airpods" },
    { img: product3, description: "Mini Display Cable Adapter #15", price: "$19.00", type: "mini" },
    { img: product1, description: "iPhone Clear Case Ultra Thin #16", price: "$29.00", type: "iphone" },
    { img: product2, description: "Macbook Vertical Stand #17", price: "$89.00", type: "macbook" },
    { img: product3, description: "Apple Watch Dock Stand #18", price: "$39.00", type: "watch" },
    { img: product1, description: "AirPods Case Keychain #19", price: "$25.00", type: "airpods" },
    { img: product2, description: "Mac Mini Fan Cooling Pad #20", price: "$35.00", type: "mini" },
    { img: product3, description: "Silicone iPhone Case with Strap #21", price: "$55.00", type: "iphone" },
    { img: product1, description: "Macbook Sleeve Organizer #22", price: "$45.00", type: "macbook" },
    { img: product2, description: "Watch Band Nylon Sport #23", price: "$34.00", type: "watch" },
    { img: product3, description: "AirPods Pro Shockproof Case #24", price: "$44.00", type: "airpods" },
    { img: product1, description: "Mac Mini Cable Holder #25", price: "$18.00", type: "mini" },
    { img: product2, description: "iPhone MagSafe Ring Holder #26", price: "$22.00", type: "iphone" },
    { img: product3, description: "Macbook Hub USB-C 7-in-1 #27", price: "$99.00", type: "macbook" },
    { img: product1, description: "Watch Bumper Case Pack #28", price: "$27.00", type: "watch" },
    { img: product2, description: "AirPods Magnetic Clip #29", price: "$19.00", type: "airpods" },
    { img: product3, description: "Mac Mini Power Adapter #30", price: "$49.00", type: "mini" },
    { img: product1, description: "MagSafe Transparent iPhone Case #31", price: "$32.00", type: "iphone" },
    { img: product2, description: "Macbook Air Travel Pouch #32", price: "$58.00", type: "macbook" },
    { img: product3, description: "Apple Watch Travel Case #33", price: "$31.00", type: "watch" },
    { img: product1, description: "AirPods Silicone Ear Tips #34", price: "$12.00", type: "airpods" },
    { img: product2, description: "Mini Dock with HDMI #35", price: "$59.00", type: "mini" },
    { img: product3, description: "iPhone Wallet Stand MagSafe #36", price: "$49.00", type: "iphone" },
    { img: product1, description: "Macbook Touch Bar Protector #37", price: "$16.00", type: "macbook" },
    { img: product2, description: "Watch Milanese Loop Gold #38", price: "$79.00", type: "watch" },
    { img: product3, description: "AirPods Wireless Charging Mat #39", price: "$69.00", type: "airpods" },
    { img: product1, description: "Mac Mini SSD Case USB 3.0 #40", price: "$54.00", type: "mini" }
]


export const routes = [
    {
        path: "/",
        element: <Home products={products} categories={categories} intro={IntroPhoto} logo={SiteLogo} />
    },
    {
        path: "/products/:type",
        element: <Products categories={categories} products={bigProducts} logo={SiteLogo} />
    }
]
