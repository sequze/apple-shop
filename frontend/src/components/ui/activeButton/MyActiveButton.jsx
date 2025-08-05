import React from 'react';

const MyActiveButton = ({children, ...props}) => {
    return (
        <button {...props} className="bg-[#0171E2] text-[#fff] rounded-full border-none px-[25px] py-[15px] transition-all duration-150 cursor-pointer hover:opacity-80">
            {children}
        </button>
    );
};

export default MyActiveButton;