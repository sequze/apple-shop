import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {CategoriesContext} from "../../context/CategoriesContext.jsx";

const Cards = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const {categories} = useContext(CategoriesContext);

    return (
        <div>
            <div className="mx-auto max-w-[1500px] w-full py-[25px] sm:py-[100px]">
                <h2 className="text-[24px] sm:text-[36px] inter-300 pl-10 2xl:pl-0">Категории</h2>
                <div className="hidden lg:flex flex-wrap justify-around mt-[60px] ">
                    {categories.map((category, index) => {
                        const isActive = index === activeIndex;

                        const card = (
                            <div
                                onClick={() => setActiveIndex(index)}
                                className={
                                    index === activeIndex ?
                                        "card__active relative w-[500px] xl:w-[650px]"
                                        : "card relative w-[90px] 2xl:w-[130px]"
                                }
                                style={{backgroundImage: `url(${category.img})`, backgroundSize: "cover", backgroundPosition: "center"}}
                            >
                                <div
                                    className="absolute inset-[0] rounded-[30px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0),transparent)] transition-opacity duration-500"
                                />
                                <div className="relative z-10 p-4 text-[32px] text-[#fff] opacity-0 card-text">
                                    {category.title}
                                </div>
                        </div>
                        );

                        return (
                            <div key={index}>
                                {isActive ? <Link to={`/products/${category.type}`}>{card}</Link> : card}
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-wrap justify-center items-center gap-5 lg:hidden mt-[40px]">
                    {categories.map((category, index) => (
                        <Link key={index} to={`/products/${category.type}`}>
                            <div
                                className="relative w-[150px] h-[150px]  sm:w-[250px] sm:h-[250px] rounded-[30px] overflow-hidden bg-cover bg-center transition-transform duration-300 hover:scale-[1.03]"
                                style={{ backgroundImage: `url(${category.img})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 rounded-[30px]" />
                                <div className="relative z-10 p-4 text-[24px] text-white font-semibold">
                                    {category.title}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Cards;