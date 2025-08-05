import React, {useState} from 'react';
import MyInput from "../ui/input/MyInput.jsx";
import cash1 from "../../assets/pay_method/cash-1.png";
import cash2 from "../../assets/pay_method/cash-2.png";
import GreyButton from "../ui/greyButton/greyButton.jsx";

const OrderContent = () => {

    const [payMethod, setPayMethod] = useState(0);

    return (
        <div className="bg-[#D9D9D9]">
            <div className="mx-auto max-w-[1500px] w-3/5 relative  pt-[100px] pb-[100px] min-h-[100vh]">
                <h2 className="ml-[25px] text-[36px] montserrat-300 mt-[30px] mb-[40px]">Оформление заказа</h2>
                <div>
                    <div className="bg-[#fff] rounded-[25px] mr-[50px] p-[25px] min-w-[350px] w-full shadow-md">
                        <form className="py-[50px]">
                            <div className="flex justify-between w-full gap-[50px] mb-[40px]">
                                <div className="w-1/2">
                                    <MyInput placeholder="Имя"/>
                                </div>
                                <div className="w-1/2">
                                    <MyInput placeholder="Телефон"/>
                                </div>
                            </div>
                            <div className="flex justify-between w-full gap-[50px] mb-[40px]">
                                <div className="w-1/2">
                                    <MyInput placeholder="Фамилия"/>
                                </div>
                                <div className="w-1/2">
                                    <MyInput placeholder="Email"/>
                                </div>
                            </div>
                            <div className="flex justify-between w-full gap-[50px] mb-[40px]">
                                <div className="w-1/2">
                                    <MyInput placeholder="Улица, дом, квартира"/>
                                </div>
                                <div className="w-1/2">
                                    <MyInput placeholder="Регион"/>
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full gap-[50px] mb-[40px]">
                                <div className="w-1/2">
                                    <MyInput placeholder="Город"/>
                                </div>
                                <div className="w-1/2">
                                    <div className="flex justify-between items-end">
                                        <button className="pb-[10px] border-[#D9D9D9] border-0 border-b-2 border-solid w-1/2 cursor-pointer flex items-center justify-center text-[20px] gap-[10px]"
                                                style={payMethod == 0 ? {borderColor: "#0171E2"} : {}}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setPayMethod(0)
                                                }}>
                                            <img className="w-[40px]" src={cash1} alt=""/>
                                            <div>Наличными</div>
                                        </button>
                                        <button className="pb-[10px] border-[#D9D9D9] border-0 border-b-2 border-solid w-1/2 cursor-pointer flex items-center justify-center text-[20px] gap-[10px]"
                                                style={payMethod == 1 ? {borderColor: "#0171E2"} : {}}
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
                            <div className="w-1/2 pr-[20px] pb-[50px]">
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
                            <div className="w-1/3 m-auto">
                                <GreyButton>Сделать заказ</GreyButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderContent;