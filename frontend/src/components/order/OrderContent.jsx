import React, { useContext, useState } from 'react';
import OrderInputs from "./OrderInputs.jsx";
import OrderSum from "./OrderSum.jsx";
import { CartContext } from "../../context/CartContext.jsx";
import GreyButton from "../ui/greyButton/greyButton.jsx";
import OrdersService from "../api/service/OrdersService.js"

const OrderContent = () => {
    const { cartItems, selectedIds } = useContext(CartContext);

    const [order, setOrder] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        city: "",
        addressLine: "",
        region: "",
        payment_method: "",
        items: []
    });

    const [payMethod, setPayMethod] = useState(null);
    const [errors, setErrors] = useState({});
    const hasErrors = Object.values(errors).some(Boolean) || !order.payment_method;

    const handleValidate = (field, error) => {
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleCreateOrder = async (e) => {
        e.preventDefault();
        if (hasErrors) return;

        try {
            const resp = await OrdersService.createOrder(
                order.firstName,
                order.lastName,
                order.phoneNumber,
                order.email,
                order.city,
                order.addressLine,
                order.region,
                order.payment_method,
                order.items
            );
            console.log(resp);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-[#D9D9D9] flex justify-center items-center">
            <div className="max-w-[1500px] w-full mx-[10px] md:mx-0 md:w-11/12 lg:w-4/5 2xl:w-3/5 relative pt-[100px] pb-[20px] sm:pb-[100px] min-h-[100vh]">
                <h2 className="ml-[10px] md:ml-[25px] text-[28px] md:text-[36px] montserrat-300 mt-[30px] mb-[20px] sm:mb-[40px]">
                    Оформление заказа
                </h2>
                <div>
                    <div className="bg-[#fff] rounded-[25px] p-[10px] sm:p-[25px] w-full shadow-md">
                        <form className="pt-[25px] pb-[10px] sm:py-[50px]">
                            <OrderInputs
                                order={order}
                                setOrder={setOrder}
                                payMethod={payMethod}
                                setPayMethod={setPayMethod}
                                onValidate={handleValidate}
                            />
                            <OrderSum selectedIds={selectedIds} cartItems={cartItems} />
                            <div className="w-full md:w-1/3 m-auto">
                                <GreyButton
                                    onClick={handleCreateOrder}
                                    disabled={hasErrors}
                                >
                                    Сделать заказ
                                </GreyButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderContent;
