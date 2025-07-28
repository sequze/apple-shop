import React from 'react';
import {Route, Routes} from "react-router-dom";
import {routes} from "../router/routes.jsx";


const AppRouter = () => {
    return (
        <div>
            <Routes>
                {routes.map(route =>
                    <Route key={route.path} element={route.element} path={route.path} />
                )};
            </Routes>
        </div>
    );
};

export default AppRouter;