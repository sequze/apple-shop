import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes, privateRoutes} from "../router/routes.jsx";
import AuthService from "./api/AuthService.js";
import Loader from "./Loader.jsx";


const AppRouter = () => {

    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const check = async () => {
            const auth = await AuthService.checkAuth();
            setIsAuth(auth);
        };
        check();
    }, []);

    if (isAuth === null) return <Loader />;

    return (
        isAuth
        ?   <Routes>
                {privateRoutes.map(route =>
                    <Route key={route.path} element={route.element} path={route.path} />
                )};
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>


        :     <Routes>
                {publicRoutes.map(route =>
                    <Route key={route.path} element={route.element} path={route.path} />
                )};
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
    );
};

export default AppRouter;