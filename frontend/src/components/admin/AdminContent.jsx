import React, {useEffect, useState} from 'react';
import MyInput from "../ui/input/MyInput.jsx";
import image from "../../assets/img.png";
import GreyButton from "../ui/greyButton/greyButton.jsx";
import Loader from "../Loader.jsx";
import AuthService from "../api/AuthService.js";
import {useNavigate} from "react-router-dom";

const AdminContent = () => {

    return (
        <div className="bg-[#D9D9D9] flex justify-center">
            <div className="max-w-[1500px] w-full relative pt-[130px] pb-[100px] min-h-screen mx-[20px]">
                <div className="bg-[#fff] rounded-[35px] shadow-md w-full px-[20px] pt-[30px] sm:p-[50px] mb-[30px]">
                    <form>
                        <h2 className="text-[24px] sm:text-[28px] inter-400 mb-[40px]">Категории</h2>
                        <div className="flex flex-col items-start lg:flex-row lg:items-center gap-[20px]">
                            <div className="relative w-full lg:w-11/12">
                                <MyInput placeholder="Название категории" />
                                <img className="absolute top-0 right-0 w-[35px] cursor-pointer" src={image} alt=""/>
                            </div>
                            <div className="w-full lg:w-3/12">
                                <GreyButton>Добавить</GreyButton>
                            </div>
                        </div>
                    </form>
                    <h2 className="text-[24px] sm:text-[28px] inter-400 mb-[20px] lg:mb-[40px] mt-[20px]">Продукт</h2>
                    <form>
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

                    <h2 className="text-[24px] sm:text-[28px] inter-400 mb-[40px] mt-[20px]">Заказ</h2>
                </div>
            </div>
        </div>
    );
};

export default AdminContent;