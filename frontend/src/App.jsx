import React from 'react'
import './App.css'
import 'swiper/css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
    return (
      <BrowserRouter>
          <ScrollToTop />
          <AppRouter />
      </BrowserRouter>
    )
}

export default App
