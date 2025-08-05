import React from 'react';

const GreyButton = ({children}) => {
    return (
        <button onClick={(e) => {
            e.preventDefault();
        }} className="w-full flex items-center justify-center text-[18px] text-[#333] bg-[#D9D9D9] rounded-[10px] py-[10px] transition-all duration-150 hover:opacity-75">
            {children}
        </button>
    );
};

export default GreyButton;