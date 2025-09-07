import React from "react";
import trash from "../../assets/trash.png";
import CustomCheckbox from "../ui/customCheckbox/CustomCheckbox.jsx";

const BucketMenu = ({ isAllSelected, onSelectAll, handleDeleteSelected }) => {
    return (
        <div className="bg-[#fff] rounded-[15px] shadow-md w-full flex px-[30px] lg:px-[50px] py-[10px] justify-between mb-[30px]">
            <div className="flex items-center gap-[20px]">
                <CustomCheckbox checked={isAllSelected} onChange={onSelectAll} />
                <div>Выбрать все</div>
            </div>
            <div
                className="w-[35px] h-[35px] opacity-75 cursor-pointer transition-all duration-150 hover:opacity-100"
                onClick={handleDeleteSelected}
            >
                <img src={trash} alt="Мусорка" />
            </div>
        </div>
    );
};

export default BucketMenu;
