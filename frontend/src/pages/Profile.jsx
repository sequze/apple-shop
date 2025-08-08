import React, {useContext, useEffect, useState} from 'react';
import AuthService from "../components/api/AuthService.js";
import {useNavigate} from "react-router-dom";
import Loader from "../components/Loader.jsx";
import ProfileContent from "../components/profile/ProfileContent.jsx";
import {AuthContext} from "../context/context.js";

const Profile = () => {


    const {isAuth, setIsAuth} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout(navigate);
        setIsAuth(false);
    }

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (isAuth) {
            AuthService.getCurrentUser()
                .then(res => setUser(res.data))
                .catch(err => {
                    console.log(err);
                });
        }
    }, [isAuth]);

    if (!isAuth) return <Navigate to="/login" replace />;

    if (!user) return <Loader />

    return (
        <ProfileContent user={user} logout={handleLogout}/>
    );
};

export default Profile;