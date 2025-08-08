import React, {useContext, useEffect, useState} from 'react'
import './App.css'
import 'swiper/css';
import {BrowserRouter, useNavigate} from "react-router-dom";
import AppRouter from "./components/AppRouter.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import AuthService from "./components/api/AuthService.js";
import {setupInterceptors} from "./components/api/setupInterceptors.js";
import {AuthContext} from "./context/context.js";
import Loader from "./components/Loader.jsx";

function AppContent() {
    const navigate = useNavigate();
    const { isLoading } = useContext(AuthContext);

    useEffect(() => {
        setupInterceptors(navigate);
    }, [navigate]);

    if (isLoading) return <Loader />

    return (
        <>
            <ScrollToTop />
            <AppRouter />
        </>
    )
}


function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const res = await AuthService.checkAuth();
            if (res) setIsAuth(true);
            setIsLoading(false);
        }
        checkAuthStatus()
    }, []);


    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App
