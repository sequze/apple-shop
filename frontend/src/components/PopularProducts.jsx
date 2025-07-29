import React, {useEffect, useRef} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";

const PopularProducts = ({products}) => {

    const popularProducts = products.filter(product => product.views > 3000);
    const cardRefs = useRef([]);

    useEffect(() => {
        const onLoad = () => {
            const heights = cardRefs.current.map(ref => ref?.offsetHeight || 0);
            const maxHeight = Math.max(...heights);
            cardRefs.current.forEach(ref => {
                if (ref) ref.style.height = `${maxHeight}px`;
            });
        }

        window.addEventListener("load", onLoad);
        return () => window.removeEventListener("load", onLoad);
    }, []);



    return (
        <div className="bg-[#D9D9D9] h-[100vh]">
            <div className="mx-auto max-w-[1500px] w-full">
                <h2 className="text-[36px] inter-300 pt-[100px]">Популярные продукты</h2>
                <Swiper
                    className="mt-[60px] items-stretch"
                    spaceBetween={50}
                    slidesPerView={3}
                >
                    {popularProducts.map((product, index) => (
                        <SwiperSlide key={index} className="h-auto">
                            <div
                                ref={el => cardRefs.current[index] = el}
                                className="flex flex-col justify-between rounded-[50px] bg-[#fff] p-[30px] w-full h-full">
                                <img className="m-auto" src={product.img} alt=""/>
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

export default PopularProducts;