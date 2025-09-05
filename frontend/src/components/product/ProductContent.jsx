import React, {useContext, useState} from 'react';
import MyActiveButton from "../ui/activeButton/MyActiveButton.jsx";
import confetti from "canvas-confetti";
import CartService from "../api/service/CartService.js";
import {CartContext} from "../../context/CartContext.jsx";

const ProductContent = ({ product }) => {
    const [activeColor, setActiveColor] = useState(0);
    const [showFullDesc, setShowFullDesc] = useState(false);

    if (!product) return null;

    const currentColor = product.colors?.[activeColor];
    const mainImage = currentColor?.images?.find(img => img.is_main) || currentColor?.images?.[0];
    const activeDiscount = product.discounts?.find(d => d.is_active);
    const [purchasedProduct, setPurchasedProduct] = useState(false);
    const { cartItems, setCartItems } = useContext(CartContext);


    const finalPrice = activeDiscount
        ? (parseFloat(product.price) * (1 - activeDiscount.percent / 100)).toFixed(2)
        : product.price;

    const handleAddProduct = async () => {
        setPurchasedProduct(true);

        confetti({
            particleCount: 2000,
            spread: 120,
            startVelocity: 60,
            origin: { y: 0.7 }
        });

        setCartItems([...cartItems, {...product, color_id}])

        try {
            const colorId = product?.colors?.[activeColor]?.id || null;
            const data = await CartService.addToCart(product.id, 1, colorId);
        } catch (err) {
            console.log(err);
            setPurchasedProduct(false);
        }
    };

    return (
        <div className="bg-[#D9D9D9] min-h-screen pt-[50px]">
            <div className="flex justify-center max-w-[1500px] relative py-[50px] sm:py-[50px] m-auto">
                <div className="relative flex flex-col sm:flex-row bg-[#fff] rounded-[40px] p-[50px] w-full sm:w-fit justify-around mx-[20px] gap-[40px]">

                    {/* Фото */}
                    <div className="w-full sm:w-5/12 flex flex-col items-center">
                        <div className="w-full max-w-[400px] min-h-[350px] flex items-center justify-center">
                            {mainImage ? (
                                <img
                                    className="w-full object-contain rounded-2xl"
                                    src={mainImage.url}
                                    alt={mainImage.alt_text || product.name}
                                />
                            ) : (
                                <div className="w-full h-[350px] flex items-center justify-center text-gray-500">
                                    Нет фото
                                </div>
                            )}
                        </div>

                        {/* Цвета */}
                        {product.colors?.length > 0 && (
                            <div className="flex flex-col items-center mt-10">
                                <p className="inter-300 sm:text-left text-center">
                                    Доступно в {product.colors.length} цветах
                                </p>
                                <div className="flex justify-center pt-[30px] gap-[15px] flex-wrap">
                                    {product.colors.map((color, index) => (
                                        <div
                                            key={color.id}
                                            className={`transition-all w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer ${
                                                index === activeColor ? "border-[2px] border-[#0071e3]" : ""
                                            }`}
                                            onClick={() => setActiveColor(index)}
                                        >
                                            <div
                                                className="w-[25px] h-[25px] rounded-full"
                                                style={{
                                                    backgroundColor: color.color_code,
                                                    boxShadow: "inset 0px 3px 4px rgba(0, 0, 0, 0.2)",
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Контент */}
                    <div className="flex flex-col gap-[30px] sm:w-7/12">
                        <h1 className="text-center sm:text-left montserrat-400 text-[24px] lg:text-[36px]">
                            {product.name}
                        </h1>

                        {product.description && (
                            <div className="text-[16px] opacity-80">
                                <p className={`${!showFullDesc ? "line-clamp-3" : ""}`}>
                                    {product.description}
                                </p>
                                {product.description.length > 150 && (
                                    <button
                                        className="mt-2 text-blue-600 hover:underline text-sm"
                                        onClick={() => setShowFullDesc(!showFullDesc)}
                                    >
                                        {showFullDesc ? "Скрыть" : "Подробнее"}
                                    </button>
                                )}
                            </div>
                        )}

                        {product.characteristics?.length > 0 && (
                            <div className="mt-[20px]">
                                <h3 className="text-lg inter-600 mb-4">Характеристики</h3>
                                <div className="flex flex-col divide-y divide-gray-300">
                                    {product.characteristics.map((char) => (
                                        <div
                                            key={char.id}
                                            className="flex items-center gap-[15px] py-[10px]"
                                        >
                                            {char.image_url && (
                                                <img
                                                    src={char.image_url}
                                                    alt={char.name}
                                                    className="w-[30px] h-[30px]"
                                                />
                                            )}
                                            <span className="text-[14px]">
                                                <span className="font-medium">{char.name}:</span>
                                                    {" "}
                                                    {char.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
                            <div className="flex flex-col">
                                {activeDiscount ? (
                                    <>
                                        <span className="text-[22px] font-bold text-blue-600">
                                          {finalPrice} ₽
                                        </span>
                                        <span className="text-sm text-gray-500 line-through">
                                          {product.price} ₽
                                        </span>
                                        <span className="text-sm text-green-600">
                                          Скидка {activeDiscount.percent}%
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-[22px] font-bold">
                                        {product.price} ₽
                                      </span>
                                )}
                            </div>
                            <MyActiveButton
                                className={`sm:ml-10 transition-all duration-300 ${
                                    purchasedProduct ? "bg-green-500 scale-105" : ""
                                }`}
                                onClick={handleAddProduct}
                            >
                                {purchasedProduct ? "В корзине ✓" : "Купить"}
                            </MyActiveButton>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductContent;
