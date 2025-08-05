import React from 'react';
import SidebarFilters from "./SidebarFilters.jsx";
import ProductsCard from "./ProductsCard.jsx";

const CategoryProductsPage = ({currentCategory, currentProducts}) => {

    if (!currentCategory) return <div>Категория не найдена</div>;

    return (
        <div className="bg-[#D9D9D9]">
            <div className="mx-auto max-w-[1500px] w-full relative  pt-[100px] pb-[100px] min-h-[100vh]">
                <h2 className="ml-[25px] text-[36px] montserrat-300 mt-[30px] mb-[40px]">{currentCategory.title}</h2>
                <div className="flex">
                    <SidebarFilters />
                    <ProductsCard products={currentProducts}/>
                </div>
            </div>
        </div>
    );
};

export default CategoryProductsPage;