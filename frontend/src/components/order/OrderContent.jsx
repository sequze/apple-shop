import React, {useState} from 'react';
import OrderInputs from "./OrderInputs.jsx";
import OrderSum from "./OrderSum.jsx";

const OrderContent = () => {

    const [payMethod, setPayMethod] = useState(0);

    return (
        <div className="bg-[#D9D9D9] flex justify-center items-center">
            <div className="max-w-[1500px] w-full mx-[10px] md:mx-0 md:w-11/12 lg:w-4/5 2xl:w-3/5 relative  pt-[100px] pb-[20px] sm:pb-[100px] min-h-[100vh]">
                <h2 className="ml-[10px] md:ml-[25px] text-[28px] md:text-[36px] montserrat-300 mt-[30px] mb-[20px] sm:mb-[40px]">Оформление заказа</h2>
                <div>
                    <div className="bg-[#fff] rounded-[25px] p-[10px] sm:p-[25px] w-full shadow-md">
                        <form className="pt-[25px] pb-[10px] sm:py-[50px]">
                            <OrderInputs payMethod={payMethod} setPayMethod={setPayMethod}/>
                            <OrderSum />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderContent;