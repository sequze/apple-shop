import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes, privateRoutes, categories} from "../router/routes.jsx";
import Layout from "./layout/Layout.jsx";
import SiteLogo from "../assets/logo.png";
import {bigProducts} from "../router/bigProducts.js";
import {AuthContext} from "../context/AuthContext";


const AppRouter = () => {

    const {isAuth, isAdmin} = useContext(AuthContext);
    console.log(isAdmin)

    const routes = isAuth ? privateRoutes : publicRoutes;

    return (
        <Routes>
            {routes.map(({path, component: Component}) => {

                if (path === "/admin" && !isAdmin) {
                    return (
                        <Route
                            key={path}
                            path={path}
                            element={<Navigate to="/login" replace />}
                        />
                    );
                }
                return (<Route
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
                />)
            })}
            <Route
                path="*"
                element={<Navigate to={isAuth ? "/" : "/login"} />}
            />
        </Routes>
    );
};

export default AppRouter;