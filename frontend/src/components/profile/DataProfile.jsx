import React from 'react';

const DataProfile = ({user, logout}) => {
    return (
        <div className="flex items-center gap-[100px] mb-[80px]">
            <div>
                <div className="bg-[#D9D9D9] w-[200px] h-[200px] rounded-full">
                    <img src={user.profile_image_url} alt=""/>
                </div>
            </div>
            <div>
                <div className="montserrat-400 text-[36px] mb-[10px]">{user.full_name}</div>
                <div className="montserrat-400 text-[#0171E2] hover:underline cursor-pointer mb-[10px]">Изменить профиль</div>
                <div className="montserrat-400 text-red-500 hover:underline cursor-pointer" onClick={logout}>Выйти</div>
            </div>
        </div>
    );
};

export default DataProfile;