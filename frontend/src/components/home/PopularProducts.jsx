import React, {useEffect, useRef} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Link} from "react-router-dom";

const PopularProducts = ({products}) => {

    const popularProducts = products.filter(product => product.views > 3000);
    const cardRefs = useRef([]);

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            const heights = cardRefs.current.map(ref => ref?.offsetHeight || 0);
            const maxHeight = Math.max(...heights);
            cardRefs.current.forEach(ref => {
                if (ref) ref.style.height = `${maxHeight}px`;
            });
        });

        cardRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        })

        return () => observer.disconnect();
    }, []);



    return (
        <div className="bg-[#D9D9D9]">
            <div className="mx-auto max-w-[1500px] w-full py-[25px] sm:py-[100px]">
                <h2 className="text-[24px] sm:text-[36px] inter-300 pl-10 lg:pl-0">Популярные продукты</h2>
                <Swiper
                    className="mt-[60px] items-stretch"
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
                        <SwiperSlide key={product.id} className="h-auto">
                            <Link
                                to={`products/${product.type}/${product.description
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]+/g, "-")
                                    .replace(/(^-|-$)+/g, "")}`}>
                                <div
                                    ref={el => cardRefs.current[index] = el}
                                    className="flex flex-col justify-between rounded-[50px] bg-[#fff] p-[30px] w-4/5 m-auto sm:w-full h-full">
                                        <img className="m-auto" src={product.img} alt={product.description}/>
                                        <p className="inter-400 opacity-[80%] text-[20px]">{product.description}</p>
                                        <p className="mt-[20px] opacity-[60%] text-[24px]">{product.price}</p>
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