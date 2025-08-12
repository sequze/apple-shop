import React, {useState} from 'react';
import MyInput from "../ui/input/MyInput.jsx";
import GreyButton from "../ui/greyButton/greyButton.jsx";
import MyWhiteButton from "../ui/whiteButton/MyWhiteButton.jsx";

const AdminCategory = () => {
    const [isCreateCategory, setIsCreateCategory] = useState(false);
    const [isCategoryImg, setIsCategoryImg] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    const handleCategory = (e) => {
        e.preventDefault();
        setIsCreateCategory(true);
        setCategoryName("");
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setIsCreateCategory(false);
        setIsCategoryImg(false);
        setCategoryName("");
    };

    const handleContinueImg = (e) => {
        e.preventDefault()
        if (categoryName.trim() === "") {
            alert("Введите название категории");
            return;
        }
        setIsCategoryImg(true)
    }

    const handleContinueDiscount = (e) => {
        e.preventDefault()
        if (categoryName.trim() === "") {
            alert("Введите название категории");
            return;
        }
        setIsCategoryImg(true)
    }

    return (
        <form>
            <h2 className="text-[24px] sm:text-[28px] inter-400 mb-[40px]">Категории</h2>

            {!isCreateCategory && (
                <div className="w-full lg:w-3/12">
                    <GreyButton onClick={handleCategory}>
                        Добавить
                    </GreyButton>
                </div>
            )}


            {isCreateCategory && (
                <div className="flex flex-col items-start lg:flex-row lg:items-center gap-[20px]">
                    <div className="relative w-full lg:w-1/2">

                        {!isCategoryImg && (
                            <>
                                <MyInput
                                    value={categoryName}
                                    onChange={(event) => setCategoryName(event.target.value)}
                                    placeholder="Название категории" />

                                <div className="grid gap-3 mt-[20px]">
                                    <MyWhiteButton onClick={handleContinueImg}>Продолжить</MyWhiteButton>
                                    <GreyButton onClick={handleCancel}>Отмена</GreyButton>
                                </div>
                            </>
                        )}
                        {isCategoryImg && (
                            <>


                                <div className="grid gap-3 mt-[20px]">
                                    <MyWhiteButton onClick={handleContinueDiscount}>Продолжить</MyWhiteButton>
                                    <GreyButton onClick={handleCancel}>Отмена</GreyButton>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </form>
    );
};

export default AdminCategory;