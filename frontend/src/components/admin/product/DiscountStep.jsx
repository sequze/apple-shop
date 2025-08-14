import React from 'react';
import MyInput from "../../ui/input/MyInput.jsx";
import MyWhiteButton from "../../ui/whiteButton/MyWhiteButton.jsx";
import GreyButton from "../../ui/greyButton/greyButton.jsx";

const DiscountStep = () => {
    return (
        <div>
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
                value={percentDescription}
                onChange={(e) => percentDescription(e.target.value)}
                placeholder="Например: Летняя распродажа"
            />

            <div className="grid gap-3 mt-[20px]">
                <MyWhiteButton onClick={(e) => {
                    e.preventDefault();
                    setStep(4);
                }}>Продолжить</MyWhiteButton>
                <GreyButton onClick={handleCancel}>Отмена</GreyButton>
            </div>
        </div>
    );
};

export default DiscountStep;