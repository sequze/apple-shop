import React from 'react'
import './App.css'
import 'swiper/css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import axios from "axios";

function App() {

    const token = localStorage.getItem("access");
    if (token) {
        axios.defaults.headers.common.Authorization = "Bearer " + token;
    }

    return (
      <BrowserRouter>
          <ScrollToTop />
          <AppRouter />
      </BrowserRouter>
    )
}

export default App
