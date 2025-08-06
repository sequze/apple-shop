import React from 'react';
import SidebarBucket from "./SidebarBucket.jsx";
import BucketContent from "./BucketContent.jsx";

const BucketForm = () => {
    return (
        <div className="bg-[#D9D9D9]">
            <div className="mx-auto max-w-[1500px] w-full relative  pt-[100px] pb-[100px] min-h-[100vh]">
                <h2 className="ml-[25px] text-[28px] lg:text-[36px] montserrat-300 mt-[30px] mb-[40px]">Корзина</h2>
                <div className="flex flex-col md:flex-row mx-[5px] sm:mx-[20px] justify-between gap-[10px] lg:gap-[20px] xl:gap-[50px]">
                    <BucketContent />
                    <SidebarBucket />
                </div>
            </div>
        </div>
    );
};

export default BucketForm;