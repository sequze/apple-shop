import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ProductContent from "../components/product/ProductContent.jsx";
import ProductsService from "../components/api/service/ProductsService.js";
import Loader from "../components/Loader.jsx";

const Product = () => {
    const {productId} = useParams();
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        const setData = async () => {
            try {
                const productData = await ProductsService.getProduct(productId);
                setCurrentProduct(productData);
                console.log(currentProduct)
            } catch (err) {
                console.error(err);
            }
        }
        setData();
    }, [productId]);



    if (currentProduct === null) {
        return (
                <div className="z-10 absolute top-0 left-0 w-full min-h-screen flex justify-center items-center bg-[#fff]">
                    <div className="w-[200px] h-[200px] flex justify-center">
                        <Loader />
                    </div>
                </div>
            );
    }

    return (
        <ProductContent product={currentProduct} />
    );
};

export default Product;