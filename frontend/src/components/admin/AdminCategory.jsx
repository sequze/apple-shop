import React, {useContext, useRef, useState} from 'react';
import MyInput from "../ui/input/MyInput.jsx";
import GreyButton from "../ui/greyButton/greyButton.jsx";
import MyWhiteButton from "../ui/whiteButton/MyWhiteButton.jsx";
import cameraImg from "../../assets/camera.png";
import categoryImgPlaceHolder from "../../assets/img.svg";
import {CategoriesService} from "../api/service/CategoriesService.js";
import {CategoriesContext} from "../../context/CategoriesContext.jsx";
import AdminCategoryEditModal from "./category/AdminCategoryEditModal.jsx";

const AdminCategory = ({setIsLoading}) => {
    const [isCreateCategory, setIsCreateCategory] = useState(false);
    const [isCategoryImg, setIsCategoryImg] = useState(false);
    const [isDiscount, setIsDiscount] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryImageFile, setCategoryImageFile] = useState(null);
    const [percent, setPercent] = useState("");
    const [percentStartDate, setPercentStartDate] = useState("");
    const [percentEndDate, setPercentEndDate] = useState("");
    const [description, setDescr] = useState("");
    const {categories, setCategories} = useContext(CategoriesContext);
    const [visible, setVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const fileInput = useRef();

    const handleCategory = (e) => {
        e.preventDefault();
        setIsCreateCategory(true);
        setCategoryName("");
    }

    const refreshCategories = async () => {
        try {
            const updated = await CategoriesService.getAllCategories();
            setCategories(updated);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setIsCreateCategory(false);
        setIsCategoryImg(false);
        setIsDiscount(false);
        setCategoryName("");
        setCategoryImageFile(null);
        setPercent("");
        setPercentStartDate("");
        setPercentEndDate("");
        setDescr("");
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
        if (!categoryImageFile) {
            alert("Загрузите изображение для категории");
            return;
        }
        setIsDiscount(true)
    }

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) setCategoryImageFile(file);
    };

    const handleCreateCategory = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        try {
            const category = await CategoriesService.createCategory(categoryName);
            const category_id = category.id;

            const formData = new FormData();
            formData.append('file', categoryImageFile);
            await CategoriesService.updateCategoryImage(category_id, formData);
            if (percent !== null && percent !== "") {
                await CategoriesService.createCategoryDiscount(
                    category_id,
                    percent,
                    percentStartDate,
                    percentEndDate,
                    description,
                    true
                );
            }

            setCategories((prev) => [...prev, category])
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDelete = async (id) => {
        try {
            await CategoriesService.deleteCategory(id);
            setCategories(prev => prev.filter(category => category.id !== id));
        } catch (err) {
            console.error(err)
        }
    }

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setVisible(true);
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
                                <label className="block mt-4 mb-2 text-sm font-medium">Название категории</label>
                                <MyInput
                                    value={categoryName}
                                    onChange={(event) => setCategoryName(event.target.value)}
                                    placeholder="Например: Macbook" />

                                <div className="grid gap-3 mt-[20px]">
                                    <MyWhiteButton onClick={handleContinueImg}>Продолжить</MyWhiteButton>
                                    <GreyButton onClick={handleCancel}>Отмена</GreyButton>
                                </div>
                            </>
                        )}
                        {isCategoryImg && !isDiscount && (
                            <>
                                <h3 className="inter-400 text-[18px] mb-[20px]">Изображение для категории</h3>
                                <div className="relative bg-[#D9D9D9] w-[100px] h-[100px] sm:w-[150px] md:w-[200px] sm:h-[150px] md:h-[200px] overflow-hidden">
                                    <input type="file"
                                           accept="image/*"
                                           className="w-full h-full absolute top-0 left-0"
                                           style={{display:'none'}}
                                           ref={fileInput}
                                           onChange={handleFile}
                                           />
                                    <div
                                        className="transition-all duration-200 absolute top-0 left-0 w-full h-full opacity-[0] hover:opacity-[0.6] flex justify-center items-center bg-[#D9D9D9] cursor-pointer"
                                        onClick={() => fileInput.current.click()}
                                    >
                                        <img
                                            className="w-2/3 h-2/3"
                                            src={cameraImg}
                                            alt="Поставить изображение для категории"/>
                                    </div>

                                    <img
                                        className="w-full h-full object-cover"
                                        src={categoryImgPlaceHolder} alt=""/>
                                </div>
                                {categoryImageFile && <div className="text-green-500">Изображение успешно загружено</div>}
                                <div className="grid gap-3 mt-[20px]">
                                    <MyWhiteButton onClick={handleContinueDiscount}>Продолжить</MyWhiteButton>
                                    <GreyButton onClick={handleCancel}>Отмена</GreyButton>
                                </div>
                            </>
                        )}
                        {isCategoryImg && isDiscount && (
                            <>
                                <h3 className="inter-400 text-[18px] mb-[20px]">Скидка</h3>
                                <label className="block mb-2 text-sm font-medium">Процент скидки</label>
                                <MyInput
                                    type="number"
                                    inputMode="numeric"
                                    pattern="\d*"
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={percent}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if ((!isNaN(val) && val >= 0 && val <= 100) || val === "") {
                                            setPercent(val);
                                        }
                                    }}
                                    placeholder="Например: 15"
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">Дата начала</label>
                                        <input
                                            min={new Date().toISOString().split("T")[0]}
                                            type="date"
                                            className="border rounded px-3 py-2 w-full"
                                            value={percentStartDate}
                                            onChange={(e) => setPercentStartDate(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">Дата окончания</label>
                                        <input
                                            min={new Date().toISOString().split("T")[0]}
                                            type="date"
                                            className="border rounded px-3 py-2 w-full"
                                            value={percentEndDate}
                                            onChange={(e) => setPercentEndDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <label className="block mt-4 mb-2 text-sm font-medium">Описание скидки</label>
                                <MyInput
                                    value={description}
                                    onChange={(e) => setDescr(e.target.value)}
                                    placeholder="Например: Летняя распродажа"
                                />

                                <div className="grid gap-3 mt-[20px]">
                                    <MyWhiteButton onClick={handleCreateCategory}>Создать категорию</MyWhiteButton>
                                    <GreyButton onClick={handleCancel}>Отмена</GreyButton>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
            <div className="inter-400 text-[18px] py-[20px]">Список всех категорий</div>
            <div className="flex flex-wrap justify-center gap-6">
                {categories.map(category => (
                    <div
                        key={category.id}
                        className="flex items-center gap-5 mb-3 border-2 p-4 rounded-2xl">
                        <div>
                            <img
                                className="w-full sm:w-[120px] h-[120px] object-cover rounded-lg"
                                src={category.image_url}
                                alt={category.name}
                            />
                        </div>
                        <div>
                            <h3 className="text-[18px]">{category.name}</h3>
                            <div className="flex gap-3 mt-3">
                                <button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        handleEdit(category);
                                    }}
                                    className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600"
                                >
                                    Редактировать
                                </button>
                                <button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        handleDelete(category.id);
                                    }}
                                    className="px-3 py-1 rounded-full bg-red-500 text-white text-sm hover:bg-red-600"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

        <AdminCategoryEditModal
            category={selectedCategory}
            setIsLoadingContent={setIsLoading}
            visible={visible}
            setVisible={setVisible}
            onUpdate={refreshCategories}
        />
        </form>
    );
};

export default AdminCategory;