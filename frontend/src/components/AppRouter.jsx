import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes, privateRoutes, categories} from "../router/routes.jsx";
import AuthService from "./api/AuthService.js";
import Loader from "./Loader.jsx";
import Layout from "./layout/Layout.jsx";
import SiteLogo from "../assets/logo.png";
import {bigProducts} from "../router/bigProducts.js";


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

    const routes = isAuth ? privateRoutes : publicRoutes;

    return (
        <Routes>
            {routes.map(({path, component: Component}) => (
              <Route
                key={path}
                path={path}
                element={
                    <Layout logo={SiteLogo}>
                        <Component
                            products={bigProducts}
                            categories={categories}
                            logo={SiteLogo}
                        />
                    </Layout>
                }
              />
            ))}
            <Route
                path="*"
                element={<Navigate to={isAuth ? "/" : "login"} />}
            />
        </Routes>
    );
};

export default AppRouter;