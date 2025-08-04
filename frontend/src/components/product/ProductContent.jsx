import React, {useState} from 'react';
import MyActiveButton from "../ui/activeButton/MyActiveButton.jsx";

const ProductContent = ({product}) => {

    const [activeColor, setActiveColor] = useState(0);
    const [activeDiag, setActiveDiag] = useState(0);

    return (
        <div className="bg-[#D9D9D9] h-[100vh] pt-[50px]">
            <div className="mx-auto max-w-[1500px]  relative  pt-[100px] pb-[100px]">
                <div className="bg-[#fff] w-fit min-w-2/3 rounded-[40px] p-[50px] flex justify-around m-auto">
                    <div className="relative w-5/12 text-[22px] inter-300 flex flex-col items-center">
                        <div className="relative w-[260px] h-[50px]">
                            {
                                product.diagonals && (
                                    <>
                                        <div
                                            className="absolute h-full w-[110px] bg-[#D9D9D9] rounded-full transition-transform duration-300"
                                            style={{ transform: `translateX(${activeDiag * 150}px)` }}
                                        />

                                        <div className="relative z-10 flex justify-between">
                                            {product.diagonals
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

                        <div>
                            <img src={product.img} alt=""/>
                        </div>
                        <div className="flex flex-col items-center">
                            {product && product.colors && (
                                <>
                                    <p className="inter-300">
                                        Доступно в {product.colors.length} цветах
                                    </p>
                                    <div className="flex justify-between pt-[30px]">
                                        {product.colors.map((color, index) => (
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
                        <h1 className="montserrat-400 text-[48px]">{product.title}</h1>
                        <div className="mt-[100px]">
                            {product.features.map((feature, index) => (
                                <div key={index}>
                                    <div className="flex items-center gap-[20px]">
                                        <div className="w-[40px] ml-[10px]">
                                            <img src={feature.img} alt={feature.text}/>
                                        </div>
                                        <div>
                                            {feature.text}
                                        </div>
                                    </div>
                                    {index !== product.features.length - 1 && (
                                        <hr className="my-[20px] opacity-40"/>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-[25px] mt-[90px] ml-auto">
                            <div className="bg-[#D9D9D9] rounded-full px-[25px] py-[15px] ml-auto">{product.price}</div>
                            <MyActiveButton>Buy</MyActiveButton>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductContent;