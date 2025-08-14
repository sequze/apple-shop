import React, {useState} from 'react';
import GreyButton from "../ui/greyButton/greyButton.jsx";
import ProductInfoStep from "./product/ProductInfoStep.jsx";
import ImageUploadStep from "./product/ImageUploadStep.jsx";
import DiscountStep from "./product/DiscountStep.jsx";
import ProductsService from "../api/service/ProductsService.js";

const AdminProducts = ({setIsLoading}) => {

    const [step, setStep] = useState(0);
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

    const handleCancel = () => setProduct(initialProductState);

    const handleCreateProduct = async () => {
        setIsLoading(true);

        try {
            const productData = await ProductsService.createProducts(product.name, product.description, product.price, product.category.id);
            await ProductsService.createProductColor(productData?.id, productData?.colors?.colorName, productData?.colors?.colorQuantity);
            await ProductsService.createProductDiscount(productData?.id, product?.discount?.percent, product?.discount?.startDate, product?.discount?.endDate, product?.discount?.description);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form>
            <h2 className="text-[24px] sm:text-[28px] inter-400 mb-[20px] lg:mb-[40px] mt-[20px]">Продукт</h2>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[20px]">
                <div className="relative w-full lg:w-1/2">
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
                    {step === 1 && (
                        <ProductInfoStep handleCancel={handleCancel} setStep={setStep} product={product} setProduct={setProduct}/>
                    )}
                    {step === 2 && (
                        <ImageUploadStep product={product} setProduct={setProduct} setStep={setStep} handleCancel={handleCancel}/>
                    )
                    }
                    {step === 3 && (
                        <DiscountStep product={product} setProduct={setProduct} setStep={setStep} handleCancel={handleCancel}/>
                    )}

                </div>
            </div>
        </form>
    );
};

export default AdminProducts;