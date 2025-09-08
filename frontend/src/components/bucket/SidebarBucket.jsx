import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import MyActiveButton from "../ui/activeButton/MyActiveButton.jsx";
import {CartContext} from "../../context/CartContext.jsx";

const SidebarBucket = ({selectedIds}) => {

    const {cartItems, setCartItems} = useContext(CartContext);

    const { totalPrice, totalDiscount, finishPrice } = useMemo(() => {
        const selectedItems = cartItems.filter(item => selectedIds.includes(item.id));

        const totalPrice = selectedItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
        const totalDiscount = selectedItems.reduce((sum, item) => sum + (item.discount ? (item.product?.price * item.quantity - (item.price_with_discount || 0)) : 0), 0);
        const finishPrice = totalPrice - totalDiscount;

        return { totalPrice, totalDiscount, finishPrice };
    }, [cartItems, selectedIds]);


    return (
        <div className="bg-[#fff] rounded-[15px] p-[25px] min-w-[280px] lg:min-w-[350px] w-full md:w-1/4 shadow-md h-fit">
            <div className="flex items-center justify-between mb-[10px] text-[18px] lg:text-[22px]">
                <div className="inter-400">Товары:</div>
                <div className="inter-400">{totalPrice} ₽</div>
            </div>
            <div className="flex items-center justify-between mb-[30px] text-[18px] lg:text-[22px]">
                <div className="inter-400">Скидка: </div>
                <div className="inter-400">{totalDiscount} ₽</div>
            </div>
            <div className="flex items-center justify-between mb-[10px] text-[18px] lg:text-[22px]">
                <div className="inter-400">Итог</div>
                <div className="inter-400">{finishPrice} ₽</div>
            </div>
            <div className="flex justify-end">
                <Link to={"/order"}>
                    <MyActiveButton>Buy</MyActiveButton>
                </Link>
            </div>
        </div>
    );
};

export default SidebarBucket;