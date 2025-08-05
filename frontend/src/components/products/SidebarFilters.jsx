import React from 'react';
import GreyButton from "../ui/greyButton/greyButton.jsx";
import MyWhiteButton from "../ui/whiteButton/MyWhiteButton.jsx";

const SidebarFilters = () => {
    return (
        <div>
            <div className="bg-[#fff] rounded-[25px] mr-[50px] p-[25px] min-w-[350px] w-max shadow-md">
                <div className="text-[24px] font-medium mb-[20px]">
                    Наличие в магазине
                </div>
                <div className="space-y-[15px] text-[16px]">
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

                <hr className="my-[30px] border-t border-gray-300" />

                <div className="text-[24px] font-medium mb-[20px]">
                    Цена
                </div>
                <div className="space-y-[15px] text-[16px]">
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

                <div className="mt-[50px] grid gap-[20px]">
                    <GreyButton style={{borderRadius: "20px", padding: "15px 0"}}>Применить</GreyButton>
                    <MyWhiteButton  style={{width: "100%"}}>Сбросить</MyWhiteButton>
                </div>
            </div>
        </div>
    );
};

export default SidebarFilters;