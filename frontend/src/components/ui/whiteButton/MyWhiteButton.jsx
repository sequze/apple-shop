import React from 'react';

const MyWhiteButton = ({children}) => {
    return (
        <button className="text-[#333] rounded-[20px] border-[1px] px-[60px] py-[15px] transition-all duration-150 cursor-pointer hover:text-[#fff] hover:bg-[#333]">
            {children}
        </button>
    );
};

export default MyWhiteButton;