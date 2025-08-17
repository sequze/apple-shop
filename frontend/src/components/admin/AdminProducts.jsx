import React, {useContext, useEffect, useState} from 'react';
import GreyButton from "../ui/greyButton/greyButton.jsx";
import ProductInfoStep from "./product/ProductInfoStep.jsx";
import ImageUploadStep from "./product/ImageUploadStep.jsx";
import DiscountStep from "./product/DiscountStep.jsx";
import ProductsService from "../api/service/ProductsService.js";
import {CategoriesContext} from "../../context/CategoriesContext.jsx";
import {CategoriesService} from "../api/service/CategoriesService.js";
import Loader from "../Loader.jsx";

const AdminProducts = ({withLoading}) => {

    const [step, setStep] = useState(0);
    const [productsList, setProductList] = useState([]);
    const {categories, setCategories} = useContext(CategoriesContext);
    const [isLoading, setIsLoading] = useState(false);

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        colorsCount: 1,
        image: null,
        colors: [],
        discount: {
            percent: 0,
            startDate: "",
            endDate: "",
            description: ""
        }
    });

    const initialProductState = {
        name: "",
        description: "",
        price: "",
        category: "",
        colorsCount: 1,
        image: null,
        colors: [],
        discount: {
            percent: 0,
            startDate: "",
            endDate: "",
            description: ""
        }
    };


    const getCategoryName = (id) => {
        const cat = categories.find(c => c.id === id);
        return cat ? cat.name : "-";
    };

    useEffect(() => {
        const loadData = (async () => {
            setIsLoading(true);

            try {
                const [categoriesData, productsData] = await Promise.all([
                    CategoriesService.getAllCategories(),
                    ProductsService.getProducts()
                ]);
                setCategories(categoriesData);
                setProductList(productsData);
            } catch (error) {
                console.error('Failed to load data:', error);
            } finally {
                setIsLoading(false);
            }
        });
        loadData();
    }, []);


    const handleCancel = () => setProduct(initialProductState);

    const handleCreateProduct = async () => {
        await withLoading(async () => {
            const productData = await ProductsService.createProducts(
                product.name,
                product.description,
                product.price,
                product.category.id
            );

            if (!productData) {
                console.error("Не удалось создать продукт");
                return;
            }

            if (product?.discount?.percent) {
                await ProductsService.createProductDiscount(
                    productData?.id,
                    product?.discount?.percent,
                    new Date(product.discount.startDate).toISOString(),
                    new Date(product.discount.endDate).toISOString(),
                    product?.discount?.description
                );
            }


            await Promise.all(
                product.colors.map(async (color, i) => {
                    const colorData = await ProductsService.createProductColor(
                        productData.id,
                        color.colorName,
                        color.colorQuantity
                    );

                    if (color.colorImage) {
                        await ProductsService.createProductImage(
                            color.colorImage,
                            color.colorName,
                            i === 0,
                            colorData.id
                        );
                    }
                })
            );

            setProduct(initialProductState);
            setStep(0);
            console.log("Товар создан успешно!");
        });
    };

    const handleDeleteProduct = async (id) => {
        await withLoading(async () => {
            await ProductsService.deleteProduct(id);
            const data = await ProductsService.getProducts();
            setProductList(data);
        });
    };

    const handleEditProduct = async (prod) => {

    }

    return (
        <div>
            <form>
                <h2 className="text-[24px] sm:text-[28px] inter-400 mb-[20px] lg:mb-[40px] mt-[20px]">Продукт</h2>
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[20px]">
                    {step === 0 && (
                        <div className="w-full lg:w-3/12">
                            <GreyButton onClick={(e) => {
                                e.preventDefault();
                                setStep(1);
                            }}>
                                Добавить
                            </GreyButton>
                        </div>
                    )
                    }

                    <div className="relative w-full lg:w-1/2">
                        {step === 1 && (
                            <ProductInfoStep handleCancel={handleCancel} setStep={setStep} product={product} setProduct={setProduct}/>
                        )}
                        {step === 2 && (
                            <ImageUploadStep product={product} setProduct={setProduct} setStep={setStep} handleCancel={handleCancel}/>
                        )
                        }
                        {step === 3 && (
                            <DiscountStep handleCreateProduct={handleCreateProduct} product={product} setProduct={setProduct} setStep={setStep} handleCancel={handleCancel}/>
                        )}

                    </div>
                </div>
            </form>

            {isLoading ? (
                    <div className="w-40 h-40 m-auto mt-10">
                        <Loader />
                    </div>
                )
                :
                (
                    <div className="mt-10">
                        <h3 className="text-xl font-semibold mb-6">Список продуктов</h3>
                        {productsList.length === 0 ? (
                            <p>Продукты не найдены</p>
                        ) : (
                            <ul className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                {productsList.map((prod) => (
                                    <li
                                        key={prod.id}
                                        className="justify-between mb-3 border p-3 rounded-lg flex items-center gap-7 w-full xl:w-fit"
                                    >
                                        <div className="flex items-center gap-7">
                                            <div className="w-40 h-40 lg:w-60 lg:h-60 xl:w-48 xl:h-48 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
                                                {prod.colors[0]?.images[0]?.url ? (
                                                    <img
                                                        src={prod.colors[0].images[0].url}
                                                        alt={prod.colors[0].images[0]?.alt_text || prod.colors[0]?.name || "product"}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-gray-400 text-sm">Нет фото</span>
                                                )}
                                            </div>


                                            <div>
                                                <p><strong>Название:</strong>{prod.name}</p>
                                                <p><strong>Цена:</strong>{prod.price}$ </p>
                                                <p><strong>Категория:</strong>{getCategoryName(prod.category_id) || "-"}</p>
                                            </div>
                                        </div>


                                        <div>
                                            <div className="flex gap-2 mt-4">
                                                <button
                                                    onClick={() => handleEditProduct(prod)}
                                                    className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600"
                                                >
                                                    Редактировать
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleDeleteProduct(prod.id)
                                                    }}
                                                    className="px-3 py-1 rounded-full bg-red-500 text-white text-sm hover:bg-red-600"
                                                >
                                                    Удалить
                                                </button>
                                            </div>
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
        </div>

    );
};

export default AdminProducts;