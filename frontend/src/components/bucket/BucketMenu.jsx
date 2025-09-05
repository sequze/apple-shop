import React from 'react';
import trash from '../../assets/trash.png'

const BucketMenu = () => {
    return (
        <div className="bg-[#fff] rounded-[15px] shadow-md w-full flex px-[30px] lg:px-[50px] py-[10px] justify-between mb-[30px]">
            <div className="flex items-center gap-[20px]">
                <input type="checkbox"/>
                <div>Выбрать все</div>
            </div>
            <div className="w-[35px] h-[35px] opacity-75 cursor-pointer transition-all duration-150 hover:opacity-100">
                <img src={trash} alt="Мусорка"/>
            </div>
        </div>
    );
};

export default BucketMenu;