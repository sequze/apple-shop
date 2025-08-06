import React from 'react';
import {Link} from "react-router-dom";
import MyActiveButton from "../ui/activeButton/MyActiveButton.jsx";

const SidebarBucket = () => {
    return (
        <div className="bg-[#fff] rounded-[15px] p-[25px] min-w-[280px] lg:min-w-[350px] w-full md:w-1/4 shadow-md h-fit">
            <div className="flex items-center justify-between mb-[10px] text-[18px] lg:text-[22px]">
                <div className="inter-400"> Товары</div>
                <div className="inter-400">$1009.00</div>
            </div>
            <div className="flex items-center justify-between mb-[30px] text-[18px] lg:text-[22px]">
                <div className="inter-400">Скидка</div>
                <div className="inter-400">$5.00</div>
            </div>
            <div className="flex items-center justify-between mb-[10px] text-[18px] lg:text-[22px]">
                <div className="inter-400">Итог</div>
                <div className="inter-400">$1004.00</div>
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