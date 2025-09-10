import React from 'react';
import MyInput from "../ui/input/MyInput.jsx";
import cash1 from "../../assets/pay_method/cash-1.png";
import cash2 from "../../assets/pay_method/cash-2.png";

const OrderInputs = ({ order, payMethod, setPayMethod, setOrder, onValidate }) => {

    const validateField = (field, value) => {
        switch (field) {
            case "firstName":
            case "lastName":
            case "city":
            case "addressLine":
            case "region":
                return !value.trim() ? "Обязательное поле" : "";
            case "phoneNumber":
                return /^\+?\d{10,15}$/.test(value) ? "" : "Неверный номер";
            case "email":
                return /^\S+@\S+\.\S+$/.test(value) ? "" : "Неверный email";
            default:
                return "";
        }
    };

    const handleChange = (field, value) => {
        setOrder(prev => ({ ...prev, [field]: value }));
        const error = validateField(field, value);
        onValidate(field, error);
    };

    const handlePayMethod = (method) => {
        setPayMethod(method);
        setOrder(prev => ({ ...prev, payment_method: method === 0 ? "cash" : "card" }));
        onValidate("payment_method", "");
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between w-full gap-[50px] mb-[40px]">
                <MyInput
                    value={order.firstName}
                    onChange={e => handleChange("firstName", e.target.value)}
                    placeholder="Имя"
                />
                <MyInput
                    value={order.phoneNumber}
                    onChange={e => handleChange("phoneNumber", e.target.value)}
                    placeholder="Телефон"
                />
            </div>
            <div className="flex flex-col md:flex-row justify-between w-full gap-[50px] mb-[40px]">
                <MyInput
                    value={order.lastName}
                    onChange={e => handleChange("lastName", e.target.value)}
                    placeholder="Фамилия"
                />
                <MyInput
                    value={order.email}
                    onChange={e => handleChange("email", e.target.value)}
                    placeholder="Email"
                />
            </div>
            <div className="flex flex-col md:flex-row justify-between w-full gap-[50px] mb-[40px]">
                <MyInput
                    value={order.addressLine}
                    onChange={e => handleChange("addressLine", e.target.value)}
                    placeholder="Улица, дом, квартира"
                />
                <MyInput
                    value={order.region}
                    onChange={e => handleChange("region", e.target.value)}
                    placeholder="Регион"
                />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-[50px] mb-[40px]">
                <MyInput
                    value={order.city}
                    onChange={e => handleChange("city", e.target.value)}
                    placeholder="Город"
                />
                <div className="flex justify-between items-end w-1/2">
                    <button
                        className="pb-[10px] border-[#D9D9D9] border-0 border-b-2 border-solid w-1/2 cursor-pointer flex items-center justify-center text-[20px] gap-[10px]"
                        style={payMethod === 0 ? { borderColor: "#0171E2" } : {}}
                        onClick={(e) => { e.preventDefault(); handlePayMethod(0); }}
                    >
                        <img className="w-[40px]" src={cash1} alt="" />
                        <div>Наличными</div>
                    </button>
                    <button
                        className="pb-[10px] border-[#D9D9D9] border-0 border-b-2 border-solid w-1/2 cursor-pointer flex items-center justify-center text-[20px] gap-[10px]"
                        style={payMethod === 1 ? { borderColor: "#0171E2" } : {}}
                        onClick={(e) => { e.preventDefault(); handlePayMethod(1); }}
                    >
                        <img className="w-[40px]" src={cash2} alt="" />
                        <div>Картой</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderInputs;
