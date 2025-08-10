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
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const res = await AuthService.checkAuth();
                if (res) {
                    setIsAuth(true);

                    const { data } = await AuthService.getCurrentUser();
                    if (data.is_superuser) {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                } else {
                    setIsAuth(false);
                    setIsAdmin(false);
                }
            } catch (e) {
                setIsAuth(false);
                setIsAdmin(false);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuthStatus();
    }, []);


    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading,
            isAdmin,
            setIsAdmin
        }}>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App
