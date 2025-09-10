import React from 'react';

const GreyButton = ({children,  ...props}) => {
    return (
        <button onClick={(e) => {
            e.preventDefault();
        }} { ...props} className="cursor-pointer text-[14px] w-full flex items-center justify-center lg:text-[18px] text-[#333] bg-[#D9D9D9] rounded-[10px] py-[10px] transition-all duration-150 hover:opacity-75">
            {children}
        </button>
    );
};

export default GreyButton;