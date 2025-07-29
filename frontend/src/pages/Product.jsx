import React from 'react';
import {useParams} from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Product = ({logo, products}) => {
    const {id} = useParams();

    const currentProduct = products.find(product => product.description
        .toLowerCase().replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") === id);
    console.log(currentProduct)

    // products.map(product => {
    //     console.log(
    //         product.description
    //             .toLowerCase().replace(/[^a-z0-9]+/g, "-")
    //             .replace(/(^-|-$)+/g, "")
    //     )
    // })

    return (
        <div>
            <Header logo={logo} />
            <div className="bg-[#D9D9D9] h-[100vh] pt-[50px]">
                <div className="mx-auto max-w-[1500px] w-full relative  pt-[100px] pb-[100px] min-h-[100vh]">
                    <div className="bg-[#fff] w-full h-[50vh] rounded-[40px] p-[50px]">
                        {
                            currentProduct.description
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Product;