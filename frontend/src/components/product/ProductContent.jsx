import React, { useState } from 'react';
import MyActiveButton from "../ui/activeButton/MyActiveButton.jsx";

const ProductContent = ({ product }) => {
    const [activeColor, setActiveColor] = useState(0);

    if (!product) return null;

    const currentColor = product.colors?.[activeColor];
    const mainImage = currentColor?.images?.find(img => img.is_main);
    const activeDiscount = product.discounts?.find(d => d.is_active);
    const price = activeDiscount
        ? `${(parseFloat(product.price) * (1 - activeDiscount.percent / 100)).toFixed(2)} (скидка ${activeDiscount.percent}%)`
        : product.price;

    return (
        <div className="bg-[#D9D9D9] min-h-screen pt-[50px]">
            <div className="flex justify-center max-w-[1500px] relative py-[50px] sm:py-[100px] m-auto">
                <div className="relative flex-col items-center sm:flex-row bg-[#fff] w-fit min-w-2/3 rounded-[40px] p-[50px] flex justify-around mx-[20px]">

                    {/* Левая часть: изображение и выбор цвета */}
                    <div className="relative w-6/12 lg:w-5/12 text-[22px] inter-300 flex flex-col items-center">
                        <div className="min-w-[250px]">
                            {mainImage && (
                                <img className="m-auto" src={mainImage.url} alt={mainImage.alt_text} />
                            )}
                        </div>
                        <div className="flex flex-col items-center">
                            {product.colors?.length > 0 && (
                                <>
                                    <p className="inter-300 sm:text-left text-center">
                                        Доступно в {product.colors.length} цветах
                                    </p>
                                    <div className="flex justify-between pt-[30px] gap-[15px]">
                                        {product.colors.map((color, index) => (
                                            <div
                                                key={color.id}
                                                className={`transition-all w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer ${index === activeColor ? "border-[2px] border-[#0071e3]" : ""}`}
                                                onClick={() => setActiveColor(index)}
                                            >
                                                <div
                                                    className="w-[25px] h-[25px] rounded-full"
                                                    style={{
                                                        backgroundColor: color.color_code,
                                                        boxShadow: 'inset 0px 3px 4px rgba(0, 0, 0, 0.2)'
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Правая часть: описание, характеристики, цена */}
                    <div className="flex flex-col gap-[30px]">
                        <h1 className="text-center sm:text-left montserrat-400 text-[24px] lg:text-[36px]">
                            {product.name}
                        </h1>
                        <p className="text-[16px] opacity-80">{product.description}</p>

                        {product.characteristics?.length > 0 && (
                            <div className="mt-[20px]">
                                {product.characteristics.map((char) => (
                                    <div key={char.id} className="flex items-center gap-[15px] my-[10px]">
                                        {char.image_url && (
                                            <img src={char.image_url} alt={char.name} className="w-[30px] h-[30px]" />
                                        )}
                                        <span className="text-[14px]">{char.name}: {char.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex gap-[25px] mt-[20px] justify-center sm:justify-start">
                            <div className="bg-[#D9D9D9] rounded-full px-[25px] py-[15px]">{price} ₽</div>
                            <MyActiveButton>Купить</MyActiveButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductContent;
