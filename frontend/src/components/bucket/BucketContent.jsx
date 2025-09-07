import React, { useContext } from 'react';
import { CartContext } from "../../context/CartContext.jsx";
import BucketMenu from "./BucketMenu.jsx";
import CartService from "../api/service/CartService.js";
import CustomCheckbox from "../ui/customCheckbox/CustomCheckbox.jsx";

const BucketContent = ({toggleSelect, selectedIds, deleteSelected, selectAll}) => {
    const { cartItems, refreshCart, isLoading } = useContext(CartContext);
    const isAllSelected =
        Array.isArray(cartItems) &&
        cartItems.length > 0 &&
        selectedIds.length === cartItems.length;


    console.log("Текущая корзина:", cartItems);

    const downCountCart = async (cartItem) => {
        try {
            const newQuantity = cartItem.quantity - 1;
            if (newQuantity <= 0) {
                await removeCartItem(cartItem.id);
            } else {
                await CartService.updateCartItems(cartItem.id, newQuantity);
                await refreshCart();
            }
        } catch (error) {
            console.error("Ошибка при уменьшении количества:", error);
        }
    };

    const upCountCart = async (cartItem) => {
        try {
            const newQuantity = cartItem.quantity + 1;
            await CartService.updateCartItems(cartItem.id, newQuantity);
            await refreshCart();
        } catch (error) {
            console.error("Ошибка при увеличении количества:", error);
        }
    };

    const removeCartItem = async (cartItemId) => {
        try {
            await CartService.deleteCartItem(cartItemId);
            await refreshCart();
        } catch (error) {
            console.error("Ошибка при удалении элемента:", error);
        }
    };

    const getImageForCartItem = (cartItem) => {
        const color = cartItem?.product?.colors?.find(
            (c) => Number(c.id) === Number(cartItem?.color_id)
        );

        if (!color) return null;

        const mainImage = color.images?.find((img) => img.is_main);
        if (mainImage) return mainImage.url;

        return color.images?.[0]?.url || null;
    };


    if (isLoading) {
        return (
            <div className="w-full md:w-3/4">
                <BucketMenu
                    isAllSelected={isAllSelected}
                    onSelectAll={selectAll}
                    handleDeleteSelected={selectedIds.length ? deleteSelected : () => {}}
                />
                <div className="bg-[#fff] rounded-[15px] shadow-md w-full p-[25px] text-center">
                    Загрузка корзины...
                </div>
            </div>
        );
    }

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="w-full md:w-3/4">
                <BucketMenu
                    isAllSelected={isAllSelected}
                    onSelectAll={selectAll}
                    handleDeleteSelected={selectedIds.length ? deleteSelected : () => {}}
                />
                <div className="bg-[#fff] rounded-[15px] shadow-md w-full p-[25px] text-center">
                    Корзина пуста
                </div>
            </div>
        );
    }

    return (
        <div className="w-full md:w-3/4">
            <BucketMenu
                isAllSelected={isAllSelected}
                onSelectAll={selectAll}
                handleDeleteSelected={selectedIds.length ? deleteSelected : () => {}}
            />
            <div className="bg-[#fff] rounded-[15px] shadow-md w-full p-[10px] sm:p-[25px] lg:px-[50px]">
                {cartItems.map(cartItem => (
                    <div
                        key={cartItem?.id}
                        className="py-[10px] sm:py-[20px] border-b border-gray-200 last:border-b-0"
                    >
                        <div className="flex flex-col xl:flex-row items-start xl:items-center w-full justify-between">
                            <div className="flex items-center gap-[10px] lg:gap-[30px] xl:gap-[50px]">
                                <CustomCheckbox
                                    checked={selectedIds.includes(cartItem.id)}
                                    onChange={() => toggleSelect(cartItem.id)}
                                />

                                <div className="w-[150px]">
                                    <img
                                        src={getImageForCartItem(cartItem) || "/images/placeholder.png"}
                                        alt={cartItem?.product?.name}
                                        className="w-full h-full object-cover rounded-[10px]"
                                    />
                                </div>

                                <div className="inter-300 text-[22px]">
                                    {cartItem?.product?.name}
                                    {cartItem?.color_name && (
                                        <div className="text-sm text-gray-600">
                                            Цвет: {cartItem.color_name}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col justify-center w-full xl:w-auto mt-[20px] xl:mt-0 xl:gap-[5px]">
                                {cartItem?.discount > 0 ? (
                                    <>
                                        <span className="text-[22px] font-bold text-blue-600">
                                            {cartItem?.price_with_discount} ₽
                                        </span>
                                        <span className="text-sm text-gray-500 line-through">
                                            {cartItem?.product?.price} ₽
                                        </span>
                                        <span className="text-sm text-green-600">
                                            Скидка {cartItem?.discount}%
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-[22px] font-bold">
                                        {cartItem?.product?.price} ₽
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-[30px] md:gap-[20px] lg:gap-[30px] rounded-[10px] px-[15px] py-[4px] bg-[#D9D9D9] mt-[20px] xl:mt-0">
                                <button
                                    onClick={() => downCountCart(cartItem)}
                                    className="px-2 py-1 hover:bg-gray-300 rounded"
                                >
                                    -
                                </button>
                                <div className="min-w-[30px] text-center">{cartItem?.quantity}</div>
                                <button
                                    onClick={() => upCountCart(cartItem)}
                                    className="px-2 py-1 hover:bg-gray-300 rounded"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BucketContent;