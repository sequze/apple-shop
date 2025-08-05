import React from 'react';

const OrderList = () => {
    return (
        <div>
            <h3 className="montserrat-400 text-[32px]">Список заказов</h3>
            <div className="flex flex-col pt-[40px]">
                <div className="flex items-center gap-[35px]">
                    <div className="bg-[#D9D9D9] w-[60px] h-[60px]" />
                    <div className="inter-300 text-[22px]">Macbook Air 13-inch</div>
                    <div className="inter-300 text-[18px] text-red-500" >В доставке</div>
                </div>
            </div>
            <div className="flex flex-col pt-[40px]">
                <div className="flex items-center gap-[35px]">
                    <div className="bg-[#D9D9D9] w-[60px] h-[60px]" />
                    <div className="inter-300 text-[22px]">Macbook Air 13-inch</div>
                    <div className="inter-300 text-[18px] text-red-500" >В доставке</div>
                </div>
            </div>
            <div className="flex flex-col pt-[40px]">
                <div className="flex items-center gap-[35px]">
                    <div className="bg-[#D9D9D9] w-[60px] h-[60px]" />
                    <div className="inter-300 text-[22px]">Macbook Air 13-inch</div>
                    <div className="inter-300 text-[18px] text-red-500" >В доставке</div>
                </div>
            </div>
        </div>
    );
};

export default OrderList;