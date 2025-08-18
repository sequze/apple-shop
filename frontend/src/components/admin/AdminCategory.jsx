import React, {useContext, useState} from 'react';
import GreyButton from "../ui/greyButton/greyButton.jsx";
import {CategoriesService} from "../api/service/CategoriesService.js";
import {CategoriesContext} from "../../context/CategoriesContext.jsx";
import CategoryEditModal from "./category/CategoryEditModal.jsx";
import NameStep from "./category/NameStep.jsx";
import ImgStep from "./category/ImgStep.jsx";
import DiscountStep from "./category/DiscountStep.jsx";
import ListCategories from "./category/ListCategories.jsx";

const AdminCategory = ({withLoading}) => {
    const [isCreateCategory, setIsCreateCategory] = useState(false);
    const [isCategoryImg, setIsCategoryImg] = useState(false);
    const [isDiscount, setIsDiscount] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryImageFile, setCategoryImageFile] = useState(null);
    const [percent, setPercent] = useState("");
    const [percentStartDate, setPercentStartDate] = useState("");
    const [percentEndDate, setPercentEndDate] = useState("");
    const [description, setDescription] = useState("");
    const {setCategories} = useContext(CategoriesContext);
    const [visible, setVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategory = (e) => {
        e.preventDefault();
        setIsCreateCategory(true);
        setCategoryName("");
    }

    const refreshCategories = async () => {
        try {
            await withLoading(async () => {
                const updated = await CategoriesService.getAllCategories();
                setCategories(updated);
            });
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
        setDescription("");
    };



    const handleCreateCategory = async (e) => {
        e.preventDefault()
        await withLoading(async () => {
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
            }
        })
    }

    const handleDelete = async (id) => {
        try {
            await withLoading(async () => {
                await CategoriesService.deleteCategory(id);
                setCategories(prev => prev.filter(category => category.id !== id));
            });
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
                            <NameStep
                                handleCancel={handleCancel}
                                setIsCategoryImg={setIsCategoryImg}
                                categoryName={categoryName}
                                setCategoryName={setCategoryName}
                            />
                        )}
                        {isCategoryImg && !isDiscount && (
                           <ImgStep
                                handleCancel={handleCancel}
                                categoryImageFile={categoryImageFile}
                                setCategoryImageFile={setCategoryImageFile}
                                setIsDiscount={setIsDiscount}
                           />
                        )}
                        {isCategoryImg && isDiscount && (
                          <DiscountStep
                              handleCancel={handleCancel}
                              handleCreateCategory={handleCreateCategory}
                              description={description}
                              setDescription={setDescription}
                              percent={percent}
                              setPercent={setPercent}
                              percentStartDate={percentStartDate}
                              setPercentStartDate={setPercentStartDate}
                              percentEndDate={percentEndDate}
                              setPercentEndDate={setPercentEndDate}
                          />
                        )}
                    </div>
                </div>
            )}
            <ListCategories
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />

        <CategoryEditModal
            category={selectedCategory}
            withLoading={withLoading}
            visible={visible}
            setVisible={setVisible}
            onUpdate={refreshCategories}
        />
        </form>
    );
};

export default AdminCategory;