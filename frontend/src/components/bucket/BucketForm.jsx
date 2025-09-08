import React, {useContext, useState} from 'react';
import SidebarBucket from "./SidebarBucket.jsx";
import BucketContent from "./BucketContent.jsx";
import {CartContext} from "../../context/CartContext.jsx";
import CartService from "../api/service/CartService.js";

const BucketForm = () => {

    const [selectedIds, setSelectedIds] = useState([]);

    const { cartItems, refreshCart } = useContext(CartContext);

    const toggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const selectAll = () => {
        if (selectedIds.length === cartItems.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(cartItems.map((item) => item.id));
        }
    };

    const deleteSelected = async () => {
        for (const id of selectedIds) {
            await CartService.deleteCartItem(id);
        }
        await refreshCart();
        setSelectedIds([]);
    };

    return (
        <div className="bg-[#D9D9D9]">
            <div className="mx-auto max-w-[1500px] w-full relative  pt-[100px] pb-[100px] min-h-[100vh]">
                <h2 className="ml-[25px] text-[28px] lg:text-[36px] montserrat-300 mt-[30px] mb-[40px]">Корзина</h2>
                <div className="flex flex-col md:flex-row mx-[5px] sm:mx-[20px] justify-between gap-[10px] lg:gap-[20px] xl:gap-[50px]">
                    <BucketContent
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                        toggleSelect={toggleSelect}
                        deleteSelected={deleteSelected}
                        selectAll={selectAll}
                    />
                    <SidebarBucket
                        selectedIds={selectedIds}
                    />
                </div>
            </div>
        </div>
    );
};

export default BucketForm;