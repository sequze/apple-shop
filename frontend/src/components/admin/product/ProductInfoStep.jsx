import React, {useContext} from 'react';
import MyInput from "../../ui/input/MyInput.jsx";
import GreyButton from "../../ui/greyButton/greyButton.jsx";
import MyWhiteButton from "../../ui/whiteButton/MyWhiteButton.jsx";
import {CategoriesContext} from "../../../context/CategoriesContext.jsx";

const ProductInfoStep = ({handleCancel, product, setProduct, setStep}) => {

    const { categories } = useContext(CategoriesContext);


    return (
        <div className="flex flex-1 flex-col border-2 p-5 rounded-2xl">
            <label className="block mt-4 mb-2 text-sm font-medium">Название продукта</label>
            <MyInput
                value={product?.name}
                onChange={(event) => {
                    setProduct(prev => ({ ...prev, name: event.target.value }));
                }}
                placeholder="Например: Macbook" />
            <label className="block mt-4 mb-2 text-sm font-medium">Описание продукта</label>
            <MyInput
                value={product?.description}
                onChange={(event) => {
                    setProduct(prev => ({ ...prev, description: event.target.value }));
                }}
                placeholder="Например: Macbook 13 Retina" />
            <label className="block mt-4 mb-2 text-sm font-medium">Цена продукта</label>
            <MyInput
                type="number"
                value={product?.price}
                onChange={(event) => {
                    setProduct(prev => ({ ...prev, price: event.target.value }));
                }}
                placeholder="Например: 300$" />
            <label className="block mt-4 mb-2 text-sm font-medium">Назначте категорию</label>
            <select
                name="category"
                    value={product?.category?.id || ""}
                    onChange={(event) => {
                        const selected = categories.find(c => c.id ===  Number(event.target.value));
                        setProduct(prev => ({...prev, category: selected }));
            }}>
                <option disabled value="">Продукт</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
            <label className="block mt-4 mb-2 text-sm font-medium">Укажите кол-во цветов(от 1 до 5)</label>
            <select
                required
                name="colors"
                value={product?.colorsCount}
                onChange={(event) =>
                    setProduct(prev => ({ ...prev, colorsCount: event.target.value }))
            }>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <div className="grid gap-3 mt-[20px]">
                <MyWhiteButton onClick={(e) => {
                    e.preventDefault();
                    if (!product.name.trim() || !product.description.trim()
                        || !product.price.trim() || !product.category) {
                        alert("Заполните все поля");
                        return;
                    }
                    setStep(2);
                }}>
                    Продолжить
                </MyWhiteButton>
                <GreyButton onClick={(e) => {
                    e.preventDefault();
                    handleCancel()
                }}>Отмена</GreyButton>
            </div>
        </div>
    );
};

export default ProductInfoStep;