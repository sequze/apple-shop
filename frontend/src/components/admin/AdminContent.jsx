import React from 'react';
import AdminCategory from "./AdminCategory.jsx";
import AdminProducts from "./AdminProducts.jsx";
import AdminOrders from "./AdminOrders.jsx";

const AdminContent = () => {
    return (
        <div className="bg-[#D9D9D9] flex justify-center">
            <div className="max-w-[1500px] w-full relative pt-[130px] pb-[100px] min-h-screen mx-[20px]">
                <div className="bg-[#fff] rounded-[35px] shadow-md w-full px-[20px] pt-[30px] sm:p-[50px] mb-[30px]">
                    <AdminCategory />
                    <AdminProducts />
                    <AdminOrders />
                </div>
            </div>
        </div>
    );
};

export default AdminContent;