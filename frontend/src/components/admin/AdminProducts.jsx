import React, {useEffect, useState} from 'react';
import GreyButton from "../ui/greyButton/greyButton.jsx";
import ProductInfoStep from "./product/ProductInfoStep.jsx";
import ImageUploadStep from "./product/ImageUploadStep.jsx";
import DiscountStep from "./product/DiscountStep.jsx";
import ProductsService from "../api/service/ProductsService.js";

const AdminProducts = ({setIsLoading}) => {

    const [step, setStep] = useState(0);

    const [productsList, setProductList] = useState([]);


    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        colorsCount: 1,
        image: null,
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
        discount: {
            percent: 0,
            startDate: "",
            endDate: "",
            description: ""
        }
    };


    const fetchingPosts = async () => {
        setIsLoading(true);
        try {
            const data = await ProductsService.getProducts();
            setProductList(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchingPosts();
    }, []);

    const handleCancel = () => setProduct(initialProductState);

    const handleCreateProduct = async () => {
        setIsLoading(true);

        console.log({
            name: product.name,
            description: product.description,
            price: product.price,
            category_id: product?.category?.id
        });


        console.log(product?.colors)


        try {
            const productData = await ProductsService.createProducts(
                product.name,
                product.description,
                product.price,
                product.category.id
            );

            console.log({
                id:   productData?.id,
                percent:   product?.discount?.percent,
                start_date:   product?.discount?.startDate,
                end_date:   product?.discount?.endDate,
                description:   product?.discount?.description
            })


            console.log(productData);

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


            for (let i = 0; i < product?.colors.length; i++) {
                const color = product?.colors[i];
                const colorData = await ProductsService.createProductColor(
                    productData?.id,
                    color?.colorName,
                    color?.colorQuantity
                );

                if (color?.colorImage) {
                    await ProductsService.createProductImage(
                        color?.colorImage,
                        color?.colorName,
                        i === 0,
                        colorData.id
                    );
                }
            }

            console.log("Товар создан успешно!");
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDeleteProduct = async (id) => {
        try {
            await ProductsService.deleteProduct(id);
        } catch (err) {
            console.error(err);
        }
    }

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

            <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">Список продуктов</h3>
                {productsList.length === 0 ? (
                    <p>Продукты не найдены</p>
                ) : (
                    <ul>
                        {productsList.map((prod) => (
                            <li key={prod.id} className="mb-3 border p-3 rounded-lg">
                                <p><strong>Название:</strong> {prod.name}</p>
                                <p><strong>Описание:</strong> {prod.description}</p>
                                <p><strong>Цена:</strong> {prod.price}$ </p>
                                <p><strong>Категория:</strong> {prod.category?.name || "-"}</p>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEditProduct(prod)}
                                        className="px-3 py-1 bg-yellow-400 rounded text-white"
                                    >
                                        Изменить
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(prod.id)}
                                        className="px-3 py-1 bg-red-500 rounded text-white"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>

    );
};

export default AdminProducts;