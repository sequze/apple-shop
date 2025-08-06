import React from 'react';

const BucketContent = () => {
    return (
        <div className="w-full md:w-3/4">
            <div className="bg-[#fff] rounded-[15px] shadow-md w-full flex px-[30px] lg:px-[50px] py-[10px] justify-between mb-[30px]">
                <div className="flex items-center gap-[20px]">
                    <input type="checkbox"/>
                    <div>Выбрать все</div>
                </div>
                <div className="w-[40px] h-[40px] bg-[#D9D9D9]" />
            </div>
            <div className="bg-[#fff] rounded-[15px] shadow-md w-full p-[10px] sm:p-[25px] lg:px-[50px]">
                <div className="py-[10px] sm:py-[20px]">
                    <div className="flex flex-col xl:flex-row items-start xl:items-center w-full justify-between">
                        <div className="flex items-center gap-[10px] lg:gap-[30px] xl:gap-[50px]">
                            <div className="bg-[#D9D9D9] w-[100px] h-[100px]" />
                            <div className="inter-300 text-[22px]">Macbook Air 13-inch</div>
                        </div>
                        <div className="flex justify-between w-full xl:w-auto mt-[20px] xl:mt-0 xl:gap-[40px]">
                            <div className="inter-300 text-[22px]">$1009.00</div>
                            <div className="flex items-center gap-[30px] md:gap-[20px] lg:gap-[30px] rounded-[10px] px-[15px] py-[4px] bg-[#D9D9D9]">
                                <button>-</button>
                                <div>1</div>
                                <button>+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BucketContent;