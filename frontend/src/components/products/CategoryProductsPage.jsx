import React, { useState } from 'react';
import SidebarFilters from "./SidebarFilters.jsx";
import ProductsCard from "./ProductsCard.jsx";

const CategoryProductsPage = ({ currentCategory, currentProducts }) => {
    const [showFilters, setShowFilters] = useState(false);

    if (!currentCategory) return <div>Категория не найдена</div>;

    return (
        <div className="bg-[#D9D9D9] relative">
            <div className="mx-auto max-w-[1500px] w-full relative pt-[80px] pb-[100px] min-h-[100vh] px-4 sm:px-6 lg:px-8">
                <h2 className="text-[24px] sm:text-[32px] lg:text-[36px] montserrat-300 mt-[20px] mb-[30px]">
                    {currentCategory.name}
                </h2>

                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setShowFilters(true)}
                        className="w-full bg-black text-white py-3 rounded-2xl font-medium"
                    >
                        Показать фильтры
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="hidden lg:block lg:w-[350px] shrink-0">
                        <SidebarFilters />
                    </div>

                    <div className="flex-1">
                        <ProductsCard products={currentProducts} />
                    </div>
                </div>
            </div>

            {showFilters && (
                <div className="fixed inset-0 z-50 flex  transition-all duration-200">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setShowFilters(false)}
                    />
                    <div className="relative z-50 w-[80%] max-w-[350px] h-full bg-white shadow-lg transform transition-transform duration-300 ease-out translate-x-0">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="text-lg font-medium">Фильтры</h3>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="text-gray-500 hover:text-black text-xl"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto h-full">
                            <SidebarFilters />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryProductsPage;
