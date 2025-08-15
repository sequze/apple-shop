import React, {useEffect, useRef, useState} from 'react';
import MyModal from "../../ui/modal/MyModal.jsx";
import cameraImg from "../../../assets/camera.png";
import categoryImgPlaceHolder from "../../../assets/img.svg";
import {CategoriesService} from "../../api/service/CategoriesService.js";
import Loader from "../../Loader.jsx";
import MyInput from "../../ui/input/MyInput.jsx";
import MyWhiteButton from "../../ui/whiteButton/MyWhiteButton.jsx";

const AdminCategoryEditModal = ({visible, category, setVisible, setIsLoadingContent, onUpdate}) => {
    const fileInput = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState(category?.name);
    const [percent, setPercent] = useState("");
    const [percentStartDate, setPercentStartDate] = useState("")
    const [percentEndDate, setPercentEndDate] = useState("")
    const [description, setDescr] = useState("");
    const [imageUrl, setImageUrl] = useState(category?.image_url || categoryImgPlaceHolder);

    useEffect(() => {
        setName(category?.name);
        setImageUrl(category?.image_url || categoryImgPlaceHolder);
    }, [category, visible]);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageUrl(URL.createObjectURL(file));
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            await CategoriesService.updateCategoryImage(category.id, formData);
            await onUpdate()
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        setIsLoadingContent(true);
        try {
            const category_id = category.id;
            await CategoriesService.updateCategoryName(category_id, name);
            await onUpdate()
            //
            // if (percent !== null && percent !== "") {
            //     await CategoriesService.createCategoryDiscount(
            //         category_id,
            //         percent,
            //         percentStartDate,
            //         percentEndDate,
            //         description,
            //         true
            //     );
            // }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoadingContent(false);
        }
    }

    return (
        <div>
            <MyModal visible={visible} setVisible={setVisible} widthClass="w-11/12 sm:w-3/4">
                <div className="flex gap-7 w-full pb-[50px]">
                    {isLoading ?
                        <div className="flex justify-center items-center w-[100px] h-[100px] sm:w-[150px] md:w-[200px] sm:h-[150px] md:h-[200px]">
                            <Loader/>
                        </div>
                        :
                        <div className="relative bg-[#D9D9D9] w-[100px] h-[100px] sm:w-[150px] md:w-[300px] sm:h-[150px] md:h-[300px]">
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
                                src={imageUrl} alt=""/>
                        </div>
                    }
                    <div className="flex-1">
                        <label className="block mt-4 mb-2 text-sm font-medium">Название категории</label>
                        <MyInput
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Например, Macbook"/>

                        <label className="block mb-2 text-sm font-medium pt-[30px]">Процент скидки</label>
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
                        <div className="mt-[40px]">
                            <MyWhiteButton onClick={handleEdit}>Отправить</MyWhiteButton>
                        </div>
                    </div>
                </div>
            </MyModal>
        </div>
    );
};

export default AdminCategoryEditModal;