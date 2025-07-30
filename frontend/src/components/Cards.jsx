import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Cards = ({categories}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div>
            <div className="">
                <div className="mx-auto max-w-[1500px] w-full py-[100px]">
                    <h2 className="text-[36px] inter-300">Категории</h2>
                    <div className="flex justify-around mt-[60px]">
                        {categories.map((category, index) => {
                            const cardContent = <div
                                onClick={() => setActiveIndex(index)}
                                className={
                                    index === activeIndex ? "card__active relative" : "card relative"
                                }
                                style={{backgroundImage: `url(${category.img})`}}
                            >
                                <div
                                    className="absolute inset-[0] rounded-[30px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0),transparent)] transition-opacity duration-500"
                                />
                                <div className="relative z-10 p-4 text-[32px] text-[#fff] opacity-0 card-text">
                                    {category.title}
                                </div>
                            </div>

                            return index === activeIndex ? (
                                <Link to={`/products/${category.type}`} key={index}>
                                    {cardContent}
                                </Link>
                            ) : (
                                <div key={index}>{cardContent}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;