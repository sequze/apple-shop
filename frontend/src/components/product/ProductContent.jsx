import React, {useState} from 'react';
import MyActiveButton from "../ui/activeButton/MyActiveButton.jsx";

const ProductContent = ({product}) => {

    const [activeColor, setActiveColor] = useState(0);
    const [activeDiag, setActiveDiag] = useState(0);

    return (
        <div className="bg-[#D9D9D9] min-h-screen pt-[50px]">
            <div className="flex justify-center max-w-[1500px]  relative py-[50px] sm:py-[100px] m-auto">
                <div className="relative flex-col items-center sm:flex-row bg-[#fff] w-fit min-w-2/3 rounded-[40px] p-[50px] flex justify-around mx-[20px]">
                    <div className="relative w-6/12 lg:w-5/12 text-[22px] inter-300 flex flex-col items-center">
                        <div className="relative w-[260px] h-[50px] mt-[40px] sm:mt-0">
                            {
                                product?.diagonals && (
                                    <>
                                        <div
                                            className="absolute h-full w-[110px] bg-[#D9D9D9] rounded-full transition-transform duration-300"
                                            style={{ transform: `translateX(${activeDiag * 150}px)` }}
                                        />

                                        <div className="relative z-10 flex justify-between">
                                            {product?.diagonals
                                                .sort((a, b) => Number(a) - Number(b))
                                                .map((diag, index) => (
                                                    <div
                                                        key={diag}
                                                        className={`w-[110px] text-center py-[10px] ${
                                                            activeDiag === index ? "" : "cursor-pointer"
                                                        }`}
                                                        onClick={() => setActiveDiag(index)}
                                                    >
                                                        {diag}"
                                                    </div>
                                                ))}
                                        </div>
                                    </>
                                )
                            }
                        </div>

                        <div className="min-w-[250px]">
                            <img className="m-auto" src={product?.img} alt={product?.description}/>
                        </div>
                        <div className="flex flex-col items-center">
                            {product && product?.colors && (
                                <>
                                    <p className="inter-300 sm:text-left text-center">
                                        Доступно в {product?.colors.length} цветах
                                    </p>
                                    <div className="flex justify-between pt-[30px]">
                                        {product?.colors.map((color, index) => (
                                            <div
                                                key={index}
                                                className={`transition-all w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer  ${index === activeColor ? "border-[2px] border-[#0071e3]" : ""}`}
                                                onClick={() => setActiveColor(index)}
                                            >
                                                <div
                                                    className="w-[25px] h-[25px] rounded-full"
                                                    style={{ backgroundColor: color , boxShadow: 'inset 0px 3px 4px rgba(0, 0, 0, 0.2)',}}
                                                />
                                            </div>

                                        ))}
                                    </div>

                                </>
                            )
                            }
                        </div>
                    </div>
                    <div>
                        <h1
                            className="text-center sm:text-left absolute sm: top-4 sm:top-auto left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 montserrat-400 text-[24px] lg:text-[36px]"
                        >{product?.title}</h1>
                        <div className="mt-[40px] md:mt-[100px]">
                            {product?.features.map((feature, index) => (
                                <div key={index}>
                                    <div className="flex items-center gap-[20px]">
                                        <div className="w-[40px] ml-[10px]">
                                            <img src={feature.img} alt={feature.text}/>
                                        </div>
                                        <div className="text-[13px] md:text-[14px]">
                                            {feature.text}
                                        </div>
                                    </div>
                                    {index !== product?.features.length - 1 && (
                                        <hr className="my-[20px] opacity-40"/>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-[25px] mt-[40px] md:mt-[90px] md:ml-auto justify-center">
                            <div className="bg-[#D9D9D9] rounded-full px-[25px] py-[15px] sm:ml-auto">{product?.price}</div>
                            <MyActiveButton>Buy</MyActiveButton>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductContent;