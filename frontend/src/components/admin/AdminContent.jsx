import React, {useCallback, useState} from 'react';
import AdminCategory from "./AdminCategory.jsx";
import AdminProducts from "./AdminProducts.jsx";
import AdminOrders from "./AdminOrders.jsx";
import Loader from "../Loader.jsx";

const AdminContent = () => {
    const [loadingCount, setLoadingCount] = useState(0);

    const startLoading = useCallback(() => {
        setLoadingCount(c => c + 1);
    }, []);
    const stopLoading = useCallback(() => {
        setLoadingCount(c => Math.max(0, c - 1));
    }, []);

    const withLoading = useCallback(async (fn) => {
        startLoading();
        try {
            return await fn();
        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]);

    const isLoading = loadingCount > 0;

    if (isLoading) return (
        <div className="z-10 absolute top-0 left-0 w-full min-h-screen flex justify-center items-center bg-[#fff]">
            <div className="w-[200px] h-[200px] flex justify-center">
                <Loader />
            </div>
        </div>
    )

    return (
        <div className="bg-[#D9D9D9] flex justify-center">
            <div className="max-w-[1500px] w-full relative pt-[130px] pb-[100px] min-h-screen mx-[20px]">
                <div className="bg-[#fff] rounded-[35px] shadow-md w-full px-[20px] pt-[30px] sm:p-[50px] mb-[30px]">
                    <AdminCategory withLoading={withLoading}/>
                    <AdminProducts withLoading={withLoading}/>
                    <AdminOrders />
                </div>
            </div>
        </div>
    );
};

export default AdminContent;