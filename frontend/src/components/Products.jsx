import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";

const Products = ({products}) => {
    return (
        <div className="bg-[#D9D9D9] h-[100vh]">
            <div className="mx-auto max-w-[1500px] w-full">
                <h2 className="text-[36px] inter-300 pt-[100px]">Популярные продукты</h2>
                <Swiper className="mt-[60px]" spaceBetween={50} slidesPerView={3}>
                    {products.map((product, index) => (
                        <SwiperSlide key={index}>
                            <div className="rounded-[50px] bg-[#fff] p-[30px]">
                                <img src={product.img} alt=""/>
                                <p className="inter-400 opacity-[80%] text-[20px]">{product.description}</p>
                                <p className="mt-[20px] opacity-[60%] text-[24px]">{product.price}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Products;