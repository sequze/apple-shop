import React from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {useParams} from "react-router-dom";

const Products = ({logo, categories, products}) => {
    const {type} = useParams();

    const currentCategory = categories.filter(category => category.type === type)[0];
    const currentProducts = products.filter(product => product.type === type);
    return (
        <div>
            <Header logo={logo} />
            <div className="bg-[#D9D9D9]">
                <div className="mx-auto max-w-[1500px] w-full relative  pt-[100px] min-h-[100vh]">
                    <h2 className="ml-[25px] text-[36px] inter-300 mt-[30px] mb-[40px]">{currentCategory.title}</h2>
                    <div className="flex">
                        <div>
                            <div className="bg-[#fff] rounded-[45px] mr-[50px] p-[25px] min-w-[350px] w-max">
                                <div className="text-[24px]">
                                    Наличие в магазине
                                </div>
                                <div>
                                    <input type="checkbox"/>
                                    Под заказ: сегодня
                                </div>
                                <div>
                                    <input type="checkbox"/>
                                    Под заказ: завтра
                                </div>
                                <div>
                                    <input type="checkbox"/>
                                    Под заказ: позже
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-[15px] justify-between">
                            {currentProducts.map(product => (
                                <div className="flex flex-col bg-[#fff] rounded-[25px] p-[25px]">
                                    <img className="max-w-[300px] w-max" src={product.img} alt={product.type}/>
                                    <p>{product.description}</p>
                                    <p>{product.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Products;