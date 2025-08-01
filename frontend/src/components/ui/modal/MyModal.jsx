import React from 'react';

const MyModal = ({children, visible, setVisible}) => {
    return (
        <div className={
            visible
                ? "fixed z-[10] bg-opacity-80 top-0 left-0 w-full h-full bg-[#000] flex flex-col items-center"
                : "fixed z-[10] bg-opacity-0 top-0 left-0 w-full h-full bg-[#000] flex flex-col items-center scale-0"
        } onClick={() => setVisible(false)}>
            <div className={
                visible
                    ? "bg-[#fff] w-1/2 m-auto rounded-[15px] py-[25px] px-[50px]"
                    : ""
            } onClick={(e) => e.stopPropagation()}>
                <div>
                    <div className="ml-auto w-[35px] h-[35px] bg-[#D9D9D9] cursor-pointer" onClick={() => setVisible(false)}/>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MyModal;