import React, {useMemo} from 'react';
import GreyButton from "../ui/greyButton/greyButton.jsx";

const OrderSum = ({cartItems, selectedIds}) => {


    const { totalPrice, totalDiscount, finishPrice } = useMemo(() => {
        const selectedItems = cartItems.filter(item => selectedIds.includes(item.id));

        const totalPrice = selectedItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
        const totalDiscount = selectedItems.reduce((sum, item) => {
            if (!item.discount) return sum;
            const original = item.product?.price || 0;
            const discounted = item.price_with_discount || 0;
            return sum + (original - discounted) * item.quantity;
        }, 0);
        const finishPrice = totalPrice - totalDiscount;

        return { totalPrice, totalDiscount, finishPrice };
    }, [cartItems, selectedIds]);


    return (
        <div>
            <div className="w-full md:w-1/2 pr-[20px] pb-[50px]">
                <div className="flex items-center justify-between mb-[10px]">
                    <div className="inter-400 text-[20px]">Товары</div>
                    <div className="inter-400 text-[20px]">{totalPrice}  ₽</div>
                </div>
                <div className="flex items-center justify-between mb-[30px]">
                    <div className="inter-400 text-[20px]">Скидка</div>
                    <div className="inter-400 text-[20px]">{totalDiscount}  ₽</div>
                </div>
                <div className="flex items-center justify-between mb-[10px]">
                    <div className="inter-400 text-[20px]">Итог</div>
                    <div className="inter-400 text-[20px]">{finishPrice}  ₽</div>
                </div>
            </div>

        </div>
    );
};

export default OrderSum;