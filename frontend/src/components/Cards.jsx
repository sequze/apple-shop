import React, {useState} from 'react';

const Cards = ({cards, labels}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div>
            <div className="h-[100vh]">
                <div className="mx-auto max-w-[1500px] w-full">
                    <h2 className="text-[36px] inter-400 mt-[100px]">Категории</h2>
                    <div className="flex justify-around mt-[60px]">
                        {cards.map((img, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={
                                    index === activeIndex ? "card__active relative" : "card relative"
                                }
                                style={{backgroundImage: `url(${img})`}}
                            >
                                <div
                                    className="absolute inset-[0] rounded-[30px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0),transparent)] transition-opacity duration-500"
                                />
                                <div className="relative z-10 p-4 text-[32px] text-[#fff] opacity-0 card-text">
                                    {labels[index]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;