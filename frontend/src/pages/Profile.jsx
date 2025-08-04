import React, {useEffect, useState} from 'react';
import AuthService from "../components/api/AuthService.js";
import {useNavigate} from "react-router-dom";
import Loader from "../components/Loader.jsx";
import ProductContent from "../components/product/ProductContent.jsx";

const Profile = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout(navigate)
    }

    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("access");

        AuthService.getCurrentUser()
            .then(res => setUser(res.data))
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (!user) return <Loader />

    return (
        <ProductContent user={user} logout={handleLogout}/>
    );
};

export default Profile;