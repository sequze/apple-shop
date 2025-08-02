import React, {useEffect} from 'react'
import './App.css'
import 'swiper/css';
import {BrowserRouter, useLocation, useNavigate} from "react-router-dom";
import AppRouter from "./components/AppRouter.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import axios from "axios";
import AuthService from "./components/api/AuthService.js";
import {setupInterceptors} from "./components/api/setupInterceptors.js";

function AppContent() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setupInterceptors(navigate);
    }, [navigate]);

    return (
        <>
            <ScrollToTop />
            <AppRouter />
        </>
    )
}


function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}

export default App
