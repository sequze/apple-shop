import React from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import BucketForm from "../components/BucketForm.jsx";

const Bucket = ({logo}) => {
    return (
        <div>
            <Header logo={logo} />
            <BucketForm />
            <Footer />
        </div>
    );
};

export default Bucket;