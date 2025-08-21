import React from 'react';
import MyInput from "../../ui/input/MyInput.jsx";
import MyWhiteButton from "../../ui/whiteButton/MyWhiteButton.jsx";
import GreyButton from "../../ui/greyButton/greyButton.jsx";

const DiscountStep = ({product, setProduct, setStep, handleCancel, handleCreateProduct}) => {

    const handleChange = (val, field) => {
        return  setProduct(prev => ({
            ...prev,
            discount: {
                ...prev?.discount,
                [field]: val
            }
        }));
    }

    return (
        <div className="border-2 rounded-2xl p-7">
            <h3 className="inter-400 text-[18px] mb-[20px]">Скидка</h3>
            <label className="block mb-2 text-sm font-medium">Процент скидки</label>
            <MyInput
                type="number"
                inputMode="numeric"
                pattern="\d*"
                min={0}
                max={100}
                step={1}
                value={product?.discount?.percent}
                onChange={(e) => {
                    const val = Number(e.target.value);
                    if ((!isNaN(val) && val >= 0 && val <= 100) || val === "") {
                        handleChange(val, "percent")
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
                        value={product?.discount?.startDate}
                        onChange={(e) => handleChange(e.target.value, "startDate")}
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Дата окончания</label>
                    <input
                        min={product?.discount?.startDate || new Date().toISOString().split("T")[0]}
                        type="date"
                        className="border rounded px-3 py-2 w-full"
                        value={product?.discount?.endDate}
                        onChange={(e) => handleChange(e.target.value, "endDate")}
                    />
                </div>
            </div>
            <label className="block mt-4 mb-4 text-sm font-medium">Описание скидки</label>
            <MyInput
                value={product?.discount?.description}
                onChange={(e) => handleChange(e.target.value, "description")}
                placeholder="Например: Летняя распродажа"
            />

            <div className="grid gap-3 mt-[20px]">
                <MyWhiteButton onClick={(e) => {
                    e.preventDefault();
                    handleCreateProduct()
                    setStep(4);
                }}>Создать продукт</MyWhiteButton>
                <GreyButton onClick={(e) => {
                    e.preventDefault();
                    handleCancel()
                }}>Отмена</GreyButton>
            </div>
        </div>
    );
};

export default DiscountStep;