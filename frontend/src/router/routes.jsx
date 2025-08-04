import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";
import card1 from "../assets/categories/card-1.jpeg";
import card2 from "../assets/categories/card-2.jpeg";
import card3 from "../assets/categories/card-3.jpeg";
import card4 from "../assets/categories/card-4.jpeg";
import card5 from "../assets/categories/card-5.jpeg";
import Product from "../pages/Product.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Bucket from "../pages/Bucket.jsx";
import Profile from "../pages/Profile.jsx";
import Order from "../pages/Order.jsx";
import Admin from "../pages/Admin.jsx";

export const categories = [
    { img: card1, title: "iPhone", type: "iphone" },
    { img: card2, title: "Macbook", type: "macbook" },
    { img: card3, title: "Airpods", type: "airpods" },
    { img: card4, title: "Apple Watch", type: "watch" },
    { img: card5, title: "Apple Mini", type: "mini" }
];

export const publicRoutes = [
    { path: "/", component: Home },
    { path: "/register", component: Register },
    { path: "/login", component: Login },
    { path: "/products/:type", component: Products },
    { path: "/products/:type/:id", component: Product },
];


export const privateRoutes = [
    { path: "/", component: Home },
    { path: "/products/:type", component: Products },
    { path: "/products/:type/:id", component: Product },
    { path: "/bucket", component: Bucket },
    { path: "/order", component: Order },
    { path: "/profile", component: Profile },
    { path: "/admin", component: Admin }
];
