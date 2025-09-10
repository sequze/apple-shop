import React, {useEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Link} from "react-router-dom";
import {bigProducts} from "../../mock/bigProducts.js";
import ProductsService from "../api/service/ProductsService.js";

const PopularProducts = () => {

    const [popularProducts, setPopularProducts] = useState([]);
    const cardRefs = useRef([]);

    useEffect(() => {
        const fetchPopularProducts = async () => {
            const data = await ProductsService.getProducts();
            setPopularProducts(data);
        }

        fetchPopularProducts();
    })

    const recalcHeights = () => {
        const heights = cardRefs.current.map(ref => ref?.offsetHeight || 0);
        const maxHeight = Math.max(...heights);
        cardRefs.current.forEach(ref => {
            if (ref) ref.style.height = `${maxHeight}px`;
        });
    };

    useEffect(() => {
        const observer = new ResizeObserver(recalcHeights);
        cardRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });
        return () => observer.disconnect();
    }, [popularProducts]);




    return (
        <div className="bg-[#D9D9D9]">
            <div className="mx-auto max-w-[1500px] w-full py-[25px] sm:py-[100px]">
                <h2 className="text-[24px] sm:text-[36px] inter-300 pl-10 2xl:pl-0">Популярные продукты</h2>
                <Swiper
                    autoHeight={false}
                    className="mt-[60px] items-stretch h-[650px]"
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 30,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                >
                    {popularProducts.map((product, index) => (
                        <SwiperSlide key={product.id} className="h-full flex">
                            <Link
                                to={`products/${product.category_id}/${product.id}`}
                                className="w-full h-full block"
                            >
                                <div
                                    ref={el => cardRefs.current[index] = el}
                                    className="flex flex-col justify-between rounded-[50px] bg-[#fff] p-[30px] w-4/5 m-auto sm:w-full h-full"
                                >
                                    <img
                                        onLoad={recalcHeights}
                                        className="m-auto max-h-[200px] sm:max-h-none"
                                        src={product?.colors?.[0]?.images?.[0]?.url}
                                        alt={product.name}
                                    />

                                    <p className="inter-400 opacity-[80%] text-[20px] pt-[20px] sm:pt-0">{product.name}</p>
                                    <p className="mt-[20px] opacity-[60%] text-[24px]">{product.price} ₽</p>
                                </div>
                            </Link>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default PopularProducts;