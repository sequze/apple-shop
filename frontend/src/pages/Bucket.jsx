import React from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import MyActiveButton from "../components/ui/activeButton/MyActiveButton.jsx";
import {Link} from "react-router-dom";

const Bucket = ({logo}) => {
    return (
        <div>
            <Header logo={logo} />
            <div className="bg-[#D9D9D9]">
                <div className="mx-auto max-w-[1500px] w-full relative  pt-[100px] pb-[100px] min-h-[100vh]">
                    <h2 className="ml-[25px] text-[36px] montserrat-300 mt-[30px] mb-[40px]">Корзина</h2>
                    <div className="flex">
                        <div className="mr-[50px]  min-w-[350px] w-3/4">
                            <div className="bg-[#fff] rounded-[15px] shadow-md w-full flex px-[50px] py-[10px] justify-between mb-[30px]">
                                <div className="flex items-center gap-[20px]">
                                    <input type="checkbox"/>
                                    <div>Выбрать все</div>
                                </div>
                                <div className="w-[40px] h-[40px] bg-[#D9D9D9]" />
                            </div>
                            <div className="bg-[#fff] rounded-[15px] shadow-md w-full p-[25px] px-[50px]">
                                <div className="flex flex-col py-[20px]">
                                    <div className="flex items-center w-full justify-between">
                                        <div className="flex items-center gap-[50px]">
                                            <div className="bg-[#D9D9D9] w-[100px] h-[100px]" />
                                            <div className="inter-300 text-[22px]">Macbook Air 13-inch</div>
                                        </div>
                                        <div className="inter-300 text-[22px]">$1009.00</div>
                                        <div className="flex items-center gap-[30px] rounded-[10px] px-[15px] py-[4px] bg-[#D9D9D9]">
                                            <button>-</button>
                                            <div>1</div>
                                            <button>+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col py-[20px]">
                                    <div className="flex items-center w-full justify-between">
                                        <div className="flex items-center gap-[50px]">
                                            <div className="bg-[#D9D9D9] w-[100px] h-[100px]" />
                                            <div className="inter-300 text-[22px]">Macbook Air 13-inch</div>
                                        </div>
                                        <div className="inter-300 text-[22px]">$1009.00</div>
                                        <div className="flex items-center gap-[30px] rounded-[10px] px-[15px] py-[4px] bg-[#D9D9D9]">
                                            <button>-</button>
                                            <div>1</div>
                                            <button>+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col py-[20px]">
                                    <div className="flex items-center w-full justify-between">
                                        <div className="flex items-center gap-[50px]">
                                            <div className="bg-[#D9D9D9] w-[100px] h-[100px]" />
                                            <div className="inter-300 text-[22px]">Macbook Air 13-inch</div>
                                        </div>
                                        <div className="inter-300 text-[22px]">$1009.00</div>
                                        <div className="flex items-center gap-[30px] rounded-[10px] px-[15px] py-[4px] bg-[#D9D9D9]">
                                            <button>-</button>
                                            <div>1</div>
                                            <button>+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="bg-[#fff] rounded-[15px] p-[25px] min-w-[350px] w-1/4 shadow-md h-fit">
                            <div className="flex items-center justify-between mb-[10px]">
                                <div className="inter-400 text-[22px]"> Товары</div>
                                <div className="inter-400 text-[18px]">$1009.00</div>
                            </div>
                            <div className="flex items-center justify-between mb-[30px]">
                                <div className="inter-400 text-[22px]">Скидка</div>
                                <div className="inter-400 text-[18px]">$5.00</div>
                            </div>
                            <div className="flex items-center justify-between mb-[10px]">
                                <div className="inter-400 text-[22px]">Итог</div>
                                <div className="inter-400 text-[18px]">$1004.00</div>
                            </div>
                            <div className="flex justify-end">
                                <Link to={"/order"}>
                                    <MyActiveButton>Buy</MyActiveButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Bucket;