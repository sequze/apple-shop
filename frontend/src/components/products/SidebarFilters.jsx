import React from 'react';
import GreyButton from "../ui/greyButton/greyButton.jsx";
import MyWhiteButton from "../ui/whiteButton/MyWhiteButton.jsx";

const SidebarFilters = () => {
    return (
        <div className="bg-white rounded-[25px] p-[20px] sm:p-[25px] shadow-md">
            <div className="text-[20px] sm:text-[24px] font-medium mb-[15px]">
                Наличие в магазине
            </div>
            <div className="space-y-[12px] text-[16px]">
                <label className="flex items-center gap-[10px]">
                    <input type="checkbox" className="accent-black w-[18px] h-[18px]" />
                    Под заказ: сегодня
                </label>
                <label className="flex items-center gap-[10px]">
                    <input type="checkbox" className="accent-black w-[18px] h-[18px]" />
                    Под заказ: завтра
                </label>
                <label className="flex items-center gap-[10px]">
                    <input type="checkbox" className="accent-black w-[18px] h-[18px]" />
                    Под заказ: позже
                </label>
            </div>

            <hr className="my-[25px] border-t border-gray-300" />

            <div className="text-[20px] sm:text-[24px] font-medium mb-[15px]">
                Цена
            </div>
            <div className="space-y-[12px] text-[16px]">
                <label className="flex items-center gap-[10px]">
                    <input type="radio" name="price" className="accent-black w-[18px] h-[18px]" />
                    До $50
                </label>
                <label className="flex items-center gap-[10px]">
                    <input type="radio" name="price" className="accent-black w-[18px] h-[18px]" />
                    От $50 до $100
                </label>
                <label className="flex items-center gap-[10px]">
                    <input type="radio" name="price" className="accent-black w-[18px] h-[18px]" />
                    Свыше $100
                </label>
            </div>

            <div className="mt-[40px] grid gap-[15px]">
                <GreyButton style={{ borderRadius: "20px", padding: "12px 0" }}>Применить</GreyButton>
                <MyWhiteButton style={{ width: "100%" }}>Сбросить</MyWhiteButton>
            </div>
        </div>
    );
};

export default SidebarFilters;
