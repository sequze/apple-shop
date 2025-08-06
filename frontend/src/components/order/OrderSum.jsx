import React from 'react';
import GreyButton from "../ui/greyButton/greyButton.jsx";

const OrderSum = () => {
    return (
        <div>
            <div className="w-full md:w-1/2 pr-[20px] pb-[50px]">
                <div className="flex items-center justify-between mb-[10px]">
                    <div className="inter-400 text-[20px]"> Товары</div>
                    <div className="inter-400 text-[20px]">$1009.00</div>
                </div>
                <div className="flex items-center justify-between mb-[30px]">
                    <div className="inter-400 text-[20px]">Скидка</div>
                    <div className="inter-400 text-[20px]">$5.00</div>
                </div>
                <div className="flex items-center justify-between mb-[10px]">
                    <div className="inter-400 text-[20px]">Итог</div>
                    <div className="inter-400 text-[20px]">$1004.00</div>
                </div>
            </div>
            <div className="w-full md:w-1/3 m-auto">
                <GreyButton>Сделать заказ</GreyButton>
            </div>
        </div>
    );
};

export default OrderSum;