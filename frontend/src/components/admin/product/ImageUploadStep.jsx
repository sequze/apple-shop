import React, {useEffect, useRef} from 'react';
import MyInput from "../../ui/input/MyInput.jsx";
import GreyButton from "../../ui/greyButton/greyButton.jsx";
import MyWhiteButton from "../../ui/whiteButton/MyWhiteButton.jsx";
import cameraImg from "../../../assets/camera.png";

const ImageUploadStep = ({ product, setProduct, setStep, handleCancel }) => {

    const fileInputs = useRef([])

    useEffect(() => {
        setProduct(prev => {
            const existing = prev.colors || [];
            const newColors = Array.from({length: prev.colorsCount}, (_, i) => {
                return existing[i] || {
                    colorName: "",
                    colorCode: "",
                    colorQuantity: "",
                    colorImage: null
                }
            })
            return { ...prev, colors: newColors};
        })
    }, [product.colorsCount]);

    const handleChange = (index, field, value) => {
        setProduct(prev => {
            const updatedColors = [...prev.colors];
            updatedColors[index] = {...updatedColors[index], [field]: value};
            return { ...prev, colors: updatedColors };
        });
    }

    const handleFileChange = (index, file) => {
        setProduct(prev => {
            const updatedColors = [...prev.colors];
            updatedColors[index] = { ...updatedColors[index], colorImage: file };
            return {...prev, colors: updatedColors };
        });
    }


    return (
        <div className="flex flex-col gap-6">
            <h3 className="inter-400 text-[18px] mb-[20px]">Цвета и фото</h3>

            {product?.colors?.map((color, index) => (
                <div key={index} className="border-2 p-4 rounded-2xl">
                    <label className="block mb-2 text-sm font-medium">Название цвета</label>
                    <MyInput value={color.colorName}
                             onChange={(e) => handleChange(index, "colorName", e.target.value)}
                             placeholder="Например: Красный"
                    />

                    <label className="block mb-2 mt-4 text-sm font-medium">Код цвета</label>
                    <MyInput
                        style={{height: "50px"}}
                        type="color"
                        value={color.colorCode}
                        onChange={(e) => handleChange(index, "colorCode", e.target.value)}
                    />

                    <label className="block mb-2 mt-4 text-sm font-medium">Количество товара</label>
                    <MyInput
                        type="number"
                        value={color.colorQuantity}
                        onChange={(e) => handleChange(index, "colorQuantity", e.target.value)}
                        placeholder="Например: 10"
                    />

                    <label className="block mt-4 mb-2 text-sm font-medium">Фото для цвета</label>
                    <div className="relative w-[150px] h-[150px] overflow-hidden rounded-2xl bg-[#D9D9D9] border-2">
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
                            className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-0 hover:bg-opacity-50 transition cursor-pointer"
                            onClick={() => fileInputs.current[index].click()}
                        >
                            {!(color?.colorImage) && (
                                <img src={cameraImg} alt="upload" className="w-10 h-10"/>
                            )}
                        </div>
                        {color.colorImage && (
                            <img
                                src={URL.createObjectURL(color.colorImage)}
                                alt="preview"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>

                </div>
            ))}

            <div className="grid gap-3 mt-4">
                <MyWhiteButton
                    type="button"
                    onClick={() => {
                        if (product.colors.some(c => !c.colorName || !c.colorCode || !c.colorQuantity || !c.colorImage)) {
                            alert("Заполните все поля для каждого цвета");
                            return;
                        }
                        setStep(3);
                    }}
                >
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

export default ImageUploadStep;
