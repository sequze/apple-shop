import React, {useState} from 'react';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import MyInput from "../components/ui/input/MyInput.jsx";
import MyWhiteButton from "../components/ui/whiteButton/MyWhiteButton.jsx";
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../components/api/AuthService.js";
import axios from "axios";
import LoginForm from "../components/LoginForm.jsx";


const Login = ({logo}) => {

    return (
        <div>
            <Header logo={logo}/>
            <LoginForm />
            <Footer />
        </div>
    );
};

export default Login;