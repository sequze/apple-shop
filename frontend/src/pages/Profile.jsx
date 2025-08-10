import React, {useContext, useEffect, useState} from 'react';
import AuthService from "../components/api/AuthService.js";
import {Navigate, useNavigate} from "react-router-dom";
import Loader from "../components/Loader.jsx";
import ProfileContent from "../components/profile/ProfileContent.jsx";
import {AuthContext} from "../context/AuthContext";

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

    if (!user) return (
        <div className="absolute top-0 left-0 w-full min-h-screen flex justify-center items-center bg-[#fff]">
            <div className="w-[200px] h-[200px] flex justify-center">
                <Loader />
            </div>
        </div>
    )

    return (
        <ProfileContent user={user} logout={handleLogout}/>
    );
};

export default Profile;