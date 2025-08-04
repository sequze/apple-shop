import React from 'react';
import {Link} from "react-router-dom";

const ListProducts = ({currentCategory, currentProducts}) => {
    return (
        <div className="bg-[#D9D9D9]">
            <div className="mx-auto max-w-[1500px] w-full relative  pt-[100px] pb-[100px] min-h-[100vh]">
                <h2 className="ml-[25px] text-[36px] montserrat-300 mt-[30px] mb-[40px]">{currentCategory.title}</h2>
                <div className="flex">
                    <div>
                        <div className="bg-[#fff] rounded-[25px] mr-[50px] p-[25px] min-w-[350px] w-max shadow-md">
                            <div className="text-[24px] font-medium mb-[20px]">
                                Наличие в магазине
                            </div>
                            <div className="space-y-[15px] text-[16px]">
                                <label className="flex items-center gap-[10px]">
                                    <input type="checkbox" className="accent-black w-[18px] h-[18px]" />
                                    Под заказ: сегодня
                                </label>
                                <label className="flex items-center gap-[10px]">
                                    <input type="checkbox" className="accent-black w-[18px] h-[18px]" />
                                    Под заказ: завтра
                                </label>
                                <label className="flex items-center gap-[10px]">
                                    <input type="checkbox" className="accent-black w-[18px] h-[18px]" />
                                    Под заказ: позже
                                </label>
                            </div>

                            <hr className="my-[30px] border-t border-gray-300" />

                            <div className="text-[24px] font-medium mb-[20px]">
                                Цена
                            </div>
                            <div className="space-y-[15px] text-[16px]">
                                <label className="flex items-center gap-[10px]">
                                    <input type="radio" name="price" className="accent-black w-[18px] h-[18px]" />
                                    До $50
                                </label>
                                <label className="flex items-center gap-[10px]">
                                    <input type="radio" name="price" className="accent-black w-[18px] h-[18px]" />
                                    От $50 до $100
                                </label>
                                <label className="flex items-center gap-[10px]">
                                    <input type="radio" name="price" className="accent-black w-[18px] h-[18px]" />
                                    Свыше $100
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-[15px] justify-between">
                        {currentProducts.map(product => (
                            <Link
                                key={product.description}
                                to={`./${product.description
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]+/g, "-")
                                    .replace(/(^-|-$)+/g, "")}`}>
                                <div className="flex flex-col bg-[#fff] rounded-[25px] p-[25px] gap-[15px]">
                                    <div className="min-h-[250px] min-w-[280px]">
                                        <img className="max-w-[300px] w-max mx-auto" src={product.img} alt={product.type}/>
                                    </div>
                                    <p className="text-[18px]">{product.description}</p>
                                    <p className="text-[22px] opacity-80">{product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListProducts;