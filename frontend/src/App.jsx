import React, {useContext, useEffect} from 'react'
import './App.css'
import 'swiper/css';
import {BrowserRouter, useNavigate} from "react-router-dom";
import AppRouter from "./components/AppRouter.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import {setupInterceptors} from "./components/api/setupInterceptors.js";
import {AuthContext} from "./context/AuthContext.jsx";
import Loader from "./components/Loader.jsx";
import {CategoriesProvider} from "./context/CategoriesContext.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import {CartProvider} from "./context/CartContext.jsx";

function AppContent() {
    const navigate = useNavigate();
    const { isLoading } = useContext(AuthContext);

    useEffect(() => {
        setupInterceptors(navigate);
    }, [navigate]);

    if (isLoading) return (
        <div className="absolute top-0 left-0 w-full min-h-screen flex justify-center items-center bg-[#fff]">
            <div className="w-[200px] h-[200px] flex justify-center">
                <Loader />
            </div>
        </div>
    )

    return (
        <>
            <ScrollToTop />
            <AppRouter />
        </>
    )
}


function App() {


    return (
        <AuthProvider>
            <CategoriesProvider>
                <CartProvider>
                    <BrowserRouter>
                        <AppContent />
                    </BrowserRouter>
                </CartProvider>
            </CategoriesProvider>
        </AuthProvider>
    )
}

export default App
