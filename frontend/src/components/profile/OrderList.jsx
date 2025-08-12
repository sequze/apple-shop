import React, {useState} from 'react';
import {useOrders} from "../../hooks/useOrders.js";
import Loader from "../Loader.jsx";
import GreyButton from "../ui/greyButton/greyButton.jsx";

const OrderList = () => {

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    const {orders, isLoading, error, hasMore} = useOrders(page, size);

    if (isLoading) return (
        <div className="absolute top-0 left-0 w-full min-h-screen flex justify-center items-center bg-[#fff]">
            <div className="w-[200px] h-[200px] flex justify-center">
                <Loader />
            </div>
        </div>
    )

    if (error) return (
        <div>{error.message}</div>
    )

    const chooseOrderStatus = (status) => {
        switch (status) {
            case "pending":
                return (
                    <div className="inter-300 text-[14px] md:text-[18px] text-red-500" >
                        В ожидании
                    </div>
                )
            case "shipped":
                return (
                    <div className="inter-300 text-[14px] md:text-[18px] text-orange-400" >
                        В доставке
                    </div>
                )
            case "delivered":
                return (
                    <div className="inter-300 text-[14px] md:text-[18px] text-green-500" >
                        Доставлен
                    </div>
                )
            default:
                return <div>Неизвестный статус</div>
        }
    }

    return (
        <div>
            <h3 className="montserrat-400 text-[20px] md:text-[32px]">Список заказов</h3>
            <div className="flex flex-col pt-[40px]">
                {orders.map(order => (
                    order.items.map(elem => (
                            <div
                                key={`${order.id}-${elem.id}`}
                                className="flex items-center gap-[15px] sm:gap-[35px]">
                                <div className="bg-[#D9D9D9] w-[45px] md:w-[60px] h-[45px] md:h-[60px]">
                                    <img src={elem.product.colors[0].images[0].url} alt={elem.product.name}/>
                                </div>
                                <div className="inter-300 text-[18px] md:text-[22px]">{elem.product.name}</div>
                                {chooseOrderStatus(order.status)}
                            </div>
                        )
                    )
                ))}
                {hasMore && (
                    <div className="w-[150px] lg:w-[200px]">
                        <GreyButton onClick={() => setPage(page + 1)}>Загрузить еще</GreyButton>
                    </div>
                )}

            </div>
        </div>
    );
};

export default OrderList;