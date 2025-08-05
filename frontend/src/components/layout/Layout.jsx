import React from 'react';
import Header from "../Header.jsx";
import Footer from "../Footer.jsx";

const Layout = ({children, logo}) => {
    return (
        <div>
            <Header logo={logo}/>
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;