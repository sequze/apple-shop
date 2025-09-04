import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";
import Product from "../pages/Product.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Bucket from "../pages/Bucket.jsx";
import Profile from "../pages/Profile.jsx";
import Order from "../pages/Order.jsx";
import Admin from "../pages/Admin.jsx";

export const publicRoutes = [
    { path: "/", component: Home },
    { path: "/register", component: Register },
    { path: "/login", component: Login },
    { path: "/products/:categoryId", component: Products },
    { path: "/products/:categoryId/:productId", component: Product },
];


export const privateRoutes = [
    { path: "/", component: Home },
    { path: "/products/:categoryId", component: Products },
    { path: "/products/:categoryId/:productId", component: Product },
    { path: "/bucket", component: Bucket },
    { path: "/order", component: Order },
    { path: "/profile", component: Profile },
    { path: "/admin", component: Admin }
];
