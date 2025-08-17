import React from 'react';
import MyInput from "../../ui/input/MyInput.jsx";
import MyWhiteButton from "../../ui/whiteButton/MyWhiteButton.jsx";
import GreyButton from "../../ui/greyButton/greyButton.jsx";

const NameStep = ({handleCancel, setIsCategoryImg, categoryName, setCategoryName}) => {

    const handleContinueImg = (e) => {
        e.preventDefault()
        if (categoryName.trim() === "") {
            alert("Введите название категории");
            return;
        }
        setIsCategoryImg(true)
    }

    return (
        <div>
            <label className="block mt-4 mb-2 text-sm font-medium">Название категории</label>
            <MyInput
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
                placeholder="Например: Macbook" />

            <div className="grid gap-3 mt-[20px]">
                <MyWhiteButton onClick={handleContinueImg}>Продолжить</MyWhiteButton>
                <GreyButton onClick={handleCancel}>Отмена</GreyButton>
            </div>
        </div>
    );
};

export default NameStep;