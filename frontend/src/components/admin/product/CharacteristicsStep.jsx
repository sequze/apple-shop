import React, { useEffect, useRef } from 'react';
import MyInput from "../../ui/input/MyInput.jsx";
import MyWhiteButton from "../../ui/whiteButton/MyWhiteButton.jsx";
import GreyButton from "../../ui/greyButton/greyButton.jsx";
import cameraImg from "../../../assets/camera.png";

const CharacteristicsStep = ({ product, setProduct, setStep, handleCancel }) => {

    const fileInputs = useRef([]);

    useEffect(() => {
        setProduct(prev => {
            const existing = prev.characteristics || [];
            const newChars = Array.from(
                { length: prev.characteristicsCount },
                (_, i) => existing[i] || { name: "", value: "", image: null }
            );
            return { ...prev, characteristics: newChars };
        });
    }, [product.characteristicsCount]);

    const handleChange = (index, field, value) => {
        setProduct(prev => {
            const updated = [...prev.characteristics];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, characteristics: updated };
        });
    };

    const handleFileChange = (index, file) => {
        setProduct(prev => {
            const updated = [...prev.characteristics];
            updated[index] = { ...updated[index], image: file };
            return { ...prev, characteristics: updated };
        });
    };

    return (
        <div className="flex flex-col gap-6">
            <h3 className="inter-400 text-[18px] mb-[20px]">Характеристики с фото</h3>

            {product.characteristics.map((char, index) => (
                <div key={index} className="border-2 p-4 rounded-2xl">
                    <label className="block mb-2 text-sm font-medium">Название характеристики</label>
                    <MyInput
                        value={char.name}
                        onChange={(e) => handleChange(index, "name", e.target.value)}
                        placeholder="Например: Память"
                    />

                    <label className="block mb-2 mt-4 text-sm font-medium">Значение</label>
                    <MyInput
                        value={char.value}
                        onChange={(e) => handleChange(index, "value", e.target.value)}
                        placeholder="Например: 256gb"
                    />

                    <label className="block mt-4 mb-2 text-sm font-medium">Фото характеристики</label>
                    <div className="relative w-[150px] h-[150px] overflow-hidden rounded-2xl bg-[#D9D9D9] border-2">
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={el => (fileInputs.current[index] = el)}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) handleFileChange(index, file);
                            }}
                        />
                        <div
                            className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-0 hover:bg-opacity-50 transition cursor-pointer"
                            onClick={() => fileInputs.current[index].click()}
                        >
                            {!char.image && <img src={cameraImg} alt="upload" className="w-10 h-10" />}
                        </div>
                        {char.image && (
                            <img
                                src={URL.createObjectURL(char.image)}
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
                        if (product.characteristics.some(c => !c.name || !c.value || !c.image)) {
                            alert("Заполните все поля и добавьте фото для каждой характеристики");
                            return;
                        }
                        setStep(3); // следующий шаг — загрузка основного изображения продукта
                    }}
                >
                    Продолжить
                </MyWhiteButton>
                <GreyButton
                    onClick={(e) => {
                        e.preventDefault();
                        handleCancel();
                    }}
                >
                    Отмена
                </GreyButton>
            </div>
        </div>
    );
};

export default CharacteristicsStep;
