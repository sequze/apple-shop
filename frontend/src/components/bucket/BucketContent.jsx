import React, {useContext} from 'react';
import {CartContext} from "../../context/CartContext.jsx";
import BucketMenu from "./BucketMenu.jsx";

const BucketContent = () => {
    const {cartItems} = useContext(CartContext);

    console.log(cartItems);

    return (
        <div className="w-full md:w-3/4">
            <BucketMenu />
            <div className="bg-[#fff] rounded-[15px] shadow-md w-full p-[10px] sm:p-[25px] lg:px-[50px]">
                {cartItems.map(cartItem => (
                    <div
                        key={cartItem?.id}
                        className="py-[10px] sm:py-[20px]"
                    >
                        <div className="flex flex-col xl:flex-row items-start xl:items-center w-full justify-between">
                            <div className="flex items-center gap-[10px] lg:gap-[30px] xl:gap-[50px]">
                                <div className="bg-[#D9D9D9] w-[100px] h-[100px]" />
                                <div className="inter-300 text-[22px]">
                                    {cartItem?.product?.name}
                                </div>
                            </div>

                            <div className="flex flex-col justify-center w-full xl:w-auto mt-[20px] xl:mt-0 xl:gap-[5px]">
                                {cartItem?.discount ? (
                                    <>
                                        <span className="text-[22px] font-bold text-blue-600">
                                            {cartItem?.price_with_discount} ₽
                                        </span>
                                        <span className="text-sm text-gray-500 line-through">
                                            {cartItem?.total_price} ₽
                                        </span>
                                        <span className="text-sm text-green-600">
                                            Скидка {cartItem?.discount}%
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-[22px] font-bold">
                                        {cartItem?.total_price} ₽
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-[30px] md:gap-[20px] lg:gap-[30px] rounded-[10px] px-[15px] py-[4px] bg-[#D9D9D9]">
                                <button>-</button>
                                <div>{cartItem?.quantity}</div>
                                <button>+</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BucketContent;
