import React, {useState} from 'react';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import MyInput from "../components/ui/input/MyInput.jsx";
import MyWhiteButton from "../components/ui/whiteButton/MyWhiteButton.jsx";
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../components/api/AuthService.js";
import Registration from "../components/Registration.jsx";


const Register = ({logo}) => {
    return (
        <div>
            <Header logo={logo}/>
            <Registration />
            <Footer />
        </div>
    );
};

export default Register;