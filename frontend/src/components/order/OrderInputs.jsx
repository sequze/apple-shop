import React from 'react';
import MyInput from "../ui/input/MyInput.jsx";
import cash1 from "../../assets/pay_method/cash-1.png";
import cash2 from "../../assets/pay_method/cash-2.png";

const OrderInputs = ({payMethod, setPayMethod}) => {
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between w-full gap-[50px] mb-[40px]">
                <div className="w-full md:w-1/2">
                    <MyInput placeholder="Имя"/>
                </div>
                <div className="w-full md:w-1/2">
                    <MyInput placeholder="Телефон"/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between w-full gap-[50px] mb-[40px]">
                <div className="w-full md:w-1/2">
                    <MyInput placeholder="Фамилия"/>
                </div>
                <div className="w-full md:w-1/2">
                    <MyInput placeholder="Email"/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between w-full gap-[50px] mb-[40px]">
                <div className="w-full md:w-1/2">
                    <MyInput placeholder="Улица, дом, квартира"/>
                </div>
                <div className="w-full md:w-1/2">
                    <MyInput placeholder="Регион"/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-[50px] mb-[40px]">
                <div className="w-full md:w-1/2">
                    <MyInput placeholder="Город"/>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="flex justify-between items-end">
                        <button className="pb-[10px] border-[#D9D9D9] border-0 border-b-2 border-solid w-1/2 cursor-pointer flex items-center justify-center text-[20px] gap-[10px]"
                                style={payMethod === 0 ? {borderColor: "#0171E2"} : {}}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setPayMethod(0)
                                }}>
                            <img className="w-[40px]" src={cash1} alt=""/>
                            <div>Наличными</div>
                        </button>
                        <button className="pb-[10px] border-[#D9D9D9] border-0 border-b-2 border-solid w-1/2 cursor-pointer flex items-center justify-center text-[20px] gap-[10px]"
                                style={payMethod === 1 ? {borderColor: "#0171E2"} : {}}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setPayMethod(1)
                                }}>
                            <img className="w-[40px]" src={cash2} alt=""/>
                            <div>Картой</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderInputs;