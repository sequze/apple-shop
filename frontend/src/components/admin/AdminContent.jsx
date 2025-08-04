import React from 'react';
import MyInput from "../ui/input/MyInput.jsx";
import image from "../../assets/img.png";
import GreyButton from "../ui/greyButton/greyButton.jsx";

const AdminContent = () => {
    return (
        <div className="bg-[#D9D9D9]">
            <div className="mx-auto max-w-[1500px] w-full relative pt-[130px] pb-[100px] min-h-[100vh]">
                <div className="bg-[#fff] rounded-[35px] shadow-md w-full px-[50px] py-[50px] mb-[30px]">
                    <h2 className="text-[28px] inter-400 mb-[40px]">Категории</h2>
                    <div className="flex items-center w-3/5 gap-[20px]">
                        <div className="relative w-9/12">
                            <MyInput style={{paddingRight: "40px"}} placeholder="Добавить категорию" />
                            <img className="absolute top-0 right-0 w-[35px] cursor-pointer" src={image} alt=""/>
                        </div>
                        <div className="w-3/12">
                            <GreyButton>Добавить</GreyButton>
                        </div>
                    </div>
                    <hr className="my-[30px] h-1 bg-black opacity-60" />
                    <h2 className="text-[28px] inter-400 mb-[40px]">Продукт</h2>
                    <div className="flex items-center w-3/5 gap-[20px]">
                        <div className="relative w-9/12">
                            <MyInput style={{paddingRight: "40px"}} placeholder="Добавить продукт" />
                            <img className="absolute top-0 right-0 w-[35px]  cursor-pointer" src={image} alt=""/>
                        </div>
                        <div className="w-3/12">
                            <GreyButton>Добавить</GreyButton>
                        </div>
                    </div>
                    <hr className="my-[30px] h-1 bg-black opacity-60" />
                    <h2 className="text-[28px] inter-400 mb-[40px]">Заказ</h2>
                </div>
            </div>
        </div>
    );
};

export default AdminContent;