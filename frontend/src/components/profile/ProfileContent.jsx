import React from 'react';
import OrderList from "./OrderList.jsx";
import DataProfile from "./DataProfile.jsx";

const ProfileContent = ({user, logout}) => {
    return (
        <div className="bg-[#D9D9D9] flex justify-center">
            <div className="max-w-[1200px] w-full relative pt-[100px] pb-[100px] min-h-screen mx-[20px]">
                <h2 className="ml-[25px] text-[28px] md:text-[36px] montserrat-300 mt-[30px] mb-[40px]">Профиль</h2>
                <div className="bg-[#fff] rounded-[25px] mr-[50px] p-[25px] min-w-[350px] w-full shadow-md">
                    <div className="w-full sm:w-3/4 m-auto py-[35px]">
                        <DataProfile user={user} logout={logout} />
                        <OrderList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileContent;