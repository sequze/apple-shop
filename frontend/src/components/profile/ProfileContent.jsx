import React from 'react';
import OrderList from "./OrderList.jsx";
import DataProfile from "./DataProfile.jsx";

const ProfileContent = ({user, logout}) => {
    return (
        <div className="bg-[#D9D9D9]">
            <div className="mx-auto max-w-[1500px] w-full relative  pt-[100px] pb-[100px] min-h-[100vh]">
                <h2 className="ml-[25px] text-[36px] montserrat-300 mt-[30px] mb-[40px]">Профиль</h2>
                <div>
                    <div className="bg-[#fff] rounded-[25px] mr-[50px] p-[25px] min-w-[350px] w-full shadow-md">
                        <div className="w-3/4 m-auto py-[35px]">
                            <DataProfile user={user} logout={logout} />
                            <OrderList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileContent;