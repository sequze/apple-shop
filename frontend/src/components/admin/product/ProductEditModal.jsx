import React, {useContext, useEffect, useRef, useState} from "react";
import MyModal from "../../ui/modal/MyModal.jsx";
import MyInput from "../../ui/input/MyInput.jsx";
import {CategoriesContext} from "../../../context/CategoriesContext.jsx";
import ProductsService from "../../api/service/ProductsService.js";
import cameraImg from "../../../assets/camera.png";

const ProductEditModal = ({visible, setVisible, product, onSave}) => {
    const {categories} = useContext(CategoriesContext);
    const [editedProduct, setEditedProduct] = useState(null);
    const fileInputs = useRef([]);

    useEffect(() => {
        if (product) {
            setEditedProduct({
                ...product,
                category: categories.find(c => c.id === product.category_id) || null,
                discount: product.discount || {
                    percent: 0,
                    startDate: "",
                    endDate: "",
                    description: ""
                },
                colors: product.colors?.map(c => ({
                    id: c.id,
                    colorName: c.name,
                    colorCode: c.code || "#000000",
                    colorQuantity: c.quantity,
                    colorImage: null,
                    previewUrl: c.images?.[0]?.url || null,
                })) || []
            });
        }
    }, [product, categories]);

    if (!editedProduct) return null;

    const handleChange = (field, value) => {
        setEditedProduct(prev => ({...prev, [field]: value}));
    };

    const handleDiscountChange = (field, value) => {
        setEditedProduct(prev => ({
            ...prev,
            discount: {...prev.discount, [field]: value}
        }));
    };

    const handleColorChange = (index, field, value) => {
        setEditedProduct(prev => {
            const updated = [...prev.colors];
            updated[index] = {...updated[index], [field]: value};
            return {...prev, colors: updated};
        });
    };

    const handleFileChange = (index, file) => {
        setEditedProduct(prev => {
            const updated = [...prev.colors];
            updated[index] = {
                ...updated[index],
                colorImage: file,
                previewUrl: file ? URL.createObjectURL(file) : updated[index].previewUrl
            };
            return {...prev, colors: updated};
        });
    };

    const handleSave = async () => {
        try {
            await ProductsService.updateProduct(
                editedProduct.id,
                editedProduct.name,
                editedProduct.description,
                editedProduct.price,
                editedProduct.category?.id
            );

            if (editedProduct.discount?.percent) {
                await ProductsService.updateProductDiscount(
                    editedProduct.id,
                    editedProduct.discount.percent,
                    new Date(editedProduct.discount.startDate).toISOString(),
                    new Date(editedProduct.discount.endDate).toISOString(),
                    editedProduct.discount.description
                );
            }

            await Promise.all(
                editedProduct.colors.map(async (color, i) => {
                    await ProductsService.updateProductColor(
                        color.id,
                        editedProduct.id,
                        color.colorName,
                        color.colorQuantity,
                        color.colorCode
                    );

                    if (color.colorImage) {
                        await ProductsService.createProductImage(
                            color.colorImage,
                            color.colorName,
                            i === 0,
                            color.id
                        );
                    }
                })
            );

            onSave();
            setVisible(false);
        } catch (e) {
            console.error("Ошибка при обновлении продукта:", e);
        }
    };

    return (
        <MyModal visible={visible} setVisible={setVisible}>
                <h2 className="text-xl font-semibold text-gray-800">Редактировать продукт</h2>

                {/* Основные поля */}
                <div className="grid gap-3">
                    <label className="text-sm font-medium">Название</label>
                    <MyInput value={editedProduct.name} onChange={(e) => handleChange("name", e.target.value)}/>

                    <label className="text-sm font-medium">Описание</label>
                    <MyInput value={editedProduct.description} onChange={(e) => handleChange("description", e.target.value)}/>

                    <label className="text-sm font-medium">Цена</label>
                    <MyInput type="number" value={editedProduct.price} onChange={(e) => handleChange("price", e.target.value)}/>

                    <label className="text-sm font-medium">Категория</label>
                    <select
                        value={editedProduct.category?.id || ""}
                        onChange={(e) => {
                            const cat = categories.find(c => c.id === Number(e.target.value));
                            handleChange("category", cat);
                        }}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option disabled value="">Выберите категорию</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* Цвета */}
                <div>
                    <h3 className="mt-4 mb-2 text-lg font-medium">Цвета и фото</h3>
                    {editedProduct.colors.map((color, index) => (
                        <div key={color.id || index} className="border-2 p-4 rounded-2xl mb-4 bg-gray-50">
                            <label className="text-sm font-medium">Название цвета</label>
                            <MyInput value={color.colorName} onChange={(e) => handleColorChange(index, "colorName", e.target.value)}/>

                            <label className="mt-2 text-sm font-medium">Код цвета</label>
                            <MyInput type="color" value={color.colorCode} onChange={(e) => handleColorChange(index, "colorCode", e.target.value)}/>

                            <label className="mt-2 text-sm font-medium">Количество</label>
                            <MyInput type="number" value={color.colorQuantity} onChange={(e) => handleColorChange(index, "colorQuantity", e.target.value)}/>

                            <label className="mt-2 text-sm font-medium">Фото</label>
                            <div className="relative w-[150px] h-[150px] overflow-hidden rounded-xl bg-gray-100 border flex items-center justify-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{display: "none"}}
                                    ref={(el) => (fileInputs.current[index] = el)}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) handleFileChange(index, file);
                                    }}
                                />
                                <div
                                    className="absolute inset-0 flex justify-center items-center bg-black/0 hover:bg-black/40 transition cursor-pointer"
                                    onClick={() => fileInputs.current[index].click()}
                                >
                                    {!color.previewUrl && (
                                        <img src={cameraImg} alt="upload" className="w-10 h-10 opacity-60"/>
                                    )}
                                </div>
                                {color.previewUrl && (
                                    <img src={color.previewUrl} alt="preview" className="w-full h-full object-cover"/>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Скидка */}
                <div>
                    <h3 className="mt-4 mb-2 text-lg font-medium">Скидка</h3>
                    <label className="text-sm font-medium">Процент</label>
                    <MyInput type="number" value={editedProduct.discount.percent} onChange={(e) => handleDiscountChange("percent", e.target.value)}/>

                    <label className="mt-2 text-sm font-medium">Дата начала</label>
                    <input
                        type="date"
                        value={editedProduct.discount.startDate}
                        onChange={(e) => handleDiscountChange("startDate", e.target.value)}
                        className="border rounded-lg px-3 py-2 w-full"
                    />

                    <label className="mt-2 text-sm font-medium">Дата окончания</label>
                    <input
                        type="date"
                        value={editedProduct.discount.endDate}
                        onChange={(e) => handleDiscountChange("endDate", e.target.value)}
                        className="border rounded-lg px-3 py-2 w-full"
                    />

                    <label className="mt-2 text-sm font-medium">Описание</label>
                    <MyInput value={editedProduct.discount.description} onChange={(e) => handleDiscountChange("description", e.target.value)}/>
                </div>

                {/* Кнопки */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={() => setVisible(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Сохранить
                    </button>
                </div>
        </MyModal>
    );
};

export default ProductEditModal;
