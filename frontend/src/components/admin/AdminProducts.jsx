import React from 'react';
import MyInput from "../ui/input/MyInput.jsx";
import image from "../../assets/img.png";
import GreyButton from "../ui/greyButton/greyButton.jsx";

const AdminProducts = () => {
    return (
        <form>
            <h2 className="text-[24px] sm:text-[28px] inter-400 mb-[20px] lg:mb-[40px] mt-[20px]">Продукт</h2>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[20px]">
                <div className="relative w-full lg:w-5/12">
                    <MyInput placeholder="Название продукта" />
                    <img className="absolute top-0 right-0 w-[35px]  cursor-pointer" src={image} alt=""/>
                </div>
                <div className="w-full lg:w-auto relative">
                    <MyInput placeholder="Цена" />
                </div>
                <div className="w-full lg:w-auto relative">
                    <MyInput placeholder="Скидка" />
                </div>
                <div className="w-full lg:w-3/12">
                    <GreyButton>Добавить</GreyButton>
                </div>
            </div>
        </form>
    );
};

export default AdminProducts;